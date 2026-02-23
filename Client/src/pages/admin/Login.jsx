import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, ArrowLeft, Lock, Mail, Terminal, Send, ShieldCheck, KeyRound } from 'lucide-react';

const Login = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme !== 'light';
  const navigate = useNavigate();

  // STEPS: 1 = Email Input, 2 = OTP Input
  const [step, setStep] = useState(1);

  const [state, setState] = useState({
    email: '',
    otp: '',
    isSubmitting: false,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const res = await fetch('http://localhost:201/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: state.email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.message || 'OTP sent to your email.');
        setStep(2); // Move to verification step
      } else {
        setError(data.message || 'Failed to send OTP. Ensure backend is running.');
      }
    } catch (err) {
      console.error('Network Error:', err);
      setError('Network error. Check if the server configuration is running on localhost:201.');
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const res = await fetch('http://localhost:201/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: state.email, otp: state.otp }),
      });

      const data = await res.json();

      if (res.ok) {
        // Success! Set token or localstorage if needed
        localStorage.setItem('adminToken', data.token);
        setSuccessMessage('Authentication Successful.');

        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      } else {
        setError(data.message || 'Invalid or expired OTP.');
      }
    } catch (err) {
      console.error('Verify Error:', err);
      setError('Verification network error.');
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#050505] flex relative overflow-hidden selection:bg-violet-500/30 selection:text-violet-200">

      {/* Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-[120px]" />

        {/* Tech Grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Left Side: Branding / Graphic */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between relative z-10 px-16 py-12 border-r border-gray-200 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-xl">

        <Link to="/" className="inline-flex items-center gap-2 group w-max">
          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 group-hover:text-violet-500 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="text-sm font-semibold tracking-wider text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Back to site</span>
        </Link>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 flex items-center justify-center p-4 shadow-xl shadow-violet-500/20"
          >
            <ShieldCheck className="text-white w-full h-full" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-black text-gray-900 dark:text-white leading-[1.1]"
          >
            Command <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500">
              Center.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-sm mt-4 font-light leading-relaxed gap-2"
          >
            Strict verification required. The system exclusively admits admins via time-limited OTP tokens.
          </motion.p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">NodeMailer OTP Protocol Active</span>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center items-center relative z-10 px-6 sm:px-12 md:px-20 py-12">

        {/* Mobile Back / Theme Toggles */}
        <div className="absolute top-8 left-6 sm:left-12 lg:left-auto lg:right-12 flex items-center justify-between lg:justify-end w-full lg:w-auto pr-12 lg:pr-0">
          <Link to="/" className="lg:hidden w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400">
            <ArrowLeft size={20} />
          </Link>

          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 flex items-center justify-center transition-colors hover:border-gray-300 dark:hover:border-white/20"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={String(isDark)}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={isDark ? 'text-yellow-400' : 'text-gray-600'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Login Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[420px]"
        >
          {/* Header */}
          <div className="text-center lg:text-left mb-10">
            <div className="lg:hidden w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 flex flex-col items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-500/20">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">System Auth</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-medium">
              {step === 1 ? 'Enter the admin email to request an access token.' : 'Enter the secure OTP sent to your inbox.'}
            </p>
          </div>

          <div className="space-y-5">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.9 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.9 }}
                  className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium text-center"
                >
                  {error}
                </motion.div>
              )}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.9 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.9 }}
                  className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium text-center"
                >
                  {successMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* STEP 1: Request OTP Form */}
              {step === 1 && (
                <motion.form
                  key="email-form"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  onSubmit={handleSendOtp}
                  className="space-y-6"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">Admin Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-violet-500 transition-colors">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-sm transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                        placeholder="admin@example.com"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileTap={!state.isSubmitting ? { scale: 0.98 } : {}}
                    disabled={state.isSubmitting}
                    type="submit"
                    className="relative w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold tracking-wide overflow-hidden transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                      {state.isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 dark:border-gray-900/30 border-t-white dark:border-t-gray-900 group-hover:border-white/30 group-hover:border-t-white rounded-full animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Secure Token</span>
                          <Send size={16} />
                        </>
                      )}
                    </div>
                  </motion.button>
                </motion.form>
              )}

              {/* STEP 2: Verify OTP Form */}
              {step === 2 && (
                <motion.form
                  key="otp-form"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  onSubmit={handleVerifyOtp}
                  className="space-y-6"
                >
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 ml-1">One-Time Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-violet-500 transition-colors">
                        <KeyRound size={18} />
                      </div>
                      <input
                        type="text"
                        name="otp"
                        value={state.otp}
                        onChange={handleChange}
                        required
                        maxLength={6}
                        className="w-full text-center tracking-[0.7em] pl-11 pr-4 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white font-mono text-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-sm transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                        placeholder="••••••"
                        autoFocus
                      />
                    </div>
                  </div>

                  <motion.button
                    whileTap={!state.isSubmitting ? { scale: 0.98 } : {}}
                    disabled={state.isSubmitting}
                    type="submit"
                    className="relative w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold tracking-wide overflow-hidden transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                      {state.isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 dark:border-gray-900/30 border-t-white dark:border-t-gray-900 group-hover:border-white/30 group-hover:border-t-white rounded-full animate-spin" />
                          <span>Verifying Token...</span>
                        </>
                      ) : (
                        <>
                          <span>Access System</span>
                          <Lock size={16} />
                        </>
                      )}
                    </div>
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => { setStep(1); setState(prev => ({ ...prev, otp: '' })) }}
                    className="w-full text-center text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    Use a different email address?
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Footer text */}
          <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500 font-medium">
            Protected by encryption protocols. <br /> Unauthorized access is strictly prohibited.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
