import Link from "next/link";

export default function ErrorPage({ errorMessage }) {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="flex flex-col items-center p-4 rounded-lg bg-blue-600 shadow-md">
        <h1 className="text-white">An error occurred</h1>
        <p className="text-white">{errorMessage}</p>
        <Link href="/" className="mt-4 text-white">
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
