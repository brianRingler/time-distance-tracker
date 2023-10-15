import { useState } from "react";
import { UilUserCircle } from "@iconscout/react-unicons";
import { signOut } from "next-auth/react";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    setIsOpen(prev => !prev)
    signOut({ redirect: true, callbackUrl: "/" });
  }
  return (
    <div className="inline-flex rounded-md items-center">
      <a onClick={handleDropDown} className="cursor-pointer">
        <UilUserCircle size="26" color="#FFFFFF" />
      </a>
      <div className="relative">

        {isOpen && (
          <div className="absolute right-0 z-10 w-56 mt-10 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">

            <div className="user-dropdown-content">
              <div className="p-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                  My Account
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                  Settings
                </a>
                <a
                onClick={handleSignOut}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
