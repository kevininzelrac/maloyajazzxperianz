import { useState, useEffect, ChangeEvent } from "react";
import { Editor, Range } from "slate";
import { useSlate } from "slate-react";

export default function ColorPicker() {
  const editor = useSlate();
  const { selection } = editor;
  const [currentColor, setCurrentColor] = useState("#ffffff");

  useEffect(() => {
    const marks = Editor.marks(editor);
    if (marks && marks.color) {
      setCurrentColor(marks.color);
    } else {
      setCurrentColor("#ffffff");
    }
  }, [editor, selection]);

  const addColor = (e: ChangeEvent<HTMLInputElement>) => {
    if (selection && Range.isExpanded(selection)) {
      Editor.addMark(editor, "color", e.target.value);
    }
  };

  return (
    <button>
      <input
        className="colorPicker"
        type="color"
        value={currentColor}
        style={{ width: "100%", height: "100%", userSelect: "none" }}
        onChange={(e) => addColor(e)}
      />
    </button>
  );
}
