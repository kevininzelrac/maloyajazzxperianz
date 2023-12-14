import { MdUndo } from "react-icons/md";
import { MdRedo } from "react-icons/md";
import { MdFormatBold } from "react-icons/md";
import { MdFormatItalic } from "react-icons/md";
import { MdFormatUnderlined } from "react-icons/md";
import { MdCode } from "react-icons/md";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";
import { LuHeading4 } from "react-icons/lu";
//import { FaParagraph } from "react-icons/fa";
//import { LiaParagraphSolid } from "react-icons/lia";
import { MdFormatQuote } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import { MdFormatAlignLeft } from "react-icons/md";
import { MdFormatAlignRight } from "react-icons/md";
import { MdFormatAlignCenter } from "react-icons/md";
import { MdFormatAlignJustify } from "react-icons/md";
import { MdAddLink } from "react-icons/md";
import { MdLinkOff } from "react-icons/md";
import { MdImage } from "react-icons/md";
import { MdHideImage } from "react-icons/md";
//import { ImYoutube2 } from "react-icons/im";
import { FaYoutube } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { BsTextareaResize } from "react-icons/bs";

export const Icon = ({ type }: { type: string }) => {
  switch (type) {
    case "undo":
      return <MdUndo />;
    case "redo":
      return <MdRedo />;
    case "bold":
      return <MdFormatBold />;
    case "italic":
      return <MdFormatItalic />;
    case "underline":
      return <MdFormatUnderlined />;
    case "code":
      return <MdCode />;
    case "h2":
      return <LuHeading2 />;
    case "h3":
      return <LuHeading3 />;
    case "h4":
      return <LuHeading4 />;
    case "paragraph":
      return <Paragraph />;
    //return <LiaParagraphSolid />;
    //return <FaParagraph />;
    case "blockquote":
      return <MdFormatQuote />;
    case "ol":
      return <MdFormatListNumbered />;
    case "ul":
      return <MdFormatListBulleted />;
    case "left":
      return <MdFormatAlignLeft />;
    case "center":
      return <MdFormatAlignCenter />;
    case "right":
      return <MdFormatAlignRight />;
    case "justify":
      return <MdFormatAlignJustify />;
    case "link":
      return <MdAddLink />;
    case "unlink":
      return <MdLinkOff />;
    case "image":
      return <MdImage />;
    case "delete":
      return <MdHideImage />;
    case "youtube":
      return <FaYoutube color="crimson" />;
    //return <ImYoutube2 />;
    case "circle":
      return <FaRegCircle />;
    case "resize":
      return <BsTextareaResize />;
    default:
      return type;
  }
};

const Paragraph = () => (
  <span style={{ fontSize: ".8em", fontWeight: "bold" }}>P</span>
);
