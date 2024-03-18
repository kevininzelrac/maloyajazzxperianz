import { Slate, Editable, withReact } from "slate-react";
import { createEditor, type Descendant } from "slate";
import { useMemo, useState } from "react";
import { RenderElement, RenderLeaf } from "./render";
import { LinksFunction } from "@remix-run/node";
import { useLocation } from "@remix-run/react";
import { withHistory } from "slate-history";
import Toolbar from "./components/toolbar";
import Shortcuts from "./shortcuts";
import slate from "./slate.css";

export let links: LinksFunction = () => [{ rel: "stylesheet", href: slate }];

export default function Editor({
  children,
  onChange,
}: {
  children: string;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { pathname } = useLocation();

  //useEffect(() => {
  //  Boolean(localStorage.getItem("slate" + pathname))
  //    ? onChange(true)
  //    : onChange(false);
  //}, []);

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
    <div className="slate">
      <Slate
        editor={editor}
        initialValue={
          localStorage.getItem("slate" + pathname)
            ? JSON.parse(localStorage.getItem("slate" + pathname)!)
            : initialValue
        }
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );

          if (isAstChange) {
            if (JSON.stringify(value) !== JSON.stringify(initialValue)) {
              localStorage.setItem("slate" + pathname, JSON.stringify(value));
              onChange(true);
            } else {
              localStorage.removeItem("slate" + pathname);
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
    </div>
  );
}
