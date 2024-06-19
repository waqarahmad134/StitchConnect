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
import Search from "./pages/Search";
import Tailor from "./pages/Tailor";
import ShopDetails from "./pages/ShopDetails";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
import Cancel from "./pages/Cancel";
import OrderSuccess from "./pages/OrderSuccess";
import Car from "./pages/Car";

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
    path: "/tailor",
    element: <Tailor />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shop-details/:slug",
    element: <ShopDetails />,
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
    path: "/profile/:slug",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: <Search />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/success/:orderId",
    element: <OrderSuccess />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return (
    <div className="font-switzer">
      <Analytics />
      <SpeedInsights/>
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
