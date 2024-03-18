import { User } from "@prisma/client";
import { NavLink } from "@remix-run/react";
import { LogoSmall } from "~/svg";
import Account from "../account";

export default function Nav({
  user,
  data,
  handleClick,
}: {
  user: any;
  data: any;
  handleClick?: () => void;
}) {
  return (
    <nav>
      <NavLink to="/" prefetch="intent" onClick={handleClick}>
        home
      </NavLink>
      <Recursive data={data} id={user?.id} handleClick={handleClick} />
      <NavLink to="shows" prefetch="intent" onClick={handleClick}>
        shows
      </NavLink>
      <NavLink to="blog" prefetch="intent" onClick={handleClick}>
        blog
      </NavLink>
      <NavLink to="contact" prefetch="intent" onClick={handleClick}>
        contact
      </NavLink>
    </nav>
  );
}

const Recursive = ({
  data,
  id,
  parent = "",
  handleClick,
}: {
  data: any;
  id: User["id"] | null;
  parent?: string;
  handleClick?: () => void;
}) => {
  return data?.map(({ title, children }: any) =>
    children.length > 0 ? (
      <div key={title}>
        {id ? (
          <NavLink
            to={parent + "/" + title}
            prefetch="intent"
            onClick={handleClick}
          >
            {title}
          </NavLink>
        ) : (
          <label>{title}</label>
        )}
        <div>
          <Recursive data={children} id={id} parent={parent + "/" + title} />
        </div>
      </div>
    ) : (
      <NavLink
        to={parent + "/" + title}
        key={title}
        prefetch="intent"
        onClick={handleClick}
      >
        {title}
      </NavLink>
    )
  );
};
