import React, { useEffect, useState } from "react";
import Navbar from "./components/Layout/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./Pages/Body";
import Inbox from "./Pages/Inbox";
import Mail from "./Pages/Mail";
import SendMail from "./components/ComposeMail/SendMail";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import { setEmails } from "./redux/appSlice";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const router = createBrowserRouter([
  {
    path: "/inbox",
    element: <Body />,
    children: [
      { path: "/inbox", element: <Inbox />, index: true },
      { path: "/inbox/:id", element: <Mail /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); //loading state
  const emails = useSelector((state) => state.appSlice.emails);

  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt
          ? doc
              .data()
              .createdAt.toDate()
              .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          : null,
      }));
      console.log(allEmails);
      dispatch(setEmails(allEmails));
      setLoading(false); //stop loading when emails are fetched
      NProgress.done(); //stop NProgress after fetching emails
    });
    //cleanup on unmount
    return () => {
      unsubscribe();
      NProgress.done(); //ensure NProgress stops on unmount
    };
  }, []);
  console.log("app");
  //Start NProgress when the app is loading
  useEffect(() => {
    if (loading) {
      NProgress.start();
    }
  }, [loading]);

  return (
    <div className="bg-teal-50 h-screen w-screen overflow-hidden">
      <Navbar />
      {loading ? <LoadingSpinner /> : <RouterProvider router={router} />}

      <div className="absolute w-[30%] bottom-0 right-20 z-10">
        <SendMail />
      </div>
    </div>
  );
}

export default App;
