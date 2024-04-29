import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { NextUIProvider } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";

export const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            <Layout />
          </NextUIProvider>
          <ToastContainer />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
