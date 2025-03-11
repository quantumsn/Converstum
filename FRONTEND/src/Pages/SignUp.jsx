import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api";
// import { useAuth } from "../../contexts/AuthProvidor";
// import { useFlashMsg } from "../../contexts/FlashMsgProvidor";

export default function SignUp() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  //   const { login } = useAuth();
  //   const { addFlashMsg } = useFlashMsg();

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      let res = await api.post("/user/register", userData);
      console.log(res.data.message);
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
    }
    setUserData({ username: "", email: "", password: "" });
  };

  return (
    <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-4">
      {/* {errMsg != null && (
        <div className="md:w-1/3 my-8 flex justify-between bg-red-200 rounded-md p-4">
          <p className="text-red-900">{errMsg}.</p>
          <CloseIcon
            className="text-red-900 cursor-pointer"
            onClick={() => setErrMsg(null)}
          />
        </div>
      )} */}
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
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="userName"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
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
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Sign Up
            </button>
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
