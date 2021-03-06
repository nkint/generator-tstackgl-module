import path from 'path'
import test from 'ava'
import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import pify from 'pify'

let generator

test.beforeEach(async () => {
  await pify(helpers.testDirectory)(path.join(__dirname, 'tmp'))
  generator = helpers.createGenerator('tstackgl-module:app', ['../app'], null, {
    skipInstall: true,
  })
  generator.run = pify(generator.run.bind(generator))
})

test.serial('generates expected files', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'test',
    githubUsername: 'test',
  })

  await generator.run()

  assert.file([
    '.git',
    'src/index.ts',
    'src/demo.ts',
    'test/index.js',
    '.prettierrc',
    '.gitattributes',
    '.gitignore',
    'LICENSE',
    'package.json',
    'README.md',
  ])
})

test.serial('uses the prompted description', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'test',
    moduleDescription: 'foo',
    githubUsername: 'test',
  })

  await generator.run()

  assert.jsonFileContent('package.json', { description: 'foo' })
  assert.fileContent('README.md', /> foo/)
})

test.serial('defaults to superb description', async () => {
  helpers.mockPrompt(generator, {
    moduleName: '@testa/test',
    githubUsername: 'test',
  })

  await generator.run()

  assert.fileContent('package.json', /"description": "My .+ module",/)
  assert.fileContent('README.md', /> My .+ module/)
})

test.serial('keywords are separated correctly', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'test',
    githubUsername: 'test',
    keywords: 'some, random, keywords',
  })

  await generator.run()

  assert.jsonFileContent('package.json', {
    keywords: ['tstackgl', 'webgl', 'typescript', 'some', 'random', 'keywords'],
  })
})
