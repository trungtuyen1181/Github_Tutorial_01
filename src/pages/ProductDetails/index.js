import React from "react";
import moment from "moment";
import { getImageProduct } from "../../shared/ultils";
import {
  getProduct,
  getCommentsProduct,
  createCommentProduct,
} from "../../services/Api";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../shared/constants/action-type";

const ProductDetailsPage = (props) => {
  const id = props.match.params.id;
  const [product, setProduct] = React.useState(null);
  const [comments, setComments] = React.useState(null);
  const [inputComment, setInputComment] = React.useState(null);
  const dispatch = useDispatch();
  const history = props.history;

  // Get Input
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputComment({ ...inputComment, [name]: value });
  };

  // Submit
  const onSubmitComment = (e) => {
    e.preventDefault();
    createCommentProduct(id, inputComment, {}).then((res) => {
      if (res.data.status == "success") {
        // Reset Form
        setInputComment({});

        // Get Comments by ID
        getComments(id);
      }
      console.log(res.data);
    });
  };

  const getComments = (id) => {
    getCommentsProduct(id, {}).then((res) => {
      setComments(res.data.data.docs);
      // console.log(res.data.data. docs);
    });
  };

  const addToCart = (type) => {
    if (product) {
      const { _id, name, image, price } = product;
      dispatch({
        type: ADD_TO_CART,
        payload: {
          _id,
          name,
          image,
          price,
          qty: 1,
        },
      });
    }
    if (type === "buy-now") {
      history.push("/cart");
    }
  };

  React.useEffect(() => {
    // Get Product Details
    getProduct(id, {}).then((res) => {
      // console.log(res.data.data);
      setProduct(res.data.data);
      getComments(id);
    });
  }, [id]);

  return (
    <>
      {/*	List Product	*/}
      <div id="product">
        <div id="product-head" className="row">
          <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
            <img src={getImageProduct(product?.image)} />
          </div>
          <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
            <h1>{product?.name}</h1>
            <ul>
              <li>
                <span>Bảo hành:</span> 12 Tháng
              </li>
              <li>
                <span>Đi kèm:</span> {product?.accessories}
              </li>
              <li>
                <span>Tình trạng:</span> {product?.status}
              </li>
              <li>
                <span>Khuyến Mại:</span> {product?.promotion}
              </li>
              <li id="price">Giá Bán (chưa bao gồm VAT)</li>
              <li id="price-number">{product?.price}đ</li>

              {product?.is_stock ? (
                <li className="text text-success" id="status">
                  Còn hàng
                </li>
              ) : (
                <li className="text text-danger" id="status">
                  Hết hàng
                </li>
              )}
            </ul>
            <div id="add-cart">
              <button
                onClick={() => addToCart("buy-now")}
                className="btn btn-warning mr-2"
              >
                Mua ngay
              </button>

              <button onClick={addToCart} className="btn btn-info">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
        <div id="product-body" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Đánh giá về {product?.name}</h3>
            {product?.details}
          </div>
        </div>
        {/*	Comment	*/}
        <div id="comment" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Bình luận sản phẩm</h3>
            <form method="post">
              <div className="form-group">
                <label>Tên:</label>
                <input
                  name="name"
                  required
                  type="text"
                  className="form-control"
                  onChange={onChangeInput}
                  value={inputComment?.name || ""}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  name="email"
                  required
                  type="email"
                  className="form-control"
                  id="pwd"
                  onChange={onChangeInput}
                  value={inputComment?.email || ""}
                />
              </div>
              <div className="form-group">
                <label>Nội dung:</label>
                <textarea
                  name="content"
                  required
                  rows={8}
                  className="form-control"
                  onChange={onChangeInput}
                  value={inputComment?.content || ""}
                />
              </div>
              <button
                onClick={onSubmitComment}
                type="submit"
                name="sbm"
                className="btn btn-primary"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
        {/*	End Comment	*/}
        {/*	Comments List	*/}
        {comments?.length && (
          <div id="comments-list" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              {comments.map((comment) => {
                const m = moment(comment.createdAt);
                return (
                  <div key={comment._id} className="comment-item">
                    <ul>
                      <li>
                        <b>{comment.name}</b>
                      </li>
                      <li>{m.fromNow()}</li>
                      <li>{comment.content}</li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/*	End Comments List	*/}
      </div>
      {/*	End Product	*/}
      <div id="pagination">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Trang trước
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Trang sau
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default ProductDetailsPage;
