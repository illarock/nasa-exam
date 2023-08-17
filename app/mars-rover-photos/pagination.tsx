import styles from "./mrp.module.scss";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: any;
  currentPage: number;
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const prevLimit = currentPage - 3;
  const nextLimit = currentPage + 3;

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button
          className={styles.prev}
          key={previousPage}
          onClick={() => setCurrentPage(previousPage)}
        >
          <span>Previous</span>
        </button>
      )}

      {currentPage > 1 && prevLimit > 1 && <div>...</div>}

      {pages.map((page, index) =>
        page >= prevLimit && nextLimit > index ? (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page == currentPage ? styles.active : ""}
          >
            {page}
          </button>
        ) : (
          ""
        )
      )}

      {currentPage !== pages.length && nextLimit < pages.length && (
        <div>...</div>
      )}

      {currentPage !== pages.length && (
        <button
          className={styles.next}
          key={nextPage}
          onClick={() => setCurrentPage(nextPage)}
        >
          <span>Next</span>
        </button>
      )}
    </div>
  );
};

export default Pagination;
