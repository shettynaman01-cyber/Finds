
import { useEffect, useState } from 'react'
import '../App.css'
import '../profile-styles.css'
import FindsWellness from './FindsWellness'
import FoodCustomizationModal from './FoodCustomizationModal'
import FoodDetailsModal from './FoodDetailsModal'

const categories = [
  'All Food', 'Breakfast', 'Lunch', 'Dinner',
  'Snacks', 'Desserts', 'Sweets', 'Beverages',
]

const cuisines = [
  { name: 'Indian', description: 'Rich flavours and spices', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80' },
  { name: 'Chinese', description: 'Noodles, rice and more', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80' },
  { name: 'Nepali', description: 'Momos and traditional food', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Italian', description: 'Pizza and pasta', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=600&q=80' },
  { name: 'Japanese', description: 'Sushi and ramen', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Mexican', description: 'Tacos and burritos', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80' },
]

const foodImages = {
  Breakfast: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
  Lunch: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
  Dinner: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80',
  Snacks: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  Desserts: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
  Sweets: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
  Beverages: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
}

function makeDish(id, name, category, price, description) {
  return { id, name, category, price, description, image: foodImages[category] }
}

const fallbackRestaurants = [
  {
    id: 1, name: 'Spice Garden', cuisine: 'Indian',
    description: 'Traditional Indian meals and curries',
    rating: '4.5', deliveryTime: '25–35 min',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
    menu: [
      makeDish(101, 'Masala Dosa', 'Breakfast', 99, 'Crispy dosa with spiced potato filling.'),
      makeDish(107, 'Idli Sambar', 'Breakfast', 69, 'Soft idlis served with sambar.'),
      makeDish(108, 'Poha', 'Breakfast', 59, 'Flattened rice with spices and herbs.'),
      makeDish(109, 'Aloo Paratha', 'Breakfast', 89, 'Stuffed flatbread served with curd.'),
      makeDish(110, 'Upma', 'Breakfast', 59, 'Warm semolina breakfast with vegetables.'),
      makeDish(102, 'Veg Biryani', 'Lunch', 199, 'Fragrant rice cooked with vegetables and spices.'),
      makeDish(111, 'Paneer Biryani', 'Lunch', 229, 'Spiced rice with paneer and aromatic herbs.'),
      makeDish(112, 'Chole Bhature', 'Lunch', 149, 'Spicy chickpeas with fried bread.'),
      makeDish(113, 'Dal Rice', 'Lunch', 129, 'Comforting lentils served with rice.'),
      makeDish(103, 'Paneer Butter Masala', 'Dinner', 239, 'Paneer in creamy tomato gravy.'),
      makeDish(114, 'Palak Paneer', 'Dinner', 219, 'Paneer cooked in spinach gravy.'),
      makeDish(115, 'Veg Pulao', 'Dinner', 159, 'Flavourful rice with mixed vegetables.'),
      makeDish(104, 'Samosa', 'Snacks', 49, 'Crispy pastry filled with spiced potatoes.'),
      makeDish(116, 'Paneer Tikka', 'Snacks', 159, 'Grilled paneer with aromatic spices.'),
      makeDish(117, 'Aloo Tikki', 'Snacks', 69, 'Crispy potato patties with chutney.'),
      makeDish(105, 'Gulab Jamun', 'Sweets', 79, 'Classic Indian sweet in sugar syrup.'),
      makeDish(118, 'Rasgulla', 'Sweets', 69, 'Soft cottage-cheese balls in light syrup.'),
      makeDish(119, 'Jalebi', 'Sweets', 59, 'Crispy, syrup-soaked traditional sweet.'),
      makeDish(120, 'Kaju Katli', 'Sweets', 129, 'Rich cashew-based Indian sweet.'),
      makeDish(121, 'Kheer', 'Desserts', 89, 'Creamy rice pudding with cardamom.'),
      makeDish(106, 'Masala Chai', 'Beverages', 40, 'Tea brewed with aromatic spices.'),
      makeDish(122, 'Cold Coffee', 'Beverages', 99, 'Chilled coffee with a creamy finish.'),
    ],
  },
  {
    id: 2, name: 'Pizza House', cuisine: 'Italian',
    description: 'Freshly baked pizza and pasta',
    rating: '4.4', deliveryTime: '20–30 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    menu: [
      makeDish(201, 'Pancakes', 'Breakfast', 149, 'Fluffy pancakes for a delicious morning.'),
      makeDish(207, 'Cheese Omelette', 'Breakfast', 129, 'A fluffy omelette with melted cheese.'),
      makeDish(208, 'Veg Toast', 'Breakfast', 89, 'Toasted bread topped with fresh vegetables.'),
      makeDish(202, 'Creamy Pasta', 'Lunch', 219, 'Pasta tossed in a creamy sauce.'),
      makeDish(209, 'Arrabbiata Pasta', 'Lunch', 199, 'Pasta with a spicy tomato sauce.'),
      makeDish(210, 'Pesto Pasta', 'Lunch', 229, 'Pasta tossed in basil pesto.'),
      makeDish(203, 'Margherita Pizza', 'Dinner', 249, 'Tomato sauce, mozzarella and herbs.'),
      makeDish(211, 'Farmhouse Pizza', 'Dinner', 299, 'Pizza topped with vegetables and cheese.'),
      makeDish(212, 'Four Cheese Pizza', 'Dinner', 329, 'A rich pizza topped with four cheeses.'),
      makeDish(204, 'Garlic Bread', 'Snacks', 119, 'Toasted bread with garlic and herbs.'),
      makeDish(213, 'Cheese Sticks', 'Snacks', 139, 'Golden baked sticks filled with cheese.'),
      makeDish(205, 'Chocolate Cake', 'Desserts', 129, 'Rich and moist chocolate cake.'),
      makeDish(214, 'Tiramisu', 'Desserts', 159, 'Coffee-flavoured Italian dessert.'),
      makeDish(215, 'Cheesecake', 'Desserts', 169, 'Creamy cheesecake with a biscuit base.'),
      makeDish(216, 'Chocolate Brownie', 'Desserts', 119, 'A rich chocolate brownie.'),
      makeDish(206, 'Lemonade', 'Beverages', 59, 'Refreshing citrus drink.'),
      makeDish(217, 'Iced Tea', 'Beverages', 69, 'Chilled tea with a refreshing taste.'),
    ],
  },
  {
    id: 3, name: 'Wok Express', cuisine: 'Chinese',
    description: 'Noodles, rice and Asian favourites',
    rating: '4.3', deliveryTime: '25–40 min',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=700&q=80',
    menu: [
      makeDish(301, 'Veg Sandwich', 'Breakfast', 89, 'Fresh sandwich with vegetables.'),
      makeDish(302, 'Hakka Noodles', 'Lunch', 179, 'Stir-fried noodles and vegetables.'),
      makeDish(306, 'Schezwan Noodles', 'Lunch', 189, 'Spicy noodles tossed in Schezwan sauce.'),
      makeDish(307, 'Chilli Paneer', 'Lunch', 199, 'Paneer tossed with peppers and spicy sauce.'),
      makeDish(303, 'Veg Fried Rice', 'Dinner', 169, 'Fried rice with vegetables and seasoning.'),
      makeDish(308, 'Manchurian Rice', 'Dinner', 199, 'Fried rice served with vegetable Manchurian.'),
      makeDish(309, 'Chilli Garlic Noodles', 'Dinner', 189, 'Noodles with garlic and a spicy kick.'),
      makeDish(304, 'Spring Rolls', 'Snacks', 129, 'Crispy rolls with vegetable filling.'),
      makeDish(310, 'Crispy Corn', 'Snacks', 119, 'Crunchy corn tossed with seasoning.'),
      makeDish(311, 'Chilli Potato', 'Snacks', 139, 'Crispy potatoes tossed in tangy sauce.'),
      makeDish(305, 'Ice Cream', 'Desserts', 99, 'A cool and creamy dessert.'),
      makeDish(312, 'Mango Ice Cream', 'Desserts', 109, 'Sweet and fruity mango ice cream.'),
      makeDish(313, 'Chocolate Sundae', 'Desserts', 139, 'Ice cream topped with chocolate sauce.'),
      makeDish(314, 'Lemon Soda', 'Beverages', 49, 'A fizzy lemon drink.'),
    ],
  },
  {
    id: 4, name: 'Momo Corner', cuisine: 'Nepali',
    description: 'Momos and Himalayan favourites',
    rating: '4.6', deliveryTime: '20–30 min',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80',
    menu: [
      makeDish(401, 'Veg Momos', 'Snacks', 149, 'Steamed vegetable dumplings.'),
      makeDish(402, 'Fried Momos', 'Lunch', 169, 'Crispy dumplings with dipping sauce.'),
      makeDish(403, 'Noodle Soup', 'Dinner', 189, 'Warm noodle soup with vegetables.'),
      makeDish(404, 'Sweet Yogurt', 'Desserts', 89, 'A smooth and creamy sweet treat.'),
      makeDish(405, 'Chocolate Momo', 'Sweets', 119, 'A sweet dumpling-inspired treat.'),
    ],
  },
  {
    id: 5, name: 'Tokyo Bowl', cuisine: 'Japanese',
    description: 'Ramen and Japanese-inspired dishes',
    rating: '4.5', deliveryTime: '30–40 min',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80',
    menu: [
      makeDish(501, 'Fruit Bowl', 'Breakfast', 129, 'Fresh seasonal fruit.'),
      makeDish(502, 'Vegetable Sushi', 'Lunch', 249, 'Japanese-style rolls with vegetables.'),
      makeDish(503, 'Japanese Ramen', 'Dinner', 299, 'Noodles served in savoury broth.'),
      makeDish(504, 'Miso Soup', 'Snacks', 129, 'A comforting savoury soup.'),
      makeDish(505, 'Mochi', 'Sweets', 119, 'Soft, sweet Japanese rice cakes.'),
      makeDish(506, 'Matcha Latte', 'Beverages', 149, 'Creamy green tea latte.'),
    ],
  },
  {
    id: 6, name: 'Taco Fiesta', cuisine: 'Mexican',
    description: 'Tacos, burritos and bold flavours',
    rating: '4.2', deliveryTime: '25–35 min',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=700&q=80',
    menu: [
      makeDish(601, 'Veg Tacos', 'Snacks', 189, 'Tortillas with vegetables and fresh toppings.'),
      makeDish(602, 'Veg Burrito Bowl', 'Lunch', 229, 'Rice, beans and fresh vegetables.'),
      makeDish(603, 'Quesadilla', 'Dinner', 199, 'Grilled tortilla with melted cheese.'),
      makeDish(604, 'Brownie', 'Desserts', 109, 'A rich chocolate brownie.'),
      makeDish(605, 'Nachos', 'Snacks', 129, 'Crunchy nachos served with toppings.'),
      makeDish(606, 'Churros', 'Sweets', 119, 'Sweet fried pastry dusted with sugar.'),
      makeDish(607, 'Fruit Smoothie', 'Beverages', 99, 'A refreshing blended fruit drink.'),
    ],
  },
]

const foodPreferenceOptions = [
  'Vegetarian', 'Non-vegetarian', 'Vegan', 'Indian',
  'Chinese', 'Italian', 'Spicy food', 'Healthy food',
]

const vouchers = {
  FINDS10: {
    code: 'FINDS10', type: 'percentage', value: 10,
    minimum: 199, maxDiscount: 100,
    description: '10% off orders of ₹199 or more',
  },
  SWEET50: {
    code: 'SWEET50', type: 'fixed', value: 50,
    minimum: 299,
    description: '₹50 off orders of ₹299 or more',
  },
}

function Home() {
  const [restaurants, setRestaurants] = useState(fallbackRestaurants)
  const [isLoadingFood, setIsLoadingFood] = useState(true)
  const [foodLoadError, setFoodLoadError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadFoodData() {
      try {
        setIsLoadingFood(true)
        setFoodLoadError('')

        const [foodsResponse, restaurantsResponse] = await Promise.all([
          fetch('http://localhost:5000/api/foods'),
          fetch('http://localhost:5000/api/restaurants'),
        ])

        if (!foodsResponse.ok) {
          throw new Error('Could not load food items from the server.')
        }

        const foodsData = await foodsResponse.json()
        const restaurantsData = restaurantsResponse.ok
          ? await restaurantsResponse.json()
          : { restaurants: [] }

        const foods = Array.isArray(foodsData.foods) ? foodsData.foods : []
        const restaurantRows = Array.isArray(restaurantsData.restaurants)
          ? restaurantsData.restaurants
          : []

        const mapFood = (food, restaurant) => ({
          id: Number(food.id),
          restaurantId: Number(food.restaurant_id ?? restaurant?.id),
          name: food.name || 'Untitled dish',
          category: food.category || 'Other',
          price: Number(food.price) || 0,
          description: food.description || 'A delicious choice from Finds.',
          image:
            food.image_url ||
            food.image ||
            foodImages[food.category] ||
            foodImages.Lunch,
          isVegetarian:
            food.is_vegetarian == null
              ? null
              : Boolean(Number(food.is_vegetarian)),
          cuisine: food.restaurant_cuisine || restaurant?.cuisine || 'Other',
          restaurantName: food.restaurant_name || restaurant?.name || 'Finds Restaurant',
        })

        const mappedRestaurants = restaurantRows.map((restaurant) => {
          const restaurantFoods = foods
            .filter((food) => Number(food.restaurant_id) === Number(restaurant.id))
            .map((food) => mapFood(food, restaurant))

          return {
            id: Number(restaurant.id),
            name: restaurant.name || 'Restaurant',
            cuisine: restaurant.cuisine || restaurant.category || 'Various',
            description:
              restaurant.description ||
              `Discover delicious dishes from ${restaurant.name || 'this restaurant'}.`,
            rating: restaurant.rating ?? restaurant.average_rating ?? 'New',
            deliveryTime: restaurant.delivery_time || restaurant.deliveryTime || '30–40 min',
            image:
              restaurant.image_url ||
              restaurant.image ||
              restaurant.photo_url ||
              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
            menu: restaurantFoods,
          }
        })

        const groupedRestaurants = []
        const restaurantMap = new Map()

        foods.forEach((food) => {
          const id = Number(food.restaurant_id)
          if (!id) return

          if (!restaurantMap.has(id)) {
            const matchingRestaurant = restaurantRows.find(
              (restaurant) => Number(restaurant.id) === id
            )

            const row = matchingRestaurant || {
              id,
              name: food.restaurant_name || 'Finds Restaurant',
              cuisine: food.restaurant_cuisine || 'Various',
            }

            const grouped = {
              id,
              name: row.name || food.restaurant_name || 'Finds Restaurant',
              cuisine: row.cuisine || food.restaurant_cuisine || 'Various',
              description:
                row.description ||
                `Discover delicious dishes from ${row.name || food.restaurant_name || 'this restaurant'}.`,
              rating: row.rating ?? row.average_rating ?? 'New',
              deliveryTime: row.delivery_time || row.deliveryTime || '30–40 min',
              image:
                row.image_url ||
                row.image ||
                row.photo_url ||
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
              menu: [],
            }

            restaurantMap.set(id, grouped)
            groupedRestaurants.push(grouped)
          }

          const restaurant = restaurantMap.get(id)
          restaurant.menu.push(mapFood(food, restaurant))
        })

        if (isMounted) {
          setRestaurants(
            mappedRestaurants.length > 0 ? mappedRestaurants : groupedRestaurants
          )

          if (foods.length === 0) {
            setFoodLoadError('No available food items were returned by the database.')
          }
        }
      } catch (error) {
        console.error('Finds food loading error:', error)

        if (isMounted) {
          setFoodLoadError(
            'Could not connect to the food database. Showing sample food for now. Check that the backend is running.'
          )
        }
      } finally {
        if (isMounted) setIsLoadingFood(false)
      }
    }

    loadFoodData()

    return () => {
      isMounted = false
    }
  }, [])

  const [activeCategory, setActiveCategory] = useState('All Food')
  const [activeCuisine, setActiveCuisine] = useState('All')

  const [search, setSearch] = useState('')
  const [dietFilter, setDietFilter] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  const [appliedFilters, setAppliedFilters] = useState({
    search: '',
    dietFilter: 'all',
    minPrice: '',
    maxPrice: '',
    sortBy: 'popular',
  })

  const [restaurantSearch, setRestaurantSearch] = useState('')
  const [activeView, setActiveView] = useState('food')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [selectedDish, setSelectedDish] = useState(null)
  const [dishModalType, setDishModalType] = useState('customize')
  const [cart, setCart] = useState([])
  const [voucherCode, setVoucherCode] = useState('')
  const [appliedVoucher, setAppliedVoucher] = useState(null)
  const [voucherMessage, setVoucherMessage] = useState('')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileBeforeEdit, setProfileBeforeEdit] = useState(null)

  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem('findsProfile')

      return savedProfile
        ? JSON.parse(savedProfile)
        : {
            name: localStorage.getItem('name') || '',
            email: localStorage.getItem('email') || '',
            phone: '',
            address: '',
            city: '',
            pincode: '',
            preferences: ['Vegetarian'],
          }
    } catch {
      return {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        preferences: ['Vegetarian'],
      }
    }
  })

  function openProfile() {
    setActiveView('profile')
    setSelectedRestaurant(null)
    setIsEditingProfile(false)
  }

  function openWellness() {
    setActiveView('wellness')
    setSelectedRestaurant(null)
  }

  function updateProfileField(field, value) {
    setProfile((current) => ({ ...current, [field]: value }))
  }

  function toggleFoodPreference(preference) {
    setProfile((current) => {
      const preferences = current.preferences || []

      return {
        ...current,
        preferences: preferences.includes(preference)
          ? preferences.filter((item) => item !== preference)
          : [...preferences, preference],
      }
    })
  }

  function saveProfile() {
    try {
      localStorage.setItem('findsProfile', JSON.stringify(profile))
      setIsEditingProfile(false)
      setProfileBeforeEdit(null)
      alert('Your profile has been saved on this device.')
    } catch {
      alert('Could not save your profile. Please try again.')
    }
  }

  function cancelProfileEdit() {
    if (profileBeforeEdit) setProfile(profileBeforeEdit)
    setProfileBeforeEdit(null)
    setIsEditingProfile(false)
  }

  function selectCategory(category) {
    setActiveCategory(category)
    setActiveCuisine('All')
    setActiveView('food')
    setSelectedRestaurant(null)
    setSelectedDish(null)
    setSearch('')

    setAppliedFilters((current) => ({
      ...current,
      search: '',
    }))
  }

  function selectCuisine(cuisine) {
    const nextCuisine = activeCuisine === cuisine ? 'All' : cuisine

    setActiveCuisine(nextCuisine)
    setActiveCategory('All Food')
    setActiveView('food')
    setSelectedRestaurant(null)
    setSelectedDish(null)
    setSearch('')

    setAppliedFilters((current) => ({
      ...current,
      search: '',
    }))
  }

  function openRestaurants() {
    setActiveView('restaurants')
    setSelectedRestaurant(null)
    setSelectedDish(null)
    setRestaurantSearch('')
  }

  function addToCart(dish, restaurantName, quantity = 1) {
    const customizationKey = dish.customizationKey || ''
    const cartId = customizationKey
      ? `${restaurantName}-${dish.id}-${customizationKey}`
      : `${restaurantName}-${dish.id}`

    setCart((current) => {
      const existing = current.find((item) => item.cartId === cartId)

      if (existing) {
        return current.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [
        ...current,
        {
          ...dish,
          cartId,
          restaurantName,
          quantity,
        },
      ]
    })
  }

  function changeQuantity(cartId, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeCartItem(cartId) {
    setCart((current) => current.filter((item) => item.cartId !== cartId))
    setAppliedVoucher(null)
    setVoucherCode('')
    setVoucherMessage('')
  }

  const allDishes = restaurants.flatMap((restaurant) =>
    restaurant.menu.map((dish) => ({
      ...dish,
      cuisine: restaurant.cuisine,
      restaurantName: restaurant.name,
    }))
  )

  const filteredRestaurants = restaurants.filter((restaurant) =>
    `${restaurant.name} ${restaurant.cuisine} ${restaurant.description}`
      .toLowerCase()
      .includes(restaurantSearch.trim().toLowerCase())
  )

  const filteredDishes = allDishes
    .filter((dish) => {
      const term = appliedFilters.search.trim().toLowerCase()

      const searchableText = [
        dish.name,
        dish.cuisine,
        dish.category,
        dish.description,
        dish.restaurantName,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch = !term || searchableText.includes(term)

      const matchesCategory =
        activeCategory === 'All Food' || dish.category === activeCategory

      const matchesCuisine =
        activeCuisine === 'All' ||
        dish.cuisine.toLowerCase().includes(activeCuisine.toLowerCase())

      const matchesDiet =
        appliedFilters.dietFilter === 'all' ||
        (appliedFilters.dietFilter === 'vegetarian' &&
          dish.isVegetarian === true) ||
        (appliedFilters.dietFilter === 'non-vegetarian' &&
          dish.isVegetarian === false)

      const price = Number(dish.price)

      const matchesMinPrice =
        appliedFilters.minPrice === '' ||
        price >= Number(appliedFilters.minPrice)

      const matchesMaxPrice =
        appliedFilters.maxPrice === '' ||
        price <= Number(appliedFilters.maxPrice)

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCuisine &&
        matchesDiet &&
        matchesMinPrice &&
        matchesMaxPrice
      )
    })
    .sort((a, b) => {
      if (appliedFilters.sortBy === 'price-low') {
        return Number(a.price) - Number(b.price)
      }

      if (appliedFilters.sortBy === 'price-high') {
        return Number(b.price) - Number(a.price)
      }

      if (appliedFilters.sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }

      return 0
    })

  function applyFoodFilters() {
    const minimum = minPrice === '' ? '' : Number(minPrice)
    const maximum = maxPrice === '' ? '' : Number(maxPrice)

    if (
      (minimum !== '' && minimum < 0) ||
      (maximum !== '' && maximum < 0)
    ) {
      alert('Price cannot be negative.')
      return
    }

    if (minimum !== '' && maximum !== '' && minimum > maximum) {
      alert('Minimum price cannot be greater than maximum price.')
      return
    }

    setAppliedFilters({
      search: search.trim(),
      dietFilter,
      minPrice,
      maxPrice,
      sortBy,
    })

    setActiveView('search-results')
    setSelectedRestaurant(null)
    setSelectedDish(null)
  }

  function clearFoodFilters() {
    setSearch('')
    setActiveCategory('All Food')
    setActiveCuisine('All')
    setDietFilter('all')
    setMinPrice('')
    setMaxPrice('')
    setSortBy('popular')
    setShowFilters(false)
    setSelectedDish(null)
    setSelectedRestaurant(null)

    setAppliedFilters({
      search: '',
      dietFilter: 'all',
      minPrice: '',
      maxPrice: '',
      sortBy: 'popular',
    })

    setActiveView('food')
  }

  function editFoodSearch() {
    setSearch(appliedFilters.search)
    setDietFilter(appliedFilters.dietFilter)
    setMinPrice(appliedFilters.minPrice)
    setMaxPrice(appliedFilters.maxPrice)
    setSortBy(appliedFilters.sortBy)
    setShowFilters(true)
    setActiveView('food')
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  )

  const validVoucher =
    appliedVoucher && cartTotal >= appliedVoucher.minimum && cartTotal > 0
      ? appliedVoucher
      : null

  const discount = validVoucher
    ? Math.min(
        validVoucher.type === 'percentage'
          ? Math.round((cartTotal * validVoucher.value) / 100)
          : validVoucher.value,
        validVoucher.maxDiscount ?? Infinity,
        cartTotal
      )
    : 0

  const finalTotal = Math.max(0, cartTotal - discount)

  function showCart() {
    setActiveView('cart')
    setSelectedRestaurant(null)
    setSelectedDish(null)
  }

  function applyVoucher() {
    const code = voucherCode.trim().toUpperCase()
    const voucher = vouchers[code]

    if (cart.length === 0) {
      setAppliedVoucher(null)
      setVoucherMessage('Add food to your cart before applying a voucher.')
      return
    }

    if (!voucher) {
      setAppliedVoucher(null)
      setVoucherMessage('Invalid voucher code. Please try again.')
      return
    }

    if (cartTotal < voucher.minimum) {
      setAppliedVoucher(null)
      setVoucherMessage(
        `Add items worth ₹${voucher.minimum - cartTotal} more to use ${code}.`
      )
      return
    }

    setAppliedVoucher(voucher)
    setVoucherMessage(`${code} applied successfully!`)
  }

  function removeVoucher() {
    setAppliedVoucher(null)
    setVoucherCode('')
    setVoucherMessage('Voucher removed.')
  }

  function renderDishCard(dish) {
    const cartId = `${dish.restaurantName}-${dish.id}`
    const cartItem = cart.find((item) => item.cartId === cartId)

    return (
      <article className="dish-card" key={cartId}>
        <div
          className="dish-image"
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedDish(dish)
            setDishModalType('details')
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setSelectedDish(dish)
              setDishModalType('details')
            }
          }}
        >
          <img src={dish.image} alt={dish.name} />
        </div>

        <div className="dish-details">
          <span className="dish-cuisine">
            {dish.cuisine} · {dish.category}
          </span>

          <h3
            onClick={() => {
              setSelectedDish(dish)
              setDishModalType('details')
            }}
            style={{ cursor: 'pointer' }}
          >
            {dish.name}
          </h3>

          <p>{dish.description}</p>
          <p className="dish-restaurant-name">{dish.restaurantName}</p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            <button
              type="button"
              className="category-button"
              onClick={() => {
                setSelectedDish(dish)
                setDishModalType('details')
              }}
            >
              View Details
            </button>

            <button
              type="button"
              className="category-button"
              onClick={() => {
                setSelectedDish(dish)
                setDishModalType('customize')
              }}
            >
              Customize
            </button>
          </div>

          <div className="dish-footer">
            <strong>₹{dish.price}</strong>

            {cartItem ? (
              <div className="quantity-controls">
                <button
                  onClick={() => changeQuantity(cartId, -1)}
                  aria-label={`Decrease ${dish.name} quantity`}
                >
                  −
                </button>
                <span>{cartItem.quantity}</span>
                <button
                  onClick={() => addToCart(dish, dish.restaurantName)}
                  aria-label={`Increase ${dish.name} quantity`}
                >
                  +
                </button>
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
  }

  const isMainFoodPage =
    activeView === 'food' &&
    activeCategory === 'All Food' &&
    activeCuisine === 'All' &&
    !appliedFilters.search.trim()

  const pageTitle =
    activeView === 'cart'
      ? 'Your Cart'
      : activeView === 'profile'
        ? 'My Profile'
        : activeView === 'wellness'
          ? 'Finds Wellness'
          : activeView === 'search-results'
            ? 'Search Results'
            : activeView === 'restaurants'
              ? selectedRestaurant
                ? selectedRestaurant.name
                : 'Explore restaurants'
              : activeCategory !== 'All Food'
                ? `${activeCategory} Options`
                : activeCuisine !== 'All'
                  ? `${activeCuisine} Dishes`
                  : 'Discover something delicious.'

  const pageDescription =
    activeView === 'cart'
      ? 'Review your items, apply a voucher and check your total.'
      : activeView === 'profile'
        ? 'Manage your personal details, delivery address and food preferences.'
        : activeView === 'wellness'
          ? 'Discover healthy meals and explore food for your lifestyle.'
          : activeView === 'search-results'
            ? 'Here are the dishes that match your submitted search and filters.'
            : activeView === 'restaurants'
              ? selectedRestaurant
                ? selectedRestaurant.description
                : 'Find restaurants, cafes and your next favourite meal.'
              : activeCategory !== 'All Food'
                ? `Explore delicious ${activeCategory.toLowerCase()} options.`
                : 'Find the food you are craving today.'

  return (
    <div className="home-page">
      <aside className="sidebar">
        <h2 className="sidebar-logo">f<span>.</span>finds</h2>
        <p className="sidebar-label">DISCOVER</p>

        <nav className="category-list">
          <button
            className={`category-button ${activeView === 'profile' ? 'active' : ''}`}
            onClick={openProfile}
          >
            My Profile
          </button>

          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${
                activeView === 'food' &&
                !selectedRestaurant &&
                activeCategory === category
                  ? 'active'
                  : ''
              }`}
              onClick={() => selectCategory(category)}
            >
              {category}
            </button>
          ))}

          <button
            className={`category-button ${activeView === 'restaurants' ? 'active' : ''}`}
            onClick={openRestaurants}
          >
            Explore restaurants
          </button>

          <button
            className={`category-button ${activeView === 'wellness' ? 'active' : ''}`}
            onClick={openWellness}
          >
            Finds Wellness
          </button>
        </nav>

        <div className="sidebar-bottom">
          <p>Good food. Good mood.</p>
        </div>
      </aside>

      <main className="home-main">
        <header className="home-header">
          <div>
            <p className="eyebrow">YOUR FOOD DISCOVERY SPACE</p>
            <h1>{pageTitle}</h1>
            <p className="header-description">{pageDescription}</p>
          </div>

          <button className="cart-button" onClick={showCart}>
            🛒 Cart ({cartCount})
          </button>
        </header>

        {foodLoadError && (
          <p className="empty-results" role="status">{foodLoadError}</p>
        )}

        {isLoadingFood && (
          <p className="empty-results" role="status">
            Loading food and restaurants from Finds...
          </p>
        )}

        {selectedDish && dishModalType === 'details' && (
          <FoodDetailsModal
            dish={selectedDish}
            onClose={() => setSelectedDish(null)}
          />
        )}

        {selectedDish && dishModalType === 'customize' && (
          <FoodCustomizationModal
            dish={selectedDish}
            onClose={() => setSelectedDish(null)}
            onAddToCart={(dish, quantity) =>
              addToCart(dish, selectedDish.restaurantName, quantity)
            }
          />
        )}

        {activeView === 'wellness' ? (
          <FindsWellness
            cart={cart}
            onAddToCart={addToCart}
            onChangeQuantity={changeQuantity}
          />
        ) : activeView === 'profile' ? (
          <section className="content-section profile-page">
            <div className="profile-welcome-card">
              <div className="profile-avatar">
                {profile.name.trim()
                  ? profile.name.trim().charAt(0).toUpperCase()
                  : 'U'}
              </div>

              <div className="profile-welcome-copy">
                <p className="eyebrow">YOUR FINDS ACCOUNT</p>
                <h2>{profile.name.trim() || 'Welcome to Finds'}</h2>
                <p>
                  Keep your details up to date for a smoother food delivery
                  experience.
                </p>
              </div>

              {!isEditingProfile && (
                <button
                  className="profile-edit-button"
                  onClick={() => {
                    setProfileBeforeEdit({ ...profile })
                    setIsEditingProfile(true)
                  }}
                >
                  ✎ Edit profile
                </button>
              )}
            </div>

            <div className="profile-layout">
              <div className="profile-main-column">
                <section className="profile-card">
                  <div className="profile-card-heading">
                    <div>
                      <span className="profile-icon">♙</span>
                      <h2>Personal Information</h2>
                    </div>
                    <span className="profile-card-note">
                      {isEditingProfile ? 'Editing details' : 'Your account details'}
                    </span>
                  </div>

                  <div className="profile-fields-grid">
                    <label className="profile-field">
                      <span>Full name</span>
                      <input
                        value={profile.name}
                        onChange={(event) => updateProfileField('name', event.target.value)}
                        placeholder="Enter your full name"
                        readOnly={!isEditingProfile}
                      />
                    </label>

                    <label className="profile-field">
                      <span>Email address</span>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(event) => updateProfileField('email', event.target.value)}
                        placeholder="Enter your email address"
                        readOnly={!isEditingProfile}
                      />
                    </label>

                    <label className="profile-field">
                      <span>Phone number</span>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(event) => updateProfileField('phone', event.target.value)}
                        placeholder="Enter your phone number"
                        readOnly={!isEditingProfile}
                      />
                    </label>
                  </div>
                </section>

                <section className="profile-card">
                  <div className="profile-card-heading">
                    <div>
                      <span className="profile-icon">⌖</span>
                      <h2>Delivery Address</h2>
                    </div>
                    <span className="profile-card-note">Where should we deliver?</span>
                  </div>

                  <div className="profile-fields-grid">
                    <label className="profile-field profile-field-wide">
                      <span>House number, street and area</span>
                      <input
                        value={profile.address}
                        onChange={(event) => updateProfileField('address', event.target.value)}
                        placeholder="Enter your complete address"
                        readOnly={!isEditingProfile}
                      />
                    </label>

                    <label className="profile-field">
                      <span>City</span>
                      <input
                        value={profile.city}
                        onChange={(event) => updateProfileField('city', event.target.value)}
                        placeholder="Enter your city"
                        readOnly={!isEditingProfile}
                      />
                    </label>

                    <label className="profile-field">
                      <span>PIN code</span>
                      <input
                        inputMode="numeric"
                        maxLength={6}
                        value={profile.pincode}
                        onChange={(event) =>
                          updateProfileField(
                            'pincode',
                            event.target.value.replace(/\D/g, '').slice(0, 6)
                          )
                        }
                        placeholder="6-digit PIN code"
                        readOnly={!isEditingProfile}
                      />
                    </label>
                  </div>
                </section>

                <section className="profile-card">
                  <div className="profile-card-heading">
                    <div>
                      <span className="profile-icon">♡</span>
                      <h2>Food Preferences</h2>
                    </div>
                    <span className="profile-card-note">
                      Personalise your discovery
                    </span>
                  </div>

                  <p className="profile-section-description">
                    Choose the food types and cuisines you usually enjoy.
                  </p>

                  <div className="food-preference-list">
                    {foodPreferenceOptions.map((preference) => (
                      <button
                        type="button"
                        key={preference}
                        disabled={!isEditingProfile}
                        className={`food-preference-chip ${
                          (profile.preferences || []).includes(preference)
                            ? 'selected'
                            : ''
                        }`}
                        onClick={() => toggleFoodPreference(preference)}
                      >
                        {(profile.preferences || []).includes(preference) ? '✓ ' : '+ '}
                        {preference}
                      </button>
                    ))}
                  </div>

                  {!isEditingProfile && (
                    <p className="profile-help-text">
                      Select Edit profile to change your preferences.
                    </p>
                  )}
                </section>

                {isEditingProfile && (
                  <div className="profile-save-actions">
                    <button className="profile-cancel-button" onClick={cancelProfileEdit}>
                      Cancel
                    </button>
                    <button className="profile-save-button" onClick={saveProfile}>
                      Save changes
                    </button>
                  </div>
                )}
              </div>

              <aside className="profile-side-column">
                <section className="finds-wallet-card">
                  <div className="wallet-title-row">
                    <span className="wallet-symbol">₹</span>
                    <div>
                      <p>YOUR REWARDS</p>
                      <h2>Finds Wallet</h2>
                    </div>
                  </div>

                  <p className="wallet-balance-label">Available balance</p>
                  <p className="wallet-balance">₹0.00</p>
                  <p className="wallet-description">
                    Your wallet balance and eligible rewards will appear here.
                  </p>
                  <div className="wallet-divider" />

                  <div className="wallet-voucher-row">
                    <div className="voucher-icon">%</div>
                    <div className="wallet-voucher-copy">
                      <h3>Vouchers & offers</h3>
                      <p>Find discounts for your next order</p>
                    </div>
                  </div>

                  <button
                    className="wallet-voucher-button"
                    onClick={() =>
                      alert(
                        'Your vouchers and offers will be available here once offers are connected to Finds.'
                      )
                    }
                  >
                    View vouchers <span>→</span>
                  </button>

                  <p className="wallet-small-note">
                    Wallet payments and vouchers will be connected later.
                  </p>
                </section>

                <section className="profile-card support-card">
                  <div className="profile-card-heading">
                    <div>
                      <span className="profile-icon">?</span>
                      <h2>Help & Support</h2>
                    </div>
                  </div>

                  <button
                    className="support-link"
                    onClick={() =>
                      alert('Contact Us will be connected to Finds customer support soon.')
                    }
                  >
                    <span className="support-link-icon">✉</span>
                    <span className="support-link-copy">
                      <strong>Contact Us</strong>
                      <small>Questions or feedback? We can help.</small>
                    </span>
                    <span className="support-arrow">→</span>
                  </button>

                  <button
                    className="support-link"
                    onClick={() =>
                      alert(
                        'The customer helpline number will be added when Finds support is set up.'
                      )
                    }
                  >
                    <span className="support-link-icon">☎</span>
                    <span className="support-link-copy">
                      <strong>Customer Helpline</strong>
                      <small>Get help with your account or orders.</small>
                    </span>
                    <span className="support-arrow">→</span>
                  </button>

                  <p className="support-note">
                    Support contact details will be added before launch.
                  </p>
                </section>
              </aside>
            </div>
          </section>
        ) : activeView === 'cart' ? (
          <section className="content-section cart-page">
            {cart.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Discover something delicious and add it to your cart.</p>
                <button
                  className="cart-continue-button"
                  onClick={() => selectCategory('All Food')}
                >
                  Explore food
                </button>
              </div>
            ) : (
              <div className="cart-layout">
                <div className="cart-items-panel">
                  <div className="section-heading">
                    <h2>Your selected items</h2>
                    <span className="dish-count">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  {cart.map((item) => (
                    <article className="cart-item" key={item.cartId}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{item.restaurantName}</p>
                        <strong>₹{item.price}</strong>

                        {item.customization && (
                          <p className="cart-item-customization">
                            <strong>Customization:</strong> {item.customization}
                          </p>
                        )}

                        <div className="quantity-controls">
                          <button
                            onClick={() => changeQuantity(item.cartId, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => changeQuantity(item.cartId, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-end">
                        <strong>₹{Number(item.price) * item.quantity}</strong>
                        <button
                          className="cart-remove-button"
                          onClick={() => removeCartItem(item.cartId)}
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}

                  <button
                    className="cart-continue-button"
                    onClick={() => selectCategory('All Food')}
                  >
                    ← Continue shopping
                  </button>
                </div>

                <aside className="cart-summary">
                  <h2>Bill summary</h2>

                  <div className="cart-voucher">
                    <h3>₹ Finds Wallet · Vouchers</h3>
                    <p>Choose a sample offer or enter a voucher code.</p>

                    <button
                      className="cart-voucher-option"
                      onClick={() => {
                        setVoucherCode('FINDS10')
                        setVoucherMessage('')
                      }}
                    >
                      <strong>FINDS10</strong>
                      <span>10% off · Min. order ₹199</span>
                    </button>

                    <button
                      className="cart-voucher-option"
                      onClick={() => {
                        setVoucherCode('SWEET50')
                        setVoucherMessage('')
                      }}
                    >
                      <strong>SWEET50</strong>
                      <span>₹50 off · Min. order ₹299</span>
                    </button>

                    <form
                      className="cart-voucher-form"
                      onSubmit={(event) => {
                        event.preventDefault()
                        applyVoucher()
                      }}
                    >
                      <input
                        type="text"
                        value={voucherCode}
                        onChange={(event) => setVoucherCode(event.target.value)}
                        placeholder="Enter voucher code"
                        aria-label="Voucher code"
                      />
                      <button type="submit">Apply</button>
                    </form>

                    {voucherMessage && (
                      <p
                        className={`cart-voucher-message ${
                          validVoucher ? 'success' : ''
                        }`}
                      >
                        {voucherMessage}
                      </p>
                    )}

                    {appliedVoucher && (
                      <button className="cart-remove-button" onClick={removeVoucher}>
                        Remove voucher
                      </button>
                    )}
                  </div>

                  <div className="cart-bill-row">
                    <span>Subtotal ({cartCount} items)</span>
                    <strong>₹{cartTotal}</strong>
                  </div>
                  <div className="cart-bill-row">
                    <span>Voucher discount</span>
                    <strong className="cart-discount">−₹{discount}</strong>
                  </div>
                  <div className="cart-bill-row cart-final-total">
                    <span>Total amount</span>
                    <strong>₹{finalTotal}</strong>
                  </div>

                  <button
                    className="cart-checkout-button"
                    onClick={() =>
                      alert(
                        `Your cart total is ₹${finalTotal}. Order placement and payment will be connected later.`
                      )
                    }
                  >
                    Proceed to checkout →
                  </button>

                  <p className="cart-checkout-note">
                    Payment and order placement are not connected yet.
                  </p>
                </aside>
              </div>
            )}
          </section>
        ) : activeView === 'restaurants' ? (
          <section className="content-section">
            {selectedRestaurant ? (
              <>
                <button
                  className="category-button"
                  onClick={() => setSelectedRestaurant(null)}
                >
                  ← Back to restaurants
                </button>

                <div className="restaurant-menu-heading">
                  <img src={selectedRestaurant.image} alt={selectedRestaurant.name} />
                  <div>
                    <p className="eyebrow">{selectedRestaurant.cuisine} CUISINE</p>
                    <h2>{selectedRestaurant.name}</h2>
                    <p>{selectedRestaurant.description}</p>
                    <p>
                      ⭐ {selectedRestaurant.rating} · {selectedRestaurant.deliveryTime}
                    </p>
                  </div>
                </div>

                <div className="section-heading">
                  <h2>Restaurant menu</h2>
                  <span className="dish-count">
                    {selectedRestaurant.menu.length} dishes
                  </span>
                </div>

                <div className="dish-grid">
                  {selectedRestaurant.menu.map((dish) =>
                    renderDishCard({
                      ...dish,
                      cuisine: selectedRestaurant.cuisine,
                      restaurantName: selectedRestaurant.name,
                    })
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">FIND YOUR NEXT FAVOURITE</p>
                    <h2>Restaurants, cafes and more</h2>
                  </div>
                </div>

                <div className="search-box restaurant-search">
                  <span>⌕</span>
                  <input
                    type="text"
                    placeholder="Search restaurants, cafes or cuisines..."
                    value={restaurantSearch}
                    onChange={(event) => setRestaurantSearch(event.target.value)}
                  />
                </div>

                <div className="restaurant-grid">
                  {filteredRestaurants.map((restaurant) => (
                    <button
                      key={restaurant.id}
                      className="restaurant-card"
                      onClick={() => setSelectedRestaurant(restaurant)}
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
                    No restaurants found. Try another search.
                  </p>
                )}
              </>
            )}
          </section>
        ) : activeView === 'search-results' ? (
          <section className="content-section search-results-page">
            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR SEARCH, YOUR CHOICES</p>
                <h2>
                  {appliedFilters.search
                    ? `Results for "${appliedFilters.search}"`
                    : 'Dishes matching your filters'}
                </h2>
                <p>
                  {appliedFilters.dietFilter !== 'all'
                    ? `Diet: ${
                        appliedFilters.dietFilter === 'vegetarian'
                          ? 'Vegetarian'
                          : 'Non-vegetarian'
                      } · `
                    : ''}
                  {appliedFilters.minPrice !== ''
                    ? `Min: ₹${appliedFilters.minPrice} · `
                    : ''}
                  {appliedFilters.maxPrice !== ''
                    ? `Max: ₹${appliedFilters.maxPrice} · `
                    : ''}
                  {appliedFilters.sortBy === 'price-low'
                    ? 'Sorted by lowest price'
                    : appliedFilters.sortBy === 'price-high'
                      ? 'Sorted by highest price'
                      : appliedFilters.sortBy === 'name'
                        ? 'Sorted by name'
                        : 'Default order'}
                </p>
              </div>

              <span className="dish-count">
                {filteredDishes.length}{' '}
                {filteredDishes.length === 1 ? 'dish found' : 'dishes found'}
              </span>
            </div>

            <div className="food-filter-actions" style={{ marginBottom: '24px' }}>
              <button
                type="button"
                className="clear-filters-button"
                onClick={editFoodSearch}
              >
                ← Edit search
              </button>

              <button
                type="button"
                className="clear-filters-button"
                onClick={() => selectCategory('All Food')}
              >
                Back to discover
              </button>

              <button
                type="button"
                className="clear-filters-button"
                onClick={clearFoodFilters}
              >
                Clear all filters <span>×</span>
              </button>
            </div>

            {filteredDishes.length > 0 ? (
              <div className="dish-grid">
                {filteredDishes.map((dish) => renderDishCard(dish))}
              </div>
            ) : (
              <div className="empty-results">
                <h3>No matching dishes found</h3>
                <p>
                  Try another dish name, change your dietary preference, or
                  increase your price range to discover more food.
                </p>
                <button
                  type="button"
                  className="clear-filters-button"
                  onClick={editFoodSearch}
                >
                  Change search filters
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder={`Search ${
                  activeCategory === 'All Food'
                    ? 'dishes, cuisines or restaurants'
                    : activeCategory.toLowerCase() + ' dishes'
                }...`}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') applyFoodFilters()
                }}
              />
            </div>
            

            {/* Updated Finds food search and filters */}
            <section className="food-filter-section">
              <div className="food-filter-header">
                <div>
                  <p className="food-filter-eyebrow">
                    PERSONALIZED FOOD DISCOVERY
                  </p>

                  <h2>Find your perfect meal</h2>

                  <p>
                    Choose your preferences and discover food made for your cravings.
                  </p>
                </div>

                <button
                  type="button"
                  className="hide-filters-button"
                  onClick={() => setShowFilters((current) => !current)}
                  aria-expanded={showFilters}
                >
                  <span>{showFilters ? '−' : '+'}</span>
                  {showFilters ? 'Hide filters' : 'Filters'}
                </button>
              </div>

              {showFilters && (
                <div className="food-filter-fields">
                  <div className="food-filter-field">
                    <label htmlFor="food-diet-filter">
                      Dietary preference
                    </label>
                    <select
                      id="food-diet-filter"
                      value={dietFilter}
                      onChange={(event) => setDietFilter(event.target.value)}
                    >
                      <option value="all">All dietary types</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="non-vegetarian">Non-vegetarian</option>
                    </select>
                  </div>

                  <div className="food-filter-field">
                    <label htmlFor="food-min-price">
                      Minimum price (₹)
                    </label>
                    <input
                      id="food-min-price"
                      type="number"
                      min="0"
                      placeholder="No minimum"
                      value={minPrice}
                      onChange={(event) => setMinPrice(event.target.value)}
                    />
                  </div>

                  <div className="food-filter-field">
                    <label htmlFor="food-max-price">
                      Maximum price (₹)
                    </label>
                    <input
                      id="food-max-price"
                      type="number"
                      min="0"
                      placeholder="No maximum"
                      value={maxPrice}
                      onChange={(event) => setMaxPrice(event.target.value)}
                    />
                  </div>

                  <div className="food-filter-field">
                    <label htmlFor="food-sort-filter">
                      Sort results
                    </label>
                    <select
                      id="food-sort-filter"
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                    >
                      <option value="popular">Default order</option>
                      <option value="price-low">Price: low to high</option>
                      <option value="price-high">Price: high to low</option>
                      <option value="name">Name: A–Z</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="food-filter-actions">
                <button
                  type="button"
                  className="search-dishes-button"
                  onClick={applyFoodFilters}
                >
                  <span className="search-button-icon">⌕</span>
                  <span>Search dishes</span>
                  <span className="search-button-arrow">→</span>
                </button>

                <button
                  type="button"
                  className="clear-filters-button"
                  onClick={clearFoodFilters}
                >
                  Clear filters <span>×</span>
                </button>
              </div>

              <p className="filter-helper-text">
                Your preferences will be applied when you search.
              </p>
            </section>

            {isMainFoodPage && (
              <section className="finds-discover-hero">
                <div className="finds-hero-content">
                  <span className="finds-hero-badge">
                    ✨ YOUR NEXT FAVOURITE MEAL
                  </span>

                  <h2>
                    Good food.
                    <br />
                    <span>Great mood.</span>
                  </h2>

                  <p>
                    Explore amazing cuisines, discover local favourites,
                    and find something delicious for every craving.
                  </p>

                  <div className="finds-hero-actions">
                    <button
                      type="button"
                      className="finds-hero-primary"
                      onClick={() => {
                        setActiveCategory('All Food')
                        setActiveCuisine('All')
                        setSearch('')
                        setAppliedFilters((current) => ({
                          ...current,
                          search: '',
                        }))
                      }}
                    >
                      Explore food <span>→</span>
                    </button>

                    <button
                      type="button"
                      className="finds-hero-secondary"
                      onClick={openRestaurants}
                    >
                      Find restaurants
                    </button>
                  </div>

                  <div className="finds-hero-note">
                    <span>🍕</span>
                    <span>Cravings welcome. Deliciousness guaranteed.</span>
                  </div>
                </div>

                <div className="finds-hero-visual">
                  <img
                    src="https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1000&q=85"
                    alt="A delicious spread of freshly prepared food"
                  />

                  <div className="finds-hero-floating-card">
                    <span className="finds-floating-icon">😋</span>
                    <div>
                      <strong>Made for your cravings</strong>
                      <span>Discover your next favourite</span>
                    </div>
                  </div>

                  <span className="finds-hero-decoration finds-decoration-one">✦</span>
                  <span className="finds-hero-decoration finds-decoration-two">✳</span>
                </div>
              </section>
            )}

            {isMainFoodPage && (
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
                      className={`cuisine-card ${
                        activeCuisine === cuisine.name ? 'selected' : ''
                      }`}
                      onClick={() => selectCuisine(cuisine.name)}
                    >
                      <img
                        className="cuisine-image"
                        src={cuisine.image}
                        alt={`${cuisine.name} cuisine`}
                      />

                      <div className="cuisine-card-info">
                        <strong>{cuisine.name}</strong>
                        <span className="cuisine-description">
                          {cuisine.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            <section className="content-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">
                    {activeCategory === 'All Food'
                      ? 'HANDPICKED FOR YOU'
                      : `EXPLORE OUR ${activeCategory.toUpperCase()} MENU`}
                  </p>

                  <h2>
                    {activeCategory !== 'All Food'
                      ? `${activeCategory} Options`
                      : activeCuisine !== 'All'
                        ? `${activeCuisine} Dishes`
                        : appliedFilters.search.trim()
                          ? 'Search results'
                          : 'Popular dishes'}
                  </h2>
                </div>

                <span className="dish-count">
                  {filteredDishes.length}{' '}
                  {filteredDishes.length === 1 ? 'dish' : 'dishes'}
                </span>
              </div>

              {(activeCategory !== 'All Food' ||
                activeCuisine !== 'All' ||
                appliedFilters.search.trim() ||
                appliedFilters.dietFilter !== 'all' ||
                appliedFilters.minPrice !== '' ||
                appliedFilters.maxPrice !== '' ||
                appliedFilters.sortBy !== 'popular') && (
                <button
                  className="clear-filters-button"
                  onClick={clearFoodFilters}
                >
                  Clear filters <span>×</span>
                </button>
              )}

              {filteredDishes.length > 0 ? (
                <div className="dish-grid">
                  {filteredDishes.map((dish) => renderDishCard(dish))}
                </div>
              ) : (
                <p className="empty-results">
                  No dishes match your current filters. Try changing your search or price range.
                </p>
              )}
            </section>
          </>
        )}

        <footer className="home-footer">
          Made with love for food lovers. <strong>finds</strong>
        </footer>
      </main>
    </div>
  )
}

export default Home
