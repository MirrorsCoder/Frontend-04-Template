var Generator = require('yeoman-generator')
module.exports = class extends (
  Generator
) {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correct
    super(args, opts)
    // Next, add your custom code
    // this.option('babel') // This method adds suport for a `--babel` flag
  }

  // 依赖系统
  initPackage() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0',
      },
      dependencies: {
        react: '^16.2.0',
      },
    }

    // Extend to create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
    this.npmInstall()
    // this.npmInstall(['lodash'], { 'save-dev': true })
  }

  // 异步method
  async method1() {
    // const answers = await this.prompt([
    //   {
    //     type: 'input',
    //     name: 'name',
    //     massage: 'Your project name',
    //     default: this.appname, // Default to current folder name
    //   },
    //   {
    //     type: 'confirm',
    //     name: 'cool',
    //     message: 'Would you like to enable the Cool feature?',
    //   },
    // ])
    // console.log('app name', answers.name)
    // console.log('cool feature', answers.cool)
    // console.log('method 1 just run')
  }
  // 文件系统
  async method2() {
    // console.log('method 2 just run')

    this.fs.copyTpl(
      this.templatePath('t.html'),
      this.destinationPath('public/index.html'),
      { title: 'Templating with Yeoman' }
    )
  }
}
