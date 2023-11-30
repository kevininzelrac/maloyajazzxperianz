import { loader } from "./loader";
import { Link, useLoaderData } from "@remix-run/react";
export { loader };

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
