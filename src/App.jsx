import "./App.css";
import Homepage from "./pages/Homepage";
import Exterior from "./pages/Exterior";
import ExteriorProductDetails from "./pages/ExteriorProductDetails";
import ErrorPage from "./errors/error-page";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css'; //core css



const router = createBrowserRouter([
  {
    path: "/auth/signin",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/category/:slug",
    element: <Exterior />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product-details/:slug",
    element: <ExteriorProductDetails />,
    errorElement: <ErrorPage />,
  },
 
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return (
    <div>
      <ToastContainer />
      <PrimeReactProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
      </PrimeReactProvider>

    </div>
  );
}

export default App;
