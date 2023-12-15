import { Slate, Editable, withReact } from "slate-react";
import { createEditor, type Descendant } from "slate";
import { withHistory } from "slate-history";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "@remix-run/react";
import { RenderElement, RenderLeaf } from "./render";
import Shortcuts from "./shortcuts";
import Toolbar from "./components/toolbar";

export default function Editor({ children, onChange }: any) {
  const { pathname } = useLocation();
  const path = pathname.replace("/Edit", "");

  useEffect(() => {
    localStorage.getItem("slate" + path) ? onChange(true) : onChange(false);
  }, []);

  const initialValue: Descendant[] = useMemo(() => {
    if (children.includes("type")) {
      return JSON.parse(children);
    } else {
      return [
        {
          type: "paragraph",
          textAlign: "left",
          children: [{ text: children }],
        },
      ];
    }
  }, []);

  const [editor] = useState(() => withReact(withHistory(createEditor())));
  return (
    <Slate
      editor={editor}
      initialValue={
        localStorage.getItem("slate" + path)
          ? JSON.parse(localStorage.getItem("slate" + path) as string)
          : initialValue
      }
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );

        if (isAstChange) {
          if (JSON.stringify(value) !== JSON.stringify(initialValue)) {
            localStorage.setItem("slate" + path, JSON.stringify(value));
            onChange(true);
          } else {
            localStorage.removeItem("slate" + path);
            onChange(false);
          }
        }
      }}
    >
      <Toolbar />
      <Editable
        autoFocus
        renderElement={RenderElement}
        renderLeaf={RenderLeaf}
        onKeyDown={(e) => {
          Shortcuts(e, editor);
        }}
      />
    </Slate>
  );
}
