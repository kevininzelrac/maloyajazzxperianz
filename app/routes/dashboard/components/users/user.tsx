import { SerializeFrom } from "@remix-run/node";
import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import { Role } from "@prisma/client";
import { IoSaveSharp } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";

import Badge from "~/components/badge";

import action from "../../action";
import loader from "../../loader";

const User = ({
  user,
}: {
  user: Awaited<SerializeFrom<typeof loader>["users"]>[0];
}) => {
  const fetcher = useFetcher<typeof action>();
  const isLoading = fetcher.state === "loading";
  const [role, setRole] = useState(user.role);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRole(e.target.value as "ADMIN" | "EDITOR" | "BASIC" | "FOLLOWER");

  return (
    <section>
      <Badge author={user} />
      <time>
        Created on&nbsp;
        {new Date(user.createdAt!).toLocaleDateString("fr")}
      </time>

      <fetcher.Form method="PATCH">
        {Object.values(Role)
          .reverse()
          .filter((role) => role !== "ADMIN")
          .map((role) => (
            <label key={role}>
              <input type="hidden" name="type" value="user" />
              <input type="hidden" name="id" value={user.id} />
              <input
                type="radio"
                name="role"
                value={role}
                defaultChecked={role === user.role}
                onChange={handleChange}
              />
              &nbsp;
              {role}
            </label>
          ))}
        <button
          disabled={user.role === role}
          style={user.role !== role ? { border: "1px dashed crimson" } : {}}
        >
          {isLoading ? <GiSandsOfTime /> : <IoSaveSharp />}
        </button>
      </fetcher.Form>
      {fetcher.data?.error && <span data-error>{fetcher.data.error}</span>}
    </section>
  );
};
export default User;
