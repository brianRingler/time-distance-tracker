"use client";
import Link from "next/link";
// import DropDownMenu from './MenuBarRadix1';
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: '/' });
  };

  if (session) {
    console.log("session in navbar: ", session);
  } else console.log("no session in navbar");

  return (
    <nav className="py-3 bg-primary">
      <div className="container">
        <div className="flex items-center">
          <Link href="/" className=" px-[1rem] mr-4  bg-gray-200">
            LOGO
          </Link>
          <div className="nav-collapse hidden  w-full justify-between md:flex md:items-center ">
            <ul className="flex flex-row">
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

            <div className=" ml-auto flex flex-row items-center">
         
              {!session ? (
                <Link className="btn" href="/login">
                  <button>Log In / Register</button>
                </Link>
              ) : null}

              {session && (
                <button className="w-30 h-20 bg-yellow-200" onClick={handleSignOut}>
                  sign out
                </button>
              )}
            </div>
          </div>
          <button className="bg-yellow-500 border-0 py-4 px-3  md:mt-0 md:hidden ml-auto">
            Hamburger Menu
          </button>
        </div>
      </div>
    </nav>
  );
}
