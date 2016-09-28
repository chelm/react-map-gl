'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _canvasCompositeTypes = require('canvas-composite-types');

var _canvasCompositeTypes2 = _interopRequireDefault(_canvasCompositeTypes);

var _viewportMercatorProject = require('viewport-mercator-project');

var _viewportMercatorProject2 = _interopRequireDefault(_viewportMercatorProject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2015 Uber Technologies, Inc.

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

function round(x, n) {
  var tenN = Math.pow(10, n);
  return Math.round(x * tenN) / tenN;
}

var PROP_TYPES = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  latitude: _react.PropTypes.number.isRequired,
  longitude: _react.PropTypes.number.isRequired,
  zoom: _react.PropTypes.number.isRequired,
  isDragging: _react.PropTypes.bool.isRequired,
  locations: _react.PropTypes.instanceOf(_immutable2.default.List).isRequired,
  lngLatAccessor: _react.PropTypes.func.isRequired,
  renderWhileDragging: _react.PropTypes.bool,
  globalOpacity: _react.PropTypes.number.isRequired,
  dotRadius: _react.PropTypes.number.isRequired,
  dotFill: _react.PropTypes.string.isRequired,
  compositeOperation: _react.PropTypes.oneOf(_canvasCompositeTypes2.default).isRequired
};

var DEFAULT_PROPS = {
  lngLatAccessor: function lngLatAccessor(location) {
    return [location.get(0), location.get(1)];
  },

  renderWhileDragging: true,
  dotRadius: 4,
  dotFill: '#1FBAD6',
  globalOpacity: 1,
  // Same as browser default.
  compositeOperation: 'source-over'
};

var ScatterplotOverlay = function (_Component) {
  _inherits(ScatterplotOverlay, _Component);

  function ScatterplotOverlay() {
    _classCallCheck(this, ScatterplotOverlay);

    return _possibleConstructorReturn(this, (ScatterplotOverlay.__proto__ || Object.getPrototypeOf(ScatterplotOverlay)).apply(this, arguments));
  }

  _createClass(ScatterplotOverlay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._redraw();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._redraw();
    }

    /* eslint-disable max-statements */

  }, {
    key: '_redraw',
    value: function _redraw() {
      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var dotRadius = _props.dotRadius;
      var dotFill = _props.dotFill;
      var compositeOperation = _props.compositeOperation;
      var renderWhileDragging = _props.renderWhileDragging;
      var isDragging = _props.isDragging;
      var locations = _props.locations;
      var lngLatAccessor = _props.lngLatAccessor;


      var mercator = (0, _viewportMercatorProject2.default)(this.props);
      var pixelRatio = _window2.default.devicePixelRatio || 1;
      var canvas = this.refs.overlay;
      var ctx = canvas.getContext('2d');

      ctx.save();
      ctx.scale(pixelRatio, pixelRatio);
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = compositeOperation;

      if ((renderWhileDragging || !isDragging) && locations) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = locations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var location = _step.value;

            var pixel = mercator.project(lngLatAccessor(location));
            var pixelRounded = [round(pixel[0], 1), round(pixel[1], 1)];
            if (pixelRounded[0] + dotRadius >= 0 && pixelRounded[0] - dotRadius < width && pixelRounded[1] + dotRadius >= 0 && pixelRounded[1] - dotRadius < height) {
              ctx.fillStyle = dotFill;
              ctx.beginPath();
              ctx.arc(pixelRounded[0], pixelRounded[1], dotRadius, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      ctx.restore();
    }
    /* eslint-enable max-statements */

  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;
      var globalOpacity = _props2.globalOpacity;

      var pixelRatio = _window2.default.devicePixelRatio || 1;
      return _react2.default.createElement('canvas', {
        ref: 'overlay',
        width: width * pixelRatio,
        height: height * pixelRatio,
        style: {
          width: width + 'px',
          height: height + 'px',
          position: 'absolute',
          pointerEvents: 'none',
          opacity: globalOpacity,
          left: 0,
          top: 0
        } });
    }
  }]);

  return ScatterplotOverlay;
}(_react.Component);

exports.default = ScatterplotOverlay;


ScatterplotOverlay.propTypes = PROP_TYPES;
ScatterplotOverlay.defaultProps = DEFAULT_PROPS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vdmVybGF5cy9zY2F0dGVycGxvdC5yZWFjdC5qcyJdLCJuYW1lcyI6WyJyb3VuZCIsIngiLCJuIiwidGVuTiIsIk1hdGgiLCJwb3ciLCJQUk9QX1RZUEVTIiwid2lkdGgiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwiaGVpZ2h0IiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ6b29tIiwiaXNEcmFnZ2luZyIsImJvb2wiLCJsb2NhdGlvbnMiLCJpbnN0YW5jZU9mIiwiTGlzdCIsImxuZ0xhdEFjY2Vzc29yIiwiZnVuYyIsInJlbmRlcldoaWxlRHJhZ2dpbmciLCJnbG9iYWxPcGFjaXR5IiwiZG90UmFkaXVzIiwiZG90RmlsbCIsInN0cmluZyIsImNvbXBvc2l0ZU9wZXJhdGlvbiIsIm9uZU9mIiwiREVGQVVMVF9QUk9QUyIsImxvY2F0aW9uIiwiZ2V0IiwiU2NhdHRlcnBsb3RPdmVybGF5IiwiX3JlZHJhdyIsInByb3BzIiwibWVyY2F0b3IiLCJwaXhlbFJhdGlvIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImNhbnZhcyIsInJlZnMiLCJvdmVybGF5IiwiY3R4IiwiZ2V0Q29udGV4dCIsInNhdmUiLCJzY2FsZSIsImNsZWFyUmVjdCIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsInBpeGVsIiwicHJvamVjdCIsInBpeGVsUm91bmRlZCIsImZpbGxTdHlsZSIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwiZmlsbCIsInJlc3RvcmUiLCJwb3NpdGlvbiIsInBvaW50ZXJFdmVudHMiLCJvcGFjaXR5IiwibGVmdCIsInRvcCIsInByb3BUeXBlcyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBb0JBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBeEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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Rk07QUFHTjZDLG9CQUFVLFVBSEo7QUFJTkMseUJBQWUsTUFKVDtBQUtOQyxtQkFBU25DLGFBTEg7QUFNTm9DLGdCQUFNLENBTkE7QUFPTkMsZUFBSztBQVBDLFNBSlYsR0FERjtBQWVEOzs7Ozs7a0JBbEVrQjVCLGtCOzs7QUFxRXJCQSxtQkFBbUI2QixTQUFuQixHQUErQnRELFVBQS9CO0FBQ0F5QixtQkFBbUI4QixZQUFuQixHQUFrQ2pDLGFBQWxDIiwiZmlsZSI6InNjYXR0ZXJwbG90LnJlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE1IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG5cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzLCBDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB3aW5kb3cgZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgQ09NUE9TSVRFX1RZUEVTIGZyb20gJ2NhbnZhcy1jb21wb3NpdGUtdHlwZXMnO1xuaW1wb3J0IFZpZXdwb3J0TWVyY2F0b3IgZnJvbSAndmlld3BvcnQtbWVyY2F0b3ItcHJvamVjdCc7XG5cbmZ1bmN0aW9uIHJvdW5kKHgsIG4pIHtcbiAgY29uc3QgdGVuTiA9IE1hdGgucG93KDEwLCBuKTtcbiAgcmV0dXJuIE1hdGgucm91bmQoeCAqIHRlbk4pIC8gdGVuTjtcbn1cblxuY29uc3QgUFJPUF9UWVBFUyA9IHtcbiAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGxhdGl0dWRlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGxvbmdpdHVkZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICB6b29tOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGlzRHJhZ2dpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGxvY2F0aW9uczogUHJvcFR5cGVzLmluc3RhbmNlT2YoSW1tdXRhYmxlLkxpc3QpLmlzUmVxdWlyZWQsXG4gIGxuZ0xhdEFjY2Vzc29yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICByZW5kZXJXaGlsZURyYWdnaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgZ2xvYmFsT3BhY2l0eTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBkb3RSYWRpdXM6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgZG90RmlsbDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBjb21wb3NpdGVPcGVyYXRpb246IFByb3BUeXBlcy5vbmVPZihDT01QT1NJVEVfVFlQRVMpLmlzUmVxdWlyZWRcbn07XG5cbmNvbnN0IERFRkFVTFRfUFJPUFMgPSB7XG4gIGxuZ0xhdEFjY2Vzc29yKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIFtsb2NhdGlvbi5nZXQoMCksIGxvY2F0aW9uLmdldCgxKV07XG4gIH0sXG4gIHJlbmRlcldoaWxlRHJhZ2dpbmc6IHRydWUsXG4gIGRvdFJhZGl1czogNCxcbiAgZG90RmlsbDogJyMxRkJBRDYnLFxuICBnbG9iYWxPcGFjaXR5OiAxLFxuICAvLyBTYW1lIGFzIGJyb3dzZXIgZGVmYXVsdC5cbiAgY29tcG9zaXRlT3BlcmF0aW9uOiAnc291cmNlLW92ZXInXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2F0dGVycGxvdE92ZXJsYXkgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX3JlZHJhdygpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuX3JlZHJhdygpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgbWF4LXN0YXRlbWVudHMgKi9cbiAgX3JlZHJhdygpIHtcbiAgICBjb25zdCB7XG4gICAgICB3aWR0aCwgaGVpZ2h0LCBkb3RSYWRpdXMsIGRvdEZpbGwsIGNvbXBvc2l0ZU9wZXJhdGlvbixcbiAgICAgIHJlbmRlcldoaWxlRHJhZ2dpbmcsIGlzRHJhZ2dpbmcsIGxvY2F0aW9ucywgbG5nTGF0QWNjZXNzb3JcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG1lcmNhdG9yID0gVmlld3BvcnRNZXJjYXRvcih0aGlzLnByb3BzKTtcbiAgICBjb25zdCBwaXhlbFJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLnJlZnMub3ZlcmxheTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnNjYWxlKHBpeGVsUmF0aW8sIHBpeGVsUmF0aW8pO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IGNvbXBvc2l0ZU9wZXJhdGlvbjtcblxuICAgIGlmICgocmVuZGVyV2hpbGVEcmFnZ2luZyB8fCAhaXNEcmFnZ2luZykgJiYgbG9jYXRpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGxvY2F0aW9uIG9mIGxvY2F0aW9ucykge1xuICAgICAgICBjb25zdCBwaXhlbCA9IG1lcmNhdG9yLnByb2plY3QobG5nTGF0QWNjZXNzb3IobG9jYXRpb24pKTtcbiAgICAgICAgY29uc3QgcGl4ZWxSb3VuZGVkID0gW3JvdW5kKHBpeGVsWzBdLCAxKSwgcm91bmQocGl4ZWxbMV0sIDEpXTtcbiAgICAgICAgaWYgKHBpeGVsUm91bmRlZFswXSArIGRvdFJhZGl1cyA+PSAwICYmXG4gICAgICAgICAgICBwaXhlbFJvdW5kZWRbMF0gLSBkb3RSYWRpdXMgPCB3aWR0aCAmJlxuICAgICAgICAgICAgcGl4ZWxSb3VuZGVkWzFdICsgZG90UmFkaXVzID49IDAgJiZcbiAgICAgICAgICAgIHBpeGVsUm91bmRlZFsxXSAtIGRvdFJhZGl1cyA8IGhlaWdodFxuICAgICAgICApIHtcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZG90RmlsbDtcbiAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgY3R4LmFyYyhwaXhlbFJvdW5kZWRbMF0sIHBpeGVsUm91bmRlZFsxXSwgZG90UmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBtYXgtc3RhdGVtZW50cyAqL1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7d2lkdGgsIGhlaWdodCwgZ2xvYmFsT3BhY2l0eX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIHJldHVybiAoXG4gICAgICA8Y2FudmFzXG4gICAgICAgIHJlZj1cIm92ZXJsYXlcIlxuICAgICAgICB3aWR0aD17IHdpZHRoICogcGl4ZWxSYXRpbyB9XG4gICAgICAgIGhlaWdodD17IGhlaWdodCAqIHBpeGVsUmF0aW8gfVxuICAgICAgICBzdHlsZT17IHtcbiAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgIGhlaWdodDogYCR7aGVpZ2h0fXB4YCxcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICAgICAgb3BhY2l0eTogZ2xvYmFsT3BhY2l0eSxcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgIHRvcDogMFxuICAgICAgICB9IH0vPlxuICAgICk7XG4gIH1cbn1cblxuU2NhdHRlcnBsb3RPdmVybGF5LnByb3BUeXBlcyA9IFBST1BfVFlQRVM7XG5TY2F0dGVycGxvdE92ZXJsYXkuZGVmYXVsdFByb3BzID0gREVGQVVMVF9QUk9QUztcbiJdfQ==