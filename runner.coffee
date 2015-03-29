#!/usr/bin/env coffee

require('shelljs/make')

src =
  js: __dirname + "/src/js/app.js",
  jade: "./src/jade",
  stylus: "./src/styl"

console.log(src.js)

destDir = __dirname + "/build"

run = (cmd, async) ->
  line = cmd.split("\n").join(" ")
  console.info(line)
  execWithRerun = (line) ->
    exec line, async: async, ->
      execWithRerun(line) if async
  execWithRerun(line)
  
target.build = ->
  browserify("prod")
  jade("prod")
  stylus("prod")

target.watch = ->
  browserify("dev")
  jade("dev")
  stylus("dev")

jade = (env) ->
  cmd = """
    jade #{`(env == "dev" ? "--watch" : "")`} #{src.jade} --out #{destDir}
  """
  run cmd, env == "dev"

stylus = (env) ->
  cmd = """
    stylus #{`(env == "dev" ? "--watch --sourcemap-inline" : "")`} #{src.stylus} --out #{destDir}
  """
  run cmd, env == "dev"

browserify = (env) ->
  isDev = env == "dev"
  # -g [ envify --NODE_ENV #{`(isDev ? "development" : "production")`} ]
  cmd = """
    #{`(isDev ? "watchify" : "browserify")`} #{src.js} #{`(isDev ? "-d -v" : "")`}
    -t [ babelify #{`(isDev ? "--sourceMap" : "")`} --optional utility.inlineExpressions ]
    #{`(isDev ? "" : "-g [ envify --NODE_ENV production ]")`}
    -t brfs
    #{`(isDev ? "--outfile" : " | uglifyjs --stats --compress --mangle --screw-ie8 --output")`}
    #{destDir}/bundle.#{`(isDev ? "" : "min.")`}js
  """
  run cmd, isDev
  unless isDev
    run """
      gzip -c -9 #{destDir}/bundle.min.js > #{destDir}/bundle.min.js.gz
    """, false

