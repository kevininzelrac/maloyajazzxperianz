import { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { CiCalendar } from "react-icons/ci";

import ClientOnly from "~/utils/clientOnly";
import Loading from "~/components/loading";
import Badge from "~/components/badge";
import Status from "~/components/tools/status";
import Audience from "~/components/tools/audience";
import Update from "~/components/tools/update";
import Delete from "~/components/tools/delete";
import usePriviledges from "~/hooks/usePriviledges";
import Editor, { links as SlateLinks } from "~/components/slate/editor";

import styles from "./styles.css";
export let links: LinksFunction = () => [
  ...SlateLinks(),
  { rel: "stylesheet", href: styles },
];

import loader from "./loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
import Back from "~/components/back";
export { loader, action, ErrorBoundary };

export default function Post() {
  const { user, post } = useLoaderData<typeof loader>();
  const [isDraft, setIsDraft] = useState(false);
  const { isAdmin, isEditor, isAuthor } = usePriviledges(user);

  return (
    <main>
      <Back />
      <article>
        <section>
          <header>
            <div>
              <Badge author={post.author} />
              <nav className="tools">
                <span>
                  {(isAdmin || (isEditor && isAuthor(post.author.id))) && (
                    <Status
                      user={user}
                      type={post.type.title}
                      id={post.id}
                      status={post.status}
                    />
                  )}
                  {(isAdmin || isEditor) && (
                    <Audience
                      user={user}
                      type={post.type.title}
                      id={post.id}
                      audience={post.audience}
                    />
                  )}
                </span>
                <span>
                  {isAuthor(post.author.id) && (
                    <Update
                      post={post}
                      isDraft={isDraft}
                      setIsDraft={setIsDraft}
                    />
                  )}
                  {(isAdmin || isAuthor(post.author.id)) && (
                    <Delete id={post.id} type={post.type.title} />
                  )}
                </span>
              </nav>
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
            <Editor key={post.content} onChange={setIsDraft}>
              {post.content}
            </Editor>
          </ClientOnly>
        </section>
      </article>
    </main>
  );
}
