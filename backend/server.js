
const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const db = require('./db')
const { GoogleGenAI } = require('@google/genai')

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Existing image storage configuration (unchanged)
const generatedImagesDir = path.join(__dirname, 'generated-images')

if (!fs.existsSync(generatedImagesDir)) {
  fs.mkdirSync(generatedImagesDir, { recursive: true })
}

app.use('/generated-images', express.static(generatedImagesDir))

// Home route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Finds backend is running',
  })
})

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Finds API is working',
  })
})

// Register a new user
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name, email and password.',
      })
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()

    if (cleanName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be 100 characters or fewer.',
      })
    }

    if (
      cleanEmail.length > 150 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least 8 characters.',
      })
    }

    if (Buffer.byteLength(password, 'utf8') > 72) {
      return res.status(400).json({
        success: false,
        message: 'Password is too long.',
      })
    }

    const [existingUsers] = await db.query(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [cleanEmail]
    )

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [cleanName, cleanEmail, hashedPassword]
    )

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: {
        id: result.insertId,
        name: cleanName,
        email: cleanEmail,
      },
    })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      })
    }

    console.error('Registration API error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
    })
  }
})

// Login an existing user
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your email and password.',
      })
    }

    const cleanEmail = email.trim().toLowerCase()

    const [users] = await db.query(
      'SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1',
      [cleanEmail]
    )

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const user = users[0]
    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Login API error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
    })
  }
})

// Get all active restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const [restaurants] = await db.query(
      'SELECT * FROM restaurants WHERE is_active = TRUE ORDER BY id DESC'
    )

    return res.json({
      success: true,
      count: restaurants.length,
      restaurants,
    })
  } catch (error) {
    console.error('Restaurant API error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurants',
    })
  }
})

// Get all available food items
app.get('/api/foods', async (req, res) => {
  try {
    const [foods] = await db.query(`
      SELECT
        food_items.*,
        restaurants.name AS restaurant_name,
        restaurants.cuisine AS restaurant_cuisine
      FROM food_items
      INNER JOIN restaurants
        ON food_items.restaurant_id = restaurants.id
      WHERE food_items.is_available = TRUE
        AND restaurants.is_active = TRUE
      ORDER BY food_items.id DESC
    `)

    return res.json({
      success: true,
      count: foods.length,
      foods,
    })
  } catch (error) {
    console.error('Food API error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch food items',
    })
  }
})

// Get food items for a specific restaurant
app.get('/api/restaurants/:id/foods', async (req, res) => {
  try {
    const restaurantId = Number(req.params.id)

    if (!Number.isInteger(restaurantId) || restaurantId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid restaurant ID',
      })
    }

    const [restaurants] = await db.query(
      'SELECT id, name FROM restaurants WHERE id = ? AND is_active = TRUE',
      [restaurantId]
    )

    if (restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      })
    }

    const [foods] = await db.query(
      `SELECT * FROM food_items
       WHERE restaurant_id = ? AND is_available = TRUE
       ORDER BY id DESC`,
      [restaurantId]
    )

    return res.json({
      success: true,
      restaurant: restaurants[0],
      count: foods.length,
      foods,
    })
  } catch (error) {
    console.error('Restaurant foods API error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurant food items',
    })
  }
})

// Generate or retrieve saved AI food information
app.post('/api/ai/food-info', async (req, res) => {
  try {
    const { name, description, cuisine } = req.body

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a food name.',
      })
    }

    const foodName = name.trim()

    if (foodName.length > 150) {
      return res.status(400).json({
        success: false,
        message: 'Food name must be 150 characters or fewer.',
      })
    }

    const safeDescription =
      typeof description === 'string'
        ? description.slice(0, 1000)
        : 'Not provided'

    const safeCuisine =
      typeof cuisine === 'string'
        ? cuisine.slice(0, 100)
        : 'Not provided'

    // Check MySQL first
    const [savedRows] = await db.query(
      `SELECT food_name, description, ingredients, nutrition,
              possible_allergens, health_notes
       FROM food_ai_info
       WHERE food_name = ?
       LIMIT 1`,
      [foodName]
    )

    if (savedRows.length > 0) {
      const saved = savedRows[0]

      const parseJson = (value, fallback) => {
        if (value == null) return fallback
        if (typeof value !== 'string') return value

        try {
          return JSON.parse(value)
        } catch {
          return fallback
        }
      }

      return res.json({
        success: true,
        source: 'Saved in database',
        foodInfo: {
          name: saved.food_name,
          description: saved.description || '',
          ingredients: parseJson(saved.ingredients, []),
          nutrition: parseJson(saved.nutrition, {}),
          possibleAllergens: parseJson(
            saved.possible_allergens,
            []
          ),
          healthNotes: parseJson(saved.health_notes, []),
        },
      })
    }

    // Generate new information only when it isn't saved
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Gemini API key is not configured.',
      })
    }

    const prompt = `
You are the food information assistant for Finds.

Generate general information about this dish.

Dish name: ${foodName}
Description: ${safeDescription}
Cuisine: ${safeCuisine}

Return only valid JSON using this exact structure:
{
  "name": "Dish name",
  "description": "Short explanation of the dish",
  "ingredients": ["likely ingredient 1", "likely ingredient 2"],
  "nutrition": {
    "calories": "Estimated calories per serving",
    "protein": "Estimated protein per serving",
    "carbohydrates": "Estimated carbohydrates per serving",
    "fat": "Estimated fat per serving"
  },
  "possibleAllergens": ["possible allergen"],
  "healthNotes": ["relevant health consideration"]
}

Instructions:
- Provide a useful, concise response.
- List common likely ingredients for this type of dish.
- Recipes and portion sizes vary, so nutritional values must be estimates.
- Do not claim these are the restaurant's verified ingredients.
- Mention uncertainty where appropriate.
- Never claim a dish is safe for someone with an allergy.
- Return JSON only, without Markdown formatting.
`

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    })

    if (!response.text) {
      throw new Error('Gemini returned an empty response.')
    }

    const foodInfo = JSON.parse(response.text)

    if (
      !foodInfo ||
      typeof foodInfo !== 'object' ||
      !Array.isArray(foodInfo.ingredients) ||
      !foodInfo.nutrition ||
      typeof foodInfo.nutrition !== 'object' ||
      !Array.isArray(foodInfo.possibleAllergens) ||
      !Array.isArray(foodInfo.healthNotes)
    ) {
      throw new Error('Gemini returned an unexpected response format.')
    }

    // Save generated information to MySQL
    await db.query(
      `INSERT INTO food_ai_info
       (food_name, description, ingredients, nutrition,
        possible_allergens, health_notes)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         description = VALUES(description),
         ingredients = VALUES(ingredients),
         nutrition = VALUES(nutrition),
         possible_allergens = VALUES(possible_allergens),
         health_notes = VALUES(health_notes)`,
      [
        foodName,
        foodInfo.description || '',
        JSON.stringify(foodInfo.ingredients),
        JSON.stringify(foodInfo.nutrition),
        JSON.stringify(foodInfo.possibleAllergens),
        JSON.stringify(foodInfo.healthNotes),
      ]
    )

    return res.json({
      success: true,
      source: 'AI-generated estimate',
      foodInfo: {
        ...foodInfo,
        name: foodName,
      },
    })
  } catch (error) {
    console.error('AI food information error:', error.message)

    return res.status(500).json({
      success: false,
      message:
        'Unable to generate or retrieve food information. Please try again.',
    })
  }
})

// Existing image-generation endpoint kept unchanged
app.post('/api/ai/food-image', async (req, res) => {
  try {
    const { name, description, cuisine } = req.body

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a food name.',
      })
    }

    if (name.trim().length > 150) {
      return res.status(400).json({
        success: false,
        message: 'Food name must be 150 characters or fewer.',
      })
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Gemini API key is not configured.',
      })
    }

    const safeName = name.trim()

    const safeDescription =
      typeof description === 'string'
        ? description.slice(0, 500)
        : safeName

    const safeCuisine =
      typeof cuisine === 'string'
        ? cuisine.slice(0, 100)
        : 'Indian'

    const prompt = `
Generate a realistic, appetizing restaurant food photograph.

Food name: ${safeName}
Description: ${safeDescription}
Cuisine: ${safeCuisine}

Requirements:
- Photorealistic food photography.
- Realistic food textures and natural lighting.
- Attractive restaurant-style plating.
- Clean, tasteful background.
- Show the food clearly and prominently.
- No text, labels, watermarks, or logos.
`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    })

    const parts = response.candidates?.[0]?.content?.parts || []

    const imagePart = parts.find(
      (part) => part.inlineData && part.inlineData.data
    )

    if (!imagePart) {
      const responseText = parts
        .filter((part) => part.text)
        .map((part) => part.text)
        .join(' ')

      throw new Error(
        responseText ||
          'Gemini did not return an image. Check whether image generation is available for your API key.'
      )
    }

    const imageData = imagePart.inlineData.data
    const mimeType = imagePart.inlineData.mimeType || 'image/png'

    const extension =
      mimeType === 'image/jpeg'
        ? 'jpg'
        : mimeType === 'image/webp'
          ? 'webp'
          : 'png'

    const imageBuffer = Buffer.from(imageData, 'base64')

    const safeFilename = safeName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'food'

    const filename = `${safeFilename}-${Date.now()}.${extension}`
    const imagePath = path.join(generatedImagesDir, filename)

    fs.writeFileSync(imagePath, imageBuffer)

    return res.json({
      success: true,
      message: 'Food image generated successfully.',
      foodName: safeName,
      imageUrl: `http://127.0.0.1:${PORT}/generated-images/${filename}`,
    })
  } catch (error) {
    console.error('AI food image error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Unable to generate food image.',
      error: error.message,
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Finds backend running on http://localhost:${PORT}`)
})
