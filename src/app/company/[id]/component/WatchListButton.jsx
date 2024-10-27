import React, { useEffect, useState } from "react";
import watchListActions from "../../../watchlist/_redux/actions";
import { useDispatch } from "react-redux";
import { Tour, Tooltip, message, Spin } from "antd";
import {
  AiOutlineLineChart,
  AiOutlineEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import api from "../../../../api/axios";
const WatchListButton = ({
  isLoggedIn,
  buttonClassName,
  currentUser,
  company,
  id,
}) => {
  const [isWatchListAdded, setWatchListAdded] = useState();
  const [isButtonClicked, setButtonClicked] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchIsAddedWatchList = async (id) => {
    if (isLoggedIn) {
      const res = await api.get(`/watchlist/checkifexist/${id}`);
      if (res) {
        setWatchListAdded(res.data.data);
      }
    }
  };

  const deleteWatchList = async (symbol) => {
    const res = await api.delete(`/watchlist/${symbol}`);
    if (res) {
      message.success(`${company[0]?.symbol} has been Deleted from Watchlist!`);
      setTimeout(() => {
        fetchIsAddedWatchList(id);
      }, 3000);
    }
  };
  useEffect(() => {
    fetchIsAddedWatchList(id);
  }, [id]);
  const checkWatchlistClicked = () => {
    if (isLoggedIn) {
      setButtonClicked(true);
      const watchListData = {
        user_id: currentUser,
        symbol: company[0]?.symbol,
        sector: company[0]?.sectorName,
        name: company[0]?.companyName,
      };
      message.success(`${company[0]?.symbol} has been added to Watchlist!`);
      dispatch(watchListActions.addWatchList(watchListData));
      setTimeout(() => {
        fetchIsAddedWatchList(id);
        setButtonClicked(false);
      }, 3000);
    } else if (!isLoggedIn) {
      setIsModalOpen(true);
      router.push("/login");
    }
  };

  return (
    <>
      {isWatchListAdded?.isAdded ? (
        <Tooltip title="Already Added to Watch List" trigger="hover">
          <button
            className={`${buttonClassName} hover:bg-primary text-primary hover:text-secondary font-bold flex items-center`}
            type="primary"
            disabled={isButtonClicked} // Disable button if clicked
            onClick={() => {
              router.push(`/watchlist`);
            }}
          >
            <AiFillEyeInvisible />
            <span className="lg:hidden block lg:text-xs text-2xl">
              Added to Watchlist
            </span>
          </button>
        </Tooltip>
      ) : (
        <Tooltip title="Add to Watch List" trigger="hover">
          <button
            onClick={checkWatchlistClicked}
            className={`${buttonClassName} hover:bg-primary text-primary hover:text-secondary font-bold flex items-center`}
            type="primary"
            disabled={isButtonClicked} // Disable button if clicked
          >
            {isButtonClicked ? <Spin /> : <AiOutlineEye />}
            <span className="lg:hidden block lg:text-xs text-2xl">
              {" "}
              Add to Watchlist
            </span>
          </button>
        </Tooltip>
      )}
    </>
  );
};

export default WatchListButton;
