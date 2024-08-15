'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await signIn('signup', {
      redirect: false,
      name,
      email,
      password,
    });

    setIsSubmitting(false);

    if (result?.ok) {
      router.push('/');
    } else {
      console.error('Failed to sign up');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-10 bg-blue-600 text-white font-medium rounded-md"
        >
          {isSubmitting ? 'Please wait...' : 'Sign Up'}
        </button>
      </form>
      <div className="flex items-center justify-center mt-6">
        <span className="text-gray-600">
          Already have an account?{' '}
          <Link href="/signin" className="text-blue-600 font-semibold hover:underline">
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
