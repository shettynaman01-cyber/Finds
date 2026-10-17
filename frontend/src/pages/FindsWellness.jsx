
import { useEffect, useRef, useState } from 'react'

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

const suggestedQuestions = [
  'Suggest a healthy vegetarian dinner.',
  'What can I eat for more protein?',
  'Suggest some budget-friendly healthy meals.',
  'How can I build a balanced daily meal plan?',
]

function FindsWellness({ onAddToCart, cart, onChangeQuantity }) {
  const [selectedGoal, setSelectedGoal] = useState('All Goals')
  const [search, setSearch] = useState('')

  // AI chat state
  const [messages, setMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [chatError, setChatError] = useState('')
  const messagesEndRef = useRef(null)
  const chatInputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [messages, isSending])

  const sendMessage = async (event, suggestedMessage) => {
    event?.preventDefault()

    const message = (suggestedMessage ?? chatInput).trim()

    if (!message || isSending) return

    if (message.length > 4000) {
      setChatError('Please keep your message under 4,000 characters.')
      return
    }

    setChatError('')
    setChatInput('')

    // Keep the conversation that came before the new message.
    // The backend adds the current message itself.
    const history = messages
      .filter(
        (item) =>
          !item.isError &&
          (item.role === 'user' || item.role === 'assistant')
      )
      .slice(-10)
      .map((item) => ({
        role: item.role === 'assistant' ? 'model' : 'user',
        text: item.text,
      }))

    setMessages((previous) => [
      ...previous,
      {
        id: `${Date.now()}-user`,
        role: 'user',
        text: message,
      },
    ])

    setIsSending(true)

    try {
      const response = await fetch(
        'http://127.0.0.1:5000/api/ai/wellness-chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            history,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Unable to get a response from Finds Wellness.'
        )
      }

      setMessages((previous) => [
        ...previous,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          text: data.reply,
        },
      ])
    } catch (error) {
      const isConnectionError =
        error instanceof TypeError

      setMessages((previous) => [
        ...previous,
        {
          id: `${Date.now()}-error`,
          role: 'assistant',
          isError: true,
          text: isConnectionError
            ? 'I could not connect to the Finds server. Please make sure your backend is running on port 5000 and try again.'
            : error.message ||
              'Something went wrong. Please try sending your message again.',
        },
      ])
    } finally {
      setIsSending(false)
      chatInputRef.current?.focus()
    }
  }

  const startNewChat = () => {
    if (isSending) return

    setMessages([])
    setChatInput('')
    setChatError('')
    chatInputRef.current?.focus()
  }

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

      {/* Finds Wellness AI Chat */}
      <section className="wellness-chat" aria-label="Finds Wellness AI chat">
        <div className="wellness-chat-header">
          <div className="wellness-chat-heading">
            <div className="wellness-chat-avatar" aria-hidden="true">
              🌿
            </div>

            <div>
              <span className="wellness-kicker">YOUR FOOD COMPANION</span>
              <h2>Ask Finds Wellness</h2>
              <p>
                Talk about food, nutrition, recipes, cravings and meal ideas.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="wellness-chat-new"
            onClick={startNewChat}
            disabled={isSending}
          >
            + New Chat
          </button>
        </div>

        <div
          className="wellness-chat-messages"
          aria-live="polite"
          aria-label="Conversation"
        >
          {messages.length === 0 ? (
            <div className="wellness-chat-welcome">
              <div className="wellness-chat-welcome-icon">🥗</div>
              <h3>What would you like to eat or know today?</h3>
              <p>
                Ask me a question naturally. I can help you explore food,
                understand nutrition basics, and find ideas that suit your
                preferences.
              </p>

              <div className="wellness-chat-suggestions">
                {suggestedQuestions.map((question) => (
                  <button
                    type="button"
                    key={question}
                    onClick={() => sendMessage(null, question)}
                    disabled={isSending}
                  >
                    {question}
                    <span aria-hidden="true"> ↗</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`wellness-chat-message ${
                    message.role === 'user'
                      ? 'wellness-chat-message-user'
                      : 'wellness-chat-message-assistant'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <span className="wellness-chat-message-avatar">
                      🌿
                    </span>
                  )}

                  <div className="wellness-chat-bubble">
                    <span className="wellness-chat-sender">
                      {message.role === 'user'
                        ? 'You'
                        : message.isError
                          ? 'Connection notice'
                          : 'Finds Wellness'}
                    </span>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}

              {isSending && (
                <div
                  className="wellness-chat-message wellness-chat-message-assistant"
                  role="status"
                  aria-label="Finds Wellness is thinking"
                >
                  <span className="wellness-chat-message-avatar">🌿</span>
                  <div className="wellness-chat-bubble wellness-chat-typing">
                    <span>Finds Wellness is thinking</span>
                    <span className="wellness-chat-typing-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length > 0 && !isSending && (
          <div className="wellness-chat-followups">
            <span>Try asking:</span>
            {suggestedQuestions.slice(0, 2).map((question) => (
              <button
                type="button"
                key={question}
                onClick={() => sendMessage(null, question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {chatError && (
          <p className="wellness-chat-error" role="alert">
            {chatError}
          </p>
        )}

        <form
          className="wellness-chat-form"
          onSubmit={(event) => sendMessage(event)}
        >
          <label className="wellness-chat-input-label" htmlFor="wellness-chat-input">
            Message Finds Wellness
          </label>

          <div className="wellness-chat-input-row">
            <textarea
              id="wellness-chat-input"
              ref={chatInputRef}
              value={chatInput}
              onChange={(event) => {
                setChatInput(event.target.value)
                if (chatError) setChatError('')
              }}
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Ask anything about food or healthy eating..."
              rows={2}
              maxLength={4000}
              disabled={isSending}
            />

            <button
              type="submit"
              className="wellness-chat-send"
              disabled={isSending || !chatInput.trim()}
              aria-label="Send message"
            >
              {isSending ? '...' : 'Send ↗'}
            </button>
          </div>

          <div className="wellness-chat-input-footer">
            <span>AI-generated guidance can make mistakes.</span>
            <span>{chatInput.length}/4000</span>
          </div>
        </form>

        <p className="wellness-chat-disclaimer">
          Finds Wellness provides general food and nutrition information, not
          medical diagnosis or treatment. For allergies, verify ingredients
          and cross-contamination details with the food provider.
        </p>
      </section>

      {/* Existing meal discovery and cart features */}
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
