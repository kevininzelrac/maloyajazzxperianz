import { MetaFunction } from "@remix-run/node";
import sleep from "~/utils/sleep";
import Transition from "~/components/transition";
import Buy from "~/components/buy";

import image from "public/img/mon-pei02.jpg";

import ErrorBoundary from "~/components/errorBoundary";
import Shop from "~/components/shop";
export { ErrorBoundary };

export const meta: MetaFunction = () => [
  { title: "Home" },
  { name: "description", content: "Home" },
];

export const loader = async () => {
  await sleep();
  return null;
};

export default function Index() {
  return (
    <Transition>
      <main>
        <article>
          <figure>
            <img src={image} />
            <figcaption>Mon Pei</figcaption>
          </figure>
          <section>
            <header>
              <h2>Mon Pei</h2>
            </header>
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
            <footer>
              <Buy item="article 01" amount={1000} />
              or
              <Shop />
            </footer>
          </section>
        </article>

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
