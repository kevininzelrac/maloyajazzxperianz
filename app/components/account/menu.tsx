import { LuLogOut } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";

import usePriviledges from "~/hooks/usePriviledges";
import Button from "../button";
import Add from "../tools/add";

export default function Menu({ user }: { user: { id: string; role: string } }) {
  const { isAdmin, isEditor } = usePriviledges(user);

  return (
    <nav className="menu">
      {(isAdmin || isEditor) && <Add type="page" />}
      {(isAdmin || isEditor) && (
        <Button to="Dashboard">
          <MdDashboardCustomize />
        </Button>
      )}
      <Button to="Settings">
        <IoSettingsOutline />
      </Button>
      <Button to="SignOut">
        <LuLogOut />
      </Button>
    </nav>
  );
}
