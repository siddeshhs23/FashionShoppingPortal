import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    loadInitialProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      loadProducts();
      alert("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-4">
        <h2>Manage Products</h2>

        <Link className="btn btn-success" to="/add-product">
          + Add Product
        </Link>
      </div>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th width="180">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>

              <td>
                <img
                  src={
                    product.image
                      ? `http://localhost:5000${product.image}`
                      : "https://via.placeholder.com/70"
                  }
                  alt={product.title}
                  width="70"
                />
              </td>

              <td>{product.title}</td>

              <td>{product.category}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>
                <Link
                  className="btn btn-primary btn-sm me-2"
                  to={`/edit-product/${product._id}`}
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default ManageProducts;