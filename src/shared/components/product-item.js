/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { getImageProduct } from "../ultils";
import { Link } from "react-router-dom";

const ProductItem = ({ item }) => {
  return (
    <div className="product-item card text-center">
      <Link to={`/product-details-${item._id}`}>
        <img src={getImageProduct(item.image)} />
      </Link>
      <h4>
        <Link href={`/product-details-${item._id}`}>{item.name}</Link>
      </h4>
      <p>
        Giá Bán: <span>{item.price}đ</span>
      </p>
    </div>
  );
};

export default ProductItem;

/*
B1. gắn URL để tới Page Product (bao gồm cả ID)
B2. hoàn thiện Router cho Page Product
B3. Viết API lấy ra một sản phẩm duy nhất theo ID truyền vào
B4. Import data
B5. Xây dựng State
B6. Cập nhật dữ liệu cho State
B7. Render dữ liệu chi tiết sản phẩm
*/
