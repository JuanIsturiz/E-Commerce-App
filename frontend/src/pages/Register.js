import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, reset } from "../features/auth/authSlice";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    password2: "",
  });
  const { first, last, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/users/dashboard");
    }
    dispatch(reset());
  }, [isSuccess, user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Register
        </h1>
      </section>
      {isError && <h3 style={{ color: "red" }}>{message}</h3>}
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="first">First Name:</label>
            <input
              type="text"
              id="first"
              name="first"
              placeholder="ex: John"
              value={first}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last">Last Name:</label>
            <input
              type="text"
              id="last"
              name="last"
              placeholder="ex: Doe"
              value={last}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ex: johndoe@gmail.com"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="ex: abc123"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Password Confirmation:</label>
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="ex: abc123"
              value={password2}
              onChange={onChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </section>
    </>
  );
};

export default Register;
