import Home from "./Pages/Home";
import { ChatCloseProvider } from "./Context/ChatCloseProvidor";

function App() {
  return (
    <ChatCloseProvider>
      <Home />
    </ChatCloseProvider>
  );
}

export default App;
