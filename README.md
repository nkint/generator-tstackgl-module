# generator-tstackgl-module

> Scaffold out a library for tstackgl

Tstackgl is stack.gl ecosystem but in Typescript. 🤙

## Credits

Stack.gl community is great! Thanks!

This generator is inspired from [generator-nm](https://github.com/sindresorhus/generator-nm)
and from [generator-browser-node-module](https://github.com/marcofugaro/generator-browser-node-module).

## Install

```bash
npm install -g yo
npm install -g generator-tstackgl-module
```

## Usage

```bash
yo tstackgl-module
```

or just

```bash
yo
```

and select `tstackgl-module`.

## Motivations and features

- _*Why Typescript?*_
  Come on, we are coders and we have to take care of the type thing in our mind already and the documentation thing in our readme, a type system just do all this for us.

- _*Why stack.gl?*_ WebGL is cool, stack.gl is awesome, regl is even better.
  Simplicity, modularity and unix philosophy 🤘

- _*prettier?*_ Manual linting could be a form of meditation but we need an opinionanted formal standard to be on the same page. Here there is prettier.

- _*microbundle.*_? Yeah I know, Javascript is a young language and we do not agree even on how to split codes into files. Microbundle can handle CommonJS, AMD, UMD and everyone deserve its freedom.

- _\_No default exports?_\_ [Only named Export](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad). I just agree on that.

- _*Browserify*_ to buil the demo. Simple enough to do what I need in a line of bash or little bit more.

- _*Budo*_ for the rapid prototyping because budo is just a fast way to run things and it has a great name.

- _*NPM or yarn?*_ For now npm is doing its job. Idea to make yarn optional in the generator is on the way.

- _*Github pages deploy.*_ I am already in github, why do I need something more?

- PR are welcome!

## License

MIT © 2018 nkint
