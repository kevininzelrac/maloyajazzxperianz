import { Editor, Element, Transforms } from "slate";
import { useSlate } from "slate-react";
import { CustomEditor } from "../slate";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import Icon from "./icon";
import { MdOutlineDriveFolderUpload } from "react-icons/md";

const isActive = (editor: CustomEditor, type: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
  });
  return !!match;
};

const isVoidUrl = (url: string, type: any) => {
  if (!url) return false;

  switch (type) {
    case "image":
      const _url = new URL(url);
      const image = _url.pathname.split(".").pop()?.toString();
      return ["jpg", "png"].includes(image!) ? url : null;
    //
    case "youtube":
      const youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;

      const youtubeMatch = url.match(youtubeRegex);

      if (!youtubeMatch) return null;
      const videoId = youtubeMatch[5];
      return `https://www.youtube.com/embed/${videoId}`;
    //
    case "spotify":
      const spotifyRegex =
        /^https:\/\/open\.spotify\.com\/(?:[a-z-]+\/)?(album|track)\/([a-zA-Z0-9]+)\?si=([a-zA-Z0-9_-]+)$/;

      const spotifyMatch = url.match(spotifyRegex);

      if (!spotifyMatch) return null;
      const [, type, id] = spotifyMatch;
      return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
  }
};

const insertVoid = (
  editor: CustomEditor,
  src: string,
  type: "image" | "youtube" | "spotify"
) => {
  Transforms.insertNodes(editor, {
    type,
    src,
    width: 180,
    height: 180,
    float: "none",
    shape: "",
    children: [{ text: "" }],
  });
};

export default function AddVoid({
  type,
}: {
  type: "image" | "youtube" | "spotify";
}) {
  const editor = useSlate();

  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return element.type === type ? true : isVoid(element);
  };
  const [display, setDisplay] = useState(false);

  return (
    <>
      {display ? (
        <Dialog editor={editor} handleClose={() => setDisplay(false)} />
      ) : null}
      <button
        className={isActive(editor, type) ? "active" : undefined}
        data-tooltip={type}
        onMouseDown={() => {
          if (isActive(editor, type)) {
            Transforms.removeNodes(editor);
          } else {
            if (type === "image") {
              setDisplay(true);
            } else {
              const src = window.prompt("Enter the " + type + " URL");
              if (!src) return alert("Enter a correct " + type + " url");

              const verifiedSrc = isVoidUrl(src, type);
              if (!verifiedSrc)
                return alert("Enter a correct " + type + " url");

              src && insertVoid(editor, verifiedSrc, type);
            }
          }
        }}
      >
        {type.includes("image") ? (
          isActive(editor, type) ? (
            <Icon type="delete" />
          ) : (
            <Icon type="image" />
          )
        ) : (
          <Icon type={type} />
        )}
      </button>
    </>
  );
}

const Dialog = ({
  editor,
  handleClose,
}: {
  editor: CustomEditor;
  handleClose: () => void;
}) => {
  const fetcher = useFetcher();
  const [src, setSrc] = useState<string>("");
  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      insertVoid(editor, fetcher.data.url, "image");
      handleClose();
    }
  }, [fetcher.data, fetcher.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (src && !isVoidUrl(src, "image")) {
      return alert("Enter a correct image url");
    }
    insertVoid(editor, src, "image");
    handleClose();
    setSrc("");
  };
  return (
    <dialog>
      <span className="opaque"></span>
      <div>
        <button className="close" onClick={handleClose}>
          x
        </button>
        <fetcher.Form
          method="post"
          encType="multipart/form-data"
          action="/api/upload"
        >
          <input type="file" name="file" accept="image/*" />
          <br />
          <button type="submit">
            <MdOutlineDriveFolderUpload />
          </button>
        </fetcher.Form>
        or
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter image URL here"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
          />
          <br />
          <button type="submit">submit</button>
        </form>
      </div>
    </dialog>
  );
};
