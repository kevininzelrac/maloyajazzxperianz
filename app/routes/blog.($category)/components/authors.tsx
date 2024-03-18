import { SerializeFrom } from "@remix-run/node";
import { useNavigation, useSearchParams } from "@remix-run/react";
import loader from "../loader";

const Authors = ({
  authors,
}: {
  authors: SerializeFrom<typeof loader>["authors"];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useNavigation();

  return (
    <nav>
      <header>
        <h3>Authors</h3>
      </header>
      {authors.error ? (
        <span data-error>{authors.error.message}</span>
      ) : (
        authors.data
          .filter(({ _count }) => _count.posts > 0)
          .map(({ id, firstname, _count }) => (
            <div key={id}>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  if (searchParams.get("author") === firstname) {
                    setSearchParams((prev) => {
                      prev.delete("author");
                      return prev;
                    });
                  } else {
                    setSearchParams((prev) => {
                      prev.set("author", firstname);
                      return prev;
                    });
                  }
                }}
                className={
                  searchParams.get("author") === firstname
                    ? state === "loading"
                      ? "pending"
                      : "active"
                    : ""
                }
              >
                {firstname}
              </a>
              {/* <span>{_count.posts}</span> */}
            </div>
          ))
      )}
    </nav>
  );
};

export default Authors;
