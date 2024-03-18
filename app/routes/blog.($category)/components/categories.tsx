import { NavLink, useParams } from "@remix-run/react";
import { SerializeFrom } from "@remix-run/node";
import loader from "../loader";

const Categories = ({
  user,
  categories,
}: {
  user: SerializeFrom<typeof loader>["user"];
  categories: SerializeFrom<typeof loader>["categories"];
}) => {
  const params = useParams();

  //let isAdmin = user.data?.role === "ADMIN";

  return (
    <nav>
      <header>
        <h3>Categories</h3>
      </header>
      {categories.error ? (
        <span data-error>{categories.error.message}</span>
      ) : (
        categories.data
          .filter(({ _count }) => _count.posts > 0)
          .map(({ id, title, _count }) => (
            <div key={id}>
              <NavLink
                to={title === params.category ? `/blog/` : `/blog/${title}`}
              >
                {title}
              </NavLink>
              {/* {isAdmin && <Delete id={id} type="category" />} */}
              {/* <span>{_count.posts}</span> */}
            </div>
          ))
      )}
    </nav>
  );
};

export default Categories;
