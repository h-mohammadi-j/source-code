import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ApiProvider } from "./contexts/ApiContext";

const App = () => {
  return (
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  );
};

export default App;
