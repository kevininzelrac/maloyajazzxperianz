import { Editor, Transforms, Range, Text } from "slate";
import { CustomEditor, ParagraphElement } from "./slate";
import { toggleMark } from "./components/marks";
import { wrapLink } from "./components/links";

export default function Shortcuts(
  e: React.KeyboardEvent,
  editor: CustomEditor
) {
  const { selection } = editor;

  const newLine: ParagraphElement = {
    type: "paragraph",
    textAlign: "left",
    children: [{ text: "", color: "#ffffff" }],
  };

  if (e.key === "Enter") {
    e.preventDefault();
    Transforms.insertNodes(editor, newLine);
  }

  if (e.key === "Backspace") {
    if (selection && Range.isCollapsed(selection)) {
      e.preventDefault();
      const [match] = Editor.nodes(editor, {
        at: Editor.before(editor, selection),
        match: (node: any) =>
          ["spotify", "youtube", "image"].includes(node.type),
      });
      if (match) {
        Transforms.removeNodes(editor);
        //Transforms.move(editor, {
        //  distance: 1,
        //  unit: "character",
        //  reverse: true,
        //});
        return;
      }
      Editor.deleteBackward(editor);
    }
  }

  if (!e.metaKey) {
    return;
  }

  switch (e.key) {
    case "`": {
      e.preventDefault();
      toggleMark(editor, "blockquote");
      break;
    }
    case "b": {
      e.preventDefault();
      toggleMark(editor, "bold");
      break;
    }
    case "i": {
      e.preventDefault();
      toggleMark(editor, "italic");
      break;
    }
    case "u": {
      e.preventDefault();
      toggleMark(editor, "underline");
      break;
    }
    case "l": {
      e.preventDefault();
      const href = prompt("Enter a URL");
      href && wrapLink(editor, href);
      break;
    }
    default:
      return;
  }
}
