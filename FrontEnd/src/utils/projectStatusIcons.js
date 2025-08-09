import { RiProgress3Line } from "react-icons/ri";
import { MdOutlineDone, MdOutlinePending } from "react-icons/md";
import { AiOutlineCloseCircle, AiOutlineReload } from "react-icons/ai";
import { BsPauseCircle } from "react-icons/bs";

export const statusIcons = {
  inprogress: RiProgress3Line,
  completed: MdOutlineDone,
  closed: AiOutlineCloseCircle,
  hold: BsPauseCircle,
  reopen: AiOutlineReload,
};

export const fallbackIcon = MdOutlinePending;
