import { useNavigate } from "@remix-run/react";

export default function Button({
  to,
  children,
  ...props
}: {
  children: React.ReactNode;
  to: string;
}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(to);
      }}
      data-tooltip={to}
      {...props}
    >
      {children}
    </button>
  );
}
