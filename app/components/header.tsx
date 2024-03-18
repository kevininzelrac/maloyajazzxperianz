import { NavLink } from "@remix-run/react";
import { MdAccountCircle } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";
import { LogoLarge } from "~/svg";
import { useState } from "react";
import Account from "./account";
import Menu from "./account/menu";
import Nav from "./nav";

export default function Header({ user, data }: { user: any; data: any }) {
  return (
    <header>
      <h1 style={{ display: "none" }}>Maloya Jazz Xperianz</h1>
      <LogoLarge
        style={{ padding: ".2rem" }}
        className="LogoLarge"
        color="ghostwhite"
        height={80}
      />
      <Nav user={user} data={data} />
      <Responsive user={user} data={data} />
      {user?.id ? (
        <Account user={user} />
      ) : (
        <NavLink to="signin" prefetch="intent" className="signin">
          <MdAccountCircle />
        </NavLink>
      )}
    </header>
  );
}

const Responsive = ({ user, data }: { user: any; data: any }) => {
  const [display, setDisplay] = useState(false);
  const handleClick = () => setDisplay(false);
  return (
    <div className="responsive">
      <CgMenuGridO
        onClick={() => setDisplay(!display)}
        style={{
          color: "ghostwhite",
          width: "50px",
          height: "50px",
          border: "1px solid ghostwhite",
          borderRadius: "50%",
          padding: "5px",
          cursor: "pointer",
        }}
      />
      {display && (
        <div>
          <Nav user={user} data={data} handleClick={handleClick} />
          {user?.id ? (
            <div>
              <img src={user.avatar} width={50} />
              <span style={{ color: "ghostwhite" }}>{user.firstname}</span>
              <Menu handleClick={handleClick} />
            </div>
          ) : (
            <NavLink to="signin" prefetch="intent" className="signin">
              <MdAccountCircle />
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};
