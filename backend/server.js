
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const db = require('./db')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Home route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Finds backend is running'
  })
})

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Finds API is working'
  })
})

// Get all active restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const [restaurants] = await db.query(
      'SELECT * FROM restaurants WHERE is_active = TRUE ORDER BY id DESC'
    )

    res.json({
      success: true,
      count: restaurants.length,
      restaurants
    })
  } catch (error) {
    console.error('Restaurant API error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurants'
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

    res.json({
      success: true,
      count: foods.length,
      foods
    })
  } catch (error) {
    console.error('Food API error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch food items'
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
        message: 'Invalid restaurant ID'
      })
    }

    const [restaurants] = await db.query(
      'SELECT id, name FROM restaurants WHERE id = ? AND is_active = TRUE',
      [restaurantId]
    )

    if (restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      })
    }

    const [foods] = await db.query(
      `SELECT * FROM food_items
       WHERE restaurant_id = ? AND is_available = TRUE
       ORDER BY id DESC`,
      [restaurantId]
    )

    res.json({
      success: true,
      restaurant: restaurants[0],
      count: foods.length,
      foods
    })
  } catch (error) {
    console.error('Restaurant foods API error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurant food items'
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Finds backend running on http://localhost:${PORT}`)
})
