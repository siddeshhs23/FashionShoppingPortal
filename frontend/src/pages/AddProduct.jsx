import { useState } from "react";
import API from "../services/api";

function AddProduct() {

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("stock", product.stock);

    if (image) {
      formData.append("image", image);
    }

    try {
      await API.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Added Successfully");

      setProduct({
        title: "",
        description: "",
        category: "",
        price: "",
        stock: "",
      });

      setImage(null);

    }catch (error) {
  console.log(error);

  console.log(error.response);

  alert(error.response?.data?.message || error.message);
}
  };

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Add Product
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            placeholder="Product Name"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />

          <textarea
            className="form-control mb-3"
            placeholder="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={handleImage}
          />

          <button className="btn btn-dark w-100">
            Add Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;