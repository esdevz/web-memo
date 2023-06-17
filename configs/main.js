const { copyFile } = require("fs/promises");
const path = require("path");
const copyStaticFiles = require("./copyFiles");
const esbuild = require("esbuild");

const isWatchMode = process.argv[2] && process.argv[2] === "-watch";

const buildPaths = [
  {
    src: path.resolve(__dirname, "..", "main/index.html"),
    dest: path.resolve(__dirname, "..", "build/firefox/main/index.html"),
  },
  {
    src: path.resolve(__dirname, "..", "sidebar/index.html"),
    dest: path.resolve(__dirname, "..", "build/firefox/sidebar/index.html"),
  },
  {
    src: path.resolve(__dirname, "..", "utils/colorMode.js"),
    dest: path.resolve(__dirname, "..", "build/firefox/main/colorMode.js"),
  },
  {
    src: path.resolve(__dirname, "..", "utils/colorMode.js"),
    dest: path.resolve(__dirname, "..", "build/firefox/sidebar/colorMode.js"),
  },
];

async function copyBuildFiles() {
  try {
    for (const buildPath of buildPaths) {
      await copyFile(buildPath.src, buildPath.dest);
      console.log(`copy ${path.basename(buildPath.src)} to ${buildPath.dest} `);
    }

    await copyStaticFiles();
  } catch (err) {
    console.error(err);
  }
}

/**
 * @type esbuild.BuildOptions
 */
const buildOptions = {
  entryPoints: [
    path.resolve(__dirname, "..", "main/index.tsx"),
    path.resolve(__dirname, "..", "background-scripts/background.ts"),
    path.resolve(__dirname, "..", "sidebar/index.tsx"),
  ],
  entryNames: "[dir]/[name]",
  assetNames: "./assets/[name]-[hash]",
  outdir: path.resolve(__dirname, "..", "build/firefox"),
  minify: true,
  target: "es2020",
  format: "esm",
  bundle: true,
  loader: {
    ".woff": "file",
    ".woff2": "file",
  },
};

async function main() {
  if (isWatchMode) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    await copyBuildFiles();
    console.log("watching...");
  } else {
    await esbuild.build(buildOptions);
    await copyBuildFiles();
    console.log("built successfully");
  }
}

main();
