import { LinksFunction, MetaFunction } from "@remix-run/node";
import { useLocation } from "@remix-run/react";
import image from "public/img/mon-pei01.jpg";
import styles from "./styles.css";
import sleep from "~/utils/sleep";
import Transition from "~/components/transition";

import ErrorBoundary from "../../components/errorBoundary";
import Buy from "~/components/buy";

export { ErrorBoundary };

export const meta: MetaFunction = () => [
  { title: "Home" },
  { name: "description", content: "Home" },
];
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader = async () => {
  await sleep;
  return null;
};

export default function Index() {
  const { pathname } = useLocation();
  return (
    <Transition key={pathname}>
      <main>
        <article>
          <figure>
            <img src={image} />
            <span>Mon Pei</span>
          </figure>
          <section>
            <h4>Mon Pei</h4>
            <p>
              Le Lorem Ipsum est simplement du faux texte employé dans la
              composition et la mise en page avant impression. Le Lorem Ipsum
              est le faux texte standard de l'imprimerie depuis les années 1500,
              quand un imprimeur anonyme assembla ensemble des morceaux de texte
              pour réaliser un livre spécimen de polices de texte. Il n'a pas
              fait que survivre cinq siècles, mais s'est aussi adapté à la
              bureautique informatique, sans que son contenu n'en soit modifié.
              Il a été popularisé dans les années 1960 grâce à la vente de
              feuilles Letraset contenant des passages du Lorem Ipsum.
            </p>
            <Buy item="article 01" amount={1000} />
          </section>
        </article>
        <link
          rel="alternate"
          type="application/json+oembed"
          href="https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Fshow%2F5eXZwvvxt3K2dxha3BSaAe"
        />

        {/* <section>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmaloyajazzxperianz%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=6675077222547688"
            width="340"
            height="500"
            style={{ border: "none", overflow: "hidden" }}
            //scrolling="no"
            //frameborder="0"
            //allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </section> */}
      </main>
    </Transition>
  );
}
