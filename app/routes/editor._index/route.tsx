import { NavLink, useLoaderData } from "@remix-run/react";

import loader from "./loader";
import Error from "~/components/error";
export { loader };

export default function Editor() {
  const { types } = useLoaderData<typeof loader>();

  return (
    <section>
      <Error data={types}>
        {(data) => (
          <nav>
            {data!.map(({ id, title }) => (
              <div key={id}>
                <NavLink to={title}>{title}</NavLink>
              </div>
            ))}
          </nav>
        )}
      </Error>
    </section>
  );
}
