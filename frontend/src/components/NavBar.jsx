import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";
import { useQueryClient } from "@tanstack/react-query";

const NavBar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const queryClient = useQueryClient();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    queryClient.clear();
    navigate("/login");
  };

  const toggleMenu = () => setNavbarOpen((prev) => !prev);

  const linkBaseClasses =
    "px-2 py-1 rounded-md text-sm transition-colors duration-150";

  return (
    <div className="h-16 bg-custom-gradient z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-white/10 border border-white/30 flex items-center justify-center text-xs font-bold text-white">
            US
          </div>
          <h1 className="font-bold text-2xl sm:text-3xl text-white tracking-wide">
            URL <span className="font-extrabold">Shortner</span>
          </h1>
        </Link>

        {/* Links + theme toggle (desktop) */}
        <div className="hidden sm:flex items-center gap-4">
          <ul className="flex gap-6 items-center text-sm">
            <li>
              <Link
                to="/"
                className={`${linkBaseClasses} ${
                  path === "/"
                    ? "text-white bg-white/10 backdrop-blur-sm"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className={`${linkBaseClasses} ${
                  path === "/about"
                    ? "text-white bg-white/10 backdrop-blur-sm"
                    : "text-white/80 hover:text-white"
                }`}
              >
                About
              </Link>
            </li>

            {token && (
              <li>
                <Link
                  to="/dashboard"
                  className={`${linkBaseClasses} ${
                    path === "/dashboard"
                      ? "text-white bg-white/10 backdrop-blur-sm"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )}

            {!token && (
              <li>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-white text-rose-700 w-24 text-center text-sm font-semibold px-2 py-2 rounded-md hover:bg-rose-50 transition-colors"
                >
                  Sign up
                </Link>
              </li>
            )}

            {token && (
              <li>
                <button
                  onClick={onLogOutHandler}
                  className="inline-flex items-center justify-center bg-rose-700 text-white w-24 text-center text-sm font-semibold px-2 py-2 rounded-md hover:bg-rose-600 transition-colors"
                >
                  Log out
                </button>
              </li>
            )}
          </ul>

          <ThemeToggle />
        </div>

        {/* Mobile nav (links dropdown) */}
        <ul
          className={`sm:hidden flex flex-col gap-3 items-start text-sm text-white sm:static absolute left-0 top-[62px] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit pb-4" : "h-0 overflow-hidden"
          } transition-all duration-150 sm:h-fit sm:bg-transparent bg-custom-gradient w-full px-4`}
        >
          <li className="pt-3">
            <Link
              to="/"
              className={`${linkBaseClasses} ${
                path === "/"
                  ? "text-white bg-white/10 backdrop-blur-sm"
                  : "text-white/80 hover:text-white"
              }`}
              onClick={() => setNavbarOpen(false)}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className={`${linkBaseClasses} ${
                path === "/about"
                  ? "text-white bg-white/10 backdrop-blur-sm"
                  : "text-white/80 hover:text-white"
              }`}
              onClick={() => setNavbarOpen(false)}
            >
              About
            </Link>
          </li>

          {token && (
            <li>
              <Link
                to="/dashboard"
                className={`${linkBaseClasses} ${
                  path === "/dashboard"
                    ? "text-white bg-white/10 backdrop-blur-sm"
                    : "text-white/80 hover:text-white"
                }`}
                onClick={() => setNavbarOpen(false)}
              >
                Dashboard
              </Link>
            </li>
          )}

          {!token && (
            <li>
              <Link
                to="/register"
                className="inline-flex items-center justify-center bg-white text-rose-700 w-24 text-center text-sm font-semibold px-2 py-2 rounded-md hover:bg-rose-50 transition-colors"
                onClick={() => setNavbarOpen(false)}
              >
                Sign up
              </Link>
            </li>
          )}

          {token && (
            <li>
              <button
                onClick={() => {
                  setNavbarOpen(false);
                  onLogOutHandler();
                }}
                className="inline-flex items-center justify-center bg-rose-700 text-white w-24 text-center text-sm font-semibold px-2 py-2 rounded-md hover:bg-rose-600 transition-colors"
              >
                Log out
              </button>
            </li>
          )}

          {/* Theme toggle inside mobile menu */}
          <li className="pt-1">
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden flex items-center text-white"
        >
          {navbarOpen ? (
            <RxCross2 className="text-3xl" />
          ) : (
            <IoIosMenu className="text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
