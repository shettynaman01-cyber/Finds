
require('dotenv').config()

const db = require('./db')

// Fictional restaurant and menu data for the Finds project.
// Safe to run again: existing menus for these 12 restaurants are replaced,
// rather than duplicated.

const imageUrls = {
  southIndian:
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80',
  biryani:
    'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=80',
  streetFood:
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
  burger:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
  pizza:
    'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80',
  chinese:
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80',
  cafe:
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
  healthy:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  dessert:
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
  northIndian:
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
  rolls:
    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80',
  smoothie:
    'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=80'
}

// Each food item:
// [name, category, price, description, isVegetarian, imageType]

const restaurants = [
  {
    name: 'Dosa District',
    cuisine: 'South Indian',
    description: 'South Indian classics, crispy dosas and comforting breakfast favourites.',
    rating: 4.6,
    deliveryTime: '20-30 min',
    image: imageUrls.southIndian,
    foods: [
      ['Plain Dosa', 'Breakfast', 79, 'Crispy golden dosa served with chutneys and sambar.', true, 'southIndian'],
      ['Masala Dosa', 'Breakfast', 99, 'Crispy dosa filled with seasoned potato masala.', true, 'southIndian'],
      ['Mysore Masala Dosa', 'Breakfast', 129, 'Spicy Mysore chutney, potato masala and crisp dosa.', true, 'southIndian'],
      ['Idli Sambar', 'Breakfast', 69, 'Soft steamed idlis with hot sambar and coconut chutney.', true, 'southIndian'],
      ['Medu Vada', 'Snacks', 75, 'Crispy lentil fritters served with chutneys.', true, 'southIndian'],
      ['Uttapam', 'Breakfast', 109, 'Soft rice pancake topped with onion, tomato and herbs.', true, 'southIndian'],
      ['Podi Idli', 'Snacks', 89, 'Mini idlis tossed with aromatic spiced lentil powder.', true, 'southIndian'],
      ['Curd Rice', 'Lunch', 99, 'Comforting rice mixed with creamy yoghurt and seasoning.', true, 'southIndian'],
      ['Lemon Rice', 'Lunch', 109, 'Tangy South Indian rice with lemon, curry leaves and peanuts.', true, 'southIndian'],
      ['Filter Coffee', 'Beverages', 49, 'Traditional South Indian filter coffee.', true, 'cafe']
    ]
  },
  {
    name: 'Biryani Boulevard',
    cuisine: 'Biryani & Mughlai',
    description: 'Fragrant dum biryanis, rich Indian flavours and satisfying meal combos.',
    rating: 4.7,
    deliveryTime: '30-40 min',
    image: imageUrls.biryani,
    foods: [
      ['Veg Dum Biryani', 'Lunch', 179, 'Fragrant basmati rice cooked with vegetables and spices.', true, 'biryani'],
      ['Paneer Biryani', 'Lunch', 219, 'Basmati rice layered with spiced paneer and herbs.', true, 'biryani'],
      ['Chicken Dum Biryani', 'Dinner', 259, 'Aromatic dum-cooked rice with spiced chicken.', false, 'biryani'],
      ['Egg Biryani', 'Lunch', 199, 'Spiced basmati rice served with boiled eggs.', false, 'biryani'],
      ['Mushroom Biryani', 'Lunch', 199, 'Mushrooms and basmati rice cooked with fragrant spices.', true, 'biryani'],
      ['Chicken 65', 'Starters', 229, 'Spicy fried chicken bites with curry leaves.', false, 'biryani'],
      ['Paneer Tikka', 'Starters', 189, 'Tandoor-style paneer marinated in Indian spices.', true, 'northIndian'],
      ['Veg Seekh Kebab', 'Starters', 169, 'Grilled vegetable and lentil kebabs with mint chutney.', true, 'northIndian'],
      ['Chicken Biryani Combo', 'Combos', 299, 'Chicken biryani served with raita and salan.', false, 'biryani'],
      ['Boondi Raita', 'Sides', 59, 'Chilled yoghurt with crunchy boondi and mild spices.', true, 'northIndian']
    ]
  },
  {
    name: 'Street Feast',
    cuisine: 'Indian Street Food',
    description: 'Popular Indian street snacks with bold flavours and pocket-friendly prices.',
    rating: 4.5,
    deliveryTime: '15-25 min',
    image: imageUrls.streetFood,
    foods: [
      ['Vada Pav', 'Snacks', 35, 'Mumbai-style potato fritter in a soft bun with chutneys.', true, 'streetFood'],
      ['Pav Bhaji', 'Snacks', 99, 'Buttery pav served with spiced mashed vegetable bhaji.', true, 'streetFood'],
      ['Pani Puri', 'Snacks', 59, 'Crispy puris served with tangy and spicy flavoured water.', true, 'streetFood'],
      ['Sev Puri', 'Snacks', 69, 'Crispy puris topped with chutneys, potatoes and sev.', true, 'streetFood'],
      ['Samosa Chaat', 'Snacks', 89, 'Samosa topped with yoghurt, chutneys and chickpeas.', true, 'streetFood'],
      ['Dahi Puri', 'Snacks', 79, 'Puris filled with potatoes, yoghurt and sweet-spicy chutneys.', true, 'streetFood'],
      ['Onion Pakoda', 'Snacks', 69, 'Crispy onion fritters with a hint of spices.', true, 'streetFood'],
      ['Aloo Tikki Chaat', 'Snacks', 89, 'Crisp potato patties topped with chutneys and yoghurt.', true, 'streetFood'],
      ['Cheese Pav Bhaji', 'Snacks', 129, 'Classic vegetable bhaji finished with melted cheese.', true, 'streetFood'],
      ['Masala Chaas', 'Beverages', 39, 'Refreshing salted buttermilk with roasted cumin.', true, 'cafe']
    ]
  },
  {
    name: 'Burger Borough',
    cuisine: 'Burgers & Fast Food',
    description: 'Juicy burgers, loaded fries and quick bites for every craving.',
    rating: 4.4,
    deliveryTime: '20-30 min',
    image: imageUrls.burger,
    foods: [
      ['Classic Veg Burger', 'Burgers', 119, 'Vegetable patty, lettuce and house sauce in a toasted bun.', true, 'burger'],
      ['Crispy Chicken Burger', 'Burgers', 179, 'Crispy chicken fillet with lettuce and creamy sauce.', false, 'burger'],
      ['Paneer Tikka Burger', 'Burgers', 159, 'Spiced paneer patty with mint mayo and fresh vegetables.', true, 'burger'],
      ['Double Cheese Burger', 'Burgers', 199, 'Double cheese, a grilled patty and signature sauce.', true, 'burger'],
      ['Peri Peri Fries', 'Sides', 99, 'Golden fries tossed in spicy peri peri seasoning.', true, 'burger'],
      ['Loaded Cheese Fries', 'Sides', 139, 'Fries topped with creamy cheese sauce and herbs.', true, 'burger'],
      ['Crispy Chicken Wrap', 'Wraps', 169, 'Crispy chicken, crunchy vegetables and creamy dressing.', false, 'rolls'],
      ['Veggie Wrap', 'Wraps', 129, 'Grilled vegetables and paneer-style sauce in a soft wrap.', true, 'rolls'],
      ['Classic Veg Combo', 'Combos', 199, 'Classic veg burger, fries and a soft drink.', true, 'burger'],
      ['Chocolate Thick Shake', 'Beverages', 129, 'Rich chocolate milkshake served chilled.', true, 'cafe']
    ]
  },
  {
    name: 'Crust & Co.',
    cuisine: 'Pizza & Italian',
    description: 'Oven-baked pizzas, pasta and Italian-inspired comfort food.',
    rating: 4.6,
    deliveryTime: '25-35 min',
    image: imageUrls.pizza,
    foods: [
      ['Margherita Pizza', 'Pizza', 179, 'Classic pizza with tomato sauce, mozzarella and basil.', true, 'pizza'],
      ['Farmhouse Pizza', 'Pizza', 279, 'Pizza topped with capsicum, onion, tomato and mushrooms.', true, 'pizza'],
      ['Paneer Tikka Pizza', 'Pizza', 299, 'Tandoori paneer, peppers and a cheesy pizza base.', true, 'pizza'],
      ['Corn Cheese Pizza', 'Pizza', 229, 'Sweet corn and melted cheese on a tomato base.', true, 'pizza'],
      ['Pepperoni Pizza', 'Pizza', 349, 'Pizza topped with pepperoni and mozzarella.', false, 'pizza'],
      ['White Sauce Pasta', 'Pasta', 199, 'Creamy white sauce pasta with herbs and vegetables.', true, 'pizza'],
      ['Arrabbiata Pasta', 'Pasta', 189, 'Pasta tossed in a spicy tomato and garlic sauce.', true, 'pizza'],
      ['Garlic Bread', 'Sides', 99, 'Toasted garlic bread with herbs and melted cheese.', true, 'pizza'],
      ['Cheese Stuffed Garlic Bread', 'Sides', 149, 'Golden garlic bread filled with melted cheese.', true, 'pizza'],
      ['Tiramisu Cup', 'Desserts', 159, 'Coffee-flavoured layered dessert inspired by Italian tiramisu.', true, 'dessert']
    ]
  },
  {
    name: 'The Cozy Cup',
    cuisine: 'Cafe & Beverages',
    description: 'Relaxed café favourites, freshly brewed coffee and sweet treats.',
    rating: 4.5,
    deliveryTime: '15-25 min',
    image: imageUrls.cafe,
    foods: [
      ['Cappuccino', 'Beverages', 119, 'Espresso with steamed milk and a soft foam layer.', true, 'cafe'],
      ['Cold Coffee', 'Beverages', 139, 'Chilled blended coffee with milk and a creamy finish.', true, 'cafe'],
      ['Iced Latte', 'Beverages', 129, 'Espresso and cold milk served over ice.', true, 'cafe'],
      ['Classic Hot Chocolate', 'Beverages', 149, 'Warm chocolate drink topped with a creamy finish.', true, 'cafe'],
      ['Chocolate Brownie', 'Desserts', 99, 'Rich chocolate brownie with a soft fudgy centre.', true, 'dessert'],
      ['Belgian Chocolate Waffle', 'Desserts', 179, 'Golden waffle topped with chocolate sauce.', true, 'dessert'],
      ['Blueberry Cheesecake', 'Desserts', 199, 'Creamy cheesecake with a blueberry topping.', true, 'dessert'],
      ['Veg Grilled Sandwich', 'Snacks', 139, 'Grilled sandwich filled with vegetables and cheese.', true, 'cafe'],
      ['Paneer Sandwich', 'Snacks', 159, 'Seasoned paneer and vegetables in toasted bread.', true, 'cafe'],
      ['Classic Pancakes', 'Breakfast', 169, 'Fluffy pancakes served with syrup.', true, 'dessert']
    ]
  },
  {
    name: 'Green Bowl Kitchen',
    cuisine: 'Healthy Food',
    description: 'Balanced bowls, fresh salads and nourishing meals for everyday wellness.',
    rating: 4.8,
    deliveryTime: '20-30 min',
    image: imageUrls.healthy,
    foods: [
      ['Grilled Paneer Protein Bowl', 'Healthy', 249, 'Grilled paneer, brown rice, vegetables and yoghurt dressing.', true, 'healthy'],
      ['Quinoa Veggie Bowl', 'Healthy', 279, 'Quinoa with roasted vegetables, chickpeas and lemon dressing.', true, 'healthy'],
      ['Chickpea Salad', 'Healthy', 179, 'Chickpeas, cucumber, tomato and fresh herbs.', true, 'healthy'],
      ['Grilled Chicken Bowl', 'Healthy', 299, 'Grilled chicken with brown rice and seasonal vegetables.', false, 'healthy'],
      ['Sprouts Chaat', 'Healthy', 119, 'Fresh sprouts tossed with tomato, onion and lemon.', true, 'healthy'],
      ['Overnight Oats', 'Breakfast', 149, 'Oats with milk, chia seeds and seasonal fruit.', true, 'healthy'],
      ['Peanut Butter Banana Smoothie', 'Beverages', 169, 'Banana smoothie blended with peanut butter and milk.', true, 'smoothie'],
      ['Tofu Power Salad', 'Healthy', 229, 'Tofu, greens, carrots and a light sesame dressing.', true, 'healthy'],
      ['Moong Dal Chilla', 'Breakfast', 139, 'Protein-rich lentil pancakes served with mint chutney.', true, 'healthy'],
      ['Fruit and Yoghurt Bowl', 'Healthy', 159, 'Seasonal fruit served with yoghurt and seeds.', true, 'healthy']
    ]
  },
  {
    name: 'Sweet Spot Studio',
    cuisine: 'Desserts & Sweets',
    description: 'Indian mithai, cakes and desserts for a little everyday indulgence.',
    rating: 4.7,
    deliveryTime: '20-30 min',
    image: imageUrls.dessert,
    foods: [
      ['Gulab Jamun', 'Sweets', 79, 'Soft milk-solid dumplings soaked in sugar syrup.', true, 'dessert'],
      ['Rasmalai', 'Sweets', 119, 'Soft cheese patties in chilled saffron-flavoured milk.', true, 'dessert'],
      ['Chocolate Truffle Cake', 'Desserts', 199, 'Chocolate cake layered with rich truffle ganache.', true, 'dessert'],
      ['New York Cheesecake', 'Desserts', 229, 'Creamy baked cheesecake with a biscuit base.', true, 'dessert'],
      ['Vanilla Ice Cream', 'Ice Cream', 69, 'Classic creamy vanilla ice cream.', true, 'dessert'],
      ['Chocolate Brownie Sundae', 'Ice Cream', 159, 'Chocolate brownie served with ice cream and sauce.', true, 'dessert'],
      ['Kaju Katli', 'Sweets', 149, 'Traditional cashew sweet cut into delicate diamond shapes.', true, 'dessert'],
      ['Motichoor Ladoo', 'Sweets', 89, 'Traditional sweet made with tiny gram-flour pearls.', true, 'dessert'],
      ['Red Velvet Pastry', 'Desserts', 129, 'Soft red velvet sponge with cream cheese-style frosting.', true, 'dessert'],
      ['Chocolate Mousse', 'Desserts', 119, 'Light and airy chocolate dessert served chilled.', true, 'dessert']
    ]
  },
  {
    name: 'Wok This Way',
    cuisine: 'Chinese & Asian',
    description: 'Indo-Chinese noodles, rice and wok-tossed favourites.',
    rating: 4.4,
    deliveryTime: '25-35 min',
    image: imageUrls.chinese,
    foods: [
      ['Veg Hakka Noodles', 'Chinese', 149, 'Wok-tossed noodles with vegetables and soy seasoning.', true, 'chinese'],
      ['Chicken Hakka Noodles', 'Chinese', 199, 'Stir-fried noodles with chicken and crunchy vegetables.', false, 'chinese'],
      ['Veg Fried Rice', 'Chinese', 139, 'Fried rice with mixed vegetables and spring onions.', true, 'chinese'],
      ['Chicken Fried Rice', 'Chinese', 189, 'Wok-fried rice with chicken, egg and vegetables.', false, 'chinese'],
      ['Veg Manchurian', 'Starters', 159, 'Vegetable dumplings tossed in a tangy Indo-Chinese sauce.', true, 'chinese'],
      ['Chilli Paneer', 'Starters', 199, 'Paneer cubes tossed with peppers and chilli sauce.', true, 'chinese'],
      ['Chicken Chilli', 'Starters', 229, 'Chicken tossed with peppers, onion and chilli sauce.', false, 'chinese'],
      ['Veg Spring Rolls', 'Starters', 129, 'Crispy rolls filled with seasoned vegetables.', true, 'chinese'],
      ['Schezwan Noodles', 'Chinese', 169, 'Spicy noodles tossed in Schezwan sauce.', true, 'chinese'],
      ['Hot and Sour Soup', 'Soups', 99, 'Warm, tangy soup with vegetables and pepper.', true, 'chinese']
    ]
  },
  {
    name: 'Tandoori Trails',
    cuisine: 'North Indian',
    description: 'North Indian curries, tandoori starters and fresh Indian breads.',
    rating: 4.6,
    deliveryTime: '30-40 min',
    image: imageUrls.northIndian,
    foods: [
      ['Paneer Butter Masala', 'Dinner', 229, 'Paneer in a creamy tomato and butter gravy.', true, 'northIndian'],
      ['Dal Makhani', 'Dinner', 199, 'Slow-cooked black lentils in a rich creamy gravy.', true, 'northIndian'],
      ['Chole Bhature', 'Lunch', 159, 'Spiced chickpeas served with fluffy fried bhature.', true, 'northIndian'],
      ['Butter Chicken', 'Dinner', 289, 'Chicken in a rich tomato, butter and cream gravy.', false, 'northIndian'],
      ['Tandoori Roti', 'Breads', 25, 'Whole-wheat roti baked in a traditional tandoor.', true, 'northIndian'],
      ['Butter Naan', 'Breads', 45, 'Soft naan finished with butter.', true, 'northIndian'],
      ['Garlic Naan', 'Breads', 59, 'Naan topped with garlic and herbs.', true, 'northIndian'],
      ['Tandoori Chicken', 'Starters', 299, 'Chicken marinated in yoghurt and spices, then roasted.', false, 'northIndian'],
      ['Jeera Rice', 'Rice', 129, 'Steamed rice tempered with cumin seeds.', true, 'northIndian'],
      ['Palak Paneer', 'Dinner', 219, 'Paneer cooked in a smooth spinach gravy.', true, 'northIndian']
    ]
  },
  {
    name: 'Roll Republic',
    cuisine: 'Rolls & Wraps',
    description: 'Handheld rolls and wraps packed with flavour for meals on the go.',
    rating: 4.3,
    deliveryTime: '15-25 min',
    image: imageUrls.rolls,
    foods: [
      ['Paneer Kathi Roll', 'Rolls', 149, 'Spiced paneer, onions and chutney wrapped in a flatbread.', true, 'rolls'],
      ['Aloo Tikki Roll', 'Rolls', 99, 'Potato tikki with crunchy vegetables and mint sauce.', true, 'rolls'],
      ['Chicken Kathi Roll', 'Rolls', 179, 'Spiced chicken, onions and chutney in a soft wrap.', false, 'rolls'],
      ['Egg Roll', 'Rolls', 119, 'Egg-coated flatbread with onions and tangy sauce.', false, 'rolls'],
      ['Falafel Wrap', 'Wraps', 159, 'Falafel, salad and tahini-style dressing in a wrap.', true, 'rolls'],
      ['Peri Peri Paneer Wrap', 'Wraps', 169, 'Paneer and vegetables with spicy peri peri seasoning.', true, 'rolls'],
      ['BBQ Chicken Wrap', 'Wraps', 189, 'Chicken with smoky barbecue sauce and crunchy lettuce.', false, 'rolls'],
      ['Cheese Corn Roll', 'Rolls', 129, 'Sweet corn and melted cheese wrapped in flatbread.', true, 'rolls'],
      ['Chilli Potato', 'Snacks', 139, 'Crispy potato tossed in a spicy, tangy sauce.', true, 'streetFood'],
      ['Lemon Iced Tea', 'Beverages', 79, 'Chilled lemon tea served over ice.', true, 'cafe']
    ]
  },
  {
    name: 'Fresh Press',
    cuisine: 'Juices & Smoothies',
    description: 'Fruit smoothies, fresh juice blends and lighter refreshments.',
    rating: 4.5,
    deliveryTime: '15-25 min',
    image: imageUrls.smoothie,
    foods: [
      ['Mango Smoothie', 'Beverages', 139, 'Creamy mango smoothie made with mango and milk.', true, 'smoothie'],
      ['Banana Oats Smoothie', 'Beverages', 129, 'Banana blended with oats and milk.', true, 'smoothie'],
      ['Mixed Berry Smoothie', 'Beverages', 179, 'Berry smoothie with a refreshing fruity flavour.', true, 'smoothie'],
      ['Watermelon Juice', 'Juices', 89, 'Refreshing watermelon juice served chilled.', true, 'smoothie'],
      ['Orange Juice', 'Juices', 99, 'Fresh-style orange juice with a citrus flavour.', true, 'smoothie'],
      ['Green Detox Smoothie', 'Healthy', 169, 'Spinach, apple, cucumber and lemon blended together.', true, 'healthy'],
      ['Pineapple Mint Juice', 'Juices', 109, 'Pineapple juice with a hint of fresh mint.', true, 'smoothie'],
      ['Carrot Beetroot Juice', 'Juices', 119, 'Carrot and beetroot juice with a light citrus finish.', true, 'smoothie'],
      ['Peanut Banana Protein Shake', 'Healthy', 189, 'Banana, peanut butter and milk blended into a filling shake.', true, 'smoothie'],
      ['Coconut Water', 'Beverages', 69, 'Refreshing coconut water served chilled.', true, 'smoothie']
    ]
  },
  {
    name: 'Spice Route Kitchen',
    cuisine: 'Indian Regional',
    description: 'A mix of regional Indian favourites, home-style meals and comforting thalis.',
    rating: 4.5,
    deliveryTime: '25-35 min',
    image: imageUrls.northIndian,
    foods: [
      ['Veg Mini Thali', 'Lunch', 179, 'A balanced Indian meal with sabzi, dal, rice and roti.', true, 'northIndian'],
      ['Paneer Thali', 'Lunch', 229, 'Indian thali featuring paneer curry, dal, rice and bread.', true, 'northIndian'],
      ['Rajma Chawal', 'Lunch', 149, 'Red kidney bean curry served with steamed rice.', true, 'northIndian'],
      ['Kadhi Khichdi', 'Lunch', 139, 'Comforting rice and lentil khichdi with yoghurt-based kadhi.', true, 'northIndian'],
      ['Veg Pulao', 'Lunch', 149, 'Fragrant rice cooked with vegetables and whole spices.', true, 'biryani'],
      ['Aloo Paratha', 'Breakfast', 99, 'Whole-wheat flatbread stuffed with spiced potatoes.', true, 'northIndian'],
      ['Paneer Paratha', 'Breakfast', 129, 'Flatbread stuffed with seasoned paneer.', true, 'northIndian'],
      ['Masala Khichdi', 'Dinner', 129, 'Rice and lentils cooked with mild Indian spices.', true, 'northIndian'],
      ['Chicken Curry', 'Dinner', 249, 'Home-style chicken curry with an aromatic spice gravy.', false, 'northIndian'],
      ['Gajar Halwa', 'Desserts', 89, 'Traditional carrot pudding with milk and nuts.', true, 'dessert']
    ]
  }
]

async function seedDatabase() {
  let connection

  try {
    connection = await db.getConnection()
    await connection.beginTransaction()

    let restaurantCount = 0
    let foodCount = 0

    for (const restaurant of restaurants) {
      const [existing] = await connection.query(
        'SELECT id FROM restaurants WHERE name = ? LIMIT 1',
        [restaurant.name]
      )

      let restaurantId

      if (existing.length > 0) {
        restaurantId = existing[0].id

        await connection.query(
          `UPDATE restaurants
           SET cuisine = ?, description = ?, rating = ?,
               delivery_time = ?, image_url = ?, is_active = TRUE
           WHERE id = ?`,
          [
            restaurant.cuisine,
            restaurant.description,
            restaurant.rating,
            restaurant.deliveryTime,
            restaurant.image,
            restaurantId
          ]
        )
      } else {
        const [result] = await connection.query(
          `INSERT INTO restaurants
           (name, cuisine, description, rating, delivery_time, image_url, is_active)
           VALUES (?, ?, ?, ?, ?, ?, TRUE)`,
          [
            restaurant.name,
            restaurant.cuisine,
            restaurant.description,
            restaurant.rating,
            restaurant.deliveryTime,
            restaurant.image
          ]
        )

        restaurantId = result.insertId
      }

      // Replace only this seeded restaurant's menu.
      await connection.query(
        'DELETE FROM food_items WHERE restaurant_id = ?',
        [restaurantId]
      )

      for (const food of restaurant.foods) {
        const [name, category, price, description, isVegetarian, imageType] = food

        await connection.query(
          `INSERT INTO food_items
           (restaurant_id, name, category, price, description, image_url,
            is_vegetarian, is_available)
           VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)`,
          [
            restaurantId,
            name,
            category,
            price,
            description,
            imageUrls[imageType] || imageUrls.healthy,
            isVegetarian
          ]
        )

        foodCount++
      }

      restaurantCount++
      console.log(`Added menu: ${restaurant.name} (${restaurant.foods.length} items)`)
    }

    await connection.commit()

    console.log('\nFinds seed completed successfully!')
    console.log(`Restaurants processed: ${restaurantCount}`)
    console.log(`Food items inserted: ${foodCount}`)
  } catch (error) {
    if (connection) {
      await connection.rollback()
    }

    console.error('Finds seed failed:', error.message)
    process.exitCode = 1
  } finally {
    if (connection) {
      connection.release()
    }

    await db.end()
  }
}

seedDatabase()
