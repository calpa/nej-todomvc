/* global NEJ localStorage*/
NEJ.define(['util/cache/platform/storage'], function(_p) {
  _p.__initStore = (function() {
    if (!localStorage['todos']) {
      var data = {
        todos: []
      }

      localStorage['todos'] = JSON.stringify(data);
    }
  }());

  _p.__getStore = function() {
    return JSON.parse(localStorage['todos']);
  }

  _p.__addItem = function(item) {
    var _data = JSON.parse(localStorage['todos']);
    var _todos = _data.todos;

    // Generate an ID
    item.id = item.id || new Date().getTime();
    _todos.push(item);
    localStorage['todos'] = JSON.stringify(_data);

    return _todos;
  };

  _p._$deleteItem = function(id) {
    var _data = JSON.parse(localStorage['todos']);
    var _todos = _data.todos;

    for (var i = 0, n = _todos.length; i < n; i += 1) {
      if (_todos[i].id === id) {
        _todos.splice(i, 1);
        break;
      }
    }

    localStorage['todos'] = JSON.stringify(_data);
    return _todos;
  };

  _p._$toggleCompleteStatus = function(id) {
    var _data = JSON.parse(localStorage['todos']);
    var _todos = _data.todos;

    if (id) {
      for (var i = 0, n = _todos.length; i < n; i += 1) {
        if (_todos[i].id == id) {
          _todos[i].completed = !_todos[i].completed;
        }
      }
    }

    localStorage['todos'] = JSON.stringify(_data);
  }

  _p.__editItem = function(id, value) {
    var _data = JSON.parse(localStorage['todos']);
    var _todos = _data.todos;

      for (var i = 0, n = _todos.length; i < n; i += 1) {
        if (_todos[i].id === +id) {
            _todos[i].content = value;
            break;
        }
      }

    localStorage['todos'] = JSON.stringify(_data);
  }

  return _p;
});
