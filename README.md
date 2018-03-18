# NEJ Todomvc
![NEJ Todomvc](https://i.imgur.com/BezCwcR.jpg)

Nej.js + todomvc

## Getting Started

Clone the whole project, use your method to open `public/index.html`, or simply type the following commands:

```
git clone https://github.com/calpa/nej-todomvc.git
cd ./nej-todomvc
npm install
npm start
```

![npm start](https://i.imgur.com/YKE7Pqq.jpg)

## Structure
### Install Nej.js
As Nej.js framework requires to be included in the project, you need to manually download the [nej.js framework](https://github.com/genify/nej) from Github.
Or, using the [cdn](http://nej.netease.com/nej2/src/define.js) from NetEase.

### Explanation of the entry point `index.js`
For example, you may inspect the source code via `/public` folder, and there is something like this:

```JavaScript
NEJ.define([
  'util/template/tpl', './item/index.js', './store.js', 'util/form/form'
], function(_t, _i, _s, _f) {
  var _data = _s.__getStore();

  var _list = _t._$getItemTemplate(
    _data.todos, _i._$$CommentItem, {
      parent: 'list-box'
    });
});
```

The first `NEJ.define` is a function reads the first argument(Array),
and the second argument is the callback, the part that we will code with.
The arguments in the callback function are equal to the export in the first argument.

P.S. You can use `debugger` to inspect whether there exists such method in the argument,
sometimes, you may find that some modules don't have the specified exports (README.md !== module.exports).
When you face this situation, please contact the module developer or directly manipulate the source code.

If you are familiar with AngularJS, you may find that in NEJ.js, `_`, `$`, `_$$` symbols are used to present the different state of the function.

## Special Thanks
NetEase

## Contact
![Calpa](https://i.imgur.com/kZGiYNO.jpg)

Calpa Liu
