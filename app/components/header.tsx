import { LogoLarge } from "~/svg";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header>
      <h1 style={{ display: "none" }}>Maloya Jazz Xperianz</h1>
      <LogoLarge
        style={{ padding: ".2rem" }}
        className="LogoLarge"
        color="ghostwhite"
        height={80}
      />
      {children}
    </header>
  );
}
