import { BsPaypal } from "react-icons/bs";
import { useState } from "react";
import Dialog from "~/components/dialog";
import ErrorBoundary from "~/components/errorBoundary";

export { ErrorBoundary };

export default function Shop() {
  const [display, setDisplay] = useState("");
  const redirectUrl =
    "https://www.helloasso-sandbox.com/associations/le-charbon/boutiques/test/widget";

  return (
    <main
      style={{
        width: "100%",
        height: "fit-content",
      }}
    >
      <button onClick={() => setDisplay(redirectUrl)}>
        <BsPaypal />
      </button>
      {display ? (
        <Dialog handleClick={() => setDisplay("")}>
          <iframe
            id="haWidget"
            //allowTransparency={true}
            //scrolling="auto"
            src={redirectUrl}
            style={{ width: "80vw", height: "80vh", border: "none" }}
          ></iframe>
        </Dialog>
      ) : null}
    </main>
  );
}
