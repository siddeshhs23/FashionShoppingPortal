import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialCart = async () => {
      try {
        const res = await API.get("/cart");
        setCart(res.data.cart || []);
      } catch (error) {
        console.log(error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    loadInitialCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data.cart || []);
    } catch (error) {
      console.log(error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {

      await API.delete(`/cart/${id}`);

      loadCart();

    } catch (error) {

      console.log(error);

    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Shopping Cart
      </h2>

      {loading ? (
        <div className="alert alert-secondary">Loading cart...</div>
      ) : cart.length === 0 ? (

        <div className="alert alert-info">
          Your Cart is Empty
        </div>

      ) : (

        <>

          <table className="table table-bordered">

            <thead className="table-dark">

              <tr>

                <th>Product</th>

                <th>Price</th>

                <th>Qty</th>

                <th>Total</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {cart.map((item) => (

                <tr key={item._id}>

                  <td>{item.title}</td>

                  <td>₹{item.price}</td>

                  <td>{item.quantity}</td>

                  <td>₹{item.price * item.quantity}</td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <h4 className="text-end">
            Grand Total : ₹{total}
          </h4>

          <div className="text-end mt-3">

            <Link
              to="/checkout"
              className="btn btn-success"
            >
              Checkout
            </Link>

          </div>

        </>

      )}

    </div>
  );

}

export default Cart;