import { useLoaderData, useOutletContext } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

import ClientOnly from "~/utils/clientOnly";

import Loading from "~/components/loading";
import Editor, { links as SlateLinks } from "~/components/slate/editor";
import Delete from "~/components/tools/delete";
import Status from "~/components/tools/status";
import Audience from "~/components/tools/audience";
import Update from "~/components/tools/update";
import { contextType } from "../editor2/route";

export let links: LinksFunction = () => [...SlateLinks()];

import loader from "./loader";
import action from "./action";
import Badge from "~/components/badge";
import { CiCalendar } from "react-icons/ci";
export { loader, action };

export default function Post() {
  const { user, post } = useLoaderData<typeof loader>();
  const context = useOutletContext<contextType>();

  return (
    <article>
      {post.error ? (
        <span data-error>{post.error.message}</span>
      ) : (
        <section>
          <header>
            <div>
              <Badge author={post.data.author} />
              <nav className="tools">
                <span>
                  <Status
                    user={user.data!}
                    id={post.data.id}
                    status={post.data.status}
                  />
                  <Audience
                    user={user.data!}
                    id={post.data.id}
                    audience={post.data.audience}
                  />
                </span>
                <span>
                  <Update
                    isDraft={context.isDraft}
                    setIsDraft={context.setIsDraft}
                    id={post.data.id}
                  />
                  <Delete id={post.data.id} type={post.data.type.title} />
                </span>
              </nav>
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
            <Editor key={post.data.content} onChange={context.setIsDraft}>
              {post.data!.content}
            </Editor>
          </ClientOnly>
        </section>
      )}
    </article>
  );
}
