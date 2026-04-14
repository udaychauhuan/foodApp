import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      {/* Image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
        alt="food"
        className="w-40 mb-6 animate-bounce"
      />

      {/* 404 Text */}
      <h1 className="text-6xl font-bold text-orange-500 mb-2">404</h1>

      {/* Message */}
      <h2 className="text-2xl font-semibold mb-3">
        Oops! This page is not on the menu 🍕
      </h2>

      <p className="text-gray-600 mb-6">
        Looks like the page you're craving doesn't exist.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition"
      >
        🍔 Go Back Home
      </Link>
    </div>
  );
}