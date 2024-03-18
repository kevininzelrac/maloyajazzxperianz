import { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CiCalendar } from "react-icons/ci";
import { useState } from "react";

import Editor, { links as SlateLinks } from "~/components/slate/editor";
import Loading from "~/components/loading";
import Error from "~/components/error";
import ClientOnly from "~/utils/clientOnly";

import Badge from "~/components/badge";
import Status from "~/components/tools/status";
import Audience from "~/components/tools/audience";
import Update from "~/components/tools/update";
import Delete from "~/components/tools/delete";

export let links: LinksFunction = () => [...SlateLinks()];

import loader from "./loader";
import action from "./action";
import usePriviledges from "~/hooks/usePriviledges";
export { loader, action };

export default function Post2() {
  const { user, post } = useLoaderData<typeof loader>();
  const [isDraft, setIsDraft] = useState(false);
  const { isAdmin, isEditor, isAuthor } = usePriviledges(user.data);

  return (
    <Error data={post}>
      {(data) => {
        return (
          <section>
            <header>
              <div>
                <Badge author={data!.author} />
                <nav className="tools">
                  <span>
                    {(isAdmin ||
                      (isEditor && isAuthor(post.data?.author.id!))) && (
                      <Status
                        user={user.data}
                        id={post.data!.id}
                        status={post.data!.status}
                      />
                    )}
                    {(isAdmin || isEditor) && (
                      <Audience
                        user={user.data!}
                        id={post.data!.id}
                        audience={post.data!.audience}
                      />
                    )}
                  </span>
                  <span>
                    {isAuthor(post.data!.author.id!) && (
                      <Update
                        id={post.data!.id}
                        isDraft={isDraft}
                        setIsDraft={setIsDraft}
                      />
                    )}
                    {(isAdmin || isAuthor(post.data!.author.id)) && (
                      <Delete id={data!.id} type={data!.type.title} />
                    )}
                  </span>
                </nav>
              </div>
              <span>
                <p>{data!.category.title}</p>
                <time>
                  <CiCalendar />
                  {new Date(data!.createdAt!).toLocaleDateString("fr")}
                </time>
              </span>
              <h3>{data!.title}</h3>
            </header>
            <ClientOnly fallback={<Loading />}>
              <Editor key={data!.content} onChange={setIsDraft}>
                {post.data!.content}
              </Editor>
            </ClientOnly>
          </section>
        );
      }}
    </Error>
  );
}
