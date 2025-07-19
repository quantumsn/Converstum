import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../Context/AuthProvidor";
import { useFlashMsgContext } from "../Context/FlashMsgProvidor";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { FlashMsg } from "../Components";

export default function Login() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { flashMsg, setFlashMsg } = useFlashMsgContext();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSumbit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let res = await api.post("user/login", userData);
      login();
      setFlashMsg({ content: res.data.message, status: "success" });
      navigate("/");
    } catch (err) {
      setFlashMsg({ content: err.response.data.error, status: "failed" });
    } finally {
      setIsLoading(false);
    }
    setUserData({ username: "", password: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {flashMsg != null && <FlashMsg flashMsg={flashMsg} />}
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Log in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSumbit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your Username
              </label>
              <input
                type="username"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="helloWorld1233"
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
              Login
            </Button>
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
