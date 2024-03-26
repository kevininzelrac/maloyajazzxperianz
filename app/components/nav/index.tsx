//import { User } from "@prisma/client";
import { NavLink } from "@remix-run/react";
import { SerializeFrom } from "@remix-run/node";
import loader from "../../loader";

export default function Nav({
  pages,
  handleClick,
}: {
  pages: SerializeFrom<typeof loader>["pages"]["data"];
  handleClick?: () => void;
}) {
  return (
    <nav>
      <NavLink to="/" prefetch="intent" onClick={handleClick}>
        home
      </NavLink>
      {/* <Recursive pages={nav} id={userId} handleClick={handleClick} /> */}
      {pages?.map(({ title }) => (
        <NavLink to={title} key={title} prefetch="intent" onClick={handleClick}>
          {title}
        </NavLink>
      ))}
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

// const Recursive = ({
//   pages,
//   id,
//   parent = "",
//   handleClick,
// }: {
//   pages: any;
//   id?: User["id"];
//   parent?: string;
//   handleClick?: () => void;
// }) => {
//   return pages?.map(({ title, children }: any) =>
//     children?.length > 0 ? (
//       <div key={title}>
//         {id ? (
//           <NavLink
//             to={parent + "/" + title}
//             prefetch="intent"
//             onClick={handleClick}
//           >
//             {title}
//           </NavLink>
//         ) : (
//           <label>{title}</label>
//         )}
//         <div>
//           <Recursive pages={children} id={id} parent={parent + "/" + title} />
//         </div>
//       </div>
//     ) : (
//       <NavLink
//         to={parent + "/" + title}
//         key={title}
//         prefetch="intent"
//         onClick={handleClick}
//       >
//         {title}
//       </NavLink>
//     )
//   );
// };
