#! /usr/bin/env node
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const babel = require("rollup-plugin-babel");
const json = require("rollup-plugin-json");
const filesize = require("rollup-plugin-filesize");
const path = require("path");
const fs = require("fs");

const toTitleCase = str => {
  return str.replace(/-/g, ' ').replace(
      /\w\S*/g,
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  ).split(' ').join('');
}

/**
 * Since Rollup runs inside each package we can just get the current
 * package we are bundling.
 */
const pkg = require(path.join(process.cwd(), "package.json"));

/**
 * and dig out its name.
 */
const { name } = pkg;

/**
 * The module name will be the name of the global variable used in UMD builds.
 * All exported members of each package will be attached to this global.
 */
const moduleName = "bmi";

/**
 * Now we need to discover all the `@bmi/*` package names so we can create
 * the `globals` and `externals` to pass to Rollup.
 */
const skipPackages = [];
const packageNames = fs
  .readdirSync(path.join(__dirname, "packages"))
  .filter(p => p[0] !== "." && !skipPackages.includes(p))
  .map(p => {
    return require(path.join(__dirname, "packages", p, "package.json")).name;
  }, {});

/**
 * Rollup will use this map to determine where to lookup modules on the global
 * window object when neither AMD or CommonJS is being used. This configuration
 * will cause Rollup to lookup all imports from our packages on a single global
 * `bmi` object.
 */
const globals = packageNames.reduce(
  (globals, p) => ({ ...globals, [p]:  moduleName + toTitleCase(p.replace("@mngis/", "")) }),
  {}
);


const getConfig = format => {
  console.log(`Rolling up package "${name}" with format: "${format}"`);
  const browserFriendly = ['umd', 'iife'].includes(format);

  // add appropriate babel plugins
  const babelPlugins = ["@babel/plugin-proposal-object-rest-spread"];
  if (!browserFriendly){
    babelPlugins.push(...[
      "@babel/plugin-transform-runtime",
      // {
      //   regenerator: false
      // }
    ])
  } 

  // set config
  const base = name.replace("@mngis/", "");
  const outfile = `./dist/${format === "es" ? "esm" : format}/${base}.js`;
  const options = {
    input: "./src/index.js",
    context: format === "umd" ? "window" : null,
    plugins: [
      // ...aliased,
      json(),
      resolve({
        mainFields: ['main', 'module', 'browser', 'jsnext']
        // jsnext: true,
        // main: true,
        // browser: true
      }),
      commonjs(),
      babel({
        babelrc: false,
        exclude: "../../node_modules/**",
        runtimeHelpers: true,
        externalHelpers: browserFriendly,//false,
        // plugins: babelPlugins,
        plugins: [
          "@babel/plugin-proposal-object-rest-spread",
          [
            "@babel/plugin-transform-runtime",
            {
              regenerator: browserFriendly //false
            }
          ]
        ],
        presets: [
          [
            "@babel/preset-env",
            {
              modules: false,
              // "useBuiltIns": "entry"
            }
          ]
        ]
      }),
      filesize()
    ].filter(p => !!p),
    external: ["vue", "esri-loader", "axios", ...packageNames.filter(p => !p.includes('fernet') && !p.includes('Fernet'))]
  };

  return {
    inputOptions: options,
    outputOptions: {
      extend: browserFriendly, // causes this module to extend the global specified by `moduleName`
      // name: browserFriendly ? moduleName : name,
      name: browserFriendly? moduleName + toTitleCase(name.replace("@mngis/", "")): name,
      file: outfile,
      format: format,
      globals: {
        vue: "Vue",
        axios: 'axios',
        ...browserFriendly ? globals: {}
      }
    }
  };
};

module.exports = getConfig;
