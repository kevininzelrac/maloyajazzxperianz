export default function Dialog({
  children,
  handleClick,
}: {
  children: JSX.Element;
  handleClick: () => void;
}) {
  return (
    <dialog>
      <span className="opaque" onClick={handleClick}></span>
      <div>
        <button className="close" onClick={handleClick}>
          x
        </button>
        {children}
      </div>
    </dialog>
  );
}
