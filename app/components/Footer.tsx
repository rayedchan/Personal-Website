"use client";

import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const name: string = "Raymond Chan";
  const { isDark } = useTheme();
  return (
    <footer
      className={`py-8 px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 ${
        isDark ? "border-gray-800" : "border-gray-300"
      }`}
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
