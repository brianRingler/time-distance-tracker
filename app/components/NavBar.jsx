"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import UserDropdown from "./UserDropdown";
import { UilBars } from "@iconscout/react-unicons";

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

    window.addEventListener("resize", checkWindowSize);

    checkWindowSize();

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

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

          <button
            className=" border-0  md:mt-0 md:hidden ml-4"
            onClick={handleMenu}
          >
            <UilBars size="30" color="#FFFFFF" />
          </button>
        </div>
        {menuIsOpen && (
          <div onClick={handleMenu} className="absolute h-screen top-[72px] right-0 w-80 bg-white shadow-lg" >
            <div className={`${session ? "hidden" : ""}`}>
              <ul className="">
                <li className="cursor-pointer">
                  <Link href="/login">Log In</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </ul>
            </div>
            <div div className={`${!session ? "hidden" : ""}`}>
              <ul className="">
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
