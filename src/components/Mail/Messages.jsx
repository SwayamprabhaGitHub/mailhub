// import React, { useEffect, useRef, useState } from "react";
// import Message from "./Message";
// import { useSelector } from "react-redux";
// import LoadingSpinner from "../UI/LoadingSpinner";

// const Messages = () => {
//   const selectedMailPath = useSelector(
//     (state) => state.navSlice.selectedMailPath
//   );
//   const { emails, searchText, user } = useSelector((state) => state.appSlice);
//   const [tempEmails, setTempEmails] = useState(null);
//   const filterMails = useRef([]);
//   const [newFilteredMails, setNewFilteredMails] = useState([]);

//   useEffect(() => {
//     if (selectedMailPath === "inbox") {
//       filterMails.current = emails?.filter((email) => {
//         return email.to === user.email;
//       });
//     } else if (selectedMailPath === "sent") {
//       filterMails.current = emails?.filter((email) => {
//         return email.from === user.email;
//       });
//     }
//     console.log("useEffect1");
//     setNewFilteredMails(filterMails.current);
//   }, [selectedMailPath, emails, user.email]);

//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       const filteredSearchEmails = newFilteredMails?.filter((email) => {
//         return (
//           email?.subject?.toLowerCase().includes(searchText.toLowerCase()) ||
//           email?.to?.toLowerCase().includes(searchText.toLowerCase()) ||
//           email?.message?.toLowerCase().includes(searchText.toLowerCase())
//         );
//       });
//       setTempEmails(filteredSearchEmails);
//     }, 300); // 300ms debounce delay
//       console.log("useEffect2");
//     // Cleanup function to clear the timeout if searchText or emails changes before debounce delay completes
//     return () => clearTimeout(debounceTimeout);
//   }, [searchText, newFilteredMails]);
//     console.log("messages");
//   return (
//     <div>
//       {!tempEmails && <div className="fixed top-7 left-1/2"><LoadingSpinner /></div>}
//       {tempEmails &&
//         tempEmails?.map((email, index) => (
//           <Message key={Math.random()} email={email} index={index} />
//         ))}
//     </div>
//   );
// };

// export default Messages;

import React, { useEffect, useRef, useState, useMemo } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import LoadingSpinner from "../UI/LoadingSpinner";

const Messages = () => {
  const selectedMailPath = useSelector(
    (state) => state.navSlice.selectedMailPath
  );
  const { emails, searchText, user } = useSelector((state) => state.appSlice);
  const [tempEmails, setTempEmails] = useState(null);

  const filteredEmails = useMemo(() => {
    if (selectedMailPath === "inbox") {
      return emails?.filter((email) => email.to === user.email);
    } else if (selectedMailPath === "sent") {
      return emails?.filter((email) => email.from === user.email);
    }
    return [];
  }, [selectedMailPath, emails, user.email]);

  useEffect(() => {
    setTempEmails(filteredEmails);
  }, [filteredEmails]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const filteredSearchEmails = filteredEmails?.filter((email) => {
        return (
          email?.subject?.toLowerCase().includes(searchText.toLowerCase()) ||
          email?.to?.toLowerCase().includes(searchText.toLowerCase()) ||
          email?.message?.toLowerCase().includes(searchText.toLowerCase()) ||
          email?.from?.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setTempEmails(filteredSearchEmails);
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchText, filteredEmails]);

  return (
    <div>
      {!tempEmails && (
        <div className="fixed top-7 left-1/2">
          <LoadingSpinner />
        </div>
      )}
      {tempEmails &&
        tempEmails.map((email, index) => (
          <Message key={email.id} email={email} index={index} />
        ))}
    </div>
  );
};

export default Messages;
