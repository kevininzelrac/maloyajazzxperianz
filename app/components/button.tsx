import { useNavigate } from "@remix-run/react";

export default function Button({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  const to = useNavigate();
  return (
    <button
      onClick={() => {
        to(props.to);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
