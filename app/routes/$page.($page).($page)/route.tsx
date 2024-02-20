import { useLoaderData, useLocation } from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import ErrorBoundary from "~/components/errorBoundary";
import ReadOnly from "~/components/slate/readOnly";
import Status from "~/components/status";
import Delete from "~/components/delete";
//import Header from "~/components/header";
//import Badge from "~/components/badge";
import Edit from "~/components/edit";
import loader from "./loader";
import styles from "./styles.css";
import Transition from "~/components/transition";
import ClientOnly from "~/utils/clientOnly";
import Loading from "~/components/loading";
import { FaUserLock, FaUsers } from "react-icons/fa";
import Audience from "~/components/audience";

export { loader, ErrorBoundary };

export const meta: MetaFunction = ({ params }) => [
  { title: params.page },
  { name: "description", content: params.page },
];

export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Index() {
  const { user, page } = useLoaderData<typeof loader>();
  const { key, pathname } = useLocation();
  let isAuthor = user?.id === page.authorId;
  let isAdmin = user?.role === "ADMIN";

  return (
    <Transition>
      <main key={key} className="page">
        <article>
          <div className="tools">
            {user?.id && <Status status={page.status!} />}
            {user?.id && <Audience audience={page.audience} />}
            {isAuthor! && <Edit to={pathname} />}
            {(isAdmin! || isAuthor!) && (
              <Delete id={page.id} type={page.type} />
            )}
          </div>
          <ClientOnly fallback={<Loading />}>
            <ReadOnly>{page?.content}</ReadOnly>
          </ClientOnly>
          {/* {user.id && <Header {...page} />} */}
          {/* user.id && <Badge {...page} /> */}
        </article>
      </main>
    </Transition>
  );
}
