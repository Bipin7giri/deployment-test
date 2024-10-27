"use client";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatMessage from "./ChatMessage";
import { FiPlus, FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { AutoComplete } from "antd";
import { useRouter } from "next/navigation";

const SOCKET_URL = "https://peridotnepal.xyz"; // Replace with your server URL
const API_URL = process.env.NEXT_PUBLIC_BASE_URL + "/v1/chat/get-chat"; // Replace with your API URL
const UPLOAD_URL = process.env.NEXT_PUBLIC_BASE_URL + "/v1/chat/upload-image"; // Replace with your image upload API URL
const ChatWindow = () => {
  const router = useRouter();
  const { marketLiveHomeData } = useSelector((state) => state.home);
  const { currentUser, email, isLoggedIn } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [showPopup, setShowPopup] = useState(null);
  const options = marketLiveHomeData?.liveData?.map((item) => ({
    value: item.symbol,
  }));
  const [symbol, setSymbol] = useState("");
  useEffect(() => {
    // Fetch initial chat messages
    const fetchInitialMessages = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setChatMessages(data);
      } catch (error) {
        console.error("Error fetching initial chat messages:", error);
      }
    };

    fetchInitialMessages();

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      upgrade: false,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    newSocket.on("userList", (users) => {
      setActiveUsers(users);
    });

    newSocket.on("messageReceived", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("commentAdded", (comment) => {
      setChatMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === comment.chat_id
            ? {
                ...msg,
                comments_count: msg.comments_count + 1,
                comments: [
                  ...(msg.comments || []),
                  {
                    id: comment.id,
                    text: comment.comment,
                    user: {
                      id: comment.user_id,
                      name: comment.user_name,
                      email: comment.user_email,
                    },
                    timestamp: comment.timestamp,
                  },
                ],
              }
            : msg
        )
      );
    });

    newSocket.on("likeAdded", (like) => {
      setChatMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === like.chat_id
            ? {
                ...msg,
                likes_count: msg.likes_count + 1,
                likes: [
                  ...(msg.likes || []),
                  {
                    id: like.id,
                    user: {
                      id: like.user_id,
                      name: like.user_name,
                      email: like.user_email,
                    },
                    timestamp: like.timestamp,
                  },
                ],
              }
            : msg
        )
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = async () => {
    // if (socket && title.trim() !== "" && description.trim() !== "") {
    if (socket && description.trim() !== "") {
      let imageUrl = null;
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        try {
          const response = await fetch(UPLOAD_URL, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          imageUrl = data.file;
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }

      const chatMessage = {
        id: Date.now(),
        user_id: currentUser,
        description: description,
        timestamp: new Date().toISOString(),
        image: imageUrl,
        // title: title,
        creator: null,
        views_count: 0,
        likes_count: 0,
        comments_count: 0,
        // symbol: symbol,
        user_name: email,
        email: email,
      };
      socket.emit("chatMessage", chatMessage);
      setTitle("");
      setDescription("");
      setSymbol("");
      setImage(null);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddComment = (chatId, commentText) => {
    if (socket && commentText.trim() !== "") {
      const comment = {
        chat_id: chatId,
        user_id: currentUser,
        comment: commentText,
        timestamp: new Date().toISOString(),
        user_name: email,
        email: email,
      };

      // Emit the event once
      socket.emit("addComment", comment);
      setNewComment((prev) => ({ ...prev, [chatId]: "" })); // Clear the input field for that chatId
    }
  };

  const handleAddLike = (chatId) => {
    const chatMessage = chatMessages.find((msg) => msg.id === chatId);

    // Check if the user has already liked this message
    const alreadyLiked = chatMessage.likes?.some(
      (like) => like.user.id === currentUser
    );

    if (socket && !alreadyLiked) {
      const like = {
        chat_id: chatId,
        user_id: currentUser,
        timestamp: new Date().toISOString(),
        user_name: email,
        email: email,
      };
      socket.emit("addLike", like);
    }
  };

  return (
    <div className="p-4 w-full mx-auto bg-white shadow-md rounded-lg">
      {/* {isLoggedIn ? (
        <> */}
      <div
        className="max-h-[800px] min-h-[200px] overflow-y-auto flex flex-col-reverse"
        style={{ scrollbarWidth: "none" }}
      >
        {Array.isArray(chatMessages) && chatMessages?.length > 0 ? (
          chatMessages
            ?.slice()
            ?.reverse()
            ?.map((msg) => (
              <ChatMessage
                key={msg.id}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                message={msg}
                handleAddComment={(chatId, commentText) =>
                  handleAddComment(chatId, commentText)
                }
                handleAddLike={(chatId) => handleAddLike(chatId)}
              />
            ))
        ) : (
          <div className="flex justify-center items-center w-full h-full font-semibold">
            No chat found
          </div>
        )}
      </div>
      {/* Input Section */}
      <div className="flex flex-col py-4 px-6 items-sxtart border-t border-gray-200 bg-white shadow-sm rounded-lg sticky bottom-0">
        {/* <div className="flex items-center w-full mb-4">
              <AutoComplete
                onSelect={(e) => {
                  setSymbol(e);
                }}
                value={symbol}
                style={{ width: 200 }}
                options={options}
                variant="borderless"
                size="large"
                className="flex-grow  border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out shadow-sm"
                placeholder="Select a symbol"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </div>
            <div className="flex items-center w-full mb-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title here..."
                className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out shadow-sm"
              />
            </div> */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your description here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out shadow-sm"
          rows={4}
        />
        <div className="flex justify-between w-full">
          <div className="flex justify-between items-center w-full mt-2">
            <label className="p-2 text-gray-500 hover:text-blue-500 transition duration-300 ease-in-out cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden" // Hide the input
              />
              <FiPlus size={28} />
            </label>
            <button
              onClick={() => {
                if (isLoggedIn) {
                  handleSendMessage();
                } else {
                  setShowPopup(0);
                }
              }}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out shadow-md relative"
            >
              <FiSend size={20} />
              {showPopup === 0 && <Popup />}
            </button>
          </div>
        </div>
      </div>
      {/* </>
      ) : (
        <button
          className=" w-[100px] rounded-md shadow-md  bg-green-400 py-1 px-3 font-medium text-[18px] text-center mt-10 "
          onClick={() => router.push("/login")}
        >
          {" "}
          Login
        </button>
      )} */}
    </div>
  );
};

export default ChatWindow;

export const Popup = () => {
  const router = useRouter();
  return (
    <div className="absolute right-[15px] bottom-[40px]">
      <button
        className="rounded-md shadow-md  bg-black py-1 px-3 font-medium text-[18px] text-center mt-10 text-white"
        onClick={(e) => {
          e.stopPropagation();
          router.push("/login");
        }}
      >
        Login
      </button>
    </div>
  );
};
