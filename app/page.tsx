"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const name = "Raymond Chan";
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setIsDark(saved === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-100"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full backdrop-blur-md z-50 border-b transition-colors duration-300 ${
          isDark ? "bg-black/50 border-gray-800" : "bg-white/50 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a
                href="#home"
                className={`transition-colors ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Home
              </a>
              <a
                href="#about"
                className={`transition-colors ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                About
              </a>
              <a
                href="#projects"
                className={`transition-colors ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Projects
              </a>
              <a
                href="#skills"
                className={`transition-colors ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Skills
              </a>
              <a
                href="#contact"
                className={`transition-colors ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Contact
              </a>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                {name}
              </span>
            </h1>
            <p
              className={`text-xl sm:text-2xl mb-8 max-w-3xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Software Engineer | Stock Investor | Pokémon Collector
            </p>
            <p
              className={`text-lg mb-12 max-w-2xl mx-auto ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Passionate about building innovative solutions, investing in the
              markets, and collecting rare Pokémon products.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#projects"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className={`px-8 py-3 border rounded-lg transition-colors font-semibold ${
                  isDark
                    ? "border-gray-600 text-white hover:border-gray-400"
                    : "border-gray-400 text-gray-900 hover:border-gray-600"
                }`}
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          isDark ? "bg-black/30" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl font-bold mb-12 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className={`text-lg mb-6 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                I'm a passionate software developer with a strong background in
                building scalable web applications. I love turning complex
                problems into simple, beautiful, and intuitive solutions.
              </p>
              <p
                className={`text-lg mb-6 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                With experience in modern web technologies, I specialize in
                creating responsive and user-friendly applications that deliver
                exceptional user experiences.
              </p>
              <p
                className={`text-lg ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or learning about the
                latest trends in software development.
              </p>
            </div>
            <div
              className={`p-8 rounded-lg border transition-colors duration-300 ${
                isDark
                  ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-gray-800"
                  : "bg-gradient-to-br from-blue-50 to-purple-50 border-gray-300"
              }`}
            >
              <h3
                className={`text-2xl font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Quick Facts
              </h3>
              <ul
                className={`space-y-3 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">▹</span>
                  Location: Your City, Country
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">▹</span>
                  Education: Your Degree/University
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">▹</span>
                  Experience: X Years
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">▹</span>
                  Focus: Full Stack Development
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl font-bold mb-12 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div
              className={`rounded-lg overflow-hidden border hover:border-blue-500 transition-all hover:transform hover:scale-105 ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                  : "bg-white border-gray-300 shadow-lg"
              }`}
            >
              <div className="relative w-full h-60">
                <Image
                  src="/projects/Course-Dependency-Graph.png"
                  alt="Course Dependency Graph Project"
                  fill
                />
              </div>
              <div className="p-6">
                <h3
                  className={`text-2xl font-semibold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Course Dependency Graph
                </h3>
                <p
                  className={`mb-4 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Builds a course dependency graph using arbor.js to visualize
                  prerequisites, estimate minimum semesters needed, and optimize
                  course scheduling.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    JavaScript
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark
                        ? "bg-green-500/20 text-green-300"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    JQuery
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    HTML/CSS
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark
                        ? "bg-purple-500/20 text-purple-300"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    arbor.js
                  </span>
                </div>
                <a
                  href="https://rayedchan.github.io/CourseDependencyGraph/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Project →
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div
              className={`rounded-lg overflow-hidden border hover:border-blue-500 transition-all hover:transform hover:scale-105 ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                  : "bg-white border-gray-300 shadow-lg"
              }`}
            >
              <div className="relative w-full h-60">
                <Image
                  src="/projects/Sudoku-Solver.png"
                  alt="Sudoku Solver Project"
                  fill
                />
              </div>
              <div className="p-6">
                <h3
                  className={`text-2xl font-semibold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Sudoku Solver
                </h3>
                <p
                  className={`mb-4 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Solves 9×9 Sudoku puzzles using known strategies such as
                  Pointing Pairs/Triples, Naked and Hidden Pairs/Triples,
                  Box-Line Reduction, and Bowman's Bingo.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    JavaScript
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    HTML/CSS
                  </span>
                </div>
                <a
                  href="http://rayedchan.github.io/SudokuSolver/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Project →
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div
              className={`rounded-lg overflow-hidden border hover:border-blue-500 transition-all hover:transform hover:scale-105 ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                  : "bg-white border-gray-300 shadow-lg"
              }`}
            >
              <div className="relative w-full h-60">
                <Image
                  src="/projects/Oracle-Stack.png"
                  alt="Oracle Stack Blog"
                  fill
                />
              </div>
              <div className="p-6">
                <h3
                  className={`text-2xl font-semibold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Oracle Stack
                </h3>
                <p
                  className={`mb-4 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  A technical blog focused on Oracle Fusion Middleware products
                  such as Oracle Identity Manager. It features how-to guides on
                  installation, configuration, development, and practical usage.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark
                        ? "bg-orange-500/20 text-orange-300"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    Blogger
                  </span>
                </div>
                <a
                  href="https://oraclestack.blogspot.com/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Project →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          isDark ? "bg-black/30" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-4xl font-bold mb-12 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend */}
            <div
              className={`p-6 rounded-lg border transition-colors duration-300 ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                  : "bg-white border-gray-300 shadow-lg"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 flex items-center ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <span className="text-2xl mr-2">🎨</span>
                Frontend
              </h3>
              <ul
                className={`space-y-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <li>JavaScript</li>
                <li>React</li>
                <li>Angular</li>
                <li>HTML5 & CSS3</li>
              </ul>
            </div>

            {/* Backend */}
            <div
              className={`p-6 rounded-lg border transition-colors duration-300 ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                  : "bg-white border-gray-300 shadow-lg"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 flex items-center ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <span className="text-2xl mr-2">⚙️</span>
                Backend
              </h3>
              <ul
                className={`space-y-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <li>Node.js</li>
                <li>Next.js</li>
                <li>Nest.js</li>
                <li>Java</li>
              </ul>
            </div>

            {/* Database */}
            <div
              className={`p-6 rounded-lg border transition-colors duration-300 ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                  : "bg-white border-gray-300 shadow-lg"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 flex items-center ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <span className="text-2xl mr-2">💾</span>
                Database
              </h3>
              <ul
                className={`space-y-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <li>MongoDB</li>
                <li>Redis</li>
                <li>PostgreSQL</li>
                <li>MySQL</li>
              </ul>
            </div>

            {/* Tools */}
            <div
              className={`p-6 rounded-lg border transition-colors duration-300 ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                  : "bg-white border-gray-300 shadow-lg"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 flex items-center ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <span className="text-2xl mr-2">🛠️</span>
                Tools
              </h3>
              <ul
                className={`space-y-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <li>Git & GitHub</li>
                <li>Mabl</li>
                <li>VS Code</li>
                <li>Vercel</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-4xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Get In Touch
          </h2>
          <p
            className={`text-xl mb-12 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/rayedchan"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://github.com/rayedchan"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/rayedchan"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://youtube.com/@redatjam"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://secure.runescape.com/m=hiscore/compare?user1=redatjam"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg
                className="w-8 h-8"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <circle cx="512" cy="512" r="512" />
                <path
                  fill={isDark ? "black" : "white"}
                  d="M370.8 512 256 740.6l167.4.2L629.7 330h62.4l-91.4 181.9L692 693.8H577.2l23.4 46.8H768L653.2 512 768 283.4l-167.4-.2-16.4 32.7L394.3 694h-62.4l91.3-181.9L332 330.3h114.8l-23.4-46.9H256z"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
