'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class; // Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _mapboxGl = require('mapbox-gl');

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function noop() {}

var ua = typeof _window2.default.navigator !== 'undefined' ? _window2.default.navigator.userAgent.toLowerCase() : '';
var firefox = ua.indexOf('firefox') !== -1;

function mousePos(el, event) {
  var rect = el.getBoundingClientRect();
  event = event.touches ? event.touches[0] : event;
  return new _mapboxGl.Point(event.clientX - rect.left - el.clientLeft, event.clientY - rect.top - el.clientTop);
}

function touchPos(el, event) {
  var points = [];
  var rect = el.getBoundingClientRect();
  for (var i = 0; i < event.touches.length; i++) {
    points.push(new _mapboxGl.Point(event.touches[i].clientX - rect.left - el.clientLeft, event.touches[i].clientY - rect.top - el.clientTop));
  }
  return points;
}

/* eslint-disable max-len */
// Portions of the code below originally from:
// https://github.com/mapbox/mapbox-gl-js/blob/master/js/ui/handler/scroll_zoom.js
/* eslint-enable max-len */

var PROP_TYPES = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  onMouseDown: _react.PropTypes.func,
  onMouseDrag: _react.PropTypes.func,
  onMouseRotate: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onMouseMove: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func,
  onTouchDrag: _react.PropTypes.func,
  onTouchRotate: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onZoom: _react.PropTypes.func,
  onZoomEnd: _react.PropTypes.func
};

var DEFAULT_PROPS = {
  onMouseDown: noop,
  onMouseDrag: noop,
  onMouseRotate: noop,
  onMouseUp: noop,
  onMouseMove: noop,
  onTouchStart: noop,
  onTouchDrag: noop,
  onTouchRotate: noop,
  onTouchEnd: noop,
  onZoom: noop,
  onZoomEnd: noop
};

var MapInteractions = (_class = function (_Component) {
  _inherits(MapInteractions, _Component);

  function MapInteractions(props) {
    _classCallCheck(this, MapInteractions);

    var _this = _possibleConstructorReturn(this, (MapInteractions.__proto__ || Object.getPrototypeOf(MapInteractions)).call(this, props));

    _this.state = {
      startPos: null,
      pos: null,
      mouseWheelPos: null
    };
    return _this;
  }

  _createClass(MapInteractions, [{
    key: '_getMousePos',
    value: function _getMousePos(event) {
      var el = this.refs.container;
      return mousePos(el, event);
    }
  }, {
    key: '_getTouchPos',
    value: function _getTouchPos(event) {
      var el = this.refs.container;
      return touchPos(el, event).reduce(function (prev, curr, i, arr) {
        return prev.add(curr.div(arr.length));
      }, new _mapboxGl.Point(0, 0));
    }
  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(event) {
      var pos = this._getMousePos(event);
      this.setState({
        startPos: pos,
        pos: pos,
        metaKey: Boolean(event.metaKey)
      });
      this.props.onMouseDown({ pos: pos });
      _document2.default.addEventListener('mousemove', this._onMouseDrag, false);
      _document2.default.addEventListener('mouseup', this._onMouseUp, false);
    }
  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(event) {
      var pos = this._getTouchPos(event);
      this.setState({
        startPos: pos,
        pos: pos,
        metaKey: Boolean(event.metaKey)
      });
      this.props.onTouchStart({ pos: pos });
      _document2.default.addEventListener('touchmove', this._onTouchDrag, false);
      _document2.default.addEventListener('touchend', this._onTouchEnd, false);
    }
  }, {
    key: '_onMouseDrag',
    value: function _onMouseDrag(event) {
      var pos = this._getMousePos(event);
      this.setState({ pos: pos });
      if (this.state.metaKey) {
        var startPos = this.state.startPos;

        this.props.onMouseRotate({ pos: pos, startPos: startPos });
      } else {
        this.props.onMouseDrag({ pos: pos });
      }
    }
  }, {
    key: '_onTouchDrag',
    value: function _onTouchDrag(event) {
      var pos = this._getTouchPos(event);
      this.setState({ pos: pos });
      if (this.state.metaKey) {
        var startPos = this.state.startPos;

        this.props.onTouchRotate({ pos: pos, startPos: startPos });
      } else {
        this.props.onTouchDrag({ pos: pos });
      }
      event.preventDefault();
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(event) {
      _document2.default.removeEventListener('mousemove', this._onMouseDrag, false);
      _document2.default.removeEventListener('mouseup', this._onMouseUp, false);
      var pos = this._getMousePos(event);
      this.setState({ pos: pos });
      this.props.onMouseUp({ pos: pos });
    }
  }, {
    key: '_onTouchEnd',
    value: function _onTouchEnd(event) {
      _document2.default.removeEventListener('touchmove', this._onTouchDrag, false);
      _document2.default.removeEventListener('touchend', this._onTouchEnd, false);
      var pos = this._getTouchPos(event);
      this.setState({ pos: pos });
      this.props.onTouchEnd({ pos: pos });
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(event) {
      var pos = this._getMousePos(event);
      this.props.onMouseMove({ pos: pos });
    }

    /* eslint-disable complexity, max-statements */

  }, {
    key: '_onWheel',
    value: function _onWheel(event) {
      event.stopPropagation();
      event.preventDefault();
      var value = event.deltaY;
      // Firefox doubles the values on retina screens...
      if (firefox && event.deltaMode === _window2.default.WheelEvent.DOM_DELTA_PIXEL) {
        value /= _window2.default.devicePixelRatio;
      }
      if (event.deltaMode === _window2.default.WheelEvent.DOM_DELTA_LINE) {
        value *= 40;
      }

      var type = this.state.mouseWheelType;
      var timeout = this.state.mouseWheelTimeout;
      var lastValue = this.state.mouseWheelLastValue;
      var time = this.state.mouseWheelTime;

      var now = (_window2.default.performance || Date).now();
      var timeDelta = now - (time || 0);

      var pos = this._getMousePos(event);
      time = now;

      if (value !== 0 && value % 4.000244140625 === 0) {
        // This one is definitely a mouse wheel event.
        type = 'wheel';
        // Normalize this value to match trackpad.
        value = Math.floor(value / 4);
      } else if (value !== 0 && Math.abs(value) < 4) {
        // This one is definitely a trackpad event because it is so small.
        type = 'trackpad';
      } else if (timeDelta > 400) {
        // This is likely a new scroll action.
        type = null;
        lastValue = value;

        // Start a timeout in case this was a singular event, and delay it by up
        // to 40ms.
        timeout = _window2.default.setTimeout(function setTimeout() {
          var _type = 'wheel';
          this._zoom(-this.state.mouseWheelLastValue, this.state.mouseWheelPos);
          this.setState({ mouseWheelType: _type });
        }.bind(this), 40);
      } else if (!this._type) {
        // This is a repeating event, but we don't know the type of event just
        // yet.
        // If the delta per time is small, we assume it's a fast trackpad;
        // otherwise we switch into wheel mode.
        type = Math.abs(timeDelta * value) < 200 ? 'trackpad' : 'wheel';

        // Make sure our delayed event isn't fired again, because we accumulate
        // the previous event (which was less than 40ms ago) into this event.
        if (timeout) {
          _window2.default.clearTimeout(timeout);
          timeout = null;
          value += lastValue;
        }
      }

      // Slow down zoom if shift key is held for more precise zooming
      if (event.shiftKey && value) {
        value = value / 4;
      }

      // Only fire the callback if we actually know what type of scrolling device
      // the user uses.
      if (type) {
        this._zoom(-value, pos);
      }

      this.setState({
        mouseWheelTime: time,
        mouseWheelPos: pos,
        mouseWheelType: type,
        mouseWheelTimeout: timeout,
        mouseWheelLastValue: lastValue
      });
    }
    /* eslint-enable complexity, max-statements */

  }, {
    key: '_zoom',
    value: function _zoom(delta, pos) {

      // Scale by sigmoid of scroll wheel delta.
      var scale = 2 / (1 + Math.exp(-Math.abs(delta / 100)));
      if (delta < 0 && scale !== 0) {
        scale = 1 / scale;
      }
      this.props.onZoom({ pos: pos, scale: scale });
      _window2.default.clearTimeout(this._zoomEndTimeout);
      this._zoomEndTimeout = _window2.default.setTimeout(function _setTimeout() {
        this.props.onZoomEnd();
      }.bind(this), 200);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          ref: 'container',
          onMouseMove: this._onMouseMove,
          onMouseDown: this._onMouseDown,
          onTouchStart: this._onTouchStart,
          onContextMenu: this._onMouseDown,
          onWheel: this._onWheel,
          style: {
            width: this.props.width,
            height: this.props.height,
            position: 'relative'
          } },
        this.props.children
      );
    }
  }]);

  return MapInteractions;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, '_onMouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onTouchStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onTouchStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onMouseDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onMouseDrag'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onTouchDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onTouchDrag'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onMouseUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onMouseUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onTouchEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onTouchEnd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onMouseMove', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onMouseMove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onWheel', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onWheel'), _class.prototype)), _class);
exports.default = MapInteractions;


MapInteractions.propTypes = PROP_TYPES;
MapInteractions.defaultProps = DEFAULT_PROPS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXAtaW50ZXJhY3Rpb25zLnJlYWN0LmpzIl0sIm5hbWVzIjpbIm5vb3AiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInRvTG93ZXJDYXNlIiwiZmlyZWZveCIsImluZGV4T2YiLCJtb3VzZVBvcyIsImVsIiwiZXZlbnQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG91Y2hlcyIsImNsaWVudFgiLCJsZWZ0IiwiY2xpZW50TGVmdCIsImNsaWVudFkiLCJ0b3AiLCJjbGllbnRUb3AiLCJ0b3VjaFBvcyIsInBvaW50cyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiUFJPUF9UWVBFUyIsIndpZHRoIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImhlaWdodCIsIm9uTW91c2VEb3duIiwiZnVuYyIsIm9uTW91c2VEcmFnIiwib25Nb3VzZVJvdGF0ZSIsIm9uTW91c2VVcCIsIm9uTW91c2VNb3ZlIiwib25Ub3VjaFN0YXJ0Iiwib25Ub3VjaERyYWciLCJvblRvdWNoUm90YXRlIiwib25Ub3VjaEVuZCIsIm9uWm9vbSIsIm9uWm9vbUVuZCIsIkRFRkFVTFRfUFJPUFMiLCJNYXBJbnRlcmFjdGlvbnMiLCJwcm9wcyIsInN0YXRlIiwic3RhcnRQb3MiLCJwb3MiLCJtb3VzZVdoZWVsUG9zIiwicmVmcyIsImNvbnRhaW5lciIsInJlZHVjZSIsInByZXYiLCJjdXJyIiwiYXJyIiwiYWRkIiwiZGl2IiwiX2dldE1vdXNlUG9zIiwic2V0U3RhdGUiLCJtZXRhS2V5IiwiQm9vbGVhbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJfb25Nb3VzZURyYWciLCJfb25Nb3VzZVVwIiwiX2dldFRvdWNoUG9zIiwiX29uVG91Y2hEcmFnIiwiX29uVG91Y2hFbmQiLCJwcmV2ZW50RGVmYXVsdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJ2YWx1ZSIsImRlbHRhWSIsImRlbHRhTW9kZSIsIldoZWVsRXZlbnQiLCJET01fREVMVEFfUElYRUwiLCJkZXZpY2VQaXhlbFJhdGlvIiwiRE9NX0RFTFRBX0xJTkUiLCJ0eXBlIiwibW91c2VXaGVlbFR5cGUiLCJ0aW1lb3V0IiwibW91c2VXaGVlbFRpbWVvdXQiLCJsYXN0VmFsdWUiLCJtb3VzZVdoZWVsTGFzdFZhbHVlIiwidGltZSIsIm1vdXNlV2hlZWxUaW1lIiwibm93IiwicGVyZm9ybWFuY2UiLCJEYXRlIiwidGltZURlbHRhIiwiTWF0aCIsImZsb29yIiwiYWJzIiwic2V0VGltZW91dCIsIl90eXBlIiwiX3pvb20iLCJiaW5kIiwiY2xlYXJUaW1lb3V0Iiwic2hpZnRLZXkiLCJkZWx0YSIsInNjYWxlIiwiZXhwIiwiX3pvb21FbmRUaW1lb3V0IiwiX3NldFRpbWVvdXQiLCJfb25Nb3VzZU1vdmUiLCJfb25Nb3VzZURvd24iLCJfb25Ub3VjaFN0YXJ0IiwiX29uV2hlZWwiLCJwb3NpdGlvbiIsImNoaWxkcmVuIiwicHJvcFR5cGVzIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7MkJBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsSUFBVCxHQUFnQixDQUFFOztBQUVsQixJQUFNQyxLQUFLLE9BQU8saUJBQU9DLFNBQWQsS0FBNEIsV0FBNUIsR0FDVCxpQkFBT0EsU0FBUCxDQUFpQkMsU0FBakIsQ0FBMkJDLFdBQTNCLEVBRFMsR0FDa0MsRUFEN0M7QUFFQSxJQUFNQyxVQUFVSixHQUFHSyxPQUFILENBQVcsU0FBWCxNQUEwQixDQUFDLENBQTNDOztBQUVBLFNBQVNDLFFBQVQsQ0FBa0JDLEVBQWxCLEVBQXNCQyxLQUF0QixFQUE2QjtBQUMzQixNQUFNQyxPQUFPRixHQUFHRyxxQkFBSCxFQUFiO0FBQ0FGLFVB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Z0JrRSxTQUFoQixHQUE0QnBGLFVBQTVCO0FBQ0FrQixnQkFBZ0JtRSxZQUFoQixHQUErQnBFLGFBQS9CIiwiZmlsZSI6Im1hcC1pbnRlcmFjdGlvbnMucmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTUgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cblxuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXMsIENvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGF1dG9iaW5kIGZyb20gJ2F1dG9iaW5kLWRlY29yYXRvcic7XG5pbXBvcnQge1BvaW50fSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJ2dsb2JhbC9kb2N1bWVudCc7XG5pbXBvcnQgd2luZG93IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuY29uc3QgdWEgPSB0eXBlb2Ygd2luZG93Lm5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgP1xuICB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpIDogJyc7XG5jb25zdCBmaXJlZm94ID0gdWEuaW5kZXhPZignZmlyZWZveCcpICE9PSAtMTtcblxuZnVuY3Rpb24gbW91c2VQb3MoZWwsIGV2ZW50KSB7XG4gIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgZXZlbnQgPSBldmVudC50b3VjaGVzID8gZXZlbnQudG91Y2hlc1swXSA6IGV2ZW50O1xuICByZXR1cm4gbmV3IFBvaW50KFxuICAgIGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQgLSBlbC5jbGllbnRMZWZ0LFxuICAgIGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcCAtIGVsLmNsaWVudFRvcFxuICApO1xufVxuXG5mdW5jdGlvbiB0b3VjaFBvcyhlbCwgZXZlbnQpIHtcbiAgY29uc3QgcG9pbnRzID0gW107XG4gIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC50b3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgcG9pbnRzLnB1c2gobmV3IFBvaW50KFxuICAgICAgZXZlbnQudG91Y2hlc1tpXS5jbGllbnRYIC0gcmVjdC5sZWZ0IC0gZWwuY2xpZW50TGVmdCxcbiAgICAgIGV2ZW50LnRvdWNoZXNbaV0uY2xpZW50WSAtIHJlY3QudG9wIC0gZWwuY2xpZW50VG9wXG4gICAgKSk7XG4gIH1cbiAgcmV0dXJuIHBvaW50cztcbn1cblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuLy8gUG9ydGlvbnMgb2YgdGhlIGNvZGUgYmVsb3cgb3JpZ2luYWxseSBmcm9tOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3gtZ2wtanMvYmxvYi9tYXN0ZXIvanMvdWkvaGFuZGxlci9zY3JvbGxfem9vbS5qc1xuLyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXG5cbmNvbnN0IFBST1BfVFlQRVMgPSB7XG4gIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBvbk1vdXNlRG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uTW91c2VEcmFnOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Nb3VzZVJvdGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uTW91c2VVcDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uTW91c2VNb3ZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Ub3VjaFN0YXJ0OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Ub3VjaERyYWc6IFByb3BUeXBlcy5mdW5jLFxuICBvblRvdWNoUm90YXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Ub3VjaEVuZDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uWm9vbTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uWm9vbUVuZDogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbmNvbnN0IERFRkFVTFRfUFJPUFMgPSB7XG4gIG9uTW91c2VEb3duOiBub29wLFxuICBvbk1vdXNlRHJhZzogbm9vcCxcbiAgb25Nb3VzZVJvdGF0ZTogbm9vcCxcbiAgb25Nb3VzZVVwOiBub29wLFxuICBvbk1vdXNlTW92ZTogbm9vcCxcbiAgb25Ub3VjaFN0YXJ0OiBub29wLFxuICBvblRvdWNoRHJhZzogbm9vcCxcbiAgb25Ub3VjaFJvdGF0ZTogbm9vcCxcbiAgb25Ub3VjaEVuZDogbm9vcCxcbiAgb25ab29tOiBub29wLFxuICBvblpvb21FbmQ6IG5vb3Bcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcEludGVyYWN0aW9ucyBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHN0YXJ0UG9zOiBudWxsLFxuICAgICAgcG9zOiBudWxsLFxuICAgICAgbW91c2VXaGVlbFBvczogbnVsbFxuICAgIH07XG4gIH1cblxuICBfZ2V0TW91c2VQb3MoZXZlbnQpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMucmVmcy5jb250YWluZXI7XG4gICAgcmV0dXJuIG1vdXNlUG9zKGVsLCBldmVudCk7XG4gIH1cblxuICBfZ2V0VG91Y2hQb3MoZXZlbnQpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMucmVmcy5jb250YWluZXI7XG4gICAgcmV0dXJuIHRvdWNoUG9zKGVsLCBldmVudCkucmVkdWNlKChwcmV2LCBjdXJyLCBpLCBhcnIpID0+IHtcbiAgICAgIHJldHVybiBwcmV2LmFkZChjdXJyLmRpdihhcnIubGVuZ3RoKSk7XG4gICAgfSwgbmV3IFBvaW50KDAsIDApKTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBfb25Nb3VzZURvd24oZXZlbnQpIHtcbiAgICBjb25zdCBwb3MgPSB0aGlzLl9nZXRNb3VzZVBvcyhldmVudCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdGFydFBvczogcG9zLFxuICAgICAgcG9zLFxuICAgICAgbWV0YUtleTogQm9vbGVhbihldmVudC5tZXRhS2V5KVxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25Nb3VzZURvd24oe3Bvc30pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VEcmFnLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcCwgZmFsc2UpO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIF9vblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICBjb25zdCBwb3MgPSB0aGlzLl9nZXRUb3VjaFBvcyhldmVudCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdGFydFBvczogcG9zLFxuICAgICAgcG9zLFxuICAgICAgbWV0YUtleTogQm9vbGVhbihldmVudC5tZXRhS2V5KVxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25Ub3VjaFN0YXJ0KHtwb3N9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLl9vblRvdWNoRHJhZywgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fb25Ub3VjaEVuZCwgZmFsc2UpO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIF9vbk1vdXNlRHJhZyhldmVudCkge1xuICAgIGNvbnN0IHBvcyA9IHRoaXMuX2dldE1vdXNlUG9zKGV2ZW50KTtcbiAgICB0aGlzLnNldFN0YXRlKHtwb3N9KTtcbiAgICBpZiAodGhpcy5zdGF0ZS5tZXRhS2V5KSB7XG4gICAgICBjb25zdCB7c3RhcnRQb3N9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIHRoaXMucHJvcHMub25Nb3VzZVJvdGF0ZSh7cG9zLCBzdGFydFBvc30pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLm9uTW91c2VEcmFnKHtwb3N9KTtcbiAgICB9XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgX29uVG91Y2hEcmFnKGV2ZW50KSB7XG4gICAgY29uc3QgcG9zID0gdGhpcy5fZ2V0VG91Y2hQb3MoZXZlbnQpO1xuICAgIHRoaXMuc2V0U3RhdGUoe3Bvc30pO1xuICAgIGlmICh0aGlzLnN0YXRlLm1ldGFLZXkpIHtcbiAgICAgIGNvbnN0IHtzdGFydFBvc30gPSB0aGlzLnN0YXRlO1xuICAgICAgdGhpcy5wcm9wcy5vblRvdWNoUm90YXRlKHtwb3MsIHN0YXJ0UG9zfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMub25Ub3VjaERyYWcoe3Bvc30pO1xuICAgIH1cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIF9vbk1vdXNlVXAoZXZlbnQpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlRHJhZywgZmFsc2UpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXAsIGZhbHNlKTtcbiAgICBjb25zdCBwb3MgPSB0aGlzLl9nZXRNb3VzZVBvcyhldmVudCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cG9zfSk7XG4gICAgdGhpcy5wcm9wcy5vbk1vdXNlVXAoe3Bvc30pO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIF9vblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaERyYWcsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICBjb25zdCBwb3MgPSB0aGlzLl9nZXRUb3VjaFBvcyhldmVudCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cG9zfSk7XG4gICAgdGhpcy5wcm9wcy5vblRvdWNoRW5kKHtwb3N9KTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBfb25Nb3VzZU1vdmUoZXZlbnQpIHtcbiAgICBjb25zdCBwb3MgPSB0aGlzLl9nZXRNb3VzZVBvcyhldmVudCk7XG4gICAgdGhpcy5wcm9wcy5vbk1vdXNlTW92ZSh7cG9zfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5LCBtYXgtc3RhdGVtZW50cyAqL1xuICBAYXV0b2JpbmRcbiAgX29uV2hlZWwoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB2YWx1ZSA9IGV2ZW50LmRlbHRhWTtcbiAgICAvLyBGaXJlZm94IGRvdWJsZXMgdGhlIHZhbHVlcyBvbiByZXRpbmEgc2NyZWVucy4uLlxuICAgIGlmIChmaXJlZm94ICYmIGV2ZW50LmRlbHRhTW9kZSA9PT0gd2luZG93LldoZWVsRXZlbnQuRE9NX0RFTFRBX1BJWEVMKSB7XG4gICAgICB2YWx1ZSAvPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICB9XG4gICAgaWYgKGV2ZW50LmRlbHRhTW9kZSA9PT0gd2luZG93LldoZWVsRXZlbnQuRE9NX0RFTFRBX0xJTkUpIHtcbiAgICAgIHZhbHVlICo9IDQwO1xuICAgIH1cblxuICAgIGxldCB0eXBlID0gdGhpcy5zdGF0ZS5tb3VzZVdoZWVsVHlwZTtcbiAgICBsZXQgdGltZW91dCA9IHRoaXMuc3RhdGUubW91c2VXaGVlbFRpbWVvdXQ7XG4gICAgbGV0IGxhc3RWYWx1ZSA9IHRoaXMuc3RhdGUubW91c2VXaGVlbExhc3RWYWx1ZTtcbiAgICBsZXQgdGltZSA9IHRoaXMuc3RhdGUubW91c2VXaGVlbFRpbWU7XG5cbiAgICBjb25zdCBub3cgPSAod2luZG93LnBlcmZvcm1hbmNlIHx8IERhdGUpLm5vdygpO1xuICAgIGNvbnN0IHRpbWVEZWx0YSA9IG5vdyAtICh0aW1lIHx8IDApO1xuXG4gICAgY29uc3QgcG9zID0gdGhpcy5fZ2V0TW91c2VQb3MoZXZlbnQpO1xuICAgIHRpbWUgPSBub3c7XG5cbiAgICBpZiAodmFsdWUgIT09IDAgJiYgdmFsdWUgJSA0LjAwMDI0NDE0MDYyNSA9PT0gMCkge1xuICAgICAgLy8gVGhpcyBvbmUgaXMgZGVmaW5pdGVseSBhIG1vdXNlIHdoZWVsIGV2ZW50LlxuICAgICAgdHlwZSA9ICd3aGVlbCc7XG4gICAgICAvLyBOb3JtYWxpemUgdGhpcyB2YWx1ZSB0byBtYXRjaCB0cmFja3BhZC5cbiAgICAgIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSAvIDQpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IDAgJiYgTWF0aC5hYnModmFsdWUpIDwgNCkge1xuICAgICAgLy8gVGhpcyBvbmUgaXMgZGVmaW5pdGVseSBhIHRyYWNrcGFkIGV2ZW50IGJlY2F1c2UgaXQgaXMgc28gc21hbGwuXG4gICAgICB0eXBlID0gJ3RyYWNrcGFkJztcbiAgICB9IGVsc2UgaWYgKHRpbWVEZWx0YSA+IDQwMCkge1xuICAgICAgLy8gVGhpcyBpcyBsaWtlbHkgYSBuZXcgc2Nyb2xsIGFjdGlvbi5cbiAgICAgIHR5cGUgPSBudWxsO1xuICAgICAgbGFzdFZhbHVlID0gdmFsdWU7XG5cbiAgICAgIC8vIFN0YXJ0IGEgdGltZW91dCBpbiBjYXNlIHRoaXMgd2FzIGEgc2luZ3VsYXIgZXZlbnQsIGFuZCBkZWxheSBpdCBieSB1cFxuICAgICAgLy8gdG8gNDBtcy5cbiAgICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiBzZXRUaW1lb3V0KCkge1xuICAgICAgICBjb25zdCBfdHlwZSA9ICd3aGVlbCc7XG4gICAgICAgIHRoaXMuX3pvb20oLXRoaXMuc3RhdGUubW91c2VXaGVlbExhc3RWYWx1ZSwgdGhpcy5zdGF0ZS5tb3VzZVdoZWVsUG9zKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VXaGVlbFR5cGU6IF90eXBlfSk7XG4gICAgICB9LmJpbmQodGhpcyksIDQwKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl90eXBlKSB7XG4gICAgICAvLyBUaGlzIGlzIGEgcmVwZWF0aW5nIGV2ZW50LCBidXQgd2UgZG9uJ3Qga25vdyB0aGUgdHlwZSBvZiBldmVudCBqdXN0XG4gICAgICAvLyB5ZXQuXG4gICAgICAvLyBJZiB0aGUgZGVsdGEgcGVyIHRpbWUgaXMgc21hbGwsIHdlIGFzc3VtZSBpdCdzIGEgZmFzdCB0cmFja3BhZDtcbiAgICAgIC8vIG90aGVyd2lzZSB3ZSBzd2l0Y2ggaW50byB3aGVlbCBtb2RlLlxuICAgICAgdHlwZSA9IE1hdGguYWJzKHRpbWVEZWx0YSAqIHZhbHVlKSA8IDIwMCA/ICd0cmFja3BhZCcgOiAnd2hlZWwnO1xuXG4gICAgICAvLyBNYWtlIHN1cmUgb3VyIGRlbGF5ZWQgZXZlbnQgaXNuJ3QgZmlyZWQgYWdhaW4sIGJlY2F1c2Ugd2UgYWNjdW11bGF0ZVxuICAgICAgLy8gdGhlIHByZXZpb3VzIGV2ZW50ICh3aGljaCB3YXMgbGVzcyB0aGFuIDQwbXMgYWdvKSBpbnRvIHRoaXMgZXZlbnQuXG4gICAgICBpZiAodGltZW91dCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgdmFsdWUgKz0gbGFzdFZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNsb3cgZG93biB6b29tIGlmIHNoaWZ0IGtleSBpcyBoZWxkIGZvciBtb3JlIHByZWNpc2Ugem9vbWluZ1xuICAgIGlmIChldmVudC5zaGlmdEtleSAmJiB2YWx1ZSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZSAvIDQ7XG4gICAgfVxuXG4gICAgLy8gT25seSBmaXJlIHRoZSBjYWxsYmFjayBpZiB3ZSBhY3R1YWxseSBrbm93IHdoYXQgdHlwZSBvZiBzY3JvbGxpbmcgZGV2aWNlXG4gICAgLy8gdGhlIHVzZXIgdXNlcy5cbiAgICBpZiAodHlwZSkge1xuICAgICAgdGhpcy5fem9vbSgtdmFsdWUsIHBvcyk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtb3VzZVdoZWVsVGltZTogdGltZSxcbiAgICAgIG1vdXNlV2hlZWxQb3M6IHBvcyxcbiAgICAgIG1vdXNlV2hlZWxUeXBlOiB0eXBlLFxuICAgICAgbW91c2VXaGVlbFRpbWVvdXQ6IHRpbWVvdXQsXG4gICAgICBtb3VzZVdoZWVsTGFzdFZhbHVlOiBsYXN0VmFsdWVcbiAgICB9KTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHksIG1heC1zdGF0ZW1lbnRzICovXG5cbiAgX3pvb20oZGVsdGEsIHBvcykge1xuXG4gICAgLy8gU2NhbGUgYnkgc2lnbW9pZCBvZiBzY3JvbGwgd2hlZWwgZGVsdGEuXG4gICAgbGV0IHNjYWxlID0gMiAvICgxICsgTWF0aC5leHAoLU1hdGguYWJzKGRlbHRhIC8gMTAwKSkpO1xuICAgIGlmIChkZWx0YSA8IDAgJiYgc2NhbGUgIT09IDApIHtcbiAgICAgIHNjYWxlID0gMSAvIHNjYWxlO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uWm9vbSh7cG9zLCBzY2FsZX0pO1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fem9vbUVuZFRpbWVvdXQpO1xuICAgIHRoaXMuX3pvb21FbmRUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gX3NldFRpbWVvdXQoKSB7XG4gICAgICB0aGlzLnByb3BzLm9uWm9vbUVuZCgpO1xuICAgIH0uYmluZCh0aGlzKSwgMjAwKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICByZWY9XCJjb250YWluZXJcIlxuICAgICAgICBvbk1vdXNlTW92ZT17IHRoaXMuX29uTW91c2VNb3ZlIH1cbiAgICAgICAgb25Nb3VzZURvd249eyB0aGlzLl9vbk1vdXNlRG93biB9XG4gICAgICAgIG9uVG91Y2hTdGFydD17IHRoaXMuX29uVG91Y2hTdGFydCB9XG4gICAgICAgIG9uQ29udGV4dE1lbnU9eyB0aGlzLl9vbk1vdXNlRG93biB9XG4gICAgICAgIG9uV2hlZWw9eyB0aGlzLl9vbldoZWVsIH1cbiAgICAgICAgc3R5bGU9eyB7XG4gICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCxcbiAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICAgICAgICB9IH0+XG5cbiAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5NYXBJbnRlcmFjdGlvbnMucHJvcFR5cGVzID0gUFJPUF9UWVBFUztcbk1hcEludGVyYWN0aW9ucy5kZWZhdWx0UHJvcHMgPSBERUZBVUxUX1BST1BTO1xuIl19