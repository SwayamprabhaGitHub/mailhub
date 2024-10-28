import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";

const Messages = () => {
  const { emails, searchText } = useSelector((state) => state.appSlice);
  const [tempEmails, setTempEmails] = useState(emails);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const filteredEmails = emails?.filter((email) => {
        return (
          email?.subject?.toLowerCase().includes(searchText.toLowerCase()) ||
          email?.to?.toLowerCase().includes(searchText.toLowerCase()) ||
          email?.message?.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setTempEmails(filteredEmails);
    }, 300); // 300ms debounce delay

    // Cleanup function to clear the timeout if searchText or emails changes before debounce delay completes
    return () => clearTimeout(debounceTimeout);
  }, [searchText, emails]);
  
  return (
    <div>
      {tempEmails &&
        tempEmails?.map((email, index) => <Message key={Math.random()} email={email} index={index} />)}
    </div>
  );
};

export default Messages;
