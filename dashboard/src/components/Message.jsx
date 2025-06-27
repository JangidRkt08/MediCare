// import React, { useContext, useEffect, useState } from "react";
// import { context } from "../main";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// const Message = () => {
//   const [messages, setMessages] = useState(false);
//   const { IsAuthenticated } = useContext(context);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/message/getall",
//           {
//             withCredentials: true,
//           }
//         );

//         console.log(data);
//         setMessages(data.messages);
//       } catch (error) {
//         console.error("Error occurred while fetching messages", error);
//       }
//     };

//     fetchMessages();
//   }, []); // Empty dependency array ensures the effect runs only once when the component mounts

//   if (!IsAuthenticated) {
//     return <Navigate to="/login" />;
//   }
//   return <div>Messages showing here</div>;
// };

// export default Message;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { context } from "../main";
import { Navigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(context);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      <h1>MESSAGE</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstname}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastname}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.Phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
