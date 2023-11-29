import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { loader } from "./loader";
export { loader };

export default function Blog() {
  const { response } = useLoaderData<typeof loader>();
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Await
        resolve={response}
        errorElement={
          <div style={{ color: "red" }}>
            Woops ! something weird just happened
          </div>
        }
      >
        {(posts) => (
          <section>
            {posts.map(({ title, content, author }) => (
              <article key={title}>
                <header>
                  <h3>{title}</h3>
                  <div className="badge">
                    <img src={author?.avatar} width={30} height={30} />
                    <span>
                      <strong>{author?.firstname}</strong>
                      <br />
                      <i>{author?.lastname}</i>
                    </span>
                  </div>
                </header>
                <p>{content}</p>
              </article>
            ))}
          </section>
        )}
      </Await>
    </Suspense>
  );
}
