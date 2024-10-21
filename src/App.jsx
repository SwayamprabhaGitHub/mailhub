import React from "react";
import Navbar from "./components/shared/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import Inbox from "./components/Inbox";
import Mail from "./components/Mail";
import SendMail from "./components/SendMail";

const router = createBrowserRouter([
  {
    path: "/inbox",
    element: <Body />,
    children: [
      { path: "/inbox", element: <Inbox /> },
      { path: "/inbox/:id", element: <Mail /> },
    ],
  },
]);

function App() {
  return (
    <div className="bg-[#eff1fc] h-screen w-screen overflow-hidden">
      <Navbar />
      <RouterProvider router={router}></RouterProvider>
      <div className="absolute w-[30%] bottom-0 right-20 z-10">
        <SendMail />
      </div>
    </div>
  );
}

export default App;
