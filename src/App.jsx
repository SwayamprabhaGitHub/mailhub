import React, { useEffect, useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Body from "./Pages/Body";
import Inbox from "./Pages/Inbox";
import Mail from "./Pages/Mail";
import SendMail from "./components/ComposeMail/SendMail";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, or, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { setEmails } from "./redux/appSlice";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Starred from "./Pages/Starred";
import Snoozed from "./Pages/Snoozed";
import Sent from "./Pages/Sent";
import Draft from "./Pages/Draft";
import Trash from "./Pages/Trash";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import ForgotPassword from "./Pages/ForgotPassword";
import UserProfile from "./Pages/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllMails from "./Pages/AllMails";




const createRouter = (signedIn) =>
  createBrowserRouter([
    {
      path: "/",
      element: !signedIn ? <LogIn /> : <Navigate to="/inbox" />,
    },
    {
      path: "/signup",
      element: !signedIn ? <SignUp /> : <Navigate to="/inbox" />,
    },
    {
      path: "/forgotpassword",
      element: !signedIn ? <ForgotPassword /> : <Navigate to="/inbox" />,
    },
    {
      path: "/userprofile",
      element: signedIn ? <UserProfile /> : <Navigate to="/" />,
    },
    {
      path: "/inbox",
      element: <Body />,
      children: [
        { path: "/inbox", element: signedIn ? <Inbox /> : <Navigate to="/" /> },
        {
          path: "/inbox/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/starred",
      element: <Body />,
      children: [
        {
          path: "/starred",
          element: signedIn ? <Starred /> : <Navigate to="/" />,
        },
        {
          path: "/starred/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/snoozed",
      element: <Body />,
      children: [
        {
          path: "/snoozed",
          element: signedIn ? <Snoozed /> : <Navigate to="/" />,
        },
        {
          path: "/snoozed/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/sent",
      element: <Body />,
      children: [
        { path: "/sent", element: signedIn ? <Sent /> : <Navigate to="/" /> },
        {
          path: "/sent/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/draft",
      element: <Body />,
      children: [
        { path: "/draft", element: signedIn ? <Draft /> : <Navigate to="/" /> },
        {
          path: "/draft/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/trash",
      element: <Body />,
      children: [
        { path: "/trash", element: signedIn ? <Trash /> : <Navigate to="/" /> },
        {
          path: "/trash/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/allmails",
      element: <Body />,
      children: [
        { path: "/allmails", element: signedIn ? <AllMails /> : <Navigate to="/" /> },
        {
          path: "/allmails/:id",
          element: signedIn ? <Mail /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); //loading state
  // const emails = useSelector((state) => state.appSlice.emails);
  const signedIn = useSelector((state) => state.appSlice.signedIn);
  const user = useSelector((state) => state.appSlice.user);
  const profilePopup = useSelector((state) => state.appSlice.profilePopup);
  
  useEffect(() => {
    const q = query(collection(db, "emails"),
    or(
        where("to", "==", user?.email || ""),
        where("from", "==", user?.email || "")
    ),
     orderBy("createdAt", "desc"));
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
  }, [user]);
  console.log("app");
  //Start NProgress when the app is loading
  useEffect(() => {
    if (loading) {
      NProgress.start();
    }
  }, [loading]);

  const router = createRouter(user);

  return (
    <>
    <ToastContainer />
      {loading ? <LoadingSpinner /> : <RouterProvider router={router} />}
      <div className="absolute w-[30%] bottom-0 right-20 z-10">
        <SendMail />
      </div>
    </>
  );
}

export default App;
