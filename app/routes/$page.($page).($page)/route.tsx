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
          <section>
            <header>
              <div>
                <Badge author={page.author} />
                {user && <Tools user={user} data={page} />}
              </div>
              <span>
                <p>{page.category.title}</p>
                <time>
                  <CiCalendar />
                  {new Date(page.createdAt).toLocaleDateString("fr")}
                </time>
              </span>
              <h3>{page.title}</h3>
            </header>

            <ClientOnly fallback={<Loading />}>
              <ReadOnly>{page.content}</ReadOnly>
            </ClientOnly>
          </section>
        </article>
      </main>
    </Transition>
  );
}
