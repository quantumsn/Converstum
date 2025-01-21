import LockIcon from "@mui/icons-material/Lock";

export default function About() {
  return (
    <div className="h-screen w-4/6 flex flex-col items-center justify-center bg-gradient-to-r from-blue-800 via-gray-950 to-purple-800 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Converstum</h1>
      <p className="text-lg mb-4">Your ultimate chat application</p>
      <p>
        <LockIcon className="!text-base mr-2" />
        Your personal messages are end-to-end encrypted
      </p>
      <p className=" absolute bottom-4 text-base mb-8">
        Developed by -{" "}
        <a
          href="https://github.com/quantumsn"
          target="__blank"
          className="text-blue-400"
        >
          Quantumsn
        </a>
      </p>
    </div>
  );
}
