import { cssBundleHref } from "@remix-run/css-bundle";
import { LinksFunction } from "@remix-run/node";

import a from "./a.css";
import animations from "./animations.css";
import article from "./article.css";
import aside from "./aside.css";
import badge from "./badge.css";
import button from "./button.css";
import dialog from "./dialog.css";
import fonts from "./fonts.css";
import footer from "./footer.css";
import form from "./form.css";
import header from "./header.css";
import loading from "./loading.css";
import reset from "./reset.css";
import root from "./root.css";
import tooltip from "./tooltip.css";
import tools from "./tools.css";
import variables from "./variables.css";

const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [
        { rel: "stylesheet", href: a },
        { rel: "stylesheet", href: animations },
        { rel: "stylesheet", href: article },
        { rel: "stylesheet", href: aside },
        { rel: "stylesheet", href: badge },
        { rel: "stylesheet", href: button },
        { rel: "stylesheet", href: dialog },
        { rel: "stylesheet", href: fonts },
        { rel: "stylesheet", href: footer },
        { rel: "stylesheet", href: form },
        { rel: "stylesheet", href: header },
        { rel: "stylesheet", href: loading },
        { rel: "stylesheet", href: reset },
        { rel: "stylesheet", href: root },
        { rel: "stylesheet", href: tooltip },
        { rel: "stylesheet", href: tools },
        { rel: "stylesheet", href: variables },
      ]),
];

export default links;
