
const db = require('./db')

async function testConnection() {
  try {
    const connection = await db.getConnection()
    console.log('Finds MySQL connected successfully!')
    connection.release()
  } catch (error) {
    console.error('MySQL connection failed:', error.message)
  } finally {
    await db.end()
  }
}

testConnection()
