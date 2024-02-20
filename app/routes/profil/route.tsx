import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import loader from "./loader";
import ErrorBoundary from "~/components/errorBoundary";
import { LinksFunction } from "@remix-run/node";
import styles from "./styles.css";
import Transition from "~/components/transition";
import AddButton from "~/components/addButton";
export { loader, ErrorBoundary };

export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => [
  { title: "Profil" },
  { name: "description", content: "Profil" },
];

export default function Profil() {
  const { user } = useLoaderData<typeof loader>();
  const { firstname, lastname, email, avatar, role } = user;
  return (
    <Transition>
      <main>
        <article>
          <AddButton user={user} />
          <section>
            <strong>
              {firstname} {lastname}
            </strong>
            <p>{email}</p>
            <p>{role}</p>
            <img src={avatar} width={40} />
            <h3>TODO : Account</h3>
            <p>Update email</p>
            <p>Update Profile Picture</p>
            <p>Change Password</p>
          </section>
          <br />

          <section>
            <h3>TODO : Dashboard</h3>
            <p>Last Subscribers</p>
            <p>Last Posts</p>
            <p>Last Comments</p>
            <p>Last Sales</p>
            <p>Last Messages</p>
          </section>
          <Link className="primary" to="/signout">
            Sign Out
          </Link>
        </article>
      </main>
    </Transition>
  );
}
