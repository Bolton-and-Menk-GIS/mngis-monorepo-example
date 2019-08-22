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
      // flags.forEach(flag => {
      //   args[flag] = true;
      // });
    }
  });
  return args;
}

async function build({ inputOptions = {}, outputOptions = {} } = {}) {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);
  // console.log('INPUTS:\n', inputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
  // console.log('OUTPUTS:\n', outputOptions)
}

// get args
const args = getArgs();
// console.log(args)
const format = args.f || "cjs";
// const dropConsole = args.strip === undefined ? true: args.strip;


// get config
const options = getConfig(format);
// if (dropConsole){
//   options.inputOptions.plugins.unshift(strip({
//     debugger: true,
//     functions: ['console.log', 'debug', 'assert.*'],
//     sourceMap: false
//   }))
// }

if (format !== "es") {
  options.inputOptions.plugins.push(uglify.uglify());
}

// console.log(options.inputOptions)

// check for gzip and brotli
if (args.g) {
  const opts = {};
  args.b
    ? (opts[customCompression] = content =>
        brotli.compress(Buffer.from(content)))
    : null;
  options.inputOptions.plugins.push(gzipPlugin(opts));
}

// console.log("OPTIONS FOR BUILD: ", options);

// do rollup build
build(options);
