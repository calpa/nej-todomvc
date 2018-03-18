NEJ.define([
  'util/template/tpl', './item/index.js', './store.js',
  'util/form/form'
], function(_t, _i, _s, _f) {
  var _data = _s.__getStore();

  var _list = _t._$getItemTemplate(
    _data.todos, _i._$$CommentItem, {
      parent: 'list-box'
    });

  // Add Item into storage
  var __addItem = function(content) {
    var _todos = _s.__addItem({
      content
    });
    // Clear List
    document.getElementById('list-box').innerHTML = '';
    var _list = _t._$getItemTemplate(
      _todos, _i._$$CommentItem, {
        parent: 'list-box'
      });
  };

  // Inject clearInput function into window
  window.clearInput = function(_e) {
    var _input = document.getElementsByTagName('input')[0];

    _input.value = '';
  }

  var _form = _f._$$WebForm._$allocate({
    form: 'webForm',
    oninvalid: function(_event) {
      // console.log('invalid');
      // console.log(_event);
    },
    onvalid: function(_event) {
      var value = _event.target.value;
      __addItem(value);
      _event.target.value = '';
    },
    onenter: function(_event) {
      _event.preventDefault();
      console.log(_event);

      // If the check is passed, then submit the form
      this._$checkValidity();
      // As checkValidity function is call self.onvalid function,
      // We use it to check and addItem to the todo App
    }
  });

  var todoApp = document.getElementById('list-box');
  todoApp.addEventListener('dblclick', function(e) {
    var target = e.target;

    // If no target, return directly.
    if (!target) {
      return;
    }

    if (target.className.match('content')) {
        // Add 'editing' class to 'box'
        target.parentElement.className = target.parentElement.className + ' editing';

        var input = document.createElement('input');
        input.className = 'edit';

        target.parentElement.prepend(input);

        input.focus();

        input.value = target.innerText;

        input.onblur = function(e) {
            // Update the DOM value
            this.parentElement.children[1].innerText = this.value;

            // Update storage
            var id = this.parentElement.parentElement.getAttribute('data-id');
            _s.__editItem(id, this.value);

            // Remove 'editing' class
            e.target.parentElement.className = e.target.parentElement.className.replace(' editing', '');

            // Self destruct
            e.target.parentElement.removeChild(e.target);
        }
    }
  });

});
