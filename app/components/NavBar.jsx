"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import UserDropdown from "./UserDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const { data: session } = useSession();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    setMenuIsOpen((prev) => !prev);
    signOut({ redirect: true, callbackUrl: "/" });
  };

  useEffect(() => {
    const checkWindowSize = () => {
      if (window.innerWidth > 768) {
        setMenuIsOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (
        (menuIsOpen && !document.getElementById("sidebar-menu")) ||
        !document.getElementById("hamburger-menu").contains(event.target)
      ) {
        setMenuIsOpen(false);
      }
    };

    window.addEventListener("resize", checkWindowSize);
    document.addEventListener("mousedown", handleClickOutside);

    checkWindowSize();

    return () => {
      window.removeEventListener("resize", checkWindowSize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuIsOpen]);

  return (
    <nav className="py-3 bg-primary px-10 md:px-20 ">
      <div className="h-12 flex justify-between items-center">
        <div className="left flex items-center">
          <Link href="/" className=" px-[1rem] mr-4  bg-gray-200">
            LOGO
          </Link>
          <div className="hidden w-full justify-between md:flex md:items-center ">
            <ul className="flex flex-row gap-6 ml-10">
              <li>
                <Link href="/trips" className="nav-link">
                  <span>Trips</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="nav-link">
                  <span>Locations</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="right flex relative">
          <div className=" ml-auto hidden md:flex md:flex-row items-center gap-4 ">
            {session && <UserDropdown />}
            {!session ? (
              <Link className="nav-link" href="/login">
                Log In
              </Link>
            ) : null}

            {!session ? (
              <Link className="nav-link" href="/register">
                Register
              </Link>
            ) : null}
          </div>
        </div>

        <button
          onClick={handleMenu}
          id="hamburger-menu"
          className="relative z-10 block md:hidden text-white"
        >
          {/* Hamburger icon */}
          <FontAwesomeIcon icon={faBars} size="xl" />
          {/* Menu */}
          <nav
            id="sidebar-menu"
            className={`fixed transform top-[72px] right-0 w-full md:w-1/2 h-full max-w-md px-6 py-4 bg-white shadow-lg overflow-y-auto transition-transform duration-200 ease-in-out ${
              !menuIsOpen ? "translate-x-full" : "tranlate-x-0"
            } md:translate-x-0 md:static md:inset-auto  md:transition-none`}
          >
            {!session && (
              <ul className="text-black">
                <li className="cursor-pointer">
                  <Link href="/login">Log In</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </ul>
            )}

            {session && (
              <ul className="text-black">
                <li>My Account</li>
                <li>
                  <Link href="/trips">Trips</Link>
                </li>
                <li>
                  <Link href="/locations">Locations</Link>
                </li>
                <li>Settings</li>
                <li className="cursor-pointer">
                  <a onClick={handleSignOut}>Sign Out</a>
                </li>
                <li></li>
              </ul>
            )}
          </nav>
        </button>
      </div>
    </nav>
  );
}
