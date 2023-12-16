import { Link, useLoaderData } from "@remix-run/react";

import { loader } from "./loader";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, ErrorBoundary };

export default function Profil() {
  const { firstname, email, avatar } = useLoaderData<typeof loader>();
  return (
    <main>
      <section>
        <h2>{firstname}</h2>
        <p>{email}</p>
        <img src={avatar} width={40} />
      </section>
      <Link to="/signout?index">Sign Out</Link>
    </main>
  );
}
