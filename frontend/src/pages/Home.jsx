import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";

function Home() {

  const products = [
    {
      _id: 1,
      title: "Men T-Shirt",
      category: "Men",
      price: 799,
      image: ""
    },
    {
      _id: 2,
      title: "Women's Dress",
      category: "Women",
      price: 1499,
      image: ""
    },
    {
      _id: 3,
      title: "Sports Shoes",
      category: "Shoes",
      price: 1999,
      image: ""
    },
    {
      _id: 4,
      title: "Luxury Watch",
      category: "Accessories",
      price: 2999,
      image: ""
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-dark text-white rounded p-5 text-center">

        <h1>Fashion Shopping Portal</h1>

        <p className="lead">
          Discover the latest fashion collections.
        </p>

        <button className="btn btn-warning btn-lg">
          Shop Now
        </button>

      </div>

      <SearchBar />

      {/* Categories */}
      <div className="mt-5">

        <h2 className="text-center mb-4">
          Categories
        </h2>

        <div className="row text-center">

          <div className="col-md-3">
            <div className="card shadow p-4">
              👔
              <h5 className="mt-2">Men</h5>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-4">
              👗
              <h5 className="mt-2">Women</h5>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-4">
              👟
              <h5 className="mt-2">Shoes</h5>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-4">
              ⌚
              <h5 className="mt-2">Watches</h5>
            </div>
          </div>

        </div>

      </div>

      {/* Featured Products */}
      <div className="mt-5">

        <h2 className="text-center mb-4">
          Featured Products
        </h2>

        <div className="row">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      </div>

    </>
  );
}

export default Home;