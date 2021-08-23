import React from "react";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
const HomePage = () => {
    const [latestProduct, setLatestProduct] = React.useState([]);
    const [featuredProduct, setFeaturedProduct] = React.useState([]);

    React.useEffect(() => {
        // Get Latest Product
        getProducts({
            params: {
                limit: 6,
            }
        }).then((res) => {
            setLatestProduct(res.data.data.docs);
            // console.log(res.data.data.docs);
        });
        // Get Featured Product
        getProducts({
            params: {
                limit: 6,
                "filter[is_featured]": true,
            }
        }).then((res) => {
            setFeaturedProduct(res.data.data.docs);
        });

    }, []);

    return (
        <>
            {/*	Feature Product	*/}
            <div className="products">
                <h3>Sản phẩm nổi bật</h3>
                <div className="product-list card-deck">
                    {
                        featuredProduct.map((product) => {
                            return <ProductItem item={product} />
                        })
                    }
                </div>
            </div>
            {/*	End Feature Product	*/}
            {/*	Latest Product	*/}
            <div className="products">
                <h3>Sản phẩm mới</h3>
                <div className="product-list card-deck">
                    {
                        latestProduct.map((product) => {
                            return <ProductItem item={product} />
                        })
                    }
                </div>
            </div>
            {/*	End Latest Product	*/}
        </>
    )
}
export default HomePage;