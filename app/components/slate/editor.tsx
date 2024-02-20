import { Slate, Editable, withReact } from "slate-react";
import { createEditor, type Descendant } from "slate";
import { useEffect, useMemo, useState } from "react";
import { RenderElement, RenderLeaf } from "./render";
import { LinksFunction } from "@remix-run/node";
import { useLocation } from "@remix-run/react";
import { withHistory } from "slate-history";
import Toolbar from "./components/toolbar";
import Shortcuts from "./shortcuts";
import slate from "./slate.css";

export let links: LinksFunction = () => [{ rel: "stylesheet", href: slate }];

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
          children: [{ text: children, color: "#ffffff" }],
        },
      ];
    }
  }, []);

  const [editor] = useState(() => withReact(withHistory(createEditor())));
  return (
    <>
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
          className="editor"
          renderElement={RenderElement}
          renderLeaf={RenderLeaf}
          onKeyDown={(e) => {
            Shortcuts(e, editor);
          }}
        />
      </Slate>
    </>
  );
}
