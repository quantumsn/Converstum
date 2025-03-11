import { ChatCloseProvider } from "./Context/ChatCloseProvidor";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ChatCloseProvider>
      <Outlet />
    </ChatCloseProvider>
  );
}

export default App;
