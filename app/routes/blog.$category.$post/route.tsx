import { useLoaderData } from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import { CiCalendar } from "react-icons/ci";

import Badge from "~/components/badge";
import Back from "~/components/back";
import ReadOnly from "~/components/slate/readOnly";
import Transition from "~/components/transition";
import Loading from "~/components/loading";
import ClientOnly from "~/utils/clientOnly";

import loader from "./loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, action, ErrorBoundary };

import styles from "./styles.css";
import Tools from "~/components/tools";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = ({ params }) => [
  { title: params.post },
  { name: "description", content: params.post },
];

export default function Index() {
  const { user, post } = useLoaderData<typeof loader>();

  return (
    <Transition>
      <main>
        <Back />
        <article>
          {post.error ? (
            <span data-error>{post.error.message}</span>
          ) : (
            <section>
              <header>
                <div>
                  <Badge author={post.data.author} />
                  {user.data && <Tools user={user.data} data={post.data} />}
                </div>
                <span>
                  <p>{post.data.category.title}</p>
                  <time>
                    <CiCalendar />
                    {new Date(post.data.createdAt!).toLocaleDateString("fr")}
                  </time>
                </span>
                <h3>{post.data.title}</h3>
              </header>
              <ClientOnly fallback={<Loading />}>
                <ReadOnly>{post.data.content}</ReadOnly>
              </ClientOnly>
            </section>
          )}
          <section>comments</section>
        </article>
      </main>
    </Transition>
  );
}
