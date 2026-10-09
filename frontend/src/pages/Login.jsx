
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('Login backend connection is coming next.')
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/register" className="brand">
          <span className="brand-icon">f.</span>
          <span>finds</span>
        </Link>

        <div className="auth-heading">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Good to see you again.</h1>
          <p className="auth-description">
            Log in to discover great food and find your next favourite.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          <label className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(event) =>
                setShowPassword(event.target.checked)
              }
            />
            Show password
          </label>

          {error && (
            <p className="form-message error-message" role="status">
              {error}
            </p>
          )}

          <button type="submit" className="auth-button">
            Log in <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create account</Link>
        </p>

        <p className="auth-terms">
          Good food is just around the corner.
        </p>
      </section>
    </main>
  )
}

export default Login