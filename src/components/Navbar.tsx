'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          MyApp
        </Link>
        <div>
          {session ? (
            <>
              <span className="text-white mr-4">
                Hello, {session.user?.name || 'User'}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('credentials', { callbackUrl: '/' })}
              className="bg-blue-500 text-white px-4 py-2 rounded"
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
