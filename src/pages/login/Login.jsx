import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCeIZTXFxo12kM7Bu2ZIpxqc06C_LIiqn8",
  authDomain: "pcparts-bb425.firebaseapp.com",
  projectId: "pcparts-bb425",
  storageBucket: "pcparts-bb425.appspot.com",
  messagingSenderId: "380361184608",
  appId: "1:380361184608:web:bf9e389abd1f68d2003a05",
  measurementId: "G-Q9T6YJ5PP1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const saveUser = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event("userUpdate"));
    const redirectPath = localStorage.getItem("redirectPath") || "/";
    navigate(redirectPath);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      saveUser(response.data.user, response.data.token);
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error logging in");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });
      saveUser(response.data.user, response.data.token);
      setMessage("Registration successful!");
      setIsRegistering(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error registering");
    }
  };

  const handleGoogleAuth = async () => {
    setMessage("");
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post("http://localhost:5000/api/users/auth/google", {
        idToken,
      });
      saveUser(response.data.user, response.data.token);
      setMessage("Google login successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error with Google login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {isRegistering ? "Register" : "Login"}
        </h1>

        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className="space-y-4"
        >
          {isRegistering && (
            <div>
              <label htmlFor="name" className="block font-medium">
                Name:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required={!isRegistering}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            {isRegistering ? "Register" : "Log In"}
          </button>
        </form>

        {message && <p className="text-center text-sm text-red-600">{message}</p>}

        <hr className="my-4" />

        <button
          onClick={handleGoogleAuth}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
        >
          Log in with Google
        </button>

        <p className="text-center text-sm">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-600 hover:underline"
          >
            {isRegistering ? "Log In" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
