import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="max-w-2xl">
        <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
          404 – Page Not Found
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-plum-700">
          The page you're looking for doesn't exist or has moved. Check the address, or head
          back to the start.
        </p>
        <Link
          to="/"
          className="mt-10 inline-block rounded-full bg-marigold px-7 py-3.5 text-base font-semibold text-plum-900 transition-colors hover:bg-plum-900 hover:text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}