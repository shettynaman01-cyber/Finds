import { useEffect } from 'react'

// Ingredient lists are shown only when the dish has ingredient data or a
// known list below. For dishes without verified data, the modal says so
// rather than guessing ingredients that could be unsafe for allergies.
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

function getIngredients(dish) {
  if (Array.isArray(dish.ingredients) && dish.ingredients.length) return dish.ingredients
  if (typeof dish.ingredients === 'string' && dish.ingredients.trim()) {
    return dish.ingredients.split(',').map((item) => item.trim()).filter(Boolean)
  }
  const key = String(dish.name || '').trim().toLowerCase()
  return knownIngredients[key] || []
}

export default function FoodDetailsModal({ dish, onClose }) {
  const ingredients = getIngredients(dish)

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1200, background: 'rgba(15, 23, 42, 0.68)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="food-details-title"
        style={{
          width: 'min(720px, 100%)', maxHeight: '90vh', overflowY: 'auto', background: '#fff',
          color: '#172033', borderRadius: '20px', boxShadow: '0 24px 80px rgba(0,0,0,.28)',
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={dish.image}
            alt={dish.name}
            style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block', borderRadius: '20px 20px 0 0' }}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close food details"
            style={{ position: 'absolute', top: '14px', right: '14px', width: '40px', height: '40px', border: 0, borderRadius: '50%', background: '#fff', fontSize: '24px', cursor: 'pointer' }}
          >×</button>
        </div>

        <div style={{ padding: '24px' }}>
          <p style={{ margin: '0 0 8px', color: '#2563eb', fontWeight: 700, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            {dish.cuisine || 'Finds'}{dish.category ? ` · ${dish.category}` : ''}
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <h2 id="food-details-title" style={{ margin: '0 0 6px', fontSize: '28px', lineHeight: 1.2 }}>{dish.name}</h2>
              <p style={{ margin: 0, color: '#64748b' }}>{dish.restaurantName || 'Finds restaurant'}</p>
            </div>
            <strong style={{ fontSize: '24px', color: '#166534' }}>₹{Number(dish.price || 0).toFixed(2)}</strong>
          </div>

          {dish.description && <p style={{ margin: '18px 0', color: '#475569', lineHeight: 1.7 }}>{dish.description}</p>}

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '18px', marginTop: '18px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '19px' }}>Ingredients</h3>
            {ingredients.length ? (
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '9px 18px', paddingLeft: '20px', margin: 0 }}>
                {ingredients.map((ingredient, index) => <li key={`${ingredient}-${index}`} style={{ color: '#334155', lineHeight: 1.5 }}>{ingredient}</li>)}
              </ul>
            ) : (
              <p style={{ margin: 0, color: '#64748b', lineHeight: 1.6 }}>
                Ingredient details have not been added for this dish yet. We don’t want to guess, especially because ingredients matter for allergies and dietary needs.
              </p>
            )}
            <p style={{ margin: '16px 0 0', padding: '12px 14px', borderRadius: '10px', background: '#f8fafc', color: '#64748b', fontSize: '13px', lineHeight: 1.6 }}>
              Ingredients and preparation can vary by restaurant. If you have an allergy or dietary restriction, please confirm the exact ingredients with the restaurant before ordering.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{ marginTop: '22px', width: '100%', border: 0, borderRadius: '10px', padding: '13px 18px', background: '#2563eb', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
          >Close details</button>
        </div>
      </section>
    </div>
  )
}
