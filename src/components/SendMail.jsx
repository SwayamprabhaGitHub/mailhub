import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import ComposeMail from "./ComposeMail";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/appSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const SendMail = () => {
  const open = useSelector((state) => state.appSlice.open);
  const dispatch = useDispatch();

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const formData = {
    to: to,
    subject: subject,
    message: stripHtml(editorContent),
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "emails"), {
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      createdAt: serverTimestamp(),
    });
    dispatch(setOpen(false));
    setTo("");
    setSubject("");
    setEditorContent("");
  };

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } bg-[#eff1fc] max-w-xl max-h-min shadow-xl shadow-slate-600 rounded-t-md`}
    >
      <div className="flex px-3 py-2 bg-[#F2F6Fc] justify-between rounded-t-md">
        <h1>New message</h1>
        <div
          onClick={() => dispatch(setOpen(false))}
          className="p-2 hover:text-white hover:bg-[#E11325] cursor-pointer transition-all duration-1000 ease-in-out hover:rotate-90"
        >
          <RxCross1 />
        </div>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-2 p-3 bg-white"
      >
        <ComposeMail
          to={to}
          setTo={setTo}
          subject={subject}
          setSubject={setSubject}
          editorContent={editorContent}
          setEditorContent={setEditorContent}
        />
        <button
          type="submit"
          className="bg-[#0B57D0] rounded-full w-fit px-6 py-1 text-white font-medium text-lg hover:bg-[#246fe8] hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 "
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMail;
