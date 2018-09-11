'use strict'
const Generator = require('yeoman-generator')
const _ = require('lodash')
const normalizeUrl = require('normalize-url')
const humanizeUrl = require('humanize-url')
const isScoped = require('is-scoped')

const defaultKeywords = ['tstackgl', 'webgl', 'typescript']

const slugifyPackageName = name => (isScoped(name) ? name : _.kebabCase(name))
const getRepoName = name => (isScoped(name) ? name.split('/')[1] : name)

module.exports = class extends Generator {
  init() {
    return this.prompt([
      {
        name: 'moduleName',
        message: 'Module name?',
        default: _.kebabCase(this.appname),
        filter: prompt => slugifyPackageName(prompt),
      },
      {
        name: 'moduleDescription',
        message: 'Description?',
        default: `My tstackgl module`,
      },
      {
        name: 'keywords',
        message: 'Keywords? (comma to split)',
        default: '',
        filter: prompt => prompt.split(/\s*,\s*/g),
      },
      {
        name: 'githubUsername',
        message: 'What is your GitHub username (or organization)?',
        store: true,
        validate: prompt => (prompt.length > 0 ? true : 'You have to provide a username'),
      },
      {
        name: 'website',
        message: 'What is the URL of your website?',
        store: true,
        filter: prompt => (prompt ? humanizeUrl(normalizeUrl(prompt)) : null),
      },
    ]).then(props => {
      let moduleName = props.moduleName
      const moduleDescription = props.moduleDescription
      let keywords = props.keywords
      const moduleField = props.moduleField

      const githubUsername = props.githubUsername
      let website = props.website

      // these are the filters, workaround for issue https://github.com/yeoman/yeoman-test/issues/29
      if (process.env.NODE_ENV === 'test') {
        moduleName = slugifyPackageName(moduleName)
        keywords = defaultKeywords.concat(keywords.split(/\s*,\s*/g))
        website = website ? humanizeUrl(normalizeUrl(website)) : null
      } else {
        keywords = defaultKeywords.concat(props.keywords)
      }

      const repoName = getRepoName(moduleName)
      const camelModuleName = _.camelCase(repoName)

      this.templateVariables = {
        moduleName,
        moduleDescription,
        camelModuleName,
        keywords: keywords.filter(Boolean),
        moduleField,
        githubUsername,
        repoName,
        name: this.user.git.name(),
        email: this.user.git.email(),
        website,
      }

      this.fs.copyTpl(`${this.templatePath()}/**`, this.destinationPath(), this.templateVariables)

      const mv = (from, to) => this.fs.move(this.destinationPath(from), this.destinationPath(to))
      const rm = file => this.fs.delete(this.destinationPath(file))

      mv('prettierrc', '.prettierrc')
      mv('gitattributes', '.gitattributes')
      mv('gitignore', '.gitignore')
      mv('_package.json', 'package.json')
      mv('_tsconfig.json', 'tsconfig.json')

      rm('.yo-rc.json')
    })
  }

  git() {
    this.spawnCommandSync('git', ['init'])
  }

  install() {
    this.npmInstall()
  }
}
