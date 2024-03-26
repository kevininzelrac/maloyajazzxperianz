import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import Nav from ".";
import Menu from "../account/menu";
import { NavLink } from "@remix-run/react";
import { MdAccountCircle } from "react-icons/md";

export default function Responsive({
  user,
  data,
}: {
  user: {
    id: string;
    firstname: string;
    avatar: string;
    role: string;
  } | null;
  data: any;
}) {
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
          <Nav pages={data} handleClick={handleClick} />
          {user?.id ? (
            <div>
              <img src={user.avatar} width={50} />
              <span style={{ color: "ghostwhite" }}>{user.firstname}</span>
              <Menu user={user} />
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
}
