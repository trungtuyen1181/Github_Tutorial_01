import React from "react";
import { useLocation, Link } from "react-router-dom";

const Pagination = ({ pages }) => {
  const { pathname, search } = useLocation();
  const query = new URLSearchParams(search);
  // console.log(pages);
  const { total, limit, currentPage, prev, next } = pages;
  const totalPages = Math.ceil(total / limit);

  function formatUrl(page) {
    query.set("page", page);
    return `${pathname}?${query.toString()}`;
  }

  function renderPagesHTML(delta = 2) {
    const pagesHtml = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === currentPage ||
        i === totalPages ||
        (i >= left && i <= right)
      ) {
        pagesHtml.push(i);
      }
    }
    return pagesHtml;
  }

  return (
    <ul className="pagination">
      {currentPage > 1 ? (
        <li className="page-item">
          <Link to={formatUrl(prev)} className="page-link" href="#">
            Trang trước
          </Link>
        </li>
      ) : null}

      {renderPagesHTML().map((item) => {
        return (
          <li className={`page-item ${currentPage === item && "active"}`}>
            <Link to={formatUrl(item)} className={`page-link `} href="#">
              {item}
            </Link>
          </li>
        );
      })}

      {currentPage < totalPages ? (
        <li className="page-item">
          <Link to={formatUrl(next)} className="page-link" href="#">
            Trang sau
          </Link>
        </li>
      ) : null}
    </ul>
  );
};
export default Pagination;
