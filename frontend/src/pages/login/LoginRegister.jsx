import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api/api";
import logoImage from "@/assets/logo.jpg";
// import "@/globals.css"
import styles from "./LoginRegister.module.css";
// eslint-disable-next-line react/prop-types
const LoginRegister = ({type}) => {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      console.log("hi" + JSON.stringify(response.data));
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.log("error: ", err);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/sign-up", { name,email, password });
      console.log("hi" + JSON.stringify(response.data));
      navigate("/login"); // Redirect to login on success
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      console.log("error: ", err);
    }
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles.header}>
        <img src={logoImage} alt="logo image" />
        <h1>Welcome to Our Collaborative management system</h1>
      </div>
      <div className={styles['login-container']}>
        <h1>{type==="login"?"Login":"Sign-up"}</h1>
        <form onSubmit={type==="login"?handleSubmitLogin:handleSubmitRegister}>
          {type==="register" && <input 
            type="text"
            placeholder="Name"  
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{type==="login"?"Login":"Sign-up"}</button>

          <p>
            {type==="login"?"Don't have an account? ":"Already have an account? "}
            <a
              onClick={() => {
                type==="login"?navigate("/register"):navigate("/login");
              }}
            >
              {type==="login"?"Sign-up":"Login"}
            </a>
          </p>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <div className={styles.footer}>
        <p>&copy; 2025 Task management. All Rights Reserved.</p>
        <p className={styles.creator}>Created by: IsMabDev</p>
      </div>
    </div>
  );
};

export default LoginRegister;
