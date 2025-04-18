import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // If already authenticated, redirect to account page
  if (isAuthenticated) {
    return <Navigate to="/account" />;
  }
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(email, password);
      navigate('/account');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-blue-900 hover:text-blue-800">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={formErrors.email}
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={formErrors.password}
                  fullWidth
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-blue-900 hover:text-blue-800">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              {error && (
                <div className="text-sm text-red-600">
                  {error}
                </div>
              )}
              
              <div>
                <Button
                  type="submit"
                  isLoading={loading}
                  fullWidth
                >
                  Sign in
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-center text-gray-600">
                <p>Email: demo@example.com</p>
                <p>Password: password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};