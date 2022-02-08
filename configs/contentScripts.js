const path = require("path");

require("esbuild").build({
  entryPoints: [path.resolve(__dirname, "..", "content-scripts/content-script.ts")],
  outdir: path.resolve(__dirname, "..", "build"),
  target: "es2020",
  bundle: true,
});
