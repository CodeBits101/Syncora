import React from "react";
import { MdOutlineDone, MdOutlinePending } from "react-icons/md";
import { statusIcons, fallbackIcon } from "../../utils/projectStatusIcons";

export default function ProjectStatusMap({ status }) {
  const Icon = statusIcons[status] || fallbackIcon;
  const colorMap = {
    inprogress: "#FBF5DE",
    completed: "#00C853",
    closed: "#D32F2F",
    hold: "#FFA000",
    reopen: "#0288D1",
    DEFAULT: "#B0BEC5",
  };
  return (
    <Icon
      size={24}
      color={colorMap[status] || colorMap.DEFAULT}
      className="ms-2"
    />
  );
}
