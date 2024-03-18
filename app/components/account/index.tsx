import { useState } from "react";
import Menu from "./menu";

export default function Account({ user }: { user: any }) {
  const [display, setDisplay] = useState(false);

  return (
    <div className="account">
      <img
        src={user.avatar}
        onClick={() => setDisplay(!display)}
        className={display ? "avatar active" : "avatar"}
      />

      {display && <Menu handleClick={() => setDisplay(false)} />}
    </div>
  );
}
