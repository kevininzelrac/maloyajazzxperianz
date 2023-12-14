import { FaBeer } from "react-icons/fa";

export default function Index() {
  return (
    <main>
      <h2>Home</h2>
      <h3>
        Lets go for a <FaBeer />?
      </h3>
      Remix v2.3.1 • Vite Plugin • Vercel infrastructure
      <ul>
        <li>
          <strong>Back-End :</strong> Vercel Platform / Edge Runtime
        </li>
        <li>
          <strong>Front-End :</strong> Vercel Platform
        </li>
        <li>
          <strong>Storage :</strong> Vercel Blob
        </li>
        <li>
          <strong>Auth :</strong> Custom Auth0
        </li>
        <li>
          <strong>Security :</strong> Google reCaptcha Entreprise
        </li>
      </ul>
    </main>
  );
}
