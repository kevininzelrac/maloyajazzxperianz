import { useMemo, useState } from "react";
import Menu from "./menu";
import { useNavigation } from "@remix-run/react";

export default function Account({
  user,
}: {
  user: { id: string; role: string; avatar: string };
}) {
  const [display, setDisplay] = useState(false);
  const handleClick = () => setDisplay(!display);
  const nav = useNavigation();

  useMemo(() => nav.state !== "idle" && display && handleClick(), [nav.state]);

  return (
    <div className="account">
      <img
        src={user.avatar}
        onClick={handleClick}
        className={display ? "avatar active" : "avatar"}
      />
      {display && <Menu user={user} />}
    </div>
  );
}
