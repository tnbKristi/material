(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("js/all.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Forms = require('./components/Forms');

Object.defineProperty(exports, 'Input', {
  enumerable: true,
  get: function get() {
    return _Forms.Input;
  }
});
Object.defineProperty(exports, 'TextArea', {
  enumerable: true,
  get: function get() {
    return _Forms.TextArea;
  }
});

var _Icons = require('./components/Icons');

Object.defineProperty(exports, 'Icon', {
  enumerable: true,
  get: function get() {
    return _Icons.Icon;
  }
});
Object.defineProperty(exports, 'SvgIcon', {
  enumerable: true,
  get: function get() {
    return _Icons.SvgIcon;
  }
});

var _Button = require('./components/Button');

Object.defineProperty(exports, 'Button', {
  enumerable: true,
  get: function get() {
    return _Button.Button;
  }
});

var _Modal = require('./components/Modal');

Object.defineProperty(exports, 'Modal', {
  enumerable: true,
  get: function get() {
    return _Modal.Modal;
  }
});

var _Tables = require('./components/Tables');

Object.defineProperty(exports, 'Table', {
  enumerable: true,
  get: function get() {
    return _Tables.Table;
  }
});
Object.defineProperty(exports, 'DataTable', {
  enumerable: true,
  get: function get() {
    return _Tables.DataTable;
  }
});
Object.defineProperty(exports, 'TableBody', {
  enumerable: true,
  get: function get() {
    return _Tables.TableBody;
  }
});
Object.defineProperty(exports, 'TableHeader', {
  enumerable: true,
  get: function get() {
    return _Tables.TableHeader;
  }
});
Object.defineProperty(exports, 'TableHeaderColumn', {
  enumerable: true,
  get: function get() {
    return _Tables.TableHeaderColumn;
  }
});
Object.defineProperty(exports, 'TableRow', {
  enumerable: true,
  get: function get() {
    return _Tables.TableRow;
  }
});
Object.defineProperty(exports, 'TableRowColumn', {
  enumerable: true,
  get: function get() {
    return _Tables.TableRowColumn;
  }
});
Object.defineProperty(exports, 'TableFooter', {
  enumerable: true,
  get: function get() {
    return _Tables.TableFooter;
  }
});

});

require.register("js/components/Button.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = exports.Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          floating = _props.floating,
          flat = _props.flat,
          large = _props.large,
          className = _props.className,
          disabled = _props.disabled,
          style = _props.style,
          onClick = _props.onClick;


      var classes = ['btn', '' + (disabled ? 'disabled' : ''), '' + (large ? 'btn-large' : ''), '' + (className || ''), '' + (flat ? 'btn-flat' : ''), '' + (floating ? 'btn-floating' : '')];

      return _react2.default.createElement(
        'button',
        { className: classes.join(' '), disabled: disabled,
          style: style || {},
          onClick: onClick },
        this.props.children
      );
    }
  }]);

  return Button;
}(_react.Component);

Button.defaultProps = {
  onClick: _propTypes2.default.func.isRequired
};

});

require.register("js/components/Collapsible.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsibleGroup = exports.Collapsible = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollapsibleGroup = function (_Component) {
  _inherits(CollapsibleGroup, _Component);

  function CollapsibleGroup() {
    _classCallCheck(this, CollapsibleGroup);

    return _possibleConstructorReturn(this, (CollapsibleGroup.__proto__ || Object.getPrototypeOf(CollapsibleGroup)).apply(this, arguments));
  }

  _createClass(CollapsibleGroup, [{
    key: 'handleOnClick',
    value: function handleOnClick(index) {
      var targetComponent = this.refs['collapse-' + index];

      if (targetComponent) {
        (0, _lodash.each)(this.refs, function (ref, name) {
          if (name !== 'collapse-' + index) {
            ref.toggleActive({ active: false });
          }
        });

        targetComponent.toggleActive({ active: true, toggle: true });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          maxHeight = _props.maxHeight,
          popout = _props.popout,
          active = _props.active,
          expandable = _props.expandable;


      var children = (0, _lodash.flatten)([this.props.children]);

      var classes = ['collapsible', '' + (className || ''), '' + (popout ? 'popout' : '')];
      return _react2.default.createElement(
        'div',
        { className: classes.join(' ') },
        children.map(function (child, idx) {
          var isActive = idx === active;

          if (!child.props.title) {
            console.error('CollapsibleGroup: child elements must have a "title" prop. Skipping child element.');
            return null;
          }

          return _react2.default.createElement(
            Collapsible,
            { maxHeight: maxHeight || '300px',
              key: (0, _lodash.uniqueId)('collapse-'), active: isActive, ref: 'collapse-' + idx,
              handleOnClick: _this2.handleOnClick.bind(_this2, idx) },
            child
          );
        })
      );
    }
  }]);

  return CollapsibleGroup;
}(_react.Component);

CollapsibleGroup.propTypes = {};

var Collapsible = function (_Component2) {
  _inherits(Collapsible, _Component2);

  function Collapsible(props) {
    _classCallCheck(this, Collapsible);

    var _this3 = _possibleConstructorReturn(this, (Collapsible.__proto__ || Object.getPrototypeOf(Collapsible)).call(this, props));

    _this3.state = {
      active: props.active ? props.active : false
    };
    return _this3;
  }

  _createClass(Collapsible, [{
    key: 'toggleActive',
    value: function toggleActive(_ref) {
      var active = _ref.active,
          toggle = _ref.toggle;

      if (toggle === true) {
        this.setState({ active: !this.state.active });
      } else {
        this.setState({ active: active });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var active = this.state.active;


      var child = this.props.children;

      return _react2.default.createElement(
        'div',
        { className: 'collapsible-item ' + (active ? 'active' : ''), ref: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'collapsible-header ' + (active ? 'active' : ''), ref: 'header',
            onClick: this.props.handleOnClick },
          child.props.title
        ),
        _react2.default.createElement(
          'div',
          { className: 'collapsible-body', ref: 'body' },
          _react2.default.createElement(
            'div',
            { className: 'collapsible-content' },
            child
          )
        )
      );
    }
  }]);

  return Collapsible;
}(_react.Component);

Collapsible.propTypes = {};

exports.Collapsible = Collapsible;
exports.CollapsibleGroup = CollapsibleGroup;

});

require.register("js/components/Forms/Checkbox.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckBox = function (_Component) {
  _inherits(CheckBox, _Component);

  function CheckBox(props) {
    _classCallCheck(this, CheckBox);

    var _this = _possibleConstructorReturn(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).call(this, props));

    _this.handleChangeEvent = _this.handleChangeEvent.bind(_this);
    return _this;
  }

  _createClass(CheckBox, [{
    key: 'handleChangeEvent',
    value: function handleChangeEvent(evt) {
      var value = evt.target.checked;
      this.setState({ value: value });

      this.props.onChange({
        name: this.props.name,
        value: value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          checked = _props.checked,
          disabled = _props.disabled;


      return _react2.default.createElement('input', { type: 'checkbox', className: '' + (className || ''), checked: true, disabled: true,
        defaultChecked: checked,
        onChange: this.handleChangeEvent });
    }
  }]);

  return CheckBox;
}(_react.Component);

CheckBox.propTypes = {
  onChange: _propTypes2.default.func.isRequired
};

exports.default = CheckBox;

});

require.register("js/components/Forms/Input.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.state = {
      active: props.value ? true : false,
      value: props.value
    };

    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.handleChangeEvent = _this.handleChangeEvent.bind(_this);
    return _this;
  }

  _createClass(Input, [{
    key: 'handleFocus',
    value: function handleFocus() {
      this.setState({ active: true });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.setState({
        active: this.state.value ? true : false
      });
    }
  }, {
    key: 'handleChangeEvent',
    value: function handleChangeEvent(evt) {
      var value = evt.target.value;
      this.setState({ value: value });

      this.props.onChange({
        name: this.props.name,
        value: value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          name = _props.name,
          label = _props.label,
          type = _props.type,
          disabled = _props.disabled,
          className = _props.className,
          icon = _props.icon;
      var _state = this.state,
          active = _state.active,
          value = _state.value;


      return _react2.default.createElement(
        'div',
        { className: 'input-field ' + (className || '') },
        icon ? _react2.default.createElement(
          'i',
          { className: 'material-icons prefix ' + (active ? 'active' : '') },
          icon
        ) : null,
        _react2.default.createElement('input', { id: name, type: type || 'text',
          name: name,
          ref: function ref(i) {
            return _this2.input = i;
          },
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onChange: this.handleChangeEvent,
          disabled: disabled || false,
          className: 'validate', defaultValue: value }),
        _react2.default.createElement(
          'label',
          { className: active ? 'active' : '', htmlFor: name },
          label
        )
      );
    }
  }]);

  return Input;
}(_react.Component);

exports.default = Input;


Input.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  name: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string.isRequired
};

});

require.register("js/components/Forms/Textarea.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextArea = function (_Component) {
  _inherits(TextArea, _Component);

  function TextArea(props) {
    _classCallCheck(this, TextArea);

    var _this = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));

    _this.state = {
      active: props.value ? true : false,
      value: props.value,
      height: props.defaultHeight
    };

    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.handleChangeEvent = _this.handleChangeEvent.bind(_this);
    return _this;
  }

  _createClass(TextArea, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleResize();
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      this.setState({ active: true });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.setState({
        active: this.state.value ? true : false
      });
      this.handleResize();
    }
  }, {
    key: 'handleChangeEvent',
    value: function handleChangeEvent(evt) {
      var value = evt.target.value;
      if (this.props.resizable) {
        this.handleResize();
      }

      if (value !== this.state.value) {
        this.setState({ value: value });
        this.props.onChange({
          name: this.props.name,
          value: value
        });
      }
    }
  }, {
    key: 'handleResize',
    value: function handleResize() {
      var height = (0, _jquery2.default)(this.shadow).height() + 45;
      if (height > this.props.defaultHeight) {
        this.setState({ height: height });
      } else if (height < this.props.defaultHeight) {
        this.setState({ height: this.props.defaultHeight });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          name = _props.name,
          label = _props.label,
          type = _props.type,
          disabled = _props.disabled,
          className = _props.className,
          icon = _props.icon;
      var _state = this.state,
          active = _state.active,
          value = _state.value,
          height = _state.height;


      var shadowStyles = {
        visibility: 'hidden',
        position: 'absolute',
        top: 0,
        height: 'auto',
        display: 'block',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
      };

      return _react2.default.createElement(
        'div',
        { className: 'input-field ' + (className || ''), style: { position: 'relative' } },
        icon ? _react2.default.createElement(
          'i',
          { className: 'material-icons prefix ' + (active ? 'active' : '') },
          icon
        ) : null,
        _react2.default.createElement('textarea', { id: name, name: name,
          className: 'textarea',
          style: { height: height + 'px' },
          ref: function ref(i) {
            return _this2.input = i;
          },
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onChange: this.handleChangeEvent,
          onKeyUp: this.handleChangeEvent,
          disabled: disabled || false,
          defaultValue: value }),
        _react2.default.createElement(
          'label',
          { className: active ? 'active' : '', htmlFor: name },
          label
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'textarea',
            style: shadowStyles,
            ref: function ref(s) {
              _this2.shadow = s;
            },
            tabIndex: '-1',
            readOnly: true,
            'aria-hidden': 'true'
          },
          value
        )
      );
    }
  }]);

  return TextArea;
}(_react.Component);

exports.default = TextArea;


TextArea.defaultProps = {
  resizable: true,
  defaultHeight: 65
};

TextArea.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  name: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string.isRequired
};

});

require.register("js/components/Forms/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBox = exports.TextArea = exports.Input = undefined;

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _Textarea = require('./Textarea');

var _Textarea2 = _interopRequireDefault(_Textarea);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Input = _Input2.default;
exports.TextArea = _Textarea2.default;
exports.CheckBox = _Checkbox2.default;

});

require.register("js/components/Icons.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SvgIcon = exports.Icon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icon = exports.Icon = function Icon(props) {
  return _react2.default.createElement(
    'i',
    { className: (props.className ? props.className : '') + ' material-icons' },
    props.children
  );
};

var SvgIcon = exports.SvgIcon = function (_Component) {
  _inherits(SvgIcon, _Component);

  function SvgIcon() {
    _classCallCheck(this, SvgIcon);

    return _possibleConstructorReturn(this, (SvgIcon.__proto__ || Object.getPrototypeOf(SvgIcon)).apply(this, arguments));
  }

  _createClass(SvgIcon, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          other = _objectWithoutProperties(_props, ['children']);

      return _react2.default.createElement(
        'svg',
        other,
        children
      );
    }
  }]);

  return SvgIcon;
}(_react.Component);

});

require.register("js/components/Modal.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProps = exports.Modal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = exports.Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.onModalClose = _this.onModalClose.bind(_this);

    _this.state = {
      open: false
    };
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.open === true) {
        this.setState({ open: true });
        this.handleModalOpen(this.props);
      }
    }
  }, {
    key: 'handleModalOpen',
    value: function handleModalOpen(props) {
      (0, _jquery2.default)(this.modal).animate({
        top: props.endingTop,
        opacity: 1
      }, props.inDuration);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.open !== this.state.open) {
        this.setState({ open: nextProps.open });

        if (nextProps.open === true) {
          this.handleModalOpen(nextProps);
        } else {
          this.onModalClose(nextProps);
        }
      }
    }
  }, {
    key: 'onModalClose',
    value: function onModalClose(props) {
      var isValid = props.onBeforeClose();

      if (isValid) {
        this.handleModalClose(props);
      }
    }
  }, {
    key: 'handleModalClose',
    value: function handleModalClose(props) {
      var _this2 = this;

      this.animateClose(props).then(function () {
        _this2.setState({ open: false });
        props.onClose();
      });
    }
  }, {
    key: 'animateClose',
    value: function animateClose(props) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        (0, _jquery2.default)(_this3.modal).animate({
          top: props.startingTop,
          opacity: 0
        }, props.outDuration, function () {
          resolve();
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          className = _props.className,
          buttonName = _props.buttonName,
          cancelButton = _props.cancelButton,
          opacity = _props.opacity,
          dismissible = _props.dismissible,
          startingTop = _props.startingTop;
      var open = this.state.open;


      var closeEvent = this.onModalClose.bind(this, this.props);

      var openStyles = {
        display: 'block',
        zIndex: 1000,
        top: startingTop
      };

      var overlayStyles = {
        display: 'block',
        zIndex: 900,
        opacity: opacity
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { className: 'modal-overlay',
          ref: function ref(d) {
            _this4.overlay = d;
          },
          onClick: dismissible ? closeEvent : null,
          style: open ? overlayStyles : {} }),
        _react2.default.createElement(
          'div',
          { className: 'modal ' + (className || ''), style: open ? openStyles : {},
            ref: function ref(m) {
              _this4.modal = m;
            } },
          _react2.default.createElement(
            'div',
            { className: 'modal-content' },
            this.props.children
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-footer right-align' },
            _react2.default.createElement(
              'a',
              { onClick: closeEvent, className: 'btn' },
              buttonName
            ),
            cancelButton ? _react2.default.createElement(
              'a',
              { onClick: closeEvent, className: 'btn btn-flat' },
              'Cancel'
            ) : null
          )
        )
      );
    }
  }]);

  return Modal;
}(_react.Component);

var defaultProps = exports.defaultProps = {
  onClose: function onClose() {},
  onBeforeClose: function onBeforeClose() {
    return true;
  },
  buttonName: 'Close',
  cancelButton: false,
  dismissible: true, // Modal can be dismissed by clicking outside of the modal
  opacity: .5, // Opacity of modal background
  inDuration: 300, // Transition in duration
  outDuration: 200, // Transition out duration
  startingTop: '4%', // Starting top style attribute
  endingTop: '10%'
};

Modal.defaultProps = defaultProps;

Modal.propTypes = {
  open: _propTypes2.default.bool.isRequired,
  onClose: _propTypes2.default.func,
  onBeforeClose: _propTypes2.default.func,
  buttonName: _propTypes2.default.string,
  cancelButton: _propTypes2.default.bool,
  dismissible: _propTypes2.default.bool,
  opacity: _propTypes2.default.number,
  inDuration: _propTypes2.default.number,
  outDuration: _propTypes2.default.number,
  startingTop: _propTypes2.default.string,
  endingTop: _propTypes2.default.string
};

exports.default = Modal;

});

require.register("js/components/Tables/Table.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _datatables = require('datatables.net');

var _datatables2 = _interopRequireDefault(_datatables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// See documentation for datatables here:
// https://datatables.net/manual


(0, _datatables2.default)();

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));
  }

  _createClass(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.datatable) {
        (0, _jquery2.default)(this.table).DataTable(this.props.options || {});
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          bordered = _props.bordered,
          striped = _props.striped,
          highlight = _props.highlight,
          centered = _props.centered,
          responsive = _props.responsive,
          children = _props.children,
          style = _props.style;


      var classes = ['' + (className || ''), '' + (striped ? 'striped' : ''), '' + (bordered ? 'bordered' : ''), '' + (highlight ? 'highlight' : ''), '' + (centered ? 'centered' : ''), '' + (responsive ? 'responsive-table' : '')];

      return _react2.default.createElement(
        'table',
        { style: style || {},
          className: classes.join(' '), ref: function ref(t) {
            _this2.table = t;
          } },
        children
      );
    }
  }]);

  return Table;
}(_react.Component);

exports.default = Table;

});

require.register("js/components/Tables/TableBody.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableBody = function (_Component) {
  _inherits(TableBody, _Component);

  function TableBody(props) {
    _classCallCheck(this, TableBody);

    return _possibleConstructorReturn(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).call(this, props));
  }

  _createClass(TableBody, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return _react2.default.createElement(
        'tbody',
        null,
        children
      );
    }
  }]);

  return TableBody;
}(_react.Component);

exports.default = TableBody;

});

require.register("js/components/Tables/TableFooter.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableFooter = function (_Component) {
  _inherits(TableFooter, _Component);

  function TableFooter(props) {
    _classCallCheck(this, TableFooter);

    return _possibleConstructorReturn(this, (TableFooter.__proto__ || Object.getPrototypeOf(TableFooter)).call(this, props));
  }

  _createClass(TableFooter, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return _react2.default.createElement(
        'tfoot',
        null,
        children
      );
    }
  }]);

  return TableFooter;
}(_react.Component);

exports.default = TableFooter;

});

require.register("js/components/Tables/TableHeader.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableHeader = function (_Component) {
  _inherits(TableHeader, _Component);

  function TableHeader(props) {
    _classCallCheck(this, TableHeader);

    return _possibleConstructorReturn(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).call(this, props));
  }

  _createClass(TableHeader, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return _react2.default.createElement(
        'thead',
        null,
        children
      );
    }
  }]);

  return TableHeader;
}(_react.Component);

exports.default = TableHeader;

});

require.register("js/components/Tables/TableHeaderColumn.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableHeaderColumn = function (_Component) {
  _inherits(TableHeaderColumn, _Component);

  function TableHeaderColumn(props) {
    _classCallCheck(this, TableHeaderColumn);

    return _possibleConstructorReturn(this, (TableHeaderColumn.__proto__ || Object.getPrototypeOf(TableHeaderColumn)).call(this, props));
  }

  _createClass(TableHeaderColumn, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          width = _props.width,
          children = _props.children;


      var classes = ['' + (className || '')];

      return _react2.default.createElement(
        'th',
        { className: classes.join(' ') },
        children
      );
    }
  }]);

  return TableHeaderColumn;
}(_react.Component);

exports.default = TableHeaderColumn;

});

require.register("js/components/Tables/TableRow.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableRow = function (_Component) {
  _inherits(TableRow, _Component);

  function TableRow(props) {
    _classCallCheck(this, TableRow);

    return _possibleConstructorReturn(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call(this, props));
  }

  _createClass(TableRow, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return _react2.default.createElement(
        'tr',
        null,
        children
      );
    }
  }]);

  return TableRow;
}(_react.Component);

exports.default = TableRow;

});

require.register("js/components/Tables/TableRowColumn.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableRowColumn = function (_Component) {
  _inherits(TableRowColumn, _Component);

  function TableRowColumn(props) {
    _classCallCheck(this, TableRowColumn);

    return _possibleConstructorReturn(this, (TableRowColumn.__proto__ || Object.getPrototypeOf(TableRowColumn)).call(this, props));
  }

  _createClass(TableRowColumn, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return _react2.default.createElement(
        'td',
        null,
        children
      );
    }
  }]);

  return TableRowColumn;
}(_react.Component);

exports.default = TableRowColumn;

});

require.register("js/components/Tables/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableFooter = exports.TableRowColumn = exports.TableRow = exports.TableHeaderColumn = exports.TableHeader = exports.TableBody = exports.Table = undefined;

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableFooter = require('./TableFooter');

var _TableFooter2 = _interopRequireDefault(_TableFooter);

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableRow = require('./TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableRowColumn = require('./TableRowColumn');

var _TableRowColumn2 = _interopRequireDefault(_TableRowColumn);

var _TableHeaderColumn = require('./TableHeaderColumn');

var _TableHeaderColumn2 = _interopRequireDefault(_TableHeaderColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Table = _Table2.default;
exports.TableBody = _TableBody2.default;
exports.TableHeader = _TableHeader2.default;
exports.TableHeaderColumn = _TableHeaderColumn2.default;
exports.TableRow = _TableRow2.default;
exports.TableRowColumn = _TableRowColumn2.default;
exports.TableFooter = _TableFooter2.default;

});

require.register("js/containers/Buttons.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CodeElement = require('../docs/CodeElement');

var _CodeElement2 = _interopRequireDefault(_CodeElement);

var _Button = require('../components/Button');

var _Icons = require('../components/Icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function onClickEvent(evt) {
  console.log('button click event!: ', evt);
}

var Buttons = function (_Component) {
  _inherits(Buttons, _Component);

  function Buttons() {
    _classCallCheck(this, Buttons);

    return _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).apply(this, arguments));
  }

  _createClass(Buttons, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'primary-container flex-wrapper' },
        _react2.default.createElement(
          'h1',
          null,
          'Buttons'
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h4',
          null,
          'Standard Button'
        ),
        _react2.default.createElement(
          _Button.Button,
          { onClick: onClickEvent },
          'Hello There.'
        ),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n<Button onClick={onClickEvent}>Hello There.</Button>\n            '
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h4',
          null,
          'Flat Button'
        ),
        _react2.default.createElement(
          _Button.Button,
          { flat: true, onClick: onClickEvent },
          'I\'m So Flat.'
        ),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n<Button flat onClick={onClickEvent}>I\'m So Flat.</Button>\n            '
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h4',
          null,
          'Floating Button'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Circular button, with space for a single letter or an icon.'
        ),
        _react2.default.createElement(
          _Button.Button,
          { floating: true, onClick: onClickEvent },
          _react2.default.createElement(
            _Icons.Icon,
            null,
            'add'
          )
        ),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n<Button floating onClick={onClickEvent}><Icon>add</Icon></Button>\n            '
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h4',
          null,
          'Large'
        ),
        _react2.default.createElement(
          _Button.Button,
          { large: true, onClick: onClickEvent },
          'Large Button'
        ),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n<Button large onClick={onClickEvent}>Large Button</Button>\n            '
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h4',
          null,
          'Disabled'
        ),
        _react2.default.createElement(
          _Button.Button,
          { disabled: true, onClick: onClickEvent },
          'No Clicky'
        ),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n<Button disabled onClick={onClickEvent}>No Clicky</Button>\n              '
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h4',
          null,
          'Other Properties'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'className (String)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Appends any additional classes to the button.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'style (Object)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Applies any styles provided to the button.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'onChange (function)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Required. Triggered on click.'
        )
      );
    }
  }]);

  return Buttons;
}(_react.Component);

exports.default = Buttons;

});

require.register("js/containers/Collapsible.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icons = require('../components/Icons');

var _Collapsible = require('../components/Collapsible');

var _CodeElement = require('../docs/CodeElement');

var _CodeElement2 = _interopRequireDefault(_CodeElement);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Collapsibles = function Collapsibles(props) {
  return _react2.default.createElement(
    'div',
    { className: 'primary-container flex-wrapper' },
    _react2.default.createElement(
      'h1',
      null,
      'Collapsible Groups'
    ),
    _react2.default.createElement(
      'h3',
      null,
      'Default Collapsible'
    ),
    _react2.default.createElement(
      _Collapsible.CollapsibleGroup,
      { active: 1 },
      _react2.default.createElement(
        'div',
        { title: 'One' },
        _faker2.default.lorem.paragraphs(2)
      ),
      _react2.default.createElement(
        'div',
        { title: 'Two' },
        _faker2.default.lorem.paragraphs(2)
      ),
      _react2.default.createElement(
        'div',
        { title: 'Three' },
        _faker2.default.lorem.paragraphs(2)
      )
    ),
    _react2.default.createElement(
      'h4',
      null,
      'Code Example'
    ),
    _react2.default.createElement(
      'p',
      null,
      'This example uses the default configuration, and specifies that the second child will default to \'active\'.'
    ),
    _react2.default.createElement(
      _CodeElement2.default,
      { react: true },
      '\nimport { CollapsibleGroup } from \'material\';\n\n<CollapsibleGroup active={1}>\n  <div title="One">...</div>\n  <div title="Two">...</div>\n  <div title="Three">...</div>\n</CollapsibleGroup>\n        '
    ),
    _react2.default.createElement(
      'h3',
      null,
      'Popout Collapsible'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Pretty much the same as above, but with the option',
      _react2.default.createElement(
        'code',
        null,
        ' popout'
      ),
      ' added.'
    ),
    _react2.default.createElement(
      _Collapsible.CollapsibleGroup,
      { active: 1, popout: true },
      _react2.default.createElement(
        'div',
        { title: 'One' },
        _faker2.default.lorem.paragraphs(2)
      ),
      _react2.default.createElement(
        'div',
        { title: 'Two' },
        _faker2.default.lorem.paragraphs(2)
      ),
      _react2.default.createElement(
        'div',
        { title: 'Three' },
        _faker2.default.lorem.paragraphs(2)
      )
    ),
    _react2.default.createElement(
      _CodeElement2.default,
      { react: true },
      '\n  <CollapsibleGroup active={1} popout>\n    <div title="One">...</div>\n    <div title="Two">...</div>\n    <div title="Three">...</div>\n  </CollapsibleGroup>\n          '
    ),
    _react2.default.createElement(
      'h3',
      null,
      'Flexible Titles'
    ),
    _react2.default.createElement(
      'p',
      null,
      'The ',
      _react2.default.createElement(
        'code',
        null,
        ' title '
      ),
      ' prop must be added for the collapsible child to render, but this doesn\'t have to be just a string:'
    ),
    _react2.default.createElement(
      _Collapsible.CollapsibleGroup,
      { popout: true },
      _react2.default.createElement(
        'div',
        { title: _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _Icons.Icon,
              null,
              'star'
            ),
            "One!"
          ) },
        _faker2.default.lorem.paragraphs(2)
      )
    ),
    _react2.default.createElement(
      _CodeElement2.default,
      { react: true },
      '\n<CollapsibleGroup popout>\n  <div title={(\n        <div>\n          <Icon>star</Icon>\n          {"One!"}\n        </div>\n      )}>{ \'...\' }</div>\n</CollapsibleGroup>\n          '
    )
  );
};

exports.default = Collapsibles;

});

require.register("js/containers/DataTables.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tables = require('../components/Tables');

var _Collapsible = require('../components/Collapsible');

var _CodeElement = require('../docs/CodeElement');

var _CodeElement2 = _interopRequireDefault(_CodeElement);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sampleData = [];
(0, _lodash.times)(5, function (i) {
  sampleData.push({
    name: _faker2.default.name.findName(),
    email: _faker2.default.internet.email(),
    title: _faker2.default.name.title()
  });
});

var DataTables = function (_Component) {
  _inherits(DataTables, _Component);

  function DataTables() {
    _classCallCheck(this, DataTables);

    return _possibleConstructorReturn(this, (DataTables.__proto__ || Object.getPrototypeOf(DataTables)).apply(this, arguments));
  }

  _createClass(DataTables, [{
    key: 'render',
    value: function render() {
      var dataKeys = Object.keys(sampleData[0]);

      return _react2.default.createElement(
        'div',
        { className: 'primary-container flex-wrapper tables-container' },
        _react2.default.createElement(
          'h2',
          null,
          'Data Tables'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Currently this Component is an intelligent wrapper around the very robust and feature-rich ',
          _react2.default.createElement(
            'a',
            { href: 'https://datatables.net/' },
            'jQuery DataTables.'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Data tables accept all the styling options a regular table does.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'For detailed info about what you can do, see datatables manual on their website.'
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h5',
          null,
          'Default Implementation'
        ),
        _react2.default.createElement(
          'p',
          null,
          'This is what you get if you pass in no options at all: Search, Sort, and Filtering with basic styles.'
        ),
        _react2.default.createElement(
          _Tables.Table,
          { datatable: true, striped: true },
          _react2.default.createElement(
            _Tables.TableHeader,
            null,
            _react2.default.createElement(
              _Tables.TableRow,
              null,
              dataKeys.map(function (val) {
                return _react2.default.createElement(
                  _Tables.TableHeaderColumn,
                  { key: val },
                  (0, _lodash.capitalize)(val)
                );
              })
            )
          ),
          _react2.default.createElement(
            _Tables.TableBody,
            null,
            sampleData.map(function (data, idx) {
              return _react2.default.createElement(
                _Tables.TableRow,
                { key: 'row-datatable-' + idx },
                dataKeys.map(function (key) {
                  return _react2.default.createElement(
                    _Tables.TableRowColumn,
                    { key: data[key] },
                    data[key]
                  );
                })
              );
            })
          )
        ),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n  <DataTable striped>\n    // ... table content here.\n  </DataTable>\n                '
        ),
        _react2.default.createElement(
          'h4',
          null,
          'Data Table Customization'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Pass any configuration directly to the ',
          _react2.default.createElement(
            'code',
            null,
            'DataTable'
          ),
          'instance by adding an ',
          _react2.default.createElement(
            'code',
            null,
            'options'
          ),
          ' prop.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'There\'s a rediculous number of options available, which can be referenced here: ',
          _react2.default.createElement(
            'a',
            { href: 'https://datatables.net/reference/option/' },
            'DataTables Option Reference '
          )
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h6',
          null,
          'Table with no paging, ordering, or info:'
        ),
        _react2.default.createElement(
          _Tables.Table,
          { datatable: true, options: {
              paging: false,
              ordering: false,
              info: false
            } },
          _react2.default.createElement(
            _Tables.TableHeader,
            null,
            _react2.default.createElement(
              _Tables.TableRow,
              null,
              dataKeys.map(function (val) {
                return _react2.default.createElement(
                  _Tables.TableHeaderColumn,
                  { key: val },
                  (0, _lodash.capitalize)(val)
                );
              })
            )
          ),
          _react2.default.createElement(
            _Tables.TableBody,
            null,
            sampleData.map(function (data, idx) {
              return _react2.default.createElement(
                _Tables.TableRow,
                { key: 'row-datatable-' + idx },
                dataKeys.map(function (key) {
                  return _react2.default.createElement(
                    _Tables.TableRowColumn,
                    { key: data[key] },
                    data[key]
                  );
                })
              );
            })
          )
        ),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n<DataTable options={{\n      paging:   false,\n      ordering: false,\n      info:     false\n  }}>\n    // Table contents here ...\n</DataTable>\n            '
        )
      );
    }
  }]);

  return DataTables;
}(_react.Component);

exports.default = DataTables;

});

require.register("js/containers/Forms.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Forms = require('../components/Forms');

var _CodeElement = require('../docs/CodeElement');

var _CodeElement2 = _interopRequireDefault(_CodeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function onInputChange(val, evt) {
  console.log('input change trigger: ', val);
}

var Forms = function (_Component) {
  _inherits(Forms, _Component);

  function Forms() {
    _classCallCheck(this, Forms);

    return _possibleConstructorReturn(this, (Forms.__proto__ || Object.getPrototypeOf(Forms)).apply(this, arguments));
  }

  _createClass(Forms, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'primary-container flex-wrapper forms-container' },
        _react2.default.createElement(
          'h1',
          { name: 'forms' },
          'Form Fields'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row', ref: function ref(d) {
              return _this2.example1 = d;
            } },
          _react2.default.createElement(
            'div',
            { className: 'col s6' },
            _react2.default.createElement(_Forms.Input, { label: 'Example Text Field', onChange: onInputChange,
              name: 'sample_1' }),
            _react2.default.createElement(
              _CodeElement2.default,
              { react: true },
              '<Input label="Example Text Field" \n onChange={onInputChange} name="sample_1" />'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col s6' },
            _react2.default.createElement(_Forms.Input, { label: 'Disabled Text Field', onChange: onInputChange,
              name: 'sample_2', disabled: true, value: 'I am not editable' }),
            _react2.default.createElement(
              _CodeElement2.default,
              { react: true },
              '<Input label="Disabled Text Field" onChange={onInputChange} \n name="sample_2" disabled={true} value="I am not editable" />'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col s6' },
            _react2.default.createElement(_Forms.Input, { label: 'Password', onChange: onInputChange,
              type: 'password', name: 'sample_3' }),
            _react2.default.createElement(
              _CodeElement2.default,
              { react: true },
              '<Input label="Password" onChange={onInputChange} \n type="password" name="sample_3" />'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col s6' },
            _react2.default.createElement(_Forms.Input, { label: 'Email', onChange: onInputChange,
              type: 'email', name: 'sample_4' }),
            _react2.default.createElement(
              _CodeElement2.default,
              { react: true },
              '<Input label="Email" onChange={onInputChange} \n type="email" name="sample_4" />'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col s6' },
            _react2.default.createElement(
              'div',
              null,
              'This is an Inline Input Field:',
              _react2.default.createElement(_Forms.Input, { label: 'Email', onChange: onInputChange,
                type: 'email', className: 'inline',
                name: 'sample_5' }),
              _react2.default.createElement(
                _CodeElement2.default,
                { react: true },
                '<Input label="Email" onChange={onInputChange} \n type="email" className="inline" \n name="sample_5" />'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col s6' },
            _react2.default.createElement(_Forms.Input, { label: 'Input with Icon Prefix', onChange: onInputChange,
              type: 'email', className: '', icon: 'stars',
              name: 'sample_6' }),
            _react2.default.createElement(
              _CodeElement2.default,
              { react: true },
              '<Input label="Input with Icon Prefix" onChange={onInputChange} \n type="email" icon="stars" \n name="sample_6" />'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col s6' },
            _react2.default.createElement(
              'h3',
              null,
              'Text Area'
            ),
            _react2.default.createElement(_Forms.TextArea, { label: 'I\'m a textarea. ', onChange: onInputChange,
              name: 'sample_7' }),
            _react2.default.createElement(
              _CodeElement2.default,
              { react: true },
              '<TextArea label="I\'m a textarea. "  onChange={onInputChange} \n name="sample_7" />'
            )
          )
        )
      );
    }
  }]);

  return Forms;
}(_react.Component);

exports.default = Forms;

});

require.register("js/containers/Home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "primary-container home-container flex-wrapper" },
        _react2.default.createElement(
          "h1",
          null,
          "Material"
        ),
        _react2.default.createElement(
          "p",
          null,
          "An adaptation of React components and SASS styles inspired by Material-UI and Materialize."
        ),
        _react2.default.createElement(
          "h3",
          null,
          "Additional Reference"
        ),
        _react2.default.createElement(
          "p",
          null,
          "Styles adapted from: ",
          _react2.default.createElement(
            "a",
            { href: "http://materializecss.com", target: "_blank" },
            "http://materializecss.com"
          ),
          "."
        ),
        _react2.default.createElement(
          "h3",
          null,
          "THIS IS A WORK IN PROGRESS"
        ),
        _react2.default.createElement(
          "p",
          null,
          "While the styles are very complete thanks to the hard work of the materialize folks, the React Components are still being built."
        )
      );
    }
  }]);

  return Home;
}(_react.Component);

exports.default = Home;

});

require.register("js/containers/Icons.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icons = require('../components/Icons');

var _Button = require('../components/Button');

var _CodeElement = require('../docs/CodeElement');

var _CodeElement2 = _interopRequireDefault(_CodeElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icons = function Icons(props) {
  return _react2.default.createElement(
    'div',
    { className: 'primary-container flex-wrapper' },
    _react2.default.createElement(
      'h1',
      null,
      'Icons'
    ),
    _react2.default.createElement(
      'p',
      null,
      'All icons in Material Icons v3.0.1 are available to use.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Documentation:  ',
      _react2.default.createElement(
        'a',
        { href: 'https://material.io/icons/', target: '_blank' },
        'https://material.io/icons/'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'col s6' },
        _react2.default.createElement(
          'h5',
          null,
          'Standalone Icon'
        ),
        _react2.default.createElement(
          _Icons.Icon,
          null,
          'star'
        ),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          "<Icon>star</Icon>"
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'col s6' },
        _react2.default.createElement(
          'h5',
          null,
          'Icon in a Button'
        ),
        _react2.default.createElement(
          _Button.Button,
          null,
          _react2.default.createElement(
            _Icons.Icon,
            null,
            'star'
          ),
          ' Favorite'
        ),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n<Button><Icon>star</Icon> Favorite</Button>\n            '
        )
      )
    )
  );
};

exports.default = Icons;

});

require.register("js/containers/Modals.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _CodeElement = require('../docs/CodeElement');

var _CodeElement2 = _interopRequireDefault(_CodeElement);

var _Modal = require('../components/Modal');

var _Button = require('../components/Button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modals = function (_Component) {
  _inherits(Modals, _Component);

  function Modals(props) {
    _classCallCheck(this, Modals);

    var _this = _possibleConstructorReturn(this, (Modals.__proto__ || Object.getPrototypeOf(Modals)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Modals, [{
    key: 'handleModalOpen',
    value: function handleModalOpen(refId) {
      var modalState = this.state[refId];
      var state = {};

      state[refId] = !modalState || true;
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'primary-container flex-wrapper' },
        _react2.default.createElement(
          'h2',
          null,
          'Modals'
        ),
        _react2.default.createElement(
          _Button.Button,
          { onClick: this.handleModalOpen.bind(this, 'modal_1') },
          'Click me'
        ),
        _react2.default.createElement(
          _Modal.Modal,
          { ref: 'modal_1', open: this.state['modal_1'] || false },
          _react2.default.createElement(
            'div',
            null,
            'Modal Content'
          )
        ),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n<Button onClick={this.handleModalOpen.bind(this, \'modal_1\')}>Click me</Button>\n<Modal ref="modal_1" open={this.state[\'modal_1\']}>\n  <div>Modal Content</div>\n</Modal>\n            '
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Modal Configuration Options'
        ),
        _react2.default.createElement(
          'h4',
          null,
          'Properties'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'open (Boolean)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Defaults to ',
          _react2.default.createElement(
            'code',
            null,
            'false'
          ),
          '.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'buttonName (String)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Defaults to ',
          _react2.default.createElement(
            'code',
            null,
            '"Close"'
          ),
          '.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'className'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Optionally add classes to the modal element.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'dismissible (Boolean)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Modal can be dismissed by clicking outside of the modal. Defaults to ',
          _react2.default.createElement(
            'code',
            null,
            'true'
          ),
          '.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'opacity (number)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Opacity of the modal background. Defaults to ',
          _react2.default.createElement(
            'code',
            null,
            '.5'
          ),
          '.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'inDuration (milliseconds)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Transition "in" duration. Defaults to ',
          _react2.default.createElement(
            'code',
            null,
            '300'
          ),
          '.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'outDuration (milliseconds)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Transition "out" duration. Defaults to ',
          _react2.default.createElement(
            'code',
            null,
            '200'
          ),
          '.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'startingTop (String, percent)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Starting top style attribute. Defaults to ',
          _react2.default.createElement(
            'code',
            null,
            '\'4%\''
          ),
          '.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'endingTop (String, percent)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Ending top style attribute. Defaults to ',
          _react2.default.createElement(
            'code',
            null,
            '\'10%\''
          ),
          '.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'cancelButton (boolean)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Whether to include a cancel button. Defaults to ',
          _react2.default.createElement(
            'code',
            null,
            'false'
          ),
          '.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'onBeforeClose (Function)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'Must return a ',
          _react2.default.createElement(
            'code',
            null,
            'boolean'
          ),
          '. If it returns ',
          _react2.default.createElement(
            'b',
            null,
            'false'
          ),
          ', the modal will cancel the closing action.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'code-prop' },
          _react2.default.createElement(
            'code',
            null,
            'onClose (Function)'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          'A Function called after the close action has occurred. Use this to handle any post-modal closing cleanup actions.'
        )
      );
    }
  }]);

  return Modals;
}(_react.Component);

exports.default = Modals;

});

require.register("js/containers/Tables.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tables = require('../components/Tables');

var _Collapsible = require('../components/Collapsible');

var _CodeElement = require('../docs/CodeElement');

var _CodeElement2 = _interopRequireDefault(_CodeElement);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sampleData = [];
(0, _lodash.times)(5, function (i) {
  sampleData.push({
    name: _faker2.default.name.findName(),
    email: _faker2.default.internet.email(),
    title: _faker2.default.name.title()
  });
});

function renderTableExample() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var dataKeys = Object.keys(sampleData[0]);

  return _react2.default.createElement(
    _Tables.Table,
    _extends({}, props, { style: { marginBottom: '20px' } }),
    _react2.default.createElement(
      _Tables.TableHeader,
      null,
      _react2.default.createElement(
        _Tables.TableRow,
        null,
        dataKeys.map(function (val) {
          return _react2.default.createElement(
            _Tables.TableHeaderColumn,
            { key: val },
            (0, _lodash.capitalize)(val)
          );
        })
      )
    ),
    _react2.default.createElement(
      _Tables.TableBody,
      null,
      sampleData.map(function (data, idx) {
        return _react2.default.createElement(
          _Tables.TableRow,
          { key: 'row-' + idx },
          dataKeys.map(function (key) {
            return _react2.default.createElement(
              _Tables.TableRowColumn,
              { key: data[key] },
              data[key]
            );
          })
        );
      })
    )
  );
}

var Tables = function (_Component) {
  _inherits(Tables, _Component);

  function Tables() {
    _classCallCheck(this, Tables);

    return _possibleConstructorReturn(this, (Tables.__proto__ || Object.getPrototypeOf(Tables)).apply(this, arguments));
  }

  _createClass(Tables, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'primary-container flex-wrapper tables-container' },
        _react2.default.createElement(
          'h1',
          null,
          'Tables'
        ),
        _react2.default.createElement(
          'h4',
          null,
          'Standard Table'
        ),
        renderTableExample(),
        _react2.default.createElement(
          _Collapsible.CollapsibleGroup,
          { maxHeight: '300px' },
          _react2.default.createElement(
            'div',
            { title: 'Standard Table Code Sample' },
            _react2.default.createElement(
              _CodeElement2.default,
              { react: true },
              '\n  <Table>\n    <TableHeader>\n      <TableRow>\n        <TableHeaderColumn>\n          // ...\n        </TableHeaderColumn>\n      </TableRow>\n    </TableHeader>\n    <TableBody>\n      <TableRow>\n        <TableRowColumn>\n          // ...\n        </TableRowColumn>\n      </TableRow>\n    </TableBody>\n  </Table>\n                '
            )
          )
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Available Styles'
        ),
        _react2.default.createElement(
          'h5',
          null,
          'Striped Table'
        ),
        renderTableExample({ striped: true }),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n<Table striped>\n  // ...\n</Table>\n            '
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h5',
          null,
          'Highlight on Hover'
        ),
        renderTableExample({ highlight: true }),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n<Table highlight>\n  // ...\n</Table>\n            '
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h5',
          null,
          'Centered'
        ),
        renderTableExample({ centered: true }),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n  <Table centered>\n    // ...\n  </Table>\n              '
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h5',
          null,
          'Bordered'
        ),
        renderTableExample({ bordered: true }),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n    <Table bordered>\n      // ...\n    </Table>\n                '
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h5',
          null,
          'Responsive'
        ),
        renderTableExample({ responsive: true }),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n      <Table responsive>\n        // ...\n      </Table>\n                  '
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h5',
          null,
          'The Works!'
        ),
        renderTableExample({
          centered: true,
          responsive: true,
          bordered: true,
          striped: true,
          highlight: true
        }),
        _react2.default.createElement(
          _CodeElement2.default,
          { react: true },
          '\n        <Table highlight bordered centered striped responsive>\n          // ...\n        </Table>\n                    '
        )
      );
    }
  }]);

  return Tables;
}(_react.Component);

exports.default = Tables;

});

require.register("js/containers/Typography.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Typography = function Typography(props) {
  return _react2.default.createElement(
    "div",
    { className: "primary-container typography-container flex-wrapper row with-sidenav" },
    _react2.default.createElement(
      "div",
      { className: "flex-column nav-column" },
      _react2.default.createElement(
        "div",
        { className: "side-nav fixed" },
        _react2.default.createElement("ul", null)
      )
    ),
    _react2.default.createElement("div", { className: "flex-column main-content-container" })
  );
};

exports.default = Typography;

});

require.register("js/docs/CodeElement.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('prismjs');

var CodeElement = function (_Component) {
  _inherits(CodeElement, _Component);

  function CodeElement() {
    _classCallCheck(this, CodeElement);

    return _possibleConstructorReturn(this, (CodeElement.__proto__ || Object.getPrototypeOf(CodeElement)).apply(this, arguments));
  }

  _createClass(CodeElement, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderContent();
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      if (!this.props.react) {
        var content = this.shadow.innerHTML;

        this.code.innerHTML = Prism.highlight(content, Prism.languages[this.props.format]);
      }
    }
  }, {
    key: 'renderReactComponent',
    value: function renderReactComponent() {
      var _this2 = this;

      return _react2.default.createElement(
        'pre',
        null,
        _react2.default.createElement('code', {
          className: 'language-' + this.props.format + ' code-element', ref: function ref(d) {
            return _this2.code = d;
          },
          dangerouslySetInnerHTML: { __html: Prism.highlight(this.props.children, Prism.languages[this.props.format]) } })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'code-element-container' },
        _react2.default.createElement(
          'div',
          { className: 'shadow', style: { display: 'none' }, ref: function ref(s) {
              return _this3.shadow = s;
            } },
          this.props.children
        ),
        !this.props.react ? _react2.default.createElement(
          'pre',
          null,
          _react2.default.createElement('code', { className: 'language-' + this.props.format + ' code-element', ref: function ref(d) {
              return _this3.code = d;
            } })
        ) : this.renderReactComponent()
      );
    }
  }]);

  return CodeElement;
}(_react.Component);

CodeElement.defaultProps = {
  format: 'html',
  react: false
};

exports.default = CodeElement;

});

require.register("js/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _Home = require('./containers/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Forms = require('./containers/Forms');

var _Forms2 = _interopRequireDefault(_Forms);

var _Tables = require('./containers/Tables');

var _Tables2 = _interopRequireDefault(_Tables);

var _DataTables = require('./containers/DataTables');

var _DataTables2 = _interopRequireDefault(_DataTables);

var _Icons = require('./containers/Icons');

var _Icons2 = _interopRequireDefault(_Icons);

var _Typography = require('./containers/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _Collapsible = require('./containers/Collapsible');

var _Collapsible2 = _interopRequireDefault(_Collapsible);

var _Modals = require('./containers/Modals');

var _Modals2 = _interopRequireDefault(_Modals);

var _Buttons = require('./containers/Buttons');

var _Buttons2 = _interopRequireDefault(_Buttons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRouterDom.HashRouter,
        null,
        _react2.default.createElement(
          'div',
          { className: 'flex-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'primary-container home-container flex-wrapper row with-sidenav' },
            _react2.default.createElement(
              'div',
              { className: 'flex-column nav-column' },
              _react2.default.createElement(
                'div',
                { className: 'side-nav fixed' },
                _react2.default.createElement(
                  'ul',
                  null,
                  _react2.default.createElement(
                    'li',
                    null,
                    'Components',
                    _react2.default.createElement(
                      'ul',
                      null,
                      _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                          'a',
                          { href: '#icons' },
                          'Icons'
                        )
                      ),
                      _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                          'a',
                          { href: '#forms' },
                          'Forms'
                        )
                      ),
                      _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                          'a',
                          { href: '#tables' },
                          'Tables'
                        ),
                        _react2.default.createElement(
                          'ul',
                          null,
                          _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                              'a',
                              { href: '#datatables' },
                              'Data Tables'
                            )
                          )
                        )
                      ),
                      _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                          'a',
                          { href: '#collapsible' },
                          'Collapsible'
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      { href: '#modals' },
                      'Modals'
                    )
                  ),
                  _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      { href: '#buttons' },
                      'Buttons'
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'flex-column main-content-container' },
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Home2.default }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/forms', component: _Forms2.default }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/tables', component: _Tables2.default }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/datatables', component: _DataTables2.default }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/icons', component: _Icons2.default }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/typography', component: _Typography2.default }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/collapsible', component: _Collapsible2.default }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/modals', component: _Modals2.default }),
              _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/buttons', component: _Buttons2.default })
            )
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map