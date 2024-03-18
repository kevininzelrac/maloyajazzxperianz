import { Await, useLoaderData, useLocation } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { Suspense, useState } from "react";

import { CgClose } from "react-icons/cg";
import { MdMenu } from "react-icons/md";

import Transition from "~/components/transition";
import Loading from "~/components/loading";
import Card from "./components/card";
import Categories from "./components/categories";
import Authors from "./components/authors";

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import loader from "./loader";
import action from "./action";
import ErrorElement from "~/components/errorElement";
export { loader, action };

export default function Blog() {
  const { user, categories, authors, posts } = useLoaderData<typeof loader>();
  const { key } = useLocation();
  const [display, setDisplay] = useState(true);

  const handleClick = () => setDisplay((prev) => !prev);

  return (
    <main key={key}>
      <Transition>
        <section>
          <Suspense fallback={<Loading />} key={key}>
            <Await resolve={posts} errorElement={<ErrorElement />}>
              {(posts) =>
                posts.map((post) => (
                  <Card key={post.id} user={user} post={post} />
                ))
              }
            </Await>
          </Suspense>
        </section>
      </Transition>
      <aside
        style={{
          transition: "all 0.4s ease-in-out",
          marginRight: display ? "0%" : "-50%",
        }}
      >
        <Categories user={user} categories={categories} />
        <Authors authors={authors} />
      </aside>
      <button className="aside" onClick={handleClick}>
        {display ? <CgClose /> : <MdMenu />}
      </button>
    </main>
  );
}
