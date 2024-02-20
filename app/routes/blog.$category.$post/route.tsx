import { useLoaderData } from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import Badge from "~/components/badge";
import Back from "~/components/back";
import Header from "~/components/header";
import ErrorBoundary from "~/components/errorBoundary";
import ReadOnly from "~/components/slate/readOnly";
import loader from "./loader";
import styles from "./styles.css";
import Status from "~/components/status";
import Edit from "~/components/edit";
import Delete from "~/components/delete";
import Transition from "~/components/transition";
import ClientOnly from "~/utils/clientOnly";
import Loading from "~/components/loading";

export { loader, ErrorBoundary };

export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = ({ params }) => [
  { title: params.post },
  { name: "description", content: params.post },
];

export default function Index() {
  const { user, post } = useLoaderData<typeof loader>();
  let isAuthor = user?.id === post.authorId;
  let isAdmin = user?.role === "ADMIN";
  return (
    <>
      <Back />
      <Transition>
        <article>
          <div className="tools">
            {user?.id && <Status status={post.status} />}
            {isAuthor && (
              <Edit to={"/blog/" + post.category + "/" + post.title} />
            )}
            {(isAdmin || isAuthor) && <Delete id={post.id} type={post.type!} />}
          </div>
          <Header {...post} />
          <Badge {...post} />
          <ClientOnly fallback={<Loading />}>
            <ReadOnly>{post?.content}</ReadOnly>
          </ClientOnly>
          {[undefined, "FOLLOWER"].includes(user?.role) && (
            <section>
              <br />
              <h4>comments</h4>
              <p>TODO...</p>
            </section>
          )}
        </article>
      </Transition>
    </>
  );
}
