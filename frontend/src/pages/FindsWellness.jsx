import { useState } from 'react'

const wellnessMeals = [
  {
    id: 901,
    name: 'Overnight Oats Bowl',
    category: 'Breakfast',
    price: 129,
    description: 'Oats, milk, banana and chia seeds for a filling breakfast.',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80',
    goals: ['Weight Loss', 'Balanced Diet', 'Vegetarian'],
    tags: ['Vegetarian', 'Healthy'],
    protein: '6g',
  },
  {
    id: 902,
    name: 'Fresh Garden Salad',
    category: 'Lunch',
    price: 159,
    description: 'Fresh vegetables with a light, refreshing dressing.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    goals: ['Weight Loss', 'Balanced Diet', 'Vegan', 'Vegetarian'],
    tags: ['Vegan', 'Vegetarian', 'Healthy'],
    protein: '5g',
  },
  {
    id: 903,
    name: 'Protein Power Bowl',
    category: 'Lunch',
    price: 229,
    description: 'A filling bowl with chickpeas, vegetables and grains.',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=600&q=80',
    goals: ['Muscle Gain', 'Balanced Diet', 'Vegan', 'Vegetarian'],
    tags: ['Vegan', 'Vegetarian', 'Protein'],
    protein: '18g',
  },
  {
    id: 904,
    name: 'Fruit & Yogurt Bowl',
    category: 'Breakfast',
    price: 139,
    description: 'Seasonal fruit with creamy yogurt and crunchy toppings.',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=600&q=80',
    goals: ['Weight Loss', 'Balanced Diet', 'Vegetarian'],
    tags: ['Vegetarian', 'Healthy'],
    protein: '8g',
  },
  {
    id: 905,
    name: 'Grilled Paneer Bowl',
    category: 'Dinner',
    price: 219,
    description: 'Grilled paneer with vegetables and a wholesome grain base.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
    goals: ['Muscle Gain', 'Balanced Diet', 'Vegetarian'],
    tags: ['Vegetarian', 'Protein'],
    protein: '20g',
  },
  {
    id: 906,
    name: 'Green Smoothie',
    category: 'Beverages',
    price: 119,
    description: 'A refreshing blend of fruit and leafy greens.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
    goals: ['Weight Loss', 'Balanced Diet', 'Vegan', 'Vegetarian'],
    tags: ['Vegan', 'Vegetarian', 'Healthy'],
    protein: '3g',
  },
  {
    id: 907,
    name: 'Chickpea Power Salad',
    category: 'Lunch',
    price: 189,
    description: 'Chickpeas, crunchy vegetables and a lemon dressing.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    goals: ['Muscle Gain', 'Balanced Diet', 'Vegan', 'Vegetarian'],
    tags: ['Vegan', 'Vegetarian', 'Protein'],
    protein: '12g',
  },
  {
    id: 908,
    name: 'Avocado Toast',
    category: 'Breakfast',
    price: 169,
    description: 'Toasted bread topped with avocado and fresh seasoning.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    goals: ['Weight Loss', 'Balanced Diet', 'Vegan', 'Vegetarian'],
    tags: ['Vegan', 'Vegetarian', 'Healthy'],
    protein: '5g',
  },
]

const dietGoals = [
  'All Goals',
  'Weight Loss',
  'Muscle Gain',
  'Balanced Diet',
  'Vegetarian',
  'Vegan',
]

function FindsWellness({ onAddToCart, cart, onChangeQuantity }) {
  const [selectedGoal, setSelectedGoal] = useState('All Goals')
  const [search, setSearch] = useState('')

  const filteredMeals = wellnessMeals.filter((meal) => {
    const matchesGoal =
      selectedGoal === 'All Goals' || meal.goals.includes(selectedGoal)

    const matchesSearch =
      `${meal.name} ${meal.description} ${meal.category} ${meal.tags.join(' ')}`
        .toLowerCase()
        .includes(search.trim().toLowerCase())

    return matchesGoal && matchesSearch
  })

  return (
    <section className="wellness-page">
      <div className="wellness-hero">
        <div className="wellness-hero-copy">
          <span className="wellness-kicker">YOUR WELLNESS JOURNEY</span>
          <h2>Eat well. Feel good. 🌿</h2>
          <p>
            Discover nourishing meals and find food that fits your
            lifestyle, preferences and personal goals.
          </p>
          <div className="wellness-hero-tags">
            <span>🥗 Fresh choices</span>
            <span>🍎 Balanced meals</span>
            <span>💚 Your preferences</span>
          </div>
        </div>
        <div className="wellness-hero-icon">🌱</div>
      </div>

      <div className="wellness-intro">
        <div>
          <p className="eyebrow">PERSONALISE YOUR PLATE</p>
          <h2>What's your wellness goal?</h2>
          <p>Select a goal to discover meals that match your preferences.</p>
        </div>
      </div>

      <div className="wellness-goal-list">
        {dietGoals.map((goal) => (
          <button
            type="button"
            key={goal}
            className={`wellness-goal-chip ${
              selectedGoal === goal ? 'selected' : ''
            }`}
            onClick={() => setSelectedGoal(goal)}
          >
            {goal === 'Weight Loss'
              ? '⚖️ '
              : goal === 'Muscle Gain'
                ? '💪 '
                : goal === 'Balanced Diet'
                  ? '🥗 '
                  : goal === 'Vegetarian'
                    ? '🥦 '
                    : goal === 'Vegan'
                      ? '🌱 '
                      : '✨ '}
            {goal}
          </button>
        ))}
      </div>

      <div className="wellness-search">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Search healthy meals, ingredients or categories..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="wellness-results-heading">
        <div>
          <p className="eyebrow">HANDPICKED FOR YOUR LIFESTYLE</p>
          <h2>
            {selectedGoal === 'All Goals'
              ? 'Explore healthy favourites'
              : `Meals for ${selectedGoal}`}
          </h2>
        </div>
        <span>{filteredMeals.length} meals</span>
      </div>

      <div className="wellness-meal-grid">
        {filteredMeals.map((meal) => {
          const cartId = `Finds Wellness-${meal.id}`
          const cartItem = cart.find((item) => item.cartId === cartId)

          return (
            <article className="wellness-meal-card" key={meal.id}>
              <div className="wellness-meal-image">
                <img src={meal.image} alt={meal.name} loading="lazy" />
                <span className="wellness-meal-label">🌿 Wellness pick</span>
              </div>

              <div className="wellness-meal-content">
                <div className="wellness-meal-tags">
                  {meal.tags.slice(0, 2).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <h3>{meal.name}</h3>
                <p className="wellness-meal-description">
                  {meal.description}
                </p>

                <div className="wellness-meal-meta">
                  <span>🍽️ {meal.category}</span>
                  <span>💪 {meal.protein} protein</span>
                </div>

                <div className="wellness-meal-footer">
                  <strong>₹{meal.price}</strong>

                  {cartItem ? (
                    <div className="quantity-controls">
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(cartId, -1)}
                        aria-label={`Decrease ${meal.name} quantity`}
                      >
                        −
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          onAddToCart(
                            {
                              ...meal,
                              cuisine: 'Wellness',
                            },
                            'Finds Wellness'
                          )
                        }
                        aria-label={`Increase ${meal.name} quantity`}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        onAddToCart(
                          {
                            ...meal,
                            cuisine: 'Wellness',
                          },
                          'Finds Wellness'
                        )
                      }
                    >
                      + Add to cart
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {filteredMeals.length === 0 && (
        <div className="wellness-empty">
          <span>🥑</span>
          <h3>No meals found</h3>
          <p>Try another search or choose a different wellness goal.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedGoal('All Goals')
              setSearch('')
            }}
          >
            Show all meals
          </button>
        </div>
      )}

      <p className="wellness-disclaimer">
        Wellness note: Nutritional values are illustrative estimates.
        Individual dietary needs vary. These recommendations are for food
        discovery, not medical or personalised clinical nutrition advice.
      </p>
    </section>
  )
}

export default FindsWellness