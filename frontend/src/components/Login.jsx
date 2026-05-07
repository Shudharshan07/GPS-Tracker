import { useState } from 'react';
import { Lock, Mail, Navigation } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export function Login() {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
            <Navigation className="h-7 w-7" strokeWidth={2} />
          </div>
          <h1 className="mb-1 text-xl font-medium text-white">
            GPS Tracking
          </h1>
          <p className="text-sm text-white/60">
            {isRegister ? 'Create an account' : 'Sign in to continue'}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.06] p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/70">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.08] px-4 py-2.5 focus-within:bg-white/[0.12] focus-within:ring-1 focus-within:ring-white/20 transition-colors">
                <Mail className="h-5 w-5 shrink-0 text-white/40" strokeWidth={2} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-white/70">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.08] px-4 py-2.5 focus-within:bg-white/[0.12] focus-within:ring-1 focus-within:ring-white/20 transition-colors">
                <Lock className="h-5 w-5 shrink-0 text-white/40" strokeWidth={2} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                  placeholder={isRegister ? 'Min 6 characters' : '••••••••'}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (isRegister ? 'Creating account...' : 'Signing in...') : (isRegister ? 'Create account' : 'Sign in')}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-white/50">
          {isRegister ? 'Already have an account?' : 'No account?'}{' '}
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {isRegister ? 'Sign in' : 'Create account'}
          </button>
        </p>
      </div>
    </div>
  );
}
