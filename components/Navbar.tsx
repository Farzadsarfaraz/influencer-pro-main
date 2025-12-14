"use client";

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Heart, 
  Search, 
  LogOut, 
  User,
  LogIn
} from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  console.log(session);
  const isLoading = status === "loading";

  if (isLoading) return null;

  if (!session && !pathname.startsWith('/auth/login')) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl text-gray-800">InfluencerFrame</span>
            </Link>
            
            <Link 
              href="/auth/login"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  if (session) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/influencers" className="flex items-center space-x-2">
                <Home className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-xl text-gray-800">InfluencerFrame</span>
              </Link>

              <div className="flex items-center space-x-6">
                <Link
                  href="/influencers"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    pathname === '/influencers'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Search className="h-5 w-5" />
                  <span>Discover</span>
                </Link>

                <Link
                  href="/favorites"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    pathname === '/favorites'
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  {session.user.image == null ? (
                    <User className='h-5 w-5 text-blue-600' />
                  ) : <img src={session.user.image} alt="mypro" className='h-full w-full text-blue-600 rounded-full' />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{session.user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">{session.user?.email}</p>
                </div>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return null;
}