NEJ.define([
  'base/klass',
  'base/element',
  'base/event',
  'ui/item/list',
  'util/template/tpl',
  'text!./index.css',
  'text!./index.html',
  '../store.js'
], function(_k, _e, _v, _i, _t, _css, _html, _s, _p) {

  // debugger;

  _p._$$CommentItem = _k._$klass();
  var _pro = _p._$$CommentItem._$extend(_i._$$ListItem);

  _pro.__initXGui = (function() {
    var _seed_css = _e._$pushCSSText(_css),
      _seed_html = _t._$addNodeTemplate(_html);
    return function() {
      this.__seed_css = _seed_css;
      this.__seed_html = _seed_html;
    };
  })();

  _pro.__initNode = function() {
    this.__super();
    var _list = _e._$getByClassName(this.__body, 'j-flag');
    this.__content = _list[0];
    // Bind click event to this.__onAction()
    _v._$addEvent(_list[1], 'click', this.__onAction._$bind(this));
  };

  // 刷新
  _pro.__doRefresh = function(_data) {
    // debugger;
    this.__content.innerHTML = _data.content;
    // Set data-id attribute to parent's parent (todo-item)
    this.__content.parentElement.parentElement.dataset.id = _data.id;
    this.__completed = _data.completed || false;

    if (this.__completed === true) {
      _e._$addClassName(this.__content, 'completed');
    }
  };

  _pro.__onAction = function(_event) {
    var _node = _v._$getElement(_event, 'd:action');
    if (!_node) {
      return;
    }

    // Obtain data-* attribute
    var dataAction = _e._$dataset(_node, 'action');

    switch (dataAction) {
      case 'complete':
        {
          // Change completed state to true in the storage
          var _id = this.__data.id;
          if (_id) {
            _s._$toggleCompleteStatus(_id);
          }

          var _box = _e._$getParent(_node, 'c:box');
          var _content = _e._$getChildren(_box)[0];

          if (this.__completed === true) {
            this.__completed = false;
            _e._$delClassName(_content, 'completed');
            return;
          }

          this.__completed = true;
          _e._$addClassName(_content, 'completed');

          break;
        }
      case 'delete':
        {
          // Empty the parent node
          _e._$getParent(_node, 'c:todo-item').innerHTML = '';

          // Delete the item in the storage

          var _id = this.__data.id;
          if (_id) {
            _s._$deleteItem(_id);
          }
          break;
        }
      default:
        {
          console.log(dataAction);
        }
    }
  };

  return _p;
});
