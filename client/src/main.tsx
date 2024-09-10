import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContextProvider.tsx";
import { AuthContextProvider } from "./contexts/AuthContextProvider.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./shopping-cart-state/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { ERoutes } from "./types/links.ts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Layout from "./pages/Layout.tsx";
import ExploreMartens from "./pages/ExploreMartens.tsx";
import Category from "./pages/Category.tsx";
import ShopItemDetails from "./pages/ShopItemDetails.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import VerifyAccount from "./components/VerifyAccount.tsx";
import AuthCookieMiddleware from "./middlewares/AuthCookieMIddleware";
import UserAccount from "./pages/user-account/UserAccount.tsx";
import UpdateAccount from "./pages/user-account/UpdateAccount.tsx";
import UpdatePassword from "./pages/user-account/UpdatePassword.tsx";
import UserOrders from "./pages/UserOrders.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";
import ShippingPage from "./pages/ShippingPage.tsx";
import PaymentPage from "./pages/PaymentPage.tsx";
import CreateOrder from "./pages/CreateOrder.tsx";
import OrderPage from "./pages/OrderPage.tsx";

const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const initialOptions = {
  clientId: clientId,
  currency: "GBP",
  intent: "capture",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: ERoutes.home,
    element: <Layout />,
  },
  {
    path: ERoutes.martens,
    element: <ExploreMartens />,
  },
  {
    path: `${ERoutes.footwear}/:id`,
    element: <ShopItemDetails />,
  },
  {
    path: `${ERoutes.category}/:id`,
    element: <Category />,
  },
  {
    path: ERoutes.authpage,
    element: <AuthPage />,
  },
  {
    path: `${ERoutes.verify}/:verificationString`,
    element: <VerifyAccount />,
  },
  {
    path: `${ERoutes.resetpassword}/:resetString`,
    element: <ResetPassword />,
  },
  {
    path: ERoutes.useraccount,
    element: <UserAccount />,
    children: [
      {
        path: "update-account",
        element: <UpdateAccount />,
      },
      {
        path: "update-password",
        element: <UpdatePassword />,
      },
    ],
  },
  {
    path: ERoutes.shipping,
    element: <ShippingPage />,
  },
  {
    path: ERoutes.payment,
    element: <PaymentPage />,
  },
  {
    path: ERoutes.createorder,
    element: <CreateOrder />,
  },
  {
    path: `${ERoutes.order}/:id`,
    element: <OrderPage />,
  },
  {
    path: ERoutes.userorders,
    element: <UserOrders />,
  },
  {
    path: "*",
    element: <Unauthorized />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions} deferLoading={true}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <AuthContextProvider>
            <Provider store={store}>
              <PersistGate persistor={persistor}>
                <AuthCookieMiddleware>
                  <RouterProvider router={router} />
                  <App />
                </AuthCookieMiddleware>
              </PersistGate>
            </Provider>
            <App />
          </AuthContextProvider>
        </AppContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
