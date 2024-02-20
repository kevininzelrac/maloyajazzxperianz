import { useNavigate } from "@remix-run/react";
import { BiSolidEditAlt } from "react-icons/bi";

export default function Edit({ to }: { to: string }) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(to + "/Edit")} data-tooltip="edit">
      <BiSolidEditAlt />
    </button>
  );
}
