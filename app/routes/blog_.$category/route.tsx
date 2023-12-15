import { LinksFunction } from "@remix-run/node";
import { Await, Link, useLoaderData, useNavigate } from "@remix-run/react";
import { Suspense } from "react";
import { loader } from "./loader";
export { loader };
import ReadOnly from "~/components/slate/readOnly";
import image from "../../../public/blurryBkgrd.png";
import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Blog() {
  const { response } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
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
        {(posts) => {
          return (
            <section>
              {posts.map(({ createdAt, title, category, content, author }) => (
                <article key={title}>
                  <header
                    style={{
                      backgroundImage: "url(" + bkgrd(content) + ")",
                    }}
                  >
                    <Link to={title}>
                      <h3>{title}</h3>
                    </Link>
                    <b>{category}</b> écrit le{" "}
                    <time>{new Date(createdAt).toLocaleDateString("fr")}</time>
                    <div className="badge">
                      <img src={author?.avatar} width={30} height={30} />
                      <span>
                        <strong>{author?.firstname}</strong>
                        <br />
                        <i>{author?.lastname}</i>
                      </span>
                    </div>
                  </header>
                  <ReadOnly>{filterImg(content)}</ReadOnly>
                  <br />
                </article>
              ))}
            </section>
          );
        }}
      </Await>
    </Suspense>
  );
}

const bkgrd = (data: string) => {
  if (!data.includes("image")) return image;
  const { src } = JSON.parse(data).find(({ type }: any) => type === "image");

  return src ? src : image;
};

const filterImg = (data: any) => {
  if (!data.includes("image")) return data;
  const response = JSON.parse(data).filter(({ type }: any) => type !== "image");
  return JSON.stringify(response);
};
