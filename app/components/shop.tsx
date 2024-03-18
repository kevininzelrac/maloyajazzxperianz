import { useState } from "react";
import Dialog from "~/components/dialog";

export default function Shop() {
  const [display, setDisplay] = useState(false);
  const redirectUrl =
    "https://www.helloasso-sandbox.com/associations/le-charbon/boutiques/test/widget";

  return (
    <>
      <button data-primary onClick={() => setDisplay(true)}>
        visit the Shop
      </button>
      {display ? (
        <Dialog handleClick={() => setDisplay(false)}>
          <iframe
            id="haWidget"
            //allowTransparency={true}
            //scrolling="auto"
            src={redirectUrl}
            style={{ width: "80vw", height: "80vh", border: "none" }}
          ></iframe>
        </Dialog>
      ) : null}
    </>
  );
}
