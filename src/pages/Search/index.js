import React from "react";
import ProductItem from "../../shared/components/product-item";
import { getProducts } from "../../services/Api";
import Pagination from "../../shared/components/Pagination";

const SearchPage = (props) => {
  const query = new URLSearchParams(props.location.search);
  const q = query.get("q");
  const page = query.get("page") || 1;

  const [pages, updatePages] = React.useState({
    total: 0,
    limit: 12,
    currentPage: page,
  });

  const [products, updateProducts] = React.useState([]);

  React.useEffect(() => {
    getProducts({
      params: {
        name: q,
        limit: 12,
        page: page,
      },
    }).then(({ data }) => {
      updateProducts(data.data.docs);
      updatePages({ ...pages, ...data.data.pages });
    });
  }, [q, page, pages]);

  return (
    <>
      {/*	List Product	*/}
      <div className="products">
        <div id="search-result">
          Kết quả tìm kiếm với từ khóa <span>{q}</span>
        </div>
        <div className="product-list card-deck">
          {products.map((product) => {
            return <ProductItem key={product._id} item={product} />;
          })}
        </div>
      </div>
      {/*	End List Product	*/}
      <div id="pagination">
        <Pagination pages={pages} />
      </div>
    </>
  );
};
export default SearchPage;
