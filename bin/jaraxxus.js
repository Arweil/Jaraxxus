const program = require('commander')

program
  .version('1.0.0')

program
  .command(`init`)
  .action(function (env, options) {
    console.log(`init`)
  })

program
  .command(`start`)
  .action(function (env, options) {
    require(`../webpack/webpack.dev.conf`)
    console.log(`start`)
  })

program
  .command(`build`)
  .action(function (env, options) {
    console.log(`build`)
  })

program.parse(process.argv)
