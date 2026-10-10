
import { useState } from 'react'

function getOptions(dish) {
  const name = dish.name.toLowerCase()
  const category = dish.category

  if (category === 'Beverages') {
    const isHotDrink =
      name.includes('chai') ||
      name.includes('tea') ||
      name.includes('matcha') ||
      name.includes('latte')

    return [
      {
        name: 'Size',
        options: [
          { label: 'Small', price: 0 },
          { label: 'Medium', price: 20 },
          { label: 'Large', price: 40 },
        ],
      },
      {
        name: 'Sugar',
        options: [
          { label: 'No sugar', price: 0 },
          { label: 'Less sugar', price: 0 },
          { label: 'Regular sugar', price: 0 },
          { label: 'Extra sugar', price: 0 },
        ],
      },
      {
        name: isHotDrink ? 'Strength' : 'Ice',
        options: isHotDrink
          ? [
              { label: 'Mild', price: 0 },
              { label: 'Regular', price: 0 },
              { label: 'Strong', price: 10 },
            ]
          : [
              { label: 'No ice', price: 0 },
              { label: 'Regular ice', price: 0 },
              { label: 'Extra ice', price: 0 },
            ],
      },
    ]
  }

  if (name.includes('pizza')) {
    return [
      {
        name: 'Size',
        options: [
          { label: 'Regular', price: 0 },
          { label: 'Medium', price: 70 },
          { label: 'Large', price: 130 },
        ],
      },
      {
        name: 'Crust',
        options: [
          { label: 'Classic crust', price: 0 },
          { label: 'Thin crust', price: 20 },
          { label: 'Cheese burst', price: 60 },
        ],
      },
    ]
  }

  if (
    name.includes('burger') ||
    name.includes('sandwich') ||
    name.includes('toast') ||
    name.includes('quesadilla')
  ) {
    return [
      {
        name: 'Size',
        options: [
          { label: 'Regular', price: 0 },
          { label: 'Large', price: 40 },
        ],
      },
      {
        name: 'Cheese',
        options: [
          { label: 'No extra cheese', price: 0 },
          { label: 'Extra cheese', price: 25 },
        ],
      },
    ]
  }

  if (category === 'Desserts' || category === 'Sweets') {
    return [
      {
        name: 'Portion',
        options: [
          { label: 'Regular', price: 0 },
          { label: 'Large', price: 40 },
        ],
      },
      {
        name: 'Toppings',
        options: [
          { label: 'No extra toppings', price: 0 },
          { label: 'Chocolate sauce', price: 20 },
          { label: 'Extra nuts', price: 25 },
          { label: 'Chocolate sauce and nuts', price: 40 },
        ],
      },
    ]
  }

  return [
    {
      name: 'Portion size',
      options: [
        { label: 'Regular', price: 0 },
        { label: 'Large', price: 40 },
      ],
    },
    {
      name: 'Spice level',
      options: [
        { label: 'Mild', price: 0 },
        { label: 'Medium', price: 0 },
        { label: 'Spicy', price: 0 },
        { label: 'Extra spicy', price: 0 },
      ],
    },
  ]
}

const extras = [
  { name: 'Extra cheese', price: 25 },
  { name: 'Extra sauce', price: 15 },
  { name: 'Extra portion', price: 40 },
]

function FoodCustomizationModal({ dish, onClose, onAddToCart }) {
  const groups = getOptions(dish)

  const [choices, setChoices] = useState(() =>
    Object.fromEntries(
      groups.map((group) => [group.name, group.options[0].label])
    )
  )

  const [selectedExtras, setSelectedExtras] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [mode, setMode] = useState('customize')
  const [specialInstructions, setSpecialInstructions] = useState('')

  const optionPrice = groups.reduce((total, group) => {
    const selected = group.options.find(
      (option) => option.label === choices[group.name]
    )

    return total + (selected?.price || 0)
  }, 0)

  const extrasPrice = selectedExtras.reduce(
    (total, extraName) =>
      total + (extras.find((extra) => extra.name === extraName)?.price || 0),
    0
  )

  const unitPrice =
    dish.price + (mode === 'customize' ? optionPrice + extrasPrice : 0)

  function toggleExtra(extraName) {
    setSelectedExtras((current) =>
      current.includes(extraName)
        ? current.filter((item) => item !== extraName)
        : [...current, extraName]
    )
  }

  function handleAdd() {
    const instructions = specialInstructions.trim()

    const customization =
      mode === 'customize'
        ? [
            ...Object.entries(choices).map(
              ([group, choice]) => `${group}: ${choice}`
            ),
            ...selectedExtras,
            ...(instructions ? [`Special instructions: ${instructions}`] : []),
          ].join(', ')
        : instructions
          ? `Special instructions: ${instructions}`
          : ''

    const customizationKey = [
      mode,
      ...(mode === 'customize'
        ? Object.entries(choices).map(
            ([group, choice]) => `${group}:${choice}`
          )
        : []),
      ...(mode === 'customize' ? [...selectedExtras].sort() : []),
      instructions,
    ].join('|')

    onAddToCart(
      {
        ...dish,
        price: unitPrice,
        customization,
        customizationKey,
        specialInstructions: instructions,
      },
      quantity
    )

    onClose()
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(15, 23, 42, 0.65)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        overflowY: 'auto',
      }}
    >
      <section
        onClick={(event) => event.stopPropagation()}
        style={{
          background: '#fff',
          color: '#172033',
          width: '100%',
          maxWidth: 560,
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: 20,
          padding: 24,
          boxShadow: '0 24px 70px rgba(0,0,0,0.25)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div>
            <p
              style={{
                color: '#2563eb',
                fontWeight: 700,
                margin: '0 0 6px',
              }}
            >
              MAKE IT YOURS
            </p>

            <h2 style={{ margin: 0 }}>{dish.name}</h2>

            <p style={{ color: '#64748b', marginBottom: 0 }}>
              {dish.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close customization"
            style={{
              border: 0,
              background: '#f1f5f9',
              borderRadius: '50%',
              width: 38,
              height: 38,
              flexShrink: 0,
              cursor: 'pointer',
              fontSize: 20,
            }}
          >
            ×
          </button>
        </div>

        <img
          src={dish.image}
          alt={dish.name}
          style={{
            width: '100%',
            height: 190,
            objectFit: 'cover',
            borderRadius: 14,
            marginTop: 18,
          }}
        />

        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button
            type="button"
            onClick={() => setMode('customize')}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 10,
              border:
                mode === 'customize'
                  ? '2px solid #2563eb'
                  : '1px solid #e2e8f0',
              background: mode === 'customize' ? '#eff6ff' : '#fff',
              color: '#172033',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Customize
          </button>

          <button
            type="button"
            onClick={() => setMode('direct')}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 10,
              border:
                mode === 'direct'
                  ? '2px solid #2563eb'
                  : '1px solid #e2e8f0',
              background: mode === 'direct' ? '#eff6ff' : '#fff',
              color: '#172033',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Add directly
          </button>
        </div>

        {mode === 'customize' && (
          <>
            {groups.map((group) => (
              <div key={group.name} style={{ marginTop: 22 }}>
                <h3 style={{ marginBottom: 10 }}>{group.name}</h3>

                {group.options.map((option) => (
                  <label
                    key={option.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 0',
                      borderBottom: '1px solid #f1f5f9',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name={`${dish.id}-${group.name}`}
                      checked={choices[group.name] === option.label}
                      onChange={() =>
                        setChoices((current) => ({
                          ...current,
                          [group.name]: option.label,
                        }))
                      }
                    />

                    <span style={{ flex: 1 }}>{option.label}</span>

                    {option.price > 0 && (
                      <strong>+₹{option.price}</strong>
                    )}
                  </label>
                ))}
              </div>
            ))}

            <div style={{ marginTop: 22 }}>
              <h3>Extra add-ons</h3>

              {extras.map((extra) => (
                <label
                  key={extra.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 0',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.name)}
                    onChange={() => toggleExtra(extra.name)}
                  />

                  <span style={{ flex: 1 }}>{extra.name}</span>
                  <strong>+₹{extra.price}</strong>
                </label>
              ))}
            </div>
          </>
        )}

        {/* Special instructions are available in both ordering modes. */}
        <div style={{ marginTop: 24 }}>
          <label
            htmlFor="special-food-instructions"
            style={{
              display: 'block',
              fontSize: 17,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Special Instructions
            <span
              style={{
                color: '#64748b',
                fontSize: 13,
                fontWeight: 400,
              }}
            >
              {' '}(Optional)
            </span>
          </label>

          <p
            style={{
              color: '#64748b',
              fontSize: 13,
              lineHeight: 1.5,
              margin: '0 0 10px',
            }}
          >
            Tell us how you would like your food prepared.
          </p>

          <textarea
            id="special-food-instructions"
            value={specialInstructions}
            onChange={(event) =>
              setSpecialInstructions(event.target.value)
            }
            placeholder="E.g. no sugar, less masala, extra salt, less spicy, extra ginger, or any other request..."
            maxLength={300}
            rows={4}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: 13,
              border: '1px solid #cbd5e1',
              borderRadius: 12,
              fontFamily: 'inherit',
              fontSize: 14,
              lineHeight: 1.6,
              resize: 'vertical',
              outlineColor: '#2563eb',
              color: '#172033',
              background: '#fff',
            }}
          />

          <p
            style={{
              textAlign: 'right',
              color: '#64748b',
              fontSize: 12,
              margin: '5px 0 0',
            }}
          >
            {specialInstructions.length}/300 characters
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginTop: 24,
            paddingTop: 18,
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <div>
            <p
              style={{
                margin: '0 0 4px',
                color: '#64748b',
                fontSize: 13,
              }}
            >
              Price per item
            </p>

            <strong style={{ fontSize: 22 }}>₹{unitPrice}</strong>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <button
              type="button"
              onClick={() =>
                setQuantity((current) => Math.max(1, current - 1))
              }
              aria-label="Decrease quantity"
              style={{ padding: '8px 12px', cursor: 'pointer' }}
            >
              −
            </button>

            <strong>{quantity}</strong>

            <button
              type="button"
              onClick={() => setQuantity((current) => current + 1)}
              aria-label="Increase quantity"
              style={{ padding: '8px 12px', cursor: 'pointer' }}
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          style={{
            width: '100%',
            marginTop: 18,
            padding: 15,
            border: 0,
            borderRadius: 12,
            background: '#2563eb',
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Add {quantity} to cart · ₹{unitPrice * quantity}
        </button>
      </section>
    </div>
  )
}

export default FoodCustomizationModal
