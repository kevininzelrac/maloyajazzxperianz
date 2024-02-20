import { useSlate } from "slate-react";
import Icon from "./icon";

export const UndoButton = () => {
  const editor = useSlate();
  return (
    <button
      data-tooltip="undo"
      onMouseDown={() => {
        editor.undo();
      }}
    >
      <Icon type="undo" />
    </button>
  );
};

export const RedoButton = () => {
  const editor = useSlate();
  return (
    <button
      data-tooltip="redo"
      onMouseDown={() => {
        editor.redo();
      }}
    >
      <Icon type="redo" />
    </button>
  );
};
