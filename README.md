<h1 align="center">Welcome to felsenfest-homepage 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

## Built with

<p float="left">
<img src="./repo_assets/webpack.png" width="170" hspace="20"/>
  <img src="./repo_assets/bootstrap.png" width="170" hspace="20"/> 
  <img src="./repo_assets/babel.png" width="170" hspace="20"/>
  <img src="./repo_assets/jquery.png" width="170" hspace="20"/>
  <img src="./repo_assets/sass.png" width="170" hspace="20">
</p>

## Install

```sh
yarn install
```

## Usage

```sh
yarn run serve
```

## Footguns
Note that async importing with ES6 Syntax returns a promise, so you must either specify the default property via: `{default: DefaultObject}`
(see: )

Further Examples:

```
const { TweenLite, TweenMax } = await import(/* webpackChunkName: "gsap" */ 'gsap');
  console.log(TweenLite); //-> function TweenLite
  console.log(TweenMax) //-> function TweenMax
  
  //Await import returns a wrapper object here
  const gsap = await import(/* webpackChunkName: "gsap" */ 'gsap'); 
  console.log(gsap); //->{TweenLite, TweenPlugin, TweenMax, TimelineMax,...}

  // You would expect the default export here. That's not the case, since await import returns a promise, in which all exported objects are captured when it's resolved.
  // Because the wrapper object has no key "gsapModule" here, the return value is undefined.
  const { gsapModule } = await import(/* webpackChunkName: "gsap" */ 'gsap');
  console.log(gsapModule); //-> undefined.

  //With the .default key, we get the default export with the given alias.
  const { default: gsapModule } = await import(/* webpackChunkName: "gsap" */ 'gsap');
  console.log(gsapModule); //-> TweenMax, the default export

```

## Author

👤 **Julian Krieger**

- Github: [@juliankrieger](https://github.com/juliankrieger)

## Show your support

Give a ⭐️ if this project helped you !

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
