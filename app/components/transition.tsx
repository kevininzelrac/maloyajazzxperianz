import { Children, cloneElement } from "react";
import { useNavigation } from "@remix-run/react";

export default function Transition({
  children,
}: //duration,
{
  children: React.ReactElement;
  // duration: number;
}): JSX.Element {
  const { state } = useNavigation();
  const duration = 160;

  const clone = Children.map(children, (child) => {
    if (!child) return children;
    return cloneElement(child, {
      style: {
        animationName: state === "idle" ? "fadeIn" : "fadeOut",
        animationDuration: duration + "ms",
        animationTimingFunction: "ease-in-out",
        animationFillMode: "forwards",
        animationIterationCount: "1",
      },
    });
  });

  return <>{clone}</>;
}
