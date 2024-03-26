import { NavLink, useLoaderData, useParams } from "@remix-run/react";
import Delete from "~/components/tools/delete";
import usePriviledges from "~/hooks/usePriviledges";
import loader from "../loader";
import Add from "~/components/tools/add";

const Categories = () => {
  const { user, categories } = useLoaderData<typeof loader>();
  const { isAdmin, isEditor } = usePriviledges(user);
  const params = useParams();

  return (
    <nav>
      <header>
        <h3>Categories</h3>
        {(isAdmin || isEditor) && <Add type="category" />}
      </header>
      {categories.error ? (
        <div data-error>{categories.error.message}</div>
      ) : !categories.data.length ? (
        <div data-info>Category list empty</div>
      ) : (
        categories.data
          .filter(({ _count }) =>
            isAdmin || isEditor ? _count.posts >= 0 : _count.posts > 0
          )
          .map(({ id, title, _count }) => (
            <div key={id}>
              <NavLink
                to={title === params.category ? `/blog/` : `/blog/${title}`}
              >
                {title}
              </NavLink>
              <span>
                <small>{_count.posts}</small>
                {(isAdmin || isEditor) && <Add type="post" category={title} />}
                {isAdmin && <Delete id={id} type="category" />}
              </span>
            </div>
          ))
      )}
    </nav>
  );
};

export default Categories;
