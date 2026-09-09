import { Link } from "react-router-dom";
import { getProductImage } from "../services/productImage";

function ProductCard({ product }) {

  if (!product) {
    return null;
  }

  return (
    <div className="col-md-3 mb-4">
      <div className="card shadow h-100">

        <img
          src={getProductImage(product)}
          className="card-img-top"
          alt={product.title}
        />

        <div className="card-body">

          <h5>{product.title}</h5>

          <p>{product.category}</p>

          <h4 className="text-success">
            ₹{product.price}
          </h4>

          <Link
            to={`/product/${product._id}`}
            className="btn btn-dark w-100"
          >
            View Details
          </Link>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;