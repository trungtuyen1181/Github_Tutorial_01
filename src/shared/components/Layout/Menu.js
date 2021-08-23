import React from "react";
import { Link } from "react-router-dom";
const Menu = ({ item }) => {
  return (
    <div id="menu" className="collapse navbar-collapse">
      <ul>
        {item.map((category) => {
          return (
            <li className="menu-item">
              <Link to={`/category-${category._id}`}>{category.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Menu;
