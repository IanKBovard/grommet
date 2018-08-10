'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _grommetIcons = require('grommet-icons');

var _ThemeContext = require('../../contexts/ThemeContext');

var _ThemeContext2 = _interopRequireDefault(_ThemeContext);

var _utils = require('../../utils');

var _hocs = require('../hocs');

var _StyledBox = require('./StyledBox');

var _StyledBox2 = _interopRequireDefault(_StyledBox);

var _doc = require('./doc');

var _doc2 = _interopRequireDefault(_doc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styledComponents = {
  div: _StyledBox2.default
}; // tag -> styled component

var Box = function (_Component) {
  _inherits(Box, _Component);

  function Box() {
    var _temp, _this, _ret;

    _classCallCheck(this, Box);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Box.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var background = nextProps.background,
        propsTheme = nextProps.theme;
    var stateTheme = prevState.theme,
        priorTheme = prevState.priorTheme;


    var dark = propsTheme.dark;
    if (background) {
      dark = (0, _utils.backgroundIsDark)(background, propsTheme);
    }

    if (dark === propsTheme.dark && stateTheme) {
      return { theme: undefined, priorTheme: undefined };
    }
    if (dark !== propsTheme.dark && (!stateTheme || dark !== stateTheme.dark || propsTheme !== priorTheme)) {
      return {
        theme: _extends({}, propsTheme, {
          dark: dark,
          icon: dark ? propsTheme.iconThemes.dark : propsTheme.iconThemes.light
        }),
        priorTheme: propsTheme
      };
    }
    return null;
  };

  Box.prototype.render = function render() {
    var _props = this.props,
        a11yTitle = _props.a11yTitle,
        children = _props.children,
        direction = _props.direction,
        elevation = _props.elevation,
        fill = _props.fill,
        forwardRef = _props.forwardRef,
        gap = _props.gap,
        overflow = _props.overflow,
        responsive = _props.responsive,
        tag = _props.tag,
        propsTheme = _props.theme,
        wrap = _props.wrap,
        rest = _objectWithoutProperties(_props, ['a11yTitle', 'children', 'direction', 'elevation', 'fill', 'forwardRef', 'gap', 'overflow', 'responsive', 'tag', 'theme', 'wrap']);

    var stateTheme = this.state.theme;

    var theme = stateTheme || propsTheme;

    var StyledComponent = styledComponents[tag];
    if (!StyledComponent) {
      StyledComponent = _StyledBox2.default.withComponent(tag);
      styledComponents[tag] = StyledComponent;
    }

    var contents = children;
    if (gap) {
      contents = [];
      var firstIndex = void 0;
      _react.Children.forEach(children, function (child, index) {
        if (child) {
          if (firstIndex === undefined) {
            firstIndex = index;
          } else {
            contents.push(_react2.default.createElement(_StyledBox.StyledBoxGap, {
              key: index,
              gap: gap,
              directionProp: direction,
              responsive: responsive,
              theme: theme
            }));
          }
        }
        contents.push(child);
      });
    }

    var content = _react2.default.createElement(
      StyledComponent,
      _extends({
        'aria-label': a11yTitle,
        innerRef: forwardRef,
        directionProp: direction,
        elevationProp: elevation,
        fillProp: fill,
        overflowProp: overflow,
        wrapProp: wrap,
        responsive: responsive,
        theme: theme
      }, rest),
      contents
    );

    if (stateTheme) {
      if (stateTheme.dark !== propsTheme.dark && stateTheme.icon) {
        content = _react2.default.createElement(
          _grommetIcons.ThemeContext.Provider,
          { value: stateTheme.icon },
          content
        );
      }
      content = _react2.default.createElement(
        _ThemeContext2.default.Provider,
        { value: stateTheme },
        content
      );
    }

    return content;
  };

  return Box;
}(_react.Component);

Box.defaultProps = {
  direction: 'column',
  margin: 'none',
  pad: 'none',
  responsive: true,
  tag: 'div'
};


if (process.env.NODE_ENV !== 'production') {
  (0, _doc2.default)(Box);
}

exports.default = (0, _recompose.compose)(_hocs.withTheme, _hocs.withForwardRef // needed for RangeSelector
)(Box);