import React, { useEffect } from "react";
import { makeArray } from "../../helpers/makeArray";
import ReactPaginate from "react-paginate";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import "./pagination.css";

export const Pagination = ({ count, page, setPage, setPages }) => {
  const limit = 15;
  const handlePageClick = (e) => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
    setPage(e.selected);
  };
  useEffect(() => {
    if (count) {
      setPages(makeArray(Math.ceil(count / limit)) - 1);
    }
  }, [count, limit]);
  return (
    <div className="pagination-box">
      <div>
        <ReactPaginate
          pageClassName="pagItem"
          previousClassName="pagItem next   "
          previousLinkClassName="page-link"
          nextClassName="pagItem next"
          nextLinkClassName="page-link "
          breakLabel="..."
          breakClassName="pagItem"
          forcePage={page}
          activeClassName="ActivePagItem"
          nextLabel={<KeyboardArrowRightIcon />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={count}
          previousLabel={<KeyboardArrowLeftIcon />}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
        />
      </div>
    </div>
  );
};
