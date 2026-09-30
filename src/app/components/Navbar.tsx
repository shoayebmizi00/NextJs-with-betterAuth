"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Link } from "@heroui/react";
import NextLink from "next/link";
import { useState } from "react";
import { buttonVariants } from "@heroui/styles";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = useSession();

  console.log("User session:", session);

  const links = (
    <>
      <li>
        <Link href="/" className="text-foreground">
          Home
        </Link>
      </li>

      <li>
        <Link href="/about" className="text-foreground">
          About
        </Link>
      </li>

      <li>
        <Link href="/services" className="text-foreground">
          Services
        </Link>
      </li>

      <li>
        <Link href="/contact" className="text-foreground">
          Contact Us
        </Link>
      </li>
    </>
  );

const authLinks = session?.user ? (
  <>
    <span className="text-sm font-medium">
      {session.user.name}
    </span>

    <button
      type="button"
      onClick={async () => {
        await signOut();
        setIsMenuOpen(false);
      }}
      className="button button--danger-soft px-5"
    >
      Logout
    </button>
  </>
) : (
  <>
    <NextLink
      href="/sign-in"
      className={buttonVariants({
        variant: "primary",
      })}
      onClick={() => setIsMenuOpen(false)}
    >
      Sign In
    </NextLink>

    <NextLink
      href="/sign-up"
      className={buttonVariants({
        variant: "primary",
      })}
      onClick={() => setIsMenuOpen(false)}
    >
      Sign Up
    </NextLink>
  </>
);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-200 bg-background/80 backdrop-blur-md">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-foreground">
          MyApp
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">{links}</ul>

        {/* Desktop Auth */}
        {!isPending && (
          <div className="hidden items-center gap-3 md:flex">{authLinks}</div>
        )}

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-default-200 bg-background md:hidden">
          <ul className="flex flex-col gap-2 p-4">{links}</ul>

          {!isPending && (
            <div className="flex flex-col gap-2 border-t border-default-200 p-4">
              {authLinks}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
