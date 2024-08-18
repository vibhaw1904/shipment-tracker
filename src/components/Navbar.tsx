'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      router.push('/admin');
    }
    if (status === 'authenticated' && session?.user?.role === 'USER') {
      router.push('/user');
    }
  }, [status, session, router]);

  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl text-blue-400 font-bold">
          TrackWise
        </Link>
        <div className="flex space-x-4">
          <Link href={isAdmin?'/admin':'/user'} className="text-gray-300 hover:text-white transition duration-300">
            Home
          </Link>
          {session && !isAdmin && (
            <>
              <Link href="/orders" className="text-gray-300 hover:text-white transition duration-300">
                Your Orders
              </Link>
              <Link href="/placeOrder" className="text-gray-300 hover:text-white transition duration-300">
                Place Order
              </Link>
            </>
          )}
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
