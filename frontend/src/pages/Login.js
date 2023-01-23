import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

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
    dispatch(loginUser(formData));
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Log In
        </h1>
      </section>
      {isError && message}
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="ex: abc123"
              value={password}
              onChange={onChange}
            />
          </div>
          <button type="submit">Log In</button>
        </form>
      </section>
    </>
  );
};

export default Login;
