import React, { useState } from "react";
import Layout from "../Layout/Layout";
import style from "../assets/css/product.module.css";
import burger from "../assets/burger.png";
import { Link } from "react-router-dom";
import { getProductById } from "../api/services/product.service";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
function Product() {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    const callAPi = async () => {
      try {
        const response = await getProductById(id);
        console.log("THIS: ",response.data);
        setProduct(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    callAPi();
  }, []);

  return (
    <Layout>
      <div className={style.container}>
        <div className={style.product_image}>
          <img src={product.image} className={style.product_pic} />
        </div>
        <div className={style.product_details}>
          <header>
            <h1 className={style.title}>{product.title}</h1>
            <span className={style.colorCat}>SCMS Cafe</span>
            <div className={style.price}>
              <span className={style.current}>Rs {product.price}</span>
            </div>
          </header>
          <article>
            <h5 style={{ color: "black" }}>Description</h5>
            <p>
              {parse(product?.description || "")}
            </p>
          </article>

          <div className={style.footer}>
            <button type="button">
              <i className="fa fa-2xl fa-credit-card" />
              <Link to={"/update-product"}>Update</Link>
            </button>
            <button type="button">
              <i className="fa fa-2xl fa-credit-card" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Product;
