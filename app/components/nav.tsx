import { User } from "@prisma/client";
import { NavLink } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function Nav({ user, data }: { user: any; data: any }) {
  const [scroll, setScroll] = useState(false);

  useEffect(
    () =>
      window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 290);
      }),
    []
  );

  return (
    <>
      <nav className={scroll ? "navbar scroll" : "navbar "}>
        <NavLink to="/" prefetch="intent">
          MJX
        </NavLink>
        <Recursive data={data} id={user?.id} />
        <NavLink to="shows" prefetch="intent">
          SHOWS
        </NavLink>
        <NavLink to="blog" prefetch="intent">
          BLOG
        </NavLink>
        <NavLink to="contact" prefetch="intent">
          CONTACT
        </NavLink>
        {user?.id ? (
          <>
            <NavLink to="profil" prefetch="intent">
              <img src={user.avatar} className="avatar" />
            </NavLink>
          </>
        ) : (
          <NavLink to="signin" prefetch="intent">
            AUTH
          </NavLink>
        )}
      </nav>
    </>
  );
}

const Recursive = ({
  data,
  id,
  parent = "",
}: {
  data: any;
  id: User["id"] | null;
  parent?: string;
}) => {
  return data?.map(({ title, children }: any) =>
    children.length > 0 ? (
      <div key={title}>
        {id ? (
          <NavLink to={parent + "/" + title}>{title}</NavLink>
        ) : (
          <label>{title}</label>
        )}
        <div>
          <Recursive data={children} id={id} parent={parent + "/" + title} />
        </div>
      </div>
    ) : (
      <NavLink to={parent + "/" + title} key={title}>
        {title}
      </NavLink>
    )
  );
};
