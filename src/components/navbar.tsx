import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="bg-dark">
      <div className="container flex justify-between mx-auto">
        <nav className="flex">
          <NavLink
            to="/"
            className="items-center px-3 py-6 mr-4 text-3xl font-bold tracking-widest inflex-flex text-charcoal hover:text-orange cursive lg:text-4xl"
          >
            Justin
          </NavLink>
          <NavLink
            to="/about"
            className="inline-flex items-center px-2 py-2 my-6 text-sm rounded text-charcoal hover:text-orange lg:text-base"
          >
            About Me
          </NavLink>
          <NavLink
            to="/project"
            className="inline-flex items-center px-2 py-2 my-6 text-sm rounded text-charcoal hover:text-orange lg:text-base"
          >
            Projects
          </NavLink>
          <NavLink
            to="/blog"
            className="inline-flex items-center px-2 py-2 my-6 text-sm rounded text-charcoal hover:text-orange lg:text-base"
          >
            Blog
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
