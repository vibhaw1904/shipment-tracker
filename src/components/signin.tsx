'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await signIn('signin', {
      redirect: false,
      email,
      password,
    });

    setIsSubmitting(false);

    if (result?.ok) {
      router.push('/');
    } else {
      console.error('Failed to sign in');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="••••••••"
            required
          />
        </div>
       
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-10 bg-blue-600 text-white font-medium rounded-md"
        >
          {isSubmitting ? 'Please wait...' : 'Sign In'
}
        </button>
      </form>
      <div className="flex items-center justify-center mt-6">
        <span className="text-gray-600">
          Don&apos;t have an account yet?{' '}
          <Link
            href="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signin;
