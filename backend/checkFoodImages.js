
require("dotenv").config();

const mysql = require("mysql2/promise");
const fs = require("fs");

const IMAGE_TIMEOUT = 12000;
const CONCURRENCY = 5;

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

async function checkImage(url) {
  if (!url || !/^https?:\/\//i.test(url)) {
    return {
      status: "INVALID_URL",
      http_status: "",
      content_type: "",
      final_url: url || "",
    };
  }

  let response;

  try {
    response = await fetch(url, {
      method: "GET",
      headers: { Range: "bytes=0-0" },
      signal: AbortSignal.timeout(IMAGE_TIMEOUT),
      redirect: "follow",
    });

    const httpStatus = response.status;
    const contentType = response.headers.get("content-type") || "";
    const finalUrl = response.url;

    // Release the response body without downloading the full image.
    if (response.body) {
      await response.body.cancel().catch(() => {});
    }

    let status;

    if (httpStatus < 200 || httpStatus >= 300) {
      status = "HTTP_ERROR";
    } else if (!contentType.toLowerCase().startsWith("image/")) {
      status = "NOT_AN_IMAGE";
    } else {
      status = "URL_OK_REVIEW_PHOTO";
    }

    return {
      status,
      http_status: httpStatus,
      content_type: contentType,
      final_url: finalUrl,
    };
  } catch (error) {
    return {
      status: error.name === "TimeoutError" ||
        error.name === "AbortError"
        ? "TIMEOUT"
        : "REQUEST_FAILED",
      http_status: "",
      content_type: "",
      final_url: url,
    };
  }
}

async function main() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "finds",
    });

    // Read-only query: this script never updates database records.
    const [foods] = await connection.execute(
      `SELECT id, name, category, image_url
       FROM food_items
       ORDER BY id`
    );

    console.log(`Found ${foods.length} food items.`);
    console.log("Checking image URLs...");

    const results = new Array(foods.length);
    let nextIndex = 0;

    async function worker() {
      while (true) {
        const index = nextIndex++;

        if (index >= foods.length) return;

        const food = foods[index];
        const result = await checkImage(food.image_url);

        results[index] = { ...food, ...result };

        console.log(
          `[${index + 1}/${foods.length}] ID ${food.id}: ` +
          `${food.name} -> ${result.status}`
        );
      }
    }

    await Promise.all(
      Array.from(
        { length: Math.min(CONCURRENCY, foods.length) },
        () => worker()
      )
    );

    const headers = [
      "id",
      "name",
      "category",
      "image_url",
      "status",
      "http_status",
      "content_type",
      "final_url",
    ];

    const csvRows = [
      headers.join(","),
      ...results.map((row) =>
        headers.map((key) => csvEscape(row[key])).join(",")
      ),
    ];

    fs.writeFileSync(
      "food-image-audit.csv",
      "\uFEFF" + csvRows.join("\n"),
      "utf8"
    );

    const counts = {};

    for (const row of results) {
      counts[row.status] = (counts[row.status] || 0) + 1;
    }

    console.log("\n--- Image URL Check Summary ---");
    console.table(
      Object.entries(counts).map(([status, count]) => ({
        status,
        count,
      }))
    );

    console.log("\nReport saved to backend/food-image-audit.csv");
    console.log("No database records were modified.");
  } catch (error) {
    console.error("\nImage audit failed:", error.message);
    console.error(
      "Check your .env database settings and make sure MySQL is running."
    );
    process.exitCode = 1;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

main();
