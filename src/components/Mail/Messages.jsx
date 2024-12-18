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
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../UI/LoadingSpinner";
import { setMailCount, setTotalMailsInPath, setTotalNumOfMails } from "../../redux/navSlice";
import { setSelectedEmailsArray } from "../../redux/appSlice";

const Messages = ({ noOfMailOnCurrPage }) => {
  const selectedMailPath = useSelector(
    (state) => state.navSlice.selectedMailPath
  );
  const { emails, searchText, user } = useSelector((state) => state.appSlice);
  const [tempEmails, setTempEmails] = useState([]);
  const dispatch = useDispatch();

  const filteredEmails = useMemo(() => {
    if (selectedMailPath === "inbox") {
      return emails?.filter((email) => email.to === user.email && !email.trashed);
    } else if (selectedMailPath === "sent") {
      return emails?.filter((email) => email.from === user.email && !email.trashed);
    } else if (selectedMailPath === "allmails") {
      return emails
    } else if (selectedMailPath === "starred") {
      return emails?.filter((email) => email.starred && !email.trashed);
    } else if (selectedMailPath === "trash") {
      return emails?.filter((email) => email.trashed);
    }
    return [];
  }, [selectedMailPath, emails, user.email]);

  useEffect(() => {
    setTempEmails(filteredEmails);
  }, [filteredEmails]);

  useMemo(() => {
    if(tempEmails.length !== 0 && selectedMailPath === "inbox") dispatch(setMailCount(tempEmails.length)); // to show how many emails are there in inbox

    dispatch(setTotalNumOfMails(tempEmails.length)); // this to tell how many emails are in every path(sidebar link)
    dispatch(setTotalMailsInPath(tempEmails));
  },[tempEmails, selectedMailPath]);

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

  useEffect(() => {
    dispatch(setSelectedEmailsArray([])); // to clear selected message when path changes
  },[selectedMailPath])

  return (
    <div>
      {!tempEmails && (
        <div className="fixed top-7 left-1/2">
          <LoadingSpinner />
        </div>
      )}
      {tempEmails && tempEmails.length > noOfMailOnCurrPage + 20
        ? tempEmails.slice(noOfMailOnCurrPage, noOfMailOnCurrPage + 20)?.map((email, index) => <Message key={email.id} email={email} index={index} />)
        : tempEmails.slice(noOfMailOnCurrPage)?.map((email, index) => <Message key={email.id} email={email} index={index} />)}
    </div>
  );
};

export default Messages;
