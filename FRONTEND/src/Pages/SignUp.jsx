import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import api from "../api";
import { useAuth } from "../Context/AuthProvidor";
import { useFlashMsgContext } from "../Context/FlashMsgProvidor";
import { FlashMsg } from "../Components";

export default function SignUp() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { flashMsg, setFlashMsg } = useFlashMsgContext();

  const handleSumbit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let res = await api.post("/user/register", userData);
      login();
      setFlashMsg({ content: res.data.message, status: "success" });
      navigate("/");
    } catch (err) {
      setFlashMsg({ content: err.response.data.error, status: "failed" });
    } finally {
      setIsLoading(false);
    }
    setUserData({ username: "", email: "", password: "" });
  };

  return (
    <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-4">
      {flashMsg != null && <FlashMsg flashMsg={flashMsg} />}
      <div className="w-full bg-white rounded-lg shadow md:mt-10 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSumbit}>
            <div>
              <label
                htmlFor="userName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="userName"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="quantumsn123"
                value={userData.username}
                onChange={(e) =>
                  setUserData((prevData) => ({
                    ...prevData,
                    username: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prevData) => ({
                    ...prevData,
                    email: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={userData.password}
                onChange={(e) =>
                  setUserData((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }))
                }
                required
              />
            </div>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full !rounded-lg"
              startIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null
              }
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
            <p className="text-sm font-light text-gray-500">
              Already have an account ?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
