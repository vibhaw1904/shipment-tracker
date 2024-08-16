'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-3xl text-blue-400 font-bold mb-4 md:mb-0">
          TrackWise
        </Link>
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0'>
        <Link href="/user" className="text-gray-300 hover:text-white transition duration-300">
            Home
          </Link>
          <Link href="/orders" className="text-gray-300 hover:text-white transition duration-300">
            Your orders
          </Link>
          <Link href="/buy" className="text-gray-300 hover:text-white transition duration-300">
            Place order
          </Link>
          <Link href="/admin" className="text-gray-300 hover:text-white transition duration-300">
            Admin
          </Link>
        </div>
        <div className="flex items-center">
          {session ? (
            <>
              <span className="text-white mr-4">
                Hello, {session.user?.name || 'User'}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('credentials', { callbackUrl: '/' })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;