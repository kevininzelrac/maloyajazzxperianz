import deezer from "../../public/img/deezer.png";
import spotify from "../../public/img/spotify.png";
import amazon from "../../public/img/amazon.png";
import youtube from "../../public/img/youtube.png";
import apple from "../../public/img/apple.png";
import google from "../../public/img/google.png";

export default function Footer() {
  return (
    <footer>
      <div className="platforms">
        <span>
          <img src={deezer} />
          <img src={spotify} />
          <img src={amazon} />
        </span>
        <span>
          <img src={youtube} />
          <img src={apple} />
          <img src={google} />
        </span>
      </div>
      <br />
      <p>Maloya Jazz Xperianz</p>
      <i>
        <small>built by Kevin Inzelrac</small>
      </i>
    </footer>
  );
}
