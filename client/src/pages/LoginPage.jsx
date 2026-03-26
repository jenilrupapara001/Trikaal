import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const LoginPage = () => {

  // ─── Form State ───────────────────────────────────────────
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [showPass,    setShowPass]    = useState(false)
  const [isLoading,   setIsLoading]   = useState(false)
  const [error,       setError]       = useState('')        // inline error message
  const [fieldErrors, setFieldErrors] = useState({})       // per-field validation

  const { login }    = useAuth()
  const navigate     = useNavigate()

  // ─── Validation ───────────────────────────────────────────
  const validate = () => {
    const errors = {}
    if (!email.trim())                          errors.email    = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(email))       errors.email    = 'Enter a valid email address.'
    if (!password)                              errors.password = 'Password is required.'
    else if (password.length < 6)               errors.password = 'Password must be at least 6 characters.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  // ─── Submit ───────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!validate()) return

    setIsLoading(true)
    try {
      const data = await login(email, password)
      if (data.user.role === 'admin') navigate('/admin')
      else navigate('/')
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Invalid credentials. Please check your email and password.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  // ─── Clear field error on change ─────────────────────────
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (fieldErrors.email)    setFieldErrors(prev => ({ ...prev, email: '' }))
    if (error)                setError('')
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: '' }))
    if (error)                setError('')
  }

  // ─── Render ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">

      {/* ── Background atmosphere ────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        {/* Richer star field — more points than original */}
        <style>{`
          .star-field-login {
            position: absolute;
            inset: 0;
          }
          .star-field-login::before,
          .star-field-login::after {
            content: '';
            position: absolute;
            inset: 0;
          }
          .star-field-login::before {
            background-image:
              radial-gradient(1px   1px   at  8%  12%, rgba(201,168,76,0.55) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 22%  35%, rgba(201,168,76,0.35) 0%, transparent 100%),
              radial-gradient(1px   1px   at 40%  8%,  rgba(201,168,76,0.45) 0%, transparent 100%),
              radial-gradient(2px   2px   at 55%  60%, rgba(201,168,76,0.25) 0%, transparent 100%),
              radial-gradient(1px   1px   at 68%  18%, rgba(201,168,76,0.5)  0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 80%  75%, rgba(201,168,76,0.35) 0%, transparent 100%),
              radial-gradient(1px   1px   at 90%  42%, rgba(201,168,76,0.45) 0%, transparent 100%),
              radial-gradient(1px   1px   at 15%  80%, rgba(201,168,76,0.3)  0%, transparent 100%),
              radial-gradient(2px   2px   at 35%  55%, rgba(201,168,76,0.2)  0%, transparent 100%),
              radial-gradient(1px   1px   at 75%  90%, rgba(201,168,76,0.4)  0%, transparent 100%),
              radial-gradient(1px   1px   at 92%  5%,  rgba(201,168,76,0.5)  0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 50%  50%, rgba(201,168,76,0.15) 0%, transparent 100%);
          }
          .star-field-login::after {
            background-image:
              radial-gradient(1px   1px   at 5%   50%, rgba(201,168,76,0.3)  0%, transparent 100%),
              radial-gradient(1px   1px   at 28%  70%, rgba(201,168,76,0.4)  0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 62%  30%, rgba(201,168,76,0.25) 0%, transparent 100%),
              radial-gradient(1px   1px   at 84%  55%, rgba(201,168,76,0.35) 0%, transparent 100%),
              radial-gradient(1px   1px   at 45%  85%, rgba(201,168,76,0.3)  0%, transparent 100%);
            animation: twinkle-login 5s ease-in-out infinite alternate;
          }
          @keyframes twinkle-login {
            from { opacity: 0.4; }
            to   { opacity: 0.9; }
          }
        `}</style>
        <div className="star-field-login" />

        {/* Corner glows — same as original but slightly stronger */}
        <div className="absolute top-[-10%] left-[-10%]  w-[550px] h-[550px] bg-primary/6 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-primary/6 rounded-full blur-[130px]" />

        {/* Center glow behind the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px]" />
      </div>

      {/* ── Main card ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="glass-card w-full max-w-md relative z-10 border border-primary/15 rounded-2xl shadow-2xl overflow-hidden"
      >

        {/* Top gold accent line */}
        <div className="h-0.5 w-full gold-gradient" />

        <div className="p-10">

          {/* ── Card header ──────────────────────────────── */}
          <div className="text-center mb-10">

            {/* Logo / icon mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1   }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-16 h-16 rounded-full border border-primary/30 bg-primary/8 flex items-center justify-center mx-auto mb-5"
            >
              <span
                className="material-symbols-outlined text-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
            </motion.div>

            {/* Sanskrit line */}
            <p
              className="text-primary/40 text-sm mb-3 tracking-[0.1em]"
              style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
            >
              ॐ
            </p>

            <h1 className="font-headline text-3xl font-bold text-primary mb-1">
              Trikaal Admin
            </h1>
            <p className="text-on-surface-variant font-label text-xs tracking-[0.2em] uppercase">
              Secure Access Portal
            </p>
          </div>

          {/* ── Global error message ─────────────────────── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: '1.5rem' }}
                exit={{   opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded-xl"
              >
                <span className="material-symbols-outlined text-red-400 text-base flex-shrink-0 mt-0.5">
                  error
                </span>
                <p className="text-red-300 text-sm font-light leading-relaxed">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Form ─────────────────────────────────────── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Email field */}
            <div>
              <label className="block text-on-surface-variant text-xs font-label tracking-[0.15em] uppercase mb-2">
                Email Address
              </label>
              <div className="relative">
                {/* Left icon */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/50 text-lg pointer-events-none">
                  mail
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="your@email.com"
                  className={`w-full bg-surface-container text-on-surface placeholder:text-on-surface-variant/30
                    rounded-full py-3.5 pl-11 pr-5
                    border transition-all duration-200 outline-none
                    focus:border-primary/50 focus:bg-surface-container-high focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)]
                    ${fieldErrors.email ? 'border-red-500/50' : 'border-primary/15 hover:border-primary/25'}
                  `}
                />
              </div>
              {/* Field error */}
              <AnimatePresence>
                {fieldErrors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0  }}
                    exit={{   opacity: 0, y: -4  }}
                    className="flex items-center gap-1.5 text-red-400 text-xs mt-2 ml-2"
                  >
                    <span className="material-symbols-outlined text-xs">error</span>
                    {fieldErrors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-on-surface-variant text-xs font-label tracking-[0.15em] uppercase mb-2">
                Password
              </label>
              <div className="relative">
                {/* Left icon */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/50 text-lg pointer-events-none">
                  lock
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className={`w-full bg-surface-container text-on-surface placeholder:text-on-surface-variant/30
                    rounded-full py-3.5 pl-11 pr-12
                    border transition-all duration-200 outline-none
                    focus:border-primary/50 focus:bg-surface-container-high focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)]
                    ${fieldErrors.password ? 'border-red-500/50' : 'border-primary/15 hover:border-primary/25'}
                  `}
                />
                {/* Show / hide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-primary transition-colors"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPass ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {/* Field error */}
              <AnimatePresence>
                {fieldErrors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0  }}
                    exit={{   opacity: 0, y: -4  }}
                    className="flex items-center gap-1.5 text-red-400 text-xs mt-2 ml-2"
                  >
                    <span className="material-symbols-outlined text-xs">error</span>
                    {fieldErrors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading  ? { scale: 0.98 } : {}}
              className={`
                w-full py-4 rounded-full font-bold font-label tracking-[0.2em] uppercase text-sm
                transition-all duration-300 mt-2
                flex items-center justify-center gap-3
                ${isLoading
                  ? 'bg-primary/30 text-on-primary/50 cursor-not-allowed'
                  : 'gold-gradient text-on-primary shadow-lg hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]'
                }
              `}
            >
              {isLoading ? (
                <>
                  {/* Spinner */}
                  <span className="w-4 h-4 rounded-full border-2 border-on-primary/20 border-t-on-primary animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">
                    login
                  </span>
                  Access Admin Panel
                </>
              )}
            </motion.button>

          </form>

          {/* ── Divider ──────────────────────────────────── */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-primary/10" />
            <span className="text-on-surface-variant/30 font-label text-xs tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-primary/10" />
          </div>

          {/* ── Back to website link ─────────────────────── */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-on-surface-variant/50 hover:text-primary transition-colors text-sm font-label"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Back to Trikaal Website
            </Link>
          </div>

        </div>

        {/* Bottom subtle border accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      </motion.div>

      {/* ── Bottom label ─────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-0 right-0 text-center text-on-surface-variant/20 font-label text-xs tracking-widest"
      >
        TRIKAAL · ADMIN PORTAL · RESTRICTED ACCESS
      </motion.p>

    </div>
  )
}

export default LoginPage
