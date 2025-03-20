import { RouterProvider } from "react-router";
import router from "./router/index";
import { useState } from "react";
import { LoadingContext } from "./LoadingContext";
import "./App.css";

function App() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [specifiedOrder, setSpecifiedOrder] = useState({});

  return (
    <>
      <LoadingContext.Provider
        value={{
          isScreenLoading,
          setIsScreenLoading,
          specifiedOrder,
          setSpecifiedOrder,
        }}
      >
        <RouterProvider router={router} />
      </LoadingContext.Provider>
    </>
  );
}

export default App;
