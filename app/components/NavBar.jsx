import Link from "next/link";
import Image from "next/image";
import Hamburger from "./Hamburger";

const links = [
  {
    id: 1,
    title: "Welcome",
    url: "/",
  },
  {
    id: 2,
    title: "Trips",
    url: "/trips",
  },
  {
    id: 3,
    title: "Locations",
    url: "/locations",
  },
  {
    id: 4,
    title: "Register",
    url: "/register",
  },
  {
    id: 5,
    title: "Login",
    url: "/login",
  },
];

export default function Navbar() {
  return (
    <nav className="bg-primary h-16 flex items-center justify-between text-xl px-8">
      <div className="flex items-center">
        <Image
          src="/images/car-header.jpg"
          alt="Image Car"
          height={50}
          width={50}
        />
      </div>
      <div className="flex items-center space-x-4">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className="text-white hover:text-text-dark hover:font-bold hover:bg-primary-light hover:bg-opacity-30 px-2 py-1 rounded-md transition duration-300"
          >
            {link.title}
          </Link>
        ))}
        <Hamburger links={links} />
      </div>
    </nav>
  );
}
