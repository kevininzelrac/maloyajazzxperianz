import { NavLink } from "@remix-run/react";

export default function Menu({ handleClick }: { handleClick?: () => void }) {
  return (
    <nav className="menu">
      <NavLink to="Dashboard" prefetch="intent" onClick={handleClick}>
        Dashboard
      </NavLink>
      <NavLink to="Settings" prefetch="intent" onClick={handleClick}>
        Settings
      </NavLink>
      <NavLink to="editor" prefetch="intent" onClick={handleClick}>
        Editor
      </NavLink>
      <NavLink to="editor2" prefetch="intent" onClick={handleClick}>
        Editor2
      </NavLink>
      <NavLink to="signout" prefetch="intent" onClick={handleClick}>
        Sign Out
      </NavLink>
    </nav>
  );
}
