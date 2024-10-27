"use client";
import { Dropdown, Space, Menu, message, Popconfirm, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPortfolioHolder,
  setSelectedPortfolioHolderName,
  setShareHolderId,
} from "../_redux/portfolioSlice";
import AddHolder from "../../pre-portfolio/_component/addHolder";
import actions from "../_redux/action";
import { AiOutlineMinus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const DropdownAddHolder = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedName, setSelectedName] = useState(null);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedHolder, setSelectedHolder] = useState({});

  const {
    shareHolderByUserId,
    shareHolder,
    deletePortfolioHlder,
    selectedPortfolioHolderName,
  } = useSelector((state) => state.portfolio);
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (
      shareHolder?.statusCode === 200 ||
      deletePortfolioHlder?.statusCode === 200
    ) {
      dispatch(actions.getShareHolderByUserID({ user_id: currentUser }));
    }
  }, [currentUser, shareHolder, deletePortfolioHlder]);

  // useEffect(() => {
  //     dispatch(actions.getShareHolderByUserID({ user_id: currentUser }))
  // }, [])

  // useEffect(() => {
  //     dispatch(actions.getShareHolderByUserID({ user_id: currentUser }))
  // }, [currentUser])

  const handleMenuClick = (e) => {
    setSelectedName(e);
    dispatch(setSelectedPortfolioHolderName(e));
    const selectedName = e;
    const selectedItem = names.find((item) => item.name === selectedName);
    if (selectedItem) {
      setSelectedValue(selectedItem.value);
      dispatch(setSelectedPortfolioHolder(selectedItem.value));
    }
  };

  const handelDeleteHolder = (e, data) => {
    setSelectedHolder(data);
  };
  let holderName = selectedHolder.full_name;

  const handleConfirm = (e) => {
    const id = selectedHolder.id;
    dispatch(actions.deletePortfolioHolderInfo({ id: id }));
    message.success("Holder information deleted successfully!");
    setTimeout(() => {
      if (deletePortfolioHlder) {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }
    }, 2000);
  };

  const handleCancel = (e) => {
    // message.error("Cancelled");
  };

  // to dispatch the selected SHID
  let names = [];
  let activeAhareHolders = [];
  if (shareHolderByUserId?.ShareHolderByUserId !== undefined) {
    activeAhareHolders = shareHolderByUserId?.ShareHolderByUserId?.map(
      (item, id) => {
        return item?.id;
      }
    );

    names = shareHolderByUserId?.ShareHolderByUserId?.map((item, id) => {
      return {
        name: item?.full_name,
        value: item?.id,
        icon: (
          <Popconfirm
            title="Delete the holder"
            description={`Are you sure you want to delete this holder?`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
            onClick={(e) => handleView(e, record)}
          >
            <a
              onClick={(e) => handelDeleteHolder(e, item)}
              style={{ color: "red", fontSize: "18px", fontWeight: "bolder" }}
            >
              <FaTrash className="text-3xl text-secondary bg-red-500 px-2 py-1 rounded-md" />
            </a>
          </Popconfirm>
        ),
      };
    });
  }

  const tempNotSelected = activeAhareHolders[0];

  useEffect(() => {
    dispatch(
      setShareHolderId(
        selectedValue === undefined ? tempNotSelected : selectedValue
      )
    );
  }, [selectedValue, tempNotSelected]);

  useEffect(() => {
    if (!shareHolderByUserId?.ShareHolderByUserId?.length > 0) {
      const timer = setTimeout(() => {
        router.push("/pre-portfolio");
      }, 2000); // 2000 milliseconds = 2 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [shareHolderByUserId]);

  return (
    <>
      <div className="flex flex-wrap justify-end lg:pb-10 lg:mt-5 mt-[150px] lg:pr-0 pb-[20px]">
        <div className="drop-down mt-2">
          <Dropdown
            overlay={
              <Menu>
                {names?.map((item) => (
                  <Menu.Item key={item.name}>
                    <div onClick={() => handleMenuClick(item.name)}>
                      {" "}
                      {item.name}{" "}
                    </div>
                    <Divider type="vertical" />
                    <div> {item.icon} </div>
                  </Menu.Item>
                ))}
              </Menu>
            }
            className="border-2 border-balck-500 py-2 px-2 rounded-md "
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {names.length > 0
                  ? selectedPortfolioHolderName
                    ? selectedPortfolioHolderName
                    : names[0].name
                  : ""}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <button className="text-secondary  !z-10 bg-black py-1 rounded-md d-block ml-10">
          {" "}
          <AddHolder add="+ Add Holder" title="Add Holder Info" />{" "}
        </button>
      </div>
    </>
  );
};
export default DropdownAddHolder;
