
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../App.css'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed. Please try again.')
        return
      }

      // Save basic login details for the current frontend session
      localStorage.setItem('loggedIn', 'true')
      localStorage.setItem('userId', String(data.user.id))
      localStorage.setItem('name', data.user.name)
      localStorage.setItem('email', data.user.email)

      // Open the Home page
      navigate('/home', { replace: true })
    } catch (error) {
      setError(
        'Unable to connect to the server. Please make sure the Finds backend is running.'
      )
    } finally {
      setIsLoading(false)
    }
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

        {location.state?.registrationSuccess && (
          <p className="form-message success-message" role="status">
            {location.state.registrationSuccess}
          </p>
        )}

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
              onChange={(event) => setShowPassword(event.target.checked)}
            />
            Show password
          </label>

          {error && (
            <p className="form-message error-message" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
            {!isLoading && <span aria-hidden="true"> →</span>}
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
