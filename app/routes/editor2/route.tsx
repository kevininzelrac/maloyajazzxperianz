import {
  NavLink,
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { ReactNode, useEffect, useState } from "react";
import { LinksFunction } from "@remix-run/node";

import { MdMenu } from "react-icons/md";
import { CgClose } from "react-icons/cg";

import Delete from "~/components/tools/delete";

import styles from "./styles.css";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import loader from "./loader";
import action from "./action";
export { loader, action };

export type contextType = {
  user: { id: string };
  isDraft: boolean;
  setIsDraft: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function New() {
  const { user, types } = useLoaderData<typeof loader>();
  const params = useParams();
  const [isDraft, setIsDraft] = useState(false);
  const [transform, setTransform] = useState(false);

  const handleClick = () => setTransform((prev) => !prev);

  return (
    <>
      <button className="aside" onClick={handleClick}>
        {transform ? <MdMenu /> : <CgClose />}
      </button>
      <main
        key={params.post}
        style={{
          transition: "all .4s ease-in-out",
          transform: transform ? "translateX(0%)" : "translateX(-50%)",
        }}
      >
        {params.type ? (
          <Outlet
            context={{
              user,
              isDraft,
              setIsDraft,
            }}
          />
        ) : (
          <article
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              padding: "1rem",
            }}
          >
            <h2>Choose a type</h2>
          </article>
        )}
        <aside>
          <nav>
            {types.error ? (
              <span data-error>{types.error.message}</span>
            ) : (
              types.data?.map((type) => (
                <Type key={type.id} type={type} handleClick={handleClick}>
                  {type.categories!.map((category) => (
                    <Category
                      key={category.id}
                      type={type}
                      category={category}
                      handleClick={handleClick}
                    >
                      {category.posts!.map((post) => (
                        <Post
                          key={post.id}
                          type={type}
                          category={category}
                          post={post}
                          isDraft={isDraft}
                          handleClick={handleClick}
                        />
                      ))}
                    </Category>
                  ))}
                </Type>
              ))
            )}
          </nav>
        </aside>
      </main>
    </>
  );
}

const Type = ({
  type,
  handleClick,
  children,
}: {
  type: any;
  handleClick: () => void;
  children: ReactNode;
}) => {
  const context = useOutletContext<contextType>();
  return (
    <>
      <div>
        <NavLink
          to={`/editor2/${type.title}`}
          style={{ fontWeight: "bold" }}
          onMouseUp={handleClick}
        >
          {type.title}
        </NavLink>
      </div>
      {children}
    </>
  );
};

const Category = ({
  type,
  category,
  handleClick,
  children,
}: {
  type: any;
  category: any;
  handleClick: () => void;
  children: ReactNode;
}) => {
  return (
    <>
      <div>
        <NavLink
          to={`/editor2/${type.title}/${category.title}`}
          onMouseUp={handleClick}
          style={{
            marginLeft: "1rem",
            fontWeight: "bold",
          }}
        >
          {category.title}
        </NavLink>
        <Delete
          id={category.id}
          type="category"
          redirect={`/editor2/${type.title}`}
        />
      </div>
      {children}
    </>
  );
};

const Post = ({
  type,
  category,
  post,
  isDraft,
  handleClick,
}: {
  type: any;
  category: any;
  post: any;
  isDraft: boolean;
  handleClick: () => void;
}) => {
  const params = useParams();
  const [draft, setDraft] = useState(false);
  useEffect(() => {
    setDraft(
      Boolean(
        localStorage.getItem(
          `slate/editor2/${type.title}/${
            category.title
          }/${post.title.replaceAll(" ", "%20")}`
        )
      )
    );
  }, [isDraft]);

  return (
    <div key={params.post}>
      <NavLink
        to={`/editor2/${type.title}/${category.title}/${post.title}`}
        onMouseUp={handleClick}
        style={{
          fontStyle: draft ? "italic" : "normal",
          marginLeft: "2rem",
        }}
      >
        {post.title} {draft && "*"}
      </NavLink>
    </div>
  );
};
