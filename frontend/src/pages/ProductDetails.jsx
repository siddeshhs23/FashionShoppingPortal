import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { getProductImage } from "../services/productImage";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
        setError(
          error.response?.data?.message ||
          "Unable to load this product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // ===========================
  // Add To Cart
  // ===========================
  const addToCart = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please login before adding products to your cart");
      navigate("/login");
      return;
    }

    try {

      await API.post("/cart", {
        product: product._id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
      });

      alert("Product Added To Cart");
      navigate("/cart");

    } catch (error) {

      console.log(error);
      alert(error.response?.data?.message || "Failed To Add Product");

    }

  };

  if (loading) {
    return (
      <h3 className="text-center mt-5">
        Loading...
      </h3>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center mt-5">
        <h3>{error || "Product Not Found"}</h3>
        <button
          className="btn btn-dark mt-3"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (

    <div className="row mt-5">

      <div className="col-md-5">

        <img
          src={getProductImage(product)}
          className="img-fluid rounded shadow"
          alt={product.title}
        />

      </div>

      <div className="col-md-7">

        <h2>{product.title}</h2>

        <h4 className="text-success mt-3">
          ₹{product.price}
        </h4>

        <p className="mt-3">
          {product.description}
        </p>

        <h5>
          Category :
          <span className="text-primary">
            {" "}{product.category}
          </span>
        </h5>

        <h5 className="mt-3">
          Stock :
          <span className="text-danger">
            {" "}{product.stock}
          </span>
        </h5>

        <button
          className="btn btn-dark btn-lg mt-4"
          onClick={addToCart}
        >
          Add To Cart
        </button>

      </div>

    </div>

  );

}

export default ProductDetails;