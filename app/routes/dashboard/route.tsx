import { LinksFunction } from "@remix-run/node";

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import Posts from "./components/posts";
import Users from "./components/users";
import Comments from "./components/comments";
import Likes from "./components/likes";

import loader from "./loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
import { useLoaderData } from "@remix-run/react";
import usePriviledges from "~/hooks/usePriviledges";
export { loader, action, ErrorBoundary };

export default function Dashboard4() {
  const { user } = useLoaderData<typeof loader>();
  const { isAdmin } = usePriviledges(user);
  return (
    <main>
      <Posts />
      {isAdmin && <Users />}
      <Comments />
      <Likes />
    </main>
  );
}
