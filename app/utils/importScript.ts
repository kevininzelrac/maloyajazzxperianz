import { useEffect } from "react";

const importScript = (src: string) => {
  let script: any;
  useEffect(() => {
    script = document.createElement("script");
    script.src = src;
    //script.async = true;
    //script.defer = true;
    //script.setAttribute("crossOrigin", "anonymous");
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [src]);
  return script;
};
export default importScript;

// export default importScript;
// import { useEffect } from "react";

// const importScript = (resourceUrl: string) => {
//   useEffect(() => {
//     // Vérifier si un script avec le même src existe déjà
//     //const existingScript = Array.from(
//     //  document.getElementsByTagName("script")
//     //).find((script) => script.src === resourceUrl);
//     // Supprimer le script lors du démontage du composant
//     const scriptsToRemove = Array.from(
//       document.getElementsByTagName("script")
//     ).filter((script) => script.id.includes("googleidentityservice"));

//     scriptsToRemove.forEach((script) => {
//       document.body.removeChild(script);
//     });
//     const linksToRemove = Array.from(
//       document.getElementsByTagName("link")
//     ).filter((link) => link.id.includes("googleidentityservice"));

//     linksToRemove.forEach((link) => {
//       document.body.removeChild(link);
//     });

//     //if (existingScript) return;
//     // Créer un nouveau script s'il n'existe pas
//     const script = document.createElement("script");
//     script.async = true;
//     script.defer = true;
//     script.src = resourceUrl;
//     script.setAttribute("id", "googleidentityservice");
//     document.body.appendChild(script);

//     // Retourner une fonction de nettoyage
//     //return () => {
//     //  // Supprimer le script lors du démontage du composant
//     //  const scriptsToRemove = Array.from(
//     //    document.getElementsByTagName("script")
//     //  ).filter(
//     //    (script) =>
//     //      script.src === resourceUrl || script.id === "googleidentityservice"
//     //  );
//     //
//     //  scriptsToRemove.forEach((script) => {
//     //    document.body.removeChild(script);
//     //  });
//     //};
//   }, [resourceUrl]);
// };

// export default importScript;
