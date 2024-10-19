import React from "react";
import Navbar from "./components/shared/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import Inbox from "./components/Inbox";
import Mail from "./components/Mail";

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
    <div className="bg-[#F6F8FC] h-screen w-screen overflow-hidden">
      <Navbar />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
