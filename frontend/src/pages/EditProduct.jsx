import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);

        setProduct({
          title: res.data.title,
          description: res.data.description,
          category: res.data.category,
          price: res.data.price,
          stock: res.data.stock,
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadProduct();
  }, [id]);

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
      await API.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Updated Successfully");
      navigate("/manage-products");

    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            className="form-control mb-3"
            placeholder="Product Name"
            value={product.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            className="form-control mb-3"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            className="form-control mb-3"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            className="form-control mb-3"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            className="form-control mb-3"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={handleImage}
          />

          <button className="btn btn-warning w-100">
            Update Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;