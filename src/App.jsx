import { RouterProvider } from "react-router"
import router from "./router/index"
import { useState } from "react";
import { LoadingContext } from "./LoadingContext";

function App() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  return (
    <>
    <LoadingContext.Provider value={{isScreenLoading, setIsScreenLoading}}>
      <RouterProvider router={router}/>
    </LoadingContext.Provider>
    </>
  )
}

export default App;
