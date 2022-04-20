function createEl(el, ObjectOfProps) {
  const El = document.createElement(el);
  for (let item in ObjectOfProps) {
    El[item] = ObjectOfProps[item];
  }
  console.log(
    `%c  El `,
    "background: #2ecc71;border-radius: 0.5em;color: white;font-weight: bold;padding: 2px 0.5em",
    { El }
  );
  document.getElementsByTagName("head")[0].appendChild(El);
}
createEl("meta", { charset: "UTF-8" });
createEl("link", { rel: "icon", href: "/favicon.ico" });
createEl("meta", { name: "renderer", content: "webkit" });
createEl("meta", {
  name: "viewport",
  content: "width=device-width, initial-scale=1.0",
});
createEl("script", {
  type: "module",
  crossorigin: true,
  src: "/dorsapax/Data/Java/dist/assets/index.js",
});
createEl("link", {
  rel: "modulepreload",
  href: "/dorsapax/Data/Java/dist/assets/vendor.js",
});
createEl("link", {
  rel: "stylesheet",
  href: "/dorsapax/Data/Java/dist/assets/vendor.css",
});
createEl("link", {
  rel: "stylesheet",
  href: "/dorsapax/Data/Java/dist/assets/index.css",
});

$("#divupdatepanel").prepend(`<div id="app"></div>`);

$("#btn_Save").css({ display: "none" });
