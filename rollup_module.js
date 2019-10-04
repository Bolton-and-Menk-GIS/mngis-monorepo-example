#! /usr/bin/env node
const rollup = require("rollup");
const uglify = require("rollup-plugin-uglify");
const gzipPlugin = require("rollup-plugin-gzip").default;
const brotli = require("brotli");
const getConfig = require("./rollup_base");
const strip = require('rollup-plugin-strip');

function getArgs() {
  /* https://stackoverflow.com/a/54098693/3005089 */
  const args = {};
  process.argv.slice(2, process.argv.length).forEach(arg => {
    // long arg
    if (arg.slice(0, 2) === "--") {
      const longArg = arg.split("=");
      args[longArg[0].slice(2, longArg[0].length)] = longArg[1];
    }
    // flags
    else if (arg[0] === "-") {
      const flags = arg.slice(1, arg.length);
      args[flags] = true;
    }
  });
  return args;
}

async function build({ inputOptions = {}, outputOptions = {} } = {}) {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

// get args
const args = getArgs();
const format = args.f || "cjs";

// get config
const options = getConfig(format);

if (format !== "es") {
  options.inputOptions.plugins.push(uglify.uglify());
}

// check for gzip and brotli
if (args.g) {
  const opts = {};
  args.b
    ? (opts[customCompression] = content =>
        brotli.compress(Buffer.from(content)))
    : null;
  options.inputOptions.plugins.push(gzipPlugin(opts));
}

// do rollup build
build(options);
