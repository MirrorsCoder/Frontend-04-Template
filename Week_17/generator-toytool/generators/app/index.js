var Generator = require('yeoman-generator')
module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correct
    super(args, opts)
    // Next, add your custom code
    // this.option('babel') // This method adds suport for a `--babel` flag
  }

  // 依赖系统
  async initPackage() {
    let answer = await this.prompt([
      {
        type: 'input',
        name: 'name',
        massage: 'Your project name',
        default: this.appname, // Default to current folder name
      },
    ])
    const pkgJson = {
      "name": answer.name,
      "version": '1.0.0',
      "main": 'generators/app/index.js',
      "scripts": {
        "build": "webpack",
        "test": "mocha --require @babel/register",
        "coverage": "nyc mocha --require @babel/register"
      },
      "author": '',
      "license": 'ISC',
      "devDependencies": {},
      "dependencies": {},
    }

    // Extend to create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
    this.npmInstall(['vue'], { 'save-dev': false })
    this.npmInstall(
      [
        'webpack',
        'webpack-cli',
        'vue-loader',
        'vue-style-loader',
        'babel-loader',
        'babel-plugin-istanbul',
        '@istanbuljs/nyc-config-babel',
        'mocha',
        'nyc',
        '@babel/core',
        '@babel/preset-env',
        '@babel/register',
        'css-loader',
        'vue-template-compiler',
        'copy-webpack-plugin',
      ],
      {
        'save-dev': true,
      }
    )

    this.fs.copyTpl(
      this.templatePath('sample-test.js'),
      this.destinationPath('test/sample-test.js'),
      {}
    )
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'),
      {}
    )
    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc'),
      {}
    )
    this.fs.copyTpl(
      this.templatePath('HelloWorld.vue'),
      this.destinationPath('src/HelloWorld.vue'),
      {}
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {}
    )
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js'),
      {}
    )
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: answer.name }
    )
  }
}
