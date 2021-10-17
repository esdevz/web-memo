const path = require("path");

require("esbuild").build({
  entryPoints: [
    path.resolve(__dirname, "..", "background-scripts/background.ts"),
  ],
  outdir: path.resolve(__dirname, "..", "build"),
  target: "es2020",
  bundle: true,
});
