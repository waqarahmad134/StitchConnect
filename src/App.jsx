import "./App.css";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import ErrorPage from "./errors/error-page";
import { ToastContainer } from "react-toastify";
import "primereact/resources/primereact.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import ProductDetails from "./pages/ProductDetails";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

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
    path: "/page/:slug",
    element: <Shop />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product-details/:slug",
    element: <ProductDetails />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
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
