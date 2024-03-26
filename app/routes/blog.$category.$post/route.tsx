import { useLoaderData } from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import { CiCalendar } from "react-icons/ci";

import ClientOnly from "~/utils/clientOnly";
import Badge from "~/components/badge";
import Back from "~/components/back";
import ReadOnly from "~/components/slate/readOnly";
import Transition from "~/components/transition";
import Loading from "~/components/loading";
import Tools from "~/components/tools";
import Comments from "./components/comments";
import Reply from "./components/reply";

import loader from "./loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, action, ErrorBoundary };

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = ({ params }) => [
  { title: params.post },
  { name: "description", content: params.post },
];

export default function Index() {
  const { user, post, comments } = useLoaderData<typeof loader>();

  return (
    <Transition>
      <main>
        <Back />
        <article>
          <section>
            <header>
              <div>
                <Badge author={post.author} />
                {user && <Tools user={user} data={post} />}
              </div>
              <span>
                <p>{post.category.title}</p>
                <time>
                  <CiCalendar />
                  {new Date(post.createdAt).toLocaleDateString("fr")}
                </time>
              </span>
              <h3>{post.title}</h3>
            </header>
            <ClientOnly fallback={<Loading />}>
              <ReadOnly>{post.content}</ReadOnly>
            </ClientOnly>
          </section>
          {user && (
            <section className="comments">
              <h4>Comments</h4>
              <Comments user={user} comments={comments} />
              <Reply user={user} postId={post.id} parentId={post.id} />
            </section>
          )}
        </article>
      </main>
    </Transition>
  );
}
