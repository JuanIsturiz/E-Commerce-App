import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { updatePassword } from "../features/auth/authSlice";
import { getItems } from "../features/cart/cartSlice";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading: isLoadingUser } = useSelector((state) => state.auth);
  const { cartId } = useSelector((state) => state.cart);
  const { orders, isLoading: isLoadingOrder } = useSelector(
    (state) => state.orders
  );

  const [passwords, setPasswords] = useState({
    password: {
      text: "",
      visibility: false,
    },
    password2: {
      text: "",
      visibility: false,
    },
  });
  const [show, setShow] = useState(false);
  const [error, setError] = useState({ is: false, msg: "" });
  const [success, setSuccess] = useState({ is: false, msg: "" });
  const { password, password2 } = passwords;

  const showForm = () => {
    setPasswords({
      password: {
        text: "",
        visibility: false,
      },
      password2: {
        text: "",
        visibility: false,
      },
    });
    setShow(!show);
  };

  const onPasswordText = (e) =>
    setPasswords((prev) => ({
      ...prev,
      [e.target.id]: {
        ...prev[e.target.id],
        text: e.target.value,
      },
    }));

  const onPasswordVisibility = (e) =>
    setPasswords((prev) => ({
      ...prev,
      [e.target.id]: {
        ...prev[e.target.id],
        visibility: !prev[e.target.id].visibility,
      },
    }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password.text || !password2.text) {
      setError({ is: true, msg: "Please supply both passwords" });
      setTimeout(() => {
        setError({ is: false, msg: "" });
      }, 3000);
    }
    if (password.text !== password2.text) {
      setError({ is: true, msg: "Passwords doesn't match, please try again" });
      setTimeout(() => {
        setError({ is: false, msg: "" });
      }, 3000);
    }
    const info = {
      userId: user.id,
      passwords: {
        password: passwords.password.text,
        password2: passwords.password2.text,
      },
    };
    const action = await dispatch(updatePassword(info));
    if (action.payload?.check) {
      setShow(false);
      setSuccess({ is: true, msg: "Password updated successfully!" });
      setTimeout(() => {
        setSuccess({ is: false, msg: "" });
      }, 3000);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!cartId) {
      return;
    }
    dispatch(getItems(user.id));
  }, [user, cartId, navigate, dispatch]);

  if (isLoadingUser || isLoadingOrder) {
    return <Spinner />;
  }

  return (
    <>
      <div className="main">
        <section className="heading">
          <h1>User Dashboard</h1>
          <h2>Quick summary of the user profile and transactions</h2>
        </section>
        <section className="content">
          <div className="profile">
            <h3>Profile</h3>
            <p>
              First name: <strong>{user.first}</strong>
            </p>
            <hr />
            <p>
              Last name: <strong>{user.last}</strong>
            </p>
            <hr />
            <p>
              Email: <strong>{user.email}</strong>
            </p>
            <hr />
            <h4 onClick={showForm}>{show ? "Cancel" : "Change Password"}</h4>
            {success && <h3 className="alert">{success.msg}</h3>}
            {show && (
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <div className="pass">
                    <input
                      type={!password.visibility ? "password" : "text"}
                      name="password"
                      id="password"
                      value={password.text}
                      onChange={onPasswordText}
                      required
                    />
                    <div id="password" onClick={onPasswordVisibility}>
                      {!password.visibility ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Confirm New Password</label>
                  <div className="pass">
                    <input
                      type={!password2.visibility ? "password" : "text"}
                      name="password2"
                      id="password2"
                      value={password2.text}
                      onChange={onPasswordText}
                      required
                    />
                    <div id="password2" onClick={onPasswordVisibility}>
                      {!password2.visibility ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                </div>
                <button type="submit">Update Password</button>
                {error.is && <h3 className="alert err">{error.msg}</h3>}
              </form>
            )}
          </div>
          <div className="transactions">
            <h3>Transactions</h3>
            <p>
              Cart ID: <strong>{cartId ? cartId : "No Cart Assigned"}</strong>
            </p>
            <hr />
            <p>Orders:</p>
            <div className="total-orders">
              <h5>Pending: </h5>
              <div className="color-qty">
                <div style={{ backgroundColor: "orange" }}></div>
                <p>{orders.filter((o) => o.status === "Pending").length}</p>
              </div>
            </div>
            <div className="total-orders">
              <h5>Success: </h5>
              <div className="color-qty">
                <div style={{ backgroundColor: "green" }}></div>
                <span>
                  {orders.filter((o) => o.status === "Success").length}
                </span>
              </div>
            </div>
            <div className="total-orders">
              <h5>Cancelled: </h5>
              <div className="color-qty">
                <div style={{ backgroundColor: "red" }}></div>
                <span>
                  {orders.filter((o) => o.status === "Cancelled").length}
                </span>
              </div>
            </div>
            <hr />
          </div>
        </section>
      </div>
    </>
  );
};

export default UserDashboard;
