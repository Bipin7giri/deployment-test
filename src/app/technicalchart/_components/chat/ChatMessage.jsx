"use client";
import { Image } from "antd";
import { Avatar } from "antd";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Popup } from "./index";

const ChatMessage = ({
  message,
  handleAddComment,
  handleAddLike,
  showPopup,
  setShowPopup,
}) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState("");
  const commentsPerPage = 3; // Set how many comments you want per page
  const [currentPage, setCurrentPage] = useState(1);

  // Sort comments by descending timestamp
  const sortedComments = [...(message?.comments || [])].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const totalPages = Math.ceil(sortedComments.length / commentsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const currentComments = sortedComments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      handleAddComment(message.id, commentText);
      setCommentText(""); // Clear the input field after submission
    }
  };

  return (
    <>
      <div className="flex justify-center gap-2 items-start my-3 bg-slate-100 p-2 rounded-xl">
        {/* Avatar */}
        <div className="h-5 w-5 rounded-full bg-gray-400 flex-shrink-0"></div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold">{message?.user_name}</span>
            <span className="text-xs text-gray-500">
              {new Date(message?.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p>{message.description}</p>
          </div>

          {/* Reactions */}
          <div className="flex space-x-2 mt-2">
            {message?.likes && (
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">👍</span>
                <span className="text-sm text-gray-600">
                  {message.likes.length}
                </span>
              </div>
            )}
            <button
              onClick={() => handleAddLike(message.id)}
              className="text-blue-500 text-sm relative"
            >
              Like
            </button>
          </div>

          {/* Image Thumbnail */}
          {message?.image && (
            <div className="mt-3">
              <Image
                src={message?.image}
                alt="Image Thumbnail"
                className="w-[100px] h-[80px] rounded-lg"
              />
              <div className="text-blue-500 mt-1">{message?.title}</div>
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-4 space-y-3">
            {sortedComments.length > 0 && (
              <>
                <h3 className="font-semibold">Comments:</h3>
                {currentComments.map((comment, index) => (
                  <div key={index} className="bg-gray-200 p-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{comment.user?.name}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                ))}

                {/* Pagination controls */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-20 h-8 p-1 text-white bg-blue-500 rounded-full shadow-md transition duration-200 ease-in-out transform hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="text-xs font-semibold">Previous</span>
                  </button>

                  <span className="text-gray-600 text-xs font-medium">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-20 h-8 p-1 text-white bg-blue-500 rounded-full shadow-md transition duration-200 ease-in-out transform hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <span className="text-xs font-semibold">Next</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Add Comment Section */}
          <div className="mt-3 flex justify-between items-center w-full mb-4 gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out shadow-sm"
            />
            <button
              onClick={() => {
                if (isLoggedIn) {
                  handleCommentSubmit();
                } else {
                  setShowPopup(1);
                }
              }}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out shadow-md relative"
            >
              <FiSend size={20} />
              {showPopup === 1 && <Popup />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
