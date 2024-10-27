import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, notification, Space } from "antd";

export const openNotificationWarning = (message) => {
  notification.open({
    message: message,
    onClick: () => {},
    icon: <ExclamationCircleFilled style={{ color: "#faad14" }} />,
  });
};
