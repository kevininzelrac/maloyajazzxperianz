import { useLoaderData, useLocation } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

import { CiCalendar } from "react-icons/ci";

import Transition from "~/components/transition";
import ReadOnly from "~/components/slate/readOnly";
import Loading from "~/components/loading";
import Badge from "~/components/badge";
import Tools from "~/components/tools";

import ClientOnly from "~/utils/clientOnly";

export const meta: MetaFunction = ({ params }) => [
  { title: params.page },
  { name: "description", content: params.page },
];

import loader from "./loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, action, ErrorBoundary };

export default function Index() {
  const { user, page } = useLoaderData<typeof loader>();
  const { key } = useLocation();

  return (
    <Transition>
      <main key={key}>
        <article>
          {page.error ? (
            <span data-error>{page.error.message}</span>
          ) : (
            <section>
              <header>
                <div>
                  <Badge author={page.data.author} />
                  {user?.data && <Tools user={user.data} data={page.data} />}
                </div>
                <span>
                  <p>{page.data.category.title}</p>
                  <time>
                    <CiCalendar />
                    {new Date(page.data.createdAt).toLocaleDateString("fr")}
                  </time>
                </span>
                <h3>{page.data.title}</h3>
              </header>

              <ClientOnly fallback={<Loading />}>
                <ReadOnly>{page.data.content}</ReadOnly>
              </ClientOnly>
            </section>
          )}
        </article>
      </main>
    </Transition>
  );
}
