"use client";

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { useSession, signOut } from 'next-auth/react';  // Importing useSession and signOut from next-auth
import Image from 'next/image'; // Import Image component for optimization

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);  // State for user menu
  const userMenuRef = useRef(null);  // Reference for the user menu dropdown

  const { data: session } = useSession();  // Using useSession to get session data

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  // Close user menu when clicking outside
  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setUserMenuOpen(false);
    }
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Sign out function triggered by button click
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); // Redirects to the homepage after signing out
  };

  return (
    <nav className="bg-white transition-all duration-300 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Logo and Navigation */}
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                {/* Using Image component for optimization */}
                <Image
                  className="h-8 w-auto"
                  src="https://www.saylaniwelfare.com/static/media/logo_saylaniwelfare.22bf709605809177256c.png"
                  alt="Saylani LMS"
                  width={150}
                  height={50}
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link href="/" passHref>
                  <a
                    className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-black hover:text-white"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                </Link>
                <Link href="#" passHref>
                  <a className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-black hover:text-white">
                    Team
                  </a>
                </Link>
                <Link href="#" passHref>
                  <a className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-black hover:text-white">
                    Projects
                  </a>
                </Link>
                <Link href="#" passHref>
                  <a className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-black hover:text-white">
                    Calendar
                  </a>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side (Profile, SignIn Button) */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Show SignIn button if session is null */}
            {!session ? (
              <Link href="/signin" passHref>
                <Button>Sign In</Button>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                {/* Show user profile and email */}
                <span className="font-mono text-1xl">{session.user.email}</span>
              </div>
            )}

            {/* User menu button */}
            {session && (
              <div className="relative ml-3" ref={userMenuRef}>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  onClick={toggleUserMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full border-2 border-blue-500"
                    src={session.user.image || "https://www.placecage.com/200/200"}
                    alt="User avatar"
                    width={32}
                    height={32}
                  />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      Admin
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      Update Profile
                    </Link>

                    {/* Sign out button */}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden transition-all duration-500" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link href="/" passHref>
              <a
                className="block rounded-md bg-blue-500 px-3 py-2 text-base font-medium text-white text-center"
                onClick={closeMobileMenu}
              >
                Dashboard
              </a>
            </Link>
            <Link href="#" passHref>
              <a
                className="block rounded-md bg-green-500 px-3 py-2 text-base font-medium text-white text-center"
                onClick={closeMobileMenu}
              >
                Team
              </a>
            </Link>
            <Link href="#" passHref>
              <a
                className="block rounded-md bg-red-500 px-3 py-2 text-base font-medium text-white text-center"
                onClick={closeMobileMenu}
              >
                Projects
              </a>
            </Link>
            <Link href="#" passHref>
              <a
                className="block rounded-md bg-purple-500 px-3 py-2 text-base font-medium text-white text-center"
                onClick={closeMobileMenu}
              >
                Calendar
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
