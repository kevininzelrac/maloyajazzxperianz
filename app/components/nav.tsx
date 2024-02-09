import { NavLink } from "@remix-run/react";

export default function Nav({ data, id }: any) {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" prefetch="intent">
          HOME
        </NavLink>
        <Recursive data={data} id={id} />
        <NavLink to="blog" prefetch="intent">
          BLOG
        </NavLink>
        <NavLink to="contact" prefetch="intent">
          CONTACT
        </NavLink>
        {id ? (
          <>
            <NavLink to="upload" prefetch="intent">
              UPLOAD
            </NavLink>
            <NavLink to="profil" prefetch="intent">
              PROFIL
            </NavLink>
            <NavLink to="add" prefetch="intent">
              +
            </NavLink>
          </>
        ) : (
          <NavLink to="signin" prefetch="intent">
            SIGN IN
          </NavLink>
        )}
      </nav>
    </>
  );
}

const Recursive = ({ data, id, parent = "" }: any) => {
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
