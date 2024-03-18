import { createPortal } from "react-dom";

export default function Dialog({
  children,
  handleClick,
}: {
  children: JSX.Element;
  handleClick: () => void;
}) {
  return (
    <>
      {createPortal(
        <dialog>
          <span className="opaque" onClick={handleClick}></span>
          <div>
            <button className="close" onClick={handleClick}>
              x
            </button>
            {children}
          </div>
        </dialog>,
        document.body
      )}
    </>
  );
}
