/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  serverDependenciesToBundle: [
    /react-icons*/,
    //
    "slate",
    "slate-history",
    "slate-react",
    "direction",
    /lodash*/,
    "scroll-into-view-if-needed",
    "compute-scroll-into-view",
    "is-plain-object",
    "immer",
    "@juggle/resize-observer",
    "is-hotkey",
    //
    //"react",
    //"react-dom",
    //"scheduler",
    //
    "bcryptjs",
    //
  ],
};
