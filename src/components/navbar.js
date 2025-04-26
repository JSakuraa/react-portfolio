import React from "react";
import { NavLink } from "react-router-dom";

export default function Example() {
  return (
    <header className="bg-dark">
      <div className="container mx-auto flex justify-between">
        <nav className="flex">
          <NavLink
            to=""
            exact="true"
            className="inflex-flex items-center py-6 px-3 mr-4 text-charcoal hover:text-orange text-3xl font-bold cursive tracking-widest lg:text-4xl"
          >
            Justin
          </NavLink>
          <NavLink
            to="/about"
            className="inline-flex items-center py-2 px-2 my-6 rounded text-charcoal hover:text-orange text-sm lg:text-base"
          >
            About Me
          </NavLink>
          <NavLink
            to="/projectsMasonry"
            className="inline-flex items-center py-2 px-2 my-6 rounded text-charcoal hover:text-orange text-sm lg:text-base"
          >
            Projects
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
