
import { useState } from 'react'
import '../App.css'

const categories = [
  'All Food', 'Breakfast', 'Lunch', 'Dinner',
  'Snacks', 'Desserts', 'Sweets', 'Beverages',
]

const cuisines = [
  {
    name: 'Indian',
    description: 'Rich flavours and spices',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Chinese',
    description: 'Noodles, rice and more',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Nepali',
    description: 'Momos and traditional food',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Italian',
    description: 'Pizza and pasta',
    image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Japanese',
    description: 'Sushi and ramen',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Mexican',
    description: 'Tacos and burritos',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
  },
]

const restaurants = [
  {
    id: 1,
    name: 'Spice Garden',
    cuisine: 'Indian',
    description: 'Traditional Indian meals and curries',
    rating: '4.5',
    deliveryTime: '25–35 min',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
    menu: [
      { id: 101, name: 'Veg Biryani', category: 'Lunch', price: 199, image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80', description: 'Fragrant rice with vegetables and spices.' },
      { id: 102, name: 'Masala Dosa', category: 'Breakfast', price: 99, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', description: 'Crispy dosa with spiced potato filling.' },
      { id: 103, name: 'Paneer Butter Masala', category: 'Dinner', price: 239, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80', description: 'Paneer in creamy tomato gravy.' },
      { id: 104, name: 'Gulab Jamun', category: 'Sweets', price: 79, image: 'https://images.unsplash.com/photo-1666190092159-3f3e7a1c4a4b?auto=format&fit=crop&w=600&q=80', description: 'Classic Indian sweets in sugar syrup.' },
    ],
  },
  {
    id: 2,
    name: 'Pizza House',
    cuisine: 'Italian',
    description: 'Freshly baked pizza and pasta',
    rating: '4.4',
    deliveryTime: '20–30 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    menu: [
      { id: 201, name: 'Margherita Pizza', category: 'Dinner', price: 249, image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=600&q=80', description: 'Tomato sauce, mozzarella and herbs.' },
      { id: 202, name: 'Creamy Pasta', category: 'Dinner', price: 219, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80', description: 'Pasta tossed in a creamy sauce.' },
      { id: 203, name: 'Garlic Bread', category: 'Snacks', price: 119, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=600&q=80', description: 'Toasted bread with garlic and herbs.' },
      { id: 204, name: 'Chocolate Cake', category: 'Desserts', price: 129, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', description: 'Rich chocolate cake.' },
    ],
  },
  {
    id: 3,
    name: 'Wok Express',
    cuisine: 'Chinese',
    description: 'Noodles, rice and Asian favourites',
    rating: '4.3',
    deliveryTime: '25–40 min',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=700&q=80',
    menu: [
      { id: 301, name: 'Hakka Noodles', category: 'Lunch', price: 179, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', description: 'Stir-fried noodles and vegetables.' },
      { id: 302, name: 'Veg Fried Rice', category: 'Lunch', price: 169, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80', description: 'Fried rice with vegetables and seasoning.' },
      { id: 303, name: 'Spring Rolls', category: 'Snacks', price: 129, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', description: 'Crispy rolls with vegetable filling.' },
      { id: 304, name: 'Chilli Paneer', category: 'Dinner', price: 199, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80', description: 'Paneer tossed in a spicy sauce.' },
    ],
  },
  {
    id: 4,
    name: 'Momo Corner',
    cuisine: 'Nepali',
    description: 'Momos and Himalayan favourites',
    rating: '4.6',
    deliveryTime: '20–30 min',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80',
    menu: [
      { id: 401, name: 'Veg Momos', category: 'Snacks', price: 149, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80', description: 'Steamed vegetable dumplings.' },
      { id: 402, name: 'Fried Momos', category: 'Snacks', price: 169, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80', description: 'Crispy dumplings served with dipping sauce.' },
      { id: 403, name: 'Noodle Soup', category: 'Dinner', price: 189, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', description: 'Warm noodle soup with vegetables.' },
      { id: 404, name: 'Masala Chai', category: 'Beverages', price: 40, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=600&q=80', description: 'Tea brewed with aromatic spices.' },
    ],
  },
  {
    id: 5,
    name: 'Tokyo Bowl',
    cuisine: 'Japanese',
    description: 'Ramen and Japanese-inspired dishes',
    rating: '4.5',
    deliveryTime: '30–40 min',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80',
    menu: [
      { id: 501, name: 'Japanese Ramen', category: 'Dinner', price: 299, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', description: 'Noodles served in savoury broth.' },
      { id: 502, name: 'Vegetable Sushi', category: 'Lunch', price: 249, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80', description: 'Japanese-style rolls with vegetables.' },
      { id: 503, name: 'Miso Soup', category: 'Snacks', price: 129, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', description: 'A comforting savoury soup.' },
      { id: 504, name: 'Ice Cream', category: 'Desserts', price: 119, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', description: 'A creamy chilled dessert.' },
    ],
  },
  {
    id: 6,
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    description: 'Tacos, burritos and bold flavours',
    rating: '4.2',
    deliveryTime: '25–35 min',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=700&q=80',
    menu: [
      { id: 601, name: 'Veg Tacos', category: 'Snacks', price: 189, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80', description: 'Tortillas with vegetables and fresh toppings.' },
      { id: 602, name: 'Veg Burrito Bowl', category: 'Lunch', price: 229, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', description: 'Rice, beans and fresh vegetables.' },
      { id: 603, name: 'Quesadilla', category: 'Dinner', price: 199, image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80', description: 'Grilled tortilla with melted cheese.' },
      { id: 604, name: 'Lemonade', category: 'Beverages', price: 59, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=600&q=80', description: 'Refreshing citrus drink.' },
    ],
  },
]

function Home() {
  const [activeCategory, setActiveCategory] = useState('All Food')
  const [activeCuisine, setActiveCuisine] = useState('All')
  const [search, setSearch] = useState('')
  const [restaurantSearch, setRestaurantSearch] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [cart, setCart] = useState([])

  function selectCategory(category) {
    setActiveCategory(category)
    setActiveCuisine('All')
    setSelectedRestaurant(null)
  }

  function selectCuisine(cuisine) {
    setActiveCuisine(activeCuisine === cuisine ? 'All' : cuisine)
    setActiveCategory('All Food')
    setSelectedRestaurant(null)
  }

  function addToCart(dish, restaurantName) {
    const cartId = `${restaurantName}-${dish.id}`

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.cartId === cartId)

      if (existingItem) {
        return currentCart.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...currentCart,
        { ...dish, cartId, restaurantName, quantity: 1 },
      ]
    })
  }

  function changeQuantity(cartId, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const allDishes = restaurants.flatMap((restaurant) =>
    restaurant.menu.map((dish) => ({
      ...dish,
      cuisine: restaurant.cuisine,
      restaurantName: restaurant.name,
    }))
  )

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(restaurantSearch.trim().toLowerCase())
  )

  const filteredDishes = allDishes.filter((dish) => {
    const term = search.trim().toLowerCase()

    const matchesSearch =
      dish.name.toLowerCase().includes(term) ||
      dish.cuisine.toLowerCase().includes(term) ||
      dish.category.toLowerCase().includes(term) ||
      dish.description.toLowerCase().includes(term) ||
      dish.restaurantName.toLowerCase().includes(term)

    const matchesCategory =
      activeCategory === 'All Food' || dish.category === activeCategory

    const matchesCuisine =
      activeCuisine === 'All' || dish.cuisine === activeCuisine

    return matchesSearch && matchesCategory && matchesCuisine
  })

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  function showCart() {
    if (cart.length === 0) {
      alert('Your cart is empty.')
      return
    }

    const details = cart
      .map(
        (item) =>
          `${item.name} (${item.restaurantName}) × ${item.quantity} — ₹${item.price * item.quantity}`
      )
      .join('\n')

    alert(`${details}\n\nTotal: ₹${cartTotal}\n\nOrdering and checkout will be connected later.`)
  }

  return (
    <div className="home-page">
      <aside className="sidebar">
        <h2 className="sidebar-logo">f<span>.</span>finds</h2>
        <p className="sidebar-label">DISCOVER</p>

        <nav className="category-list">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${activeCategory === category && !selectedRestaurant ? 'active' : ''}`}
              onClick={() => selectCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <p>Good food. Good mood.</p>
        </div>
      </aside>

      <main className="home-main">
        <header className="home-header">
          <div>
            <p className="eyebrow">YOUR FOOD DISCOVERY SPACE</p>
            <h1>Discover something delicious.</h1>
            <p className="header-description">Find the food you're craving today.</p>
          </div>

          <button className="cart-button" onClick={showCart}>
            🛒 Cart ({cartCount})
          </button>
        </header>

        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search dishes, cuisines or restaurants..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setSelectedRestaurant(null)
            }}
          />
        </div>

        <section className="content-section" id="explore-restaurants">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIND YOUR NEXT FAVOURITE</p>
              <h2>Explore restaurants</h2>
            </div>
            {selectedRestaurant && (
              <button
                className="category-button"
                onClick={() => setSelectedRestaurant(null)}
              >
                ← All restaurants
              </button>
            )}
          </div>

          {!selectedRestaurant ? (
            <>
              <div className="search-box restaurant-search">
                <span>⌕</span>
                <input
                  type="text"
                  placeholder="Search restaurants by name..."
                  value={restaurantSearch}
                  onChange={(event) => setRestaurantSearch(event.target.value)}
                />
              </div>

              <div className="restaurant-grid">
                {filteredRestaurants.map((restaurant) => (
                  <button
                    key={restaurant.id}
                    className="restaurant-card"
                    onClick={() => {
                      setSelectedRestaurant(restaurant)
                      setSearch('')
                    }}
                  >
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="restaurant-image"
                    />
                    <div className="restaurant-info">
                      <h3>{restaurant.name}</h3>
                      <p>{restaurant.description}</p>
                      <div className="restaurant-meta">
                        <span>⭐ {restaurant.rating}</span>
                        <span>{restaurant.cuisine}</span>
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <strong>View menu →</strong>
                    </div>
                  </button>
                ))}
              </div>

              {filteredRestaurants.length === 0 && (
                <p className="empty-results">
                  No restaurants found. Try another name.
                </p>
              )}
            </>
          ) : (
            <>
              <div className="restaurant-menu-heading">
                <img
                  src={selectedRestaurant.image}
                  alt={selectedRestaurant.name}
                />
                <div>
                  <p className="eyebrow">{selectedRestaurant.cuisine} CUISINE</p>
                  <h2>{selectedRestaurant.name}</h2>
                  <p>{selectedRestaurant.description}</p>
                  <p>⭐ {selectedRestaurant.rating} · {selectedRestaurant.deliveryTime}</p>
                </div>
              </div>

              <h3>Menu</h3>

              <div className="dish-grid">
                {selectedRestaurant.menu.map((dish) => {
                  const cartId = `${selectedRestaurant.name}-${dish.id}`
                  const cartItem = cart.find((item) => item.cartId === cartId)

                  return (
                    <article className="dish-card" key={dish.id}>
                      <div className="dish-image">
                        <img src={dish.image} alt={dish.name} />
                      </div>
                      <div className="dish-details">
                        <span className="dish-cuisine">{dish.category}</span>
                        <h3>{dish.name}</h3>
                        <p>{dish.description}</p>
                        <div className="dish-footer">
                          <strong>₹{dish.price}</strong>
                          {cartItem ? (
                            <div className="quantity-controls">
                              <button onClick={() => changeQuantity(cartId, -1)}>−</button>
                              <span>{cartItem.quantity}</span>
                              <button onClick={() => addToCart(dish, selectedRestaurant.name)}>+</button>
                            </div>
                          ) : (
                            <button onClick={() => addToCart(dish, selectedRestaurant.name)}>
                              + Add
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </>
          )}
        </section>

        {!selectedRestaurant && (
          <>
            <section className="content-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">EXPLORE THE WORLD OF FOOD</p>
                  <h2>Explore cuisines</h2>
                </div>
              </div>

              <div className="cuisine-grid">
                {cuisines.map((cuisine) => (
                  <button
                    key={cuisine.name}
                    className={`cuisine-card ${activeCuisine === cuisine.name ? 'selected' : ''}`}
                    onClick={() => selectCuisine(cuisine.name)}
                  >
                    <img className="cuisine-image" src={cuisine.image} alt={`${cuisine.name} cuisine`} />
                    <div className="cuisine-card-info">
                      <strong>{cuisine.name}</strong>
                      <span className="cuisine-description">{cuisine.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="content-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">HANDPICKED FOR YOU</p>
                  <h2>
                    {activeCategory !== 'All Food'
                      ? activeCategory
                      : activeCuisine !== 'All'
                        ? `${activeCuisine} dishes`
                        : search.trim()
                          ? 'Search results'
                          : 'Popular dishes'}
                  </h2>
                </div>
                <span className="dish-count">
                  {filteredDishes.length} {filteredDishes.length === 1 ? 'dish' : 'dishes'}
                </span>
              </div>

              {(activeCategory !== 'All Food' || activeCuisine !== 'All' || search.trim()) && (
                <button
                  className="category-button"
                  onClick={() => {
                    setActiveCategory('All Food')
                    setActiveCuisine('All')
                    setSearch('')
                  }}
                >
                  Clear filters ×
                </button>
              )}

              {filteredDishes.length > 0 ? (
                <div className="dish-grid">
                  {filteredDishes.map((dish) => {
                    const cartId = `${dish.restaurantName}-${dish.id}`
                    const cartItem = cart.find((item) => item.cartId === cartId)

                    return (
                      <article className="dish-card" key={cartId}>
                        <div className="dish-image">
                          <img src={dish.image} alt={dish.name} />
                        </div>
                        <div className="dish-details">
                          <span className="dish-cuisine">
                            {dish.cuisine} · {dish.category}
                          </span>
                          <h3>{dish.name}</h3>
                          <p>{dish.description}</p>
                          <p className="dish-restaurant-name">{dish.restaurantName}</p>
                          <div className="dish-footer">
                            <strong>₹{dish.price}</strong>
                            {cartItem ? (
                              <div className="quantity-controls">
                                <button onClick={() => changeQuantity(cartId, -1)}>−</button>
                                <span>{cartItem.quantity}</span>
                                <button onClick={() => addToCart(dish, dish.restaurantName)}>+</button>
                              </div>
                            ) : (
                              <button onClick={() => addToCart(dish, dish.restaurantName)}>
                                + Add
                              </button>
                            )}
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              ) : (
                <p className="empty-results">No dishes found. Try another search or clear your filters.</p>
              )}
            </section>
          </>
        )}

        <footer className="home-footer">
          Made with love for food lovers. <strong>.finds</strong>
        </footer>
      </main>
    </div>
  )
}

export default Home