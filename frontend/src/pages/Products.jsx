import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

function Products() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    loadInitialProducts();
  }, []);

  // Search Products
  const handleSearch = (searchText) => {

    if (searchText.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredProducts(filtered);

  };

  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4">
        Fashion Products
      </h2>

      <SearchBar onSearch={handleSearch} />

      <div className="row">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))

        ) : (

          <div className="text-center mt-5">
            <h4>No Products Found</h4>
          </div>

        )}

      </div>

    </div>

  );

}

export default Products;