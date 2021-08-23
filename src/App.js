import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getCategories } from "./services/Api";
import store from "./redux-setup/store";
import { Provider } from "react-redux";

// Layout
import Header from "./shared/components/Layout/Header";
import Menu from "./shared/components/Layout/Menu";
import Slider from "./shared/components/Layout/Slider";
import Sidebar from "./shared/components/Layout/Sidebar";
import Footer from "./shared/components/Layout/Footer";

// Page
import HomePage from "./pages/Home";
import CategoryPage from "./pages/Category";
import ProductDetailsPage from "./pages/ProductDetails";
import SearchPage from "./pages/Search";
import CartPage from "./pages/Cart";
import SuccessPage from "./pages/Success";
import NotFoundPage from "./pages/NotFound";

const App = () => {
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    getCategories({}).then((res) => {
      setCategories(res.data.data.docs);
    });
  }, []);

  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          {/*	Header	*/}
          <Header />
          {/*	End Header	*/}
          {/*	Body	*/}
          <div id="body">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <nav>
                    <Menu item={categories} />
                  </nav>
                </div>
              </div>
              <div className="row">
                <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                  {/*	Slider	*/}
                  <Slider />
                  {/*	End Slider	*/}

                  <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/category-:id" component={CategoryPage} />
                    <Route
                      path="/product-details-:id"
                      component={ProductDetailsPage}
                    />
                    <Route path="/search" component={SearchPage} />
                    <Route path="/cart" component={CartPage} />
                    <Route path="/success" component={SuccessPage} />
                    <Route component={NotFoundPage} />
                  </Switch>
                </div>
                <Sidebar />
              </div>
            </div>
          </div>
          {/*	End Body	*/}
          <Footer />
          {/*	End Footer	*/}
        </BrowserRouter>
      </div>
    </Provider>
  );
};
export default App;
