"use client";
import Link from "next/link";

export default function ErrorPage({ errorMessage }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center p-8 rounded-lg bg-white shadow-xl max-w-md">
        <img
          src="/images/sad-face.jpeg"
          alt="Sad face"
          className="w-32 h-32 mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
        <p className="text-lg text-gray-600">{errorMessage}</p>
        <Link
          href="/"
          className="mt-8 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out"
        >
          Cheer up and go back to homepage
        </Link>
      </div>
      <style jsx>{`
        @keyframes bounce {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        img {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
}
