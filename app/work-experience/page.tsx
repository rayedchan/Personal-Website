"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext";

export default function WorkExperience() {
  const { isDark } = useTheme();
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-100"
      }`}
    >
      <Header />

      <Footer />
    </div>
  );
}
