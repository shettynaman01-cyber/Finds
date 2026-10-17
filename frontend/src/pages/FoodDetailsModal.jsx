
import { useEffect, useState } from 'react'

// Existing ingredient data for common dishes.
// Used as a fallback when AI information is unavailable.
const knownIngredients = {
  'idli sambar': ['Rice', 'Urad dal', 'Fenugreek seeds', 'Sambar dal', 'Tamarind', 'Vegetables', 'Sambar spices'],
  'medu vada': ['Urad dal', 'Ginger', 'Green chilli', 'Curry leaves', 'Cumin', 'Salt', 'Oil'],
  'masala dosa': ['Rice', 'Urad dal', 'Potato', 'Onion', 'Mustard seeds', 'Curry leaves', 'Dosa masala'],
  'plain dosa': ['Rice', 'Urad dal', 'Fenugreek seeds', 'Salt'],
  'vegetable biryani': ['Rice', 'Mixed vegetables', 'Onion', 'Yogurt or plant-based alternative', 'Biryani spices', 'Herbs'],
  'chicken biryani': ['Rice', 'Chicken', 'Onion', 'Yogurt', 'Ginger-garlic', 'Biryani spices', 'Herbs'],
  'paneer butter masala': ['Paneer', 'Tomato', 'Butter', 'Cream', 'Onion', 'Ginger-garlic', 'Indian spices'],
  'butter chicken': ['Chicken', 'Tomato', 'Butter', 'Cream', 'Ginger-garlic', 'Tandoori spices'],
  'chole bhature': ['Chickpeas', 'Flour', 'Onion', 'Tomato', 'Ginger', 'Chole spices', 'Oil'],
  'pav bhaji': ['Potatoes', 'Mixed vegetables', 'Tomato', 'Onion', 'Pav bread', 'Butter', 'Pav bhaji masala'],
  'veg fried rice': ['Rice', 'Mixed vegetables', 'Spring onion', 'Soy sauce', 'Garlic', 'Oil'],
  'vegetable noodles': ['Noodles', 'Mixed vegetables', 'Soy sauce', 'Garlic', 'Spring onion', 'Oil'],
  'margherita pizza': ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Basil'],
  'classic cheeseburger': ['Burger bun', 'Patty', 'Cheese', 'Lettuce', 'Tomato', 'Onion', 'Sauce'],
  'french fries': ['Potatoes', 'Oil', 'Salt'],
  'caesar salad': ['Lettuce', 'Croutons', 'Parmesan', 'Caesar dressing'],
  'greek salad': ['Tomato', 'Cucumber', 'Onion', 'Olives', 'Feta cheese', 'Olive oil'],
  'chocolate brownie': ['Chocolate', 'Flour', 'Sugar', 'Butter or oil', 'Cocoa', 'Eggs or substitute'],
  'gulab jamun': ['Milk solids', 'Flour', 'Sugar', 'Cardamom', 'Oil or ghee'],
  'rasgulla': ['Chenna', 'Sugar', 'Water', 'Cardamom'],
  'filter coffee': ['Coffee', 'Milk or alternative', 'Water', 'Sugar (optional)'],
  'masala chai': ['Tea', 'Milk or alternative', 'Water', 'Ginger', 'Cardamom', 'Spices', 'Sugar (optional)'],
  'mango lassi': ['Mango', 'Yogurt', 'Milk or water', 'Sugar (optional)', 'Cardamom (optional)'],
  'lemonade': ['Lemon', 'Water', 'Sugar (optional)', 'Salt (optional)'],
}

function normalizeIngredients(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => typeof item === 'string' ? item.trim() : '')
      .filter(Boolean)
  }

  if (typeof value === 'string' && value.trim()) {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }

  return []
}

function getIngredients(dish) {
  const provided = normalizeIngredients(dish?.ingredients)

  if (provided.length) return provided

  const key = String(dish?.name || '').trim().toLowerCase()
  return knownIngredients[key] || []
}

export default function FoodDetailsModal({ dish, onClose }) {
  const [foodInfo, setFoodInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  useEffect(() => {
    if (!dish?.name) return

    const controller = new AbortController()

    async function fetchFoodInfo() {
      setFoodInfo(null)
      setAiError('')
      setLoading(true)

      try {
        const response = await fetch(
          'http://localhost:5000/api/ai/food-info',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: dish.name,
              description: dish.description || '',
              cuisine: dish.cuisine || '',
            }),
            signal: controller.signal,
          }
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Could not load AI food information.'
          )
        }

        setFoodInfo(data.foodInfo || null)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Food information error:', error)
          setAiError(
            error.message || 'Unable to load food information.'
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchFoodInfo()

    return () => controller.abort()
  }, [dish?.name, dish?.description, dish?.cuisine])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const ingredients =
    normalizeIngredients(foodInfo?.ingredients).length
      ? normalizeIngredients(foodInfo.ingredients)
      : getIngredients(dish)

  const nutrition = foodInfo?.nutrition
  const allergens = Array.isArray(foodInfo?.possibleAllergens)
    ? foodInfo.possibleAllergens
    : []
  const healthNotes = Array.isArray(foodInfo?.healthNotes)
    ? foodInfo.healthNotes
    : []

  return (
    <div
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        background: 'rgba(15, 23, 42, 0.68)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="food-details-title"
        style={{
          width: 'min(720px, 100%)',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#fff',
          color: '#172033',
          borderRadius: '20px',
          boxShadow: '0 24px 80px rgba(0,0,0,.28)',
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={dish.image}
            alt={dish.name}
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
              display: 'block',
              borderRadius: '20px 20px 0 0',
            }}
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close food details"
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              width: '40px',
              height: '40px',
              border: 0,
              borderRadius: '50%',
              background: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          <p
            style={{
              margin: '0 0 8px',
              color: '#2563eb',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            {dish.cuisine || 'Finds'}
            {dish.category ? ` · ${dish.category}` : ''}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h2
                id="food-details-title"
                style={{
                  margin: '0 0 6px',
                  fontSize: '28px',
                  lineHeight: 1.2,
                }}
              >
                {dish.name}
              </h2>

              <p style={{ margin: 0, color: '#64748b' }}>
                {dish.restaurantName || 'Finds restaurant'}
              </p>
            </div>

            <strong style={{ fontSize: '24px', color: '#166534' }}>
              ₹{Number(dish.price || 0).toFixed(2)}
            </strong>
          </div>

          {dish.description && (
            <p
              style={{
                margin: '18px 0',
                color: '#475569',
                lineHeight: 1.7,
              }}
            >
              {dish.description}
            </p>
          )}

          {/* Ingredients */}
          <div
            style={{
              borderTop: '1px solid #e2e8f0',
              paddingTop: '18px',
              marginTop: '18px',
            }}
          >
            <h3 style={{ margin: '0 0 12px', fontSize: '19px' }}>
              Ingredients
            </h3>

            {loading && ingredients.length === 0 && (
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>
                Loading ingredient information...
              </p>
            )}

            {ingredients.length > 0 && (
              <ul
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(170px, 1fr))',
                  gap: '9px 18px',
                  paddingLeft: '20px',
                  margin: 0,
                }}
              >
                {ingredients.map((ingredient, index) => (
                  <li
                    key={`${ingredient}-${index}`}
                    style={{ color: '#334155', lineHeight: 1.5 }}
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            )}

            {!loading && ingredients.length === 0 && (
              <p style={{ color: '#64748b', lineHeight: 1.6 }}>
                {aiError
                  ? 'Ingredient information could not be loaded. Please try again later.'
                  : 'Ingredient details are not available for this dish yet.'}
              </p>
            )}

            {aiError && ingredients.length > 0 && (
              <p style={{ color: '#64748b', fontSize: '13px', marginTop: '10px' }}>
                Showing available ingredient information. AI details could not
                be loaded at this time.
              </p>
            )}
          </div>

          {/* Estimated nutrition */}
          {nutrition && (
            <div
              style={{
                borderTop: '1px solid #e2e8f0',
                paddingTop: '18px',
                marginTop: '20px',
              }}
            >
              <h3 style={{ margin: '0 0 12px', fontSize: '19px' }}>
                Estimated Nutrition
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '10px',
                }}
              >
                {[
                  ['Calories', nutrition.calories],
                  ['Protein', nutrition.protein],
                  ['Carbohydrates', nutrition.carbohydrates],
                  ['Fat', nutrition.fat],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      padding: '12px',
                      background: '#f8fafc',
                      borderRadius: '10px',
                    }}
                  >
                    <p style={{ margin: '0 0 5px', color: '#64748b', fontSize: '12px' }}>
                      {label}
                    </p>
                    <strong style={{ color: '#172033', fontSize: '14px' }}>
                      {value ?? 'N/A'}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Possible allergens */}
          {allergens.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: '19px' }}>
                Possible Allergens
              </h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.7 }}>
                {allergens.join(', ')}
              </p>
            </div>
          )}

          {/* Health notes */}
          {healthNotes.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: '19px' }}>
                Health Notes
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: 1.7 }}>
                {healthNotes.map((note, index) => (
                  <li key={`${note}-${index}`}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          <p
            style={{
              margin: '20px 0 0',
              padding: '12px 14px',
              borderRadius: '10px',
              background: '#f8fafc',
              color: '#64748b',
              fontSize: '13px',
              lineHeight: 1.6,
            }}
          >
            AI-generated ingredients and nutrition are estimates, not verified
            restaurant data. Actual preparation may vary. If you have an
            allergy or dietary restriction, confirm the exact ingredients with
            the restaurant before ordering.
          </p>

          <button
            type="button"
            onClick={onClose}
            style={{
              marginTop: '22px',
              width: '100%',
              border: 0,
              borderRadius: '10px',
              padding: '13px 18px',
              background: '#2563eb',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Close details
          </button>
        </div>
      </section>
    </div>
  )
}
