import { NavLink, useNavigate } from "@remix-run/react";
import { PiNotePencilBold } from "react-icons/pi";

export default function AddButton({ user }: any) {
  const to = useNavigate();
  return (
    <>
      {["ADMIN", "EDITOR"].includes(user?.role) && (
        <button
          onClick={() => to("/add")}
          className="add"
          data-tooltip="add new content"
        >
          <PiNotePencilBold />
        </button>
      )}
    </>
  );
}
