const { argv } = process
const build = argv[argv.length - 1] === 'build'
const path = require('path')

let config = {
    port: 33533,
    livereload: !build,
    build,
    gzip: true,
    useLess: true,
    useBabel: {
        only: '*.jsx',
        plugins: [
            "babel-plugin-transform-es2015-modules-amd",
            "babel-plugin-transform-class-properties",
            "babel-plugin-transform-object-rest-spread"
        ],
        presets: ["react", "es2015"],
        moduleIds: true,
        getModuleId: pathname => pathname.replace(/^[\\/]?src\//, '')
    },
    buildFilter: pathname => /^(css|fonts|src|index|favicon)\b/.test(pathname),
    shouldUseMinify: (pathname, data) => {
        // 单文件超过20K 不进行压缩
        return data.toString().length < 20 * 1024
    },
    include: /\$require\(["'\s]*([^"'\s]+)["'\s]*\)/g,
    // app: 'static',
    middlewares: [
        {
            test: /(\.html|require\.js)$/,
            middleware: 'template'
        }
    ],
    bundles: [
        {
            test: /^src\/(?!(require|index|workers|bootstrap-datetimepicker)).*(\.jsx?)$/,
            dist: 'src/index.js'
        }
    ],
    output: require('path').join(__dirname, './dist')
}
if (!build) {
    // Mock 启动
    require('./serve/action/sys/mock/mock.js')
    Object.assign(config, require('./serve/index'))
}

module.exports = config