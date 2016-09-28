'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _viewportMercatorProject = require('viewport-mercator-project');

var _viewportMercatorProject2 = _interopRequireDefault(_viewportMercatorProject);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _d3Array = require('d3-array');

var _d3Scale = require('d3-scale');

var _d3Geo = require('d3-geo');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

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


var PROP_TYPES = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  latitude: _react.PropTypes.number.isRequired,
  longitude: _react.PropTypes.number.isRequired,
  zoom: _react.PropTypes.number.isRequired,
  isDragging: _react.PropTypes.bool.isRequired,
  renderWhileDragging: _react.PropTypes.bool.isRequired,
  globalOpacity: _react.PropTypes.number.isRequired,
  /**
    * An Immutable List of feature objects.
    */
  features: _react.PropTypes.instanceOf(_immutable2.default.List),
  colorDomain: _react.PropTypes.array,
  colorRange: _react.PropTypes.array.isRequired,
  valueAccessor: _react.PropTypes.func.isRequired
};

var DEFAULT_PROPS = {
  renderWhileDragging: true,
  globalOpacity: 1,
  colorDomain: null,
  colorRange: ['#FFFFFF', '#1FBAD6'],
  valueAccessor: function valueAccessor(feature) {
    return feature.get('properties').get('value');
  }
};

var ChoroplethOverlay = function (_Component) {
  _inherits(ChoroplethOverlay, _Component);

  function ChoroplethOverlay() {
    _classCallCheck(this, ChoroplethOverlay);

    return _possibleConstructorReturn(this, (ChoroplethOverlay.__proto__ || Object.getPrototypeOf(ChoroplethOverlay)).apply(this, arguments));
  }

  _createClass(ChoroplethOverlay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._redraw();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._redraw();
    }
  }, {
    key: '_redraw',
    value: function _redraw() {
      var pixelRatio = _window2.default.devicePixelRatio;
      var canvas = this.refs.overlay;
      var ctx = canvas.getContext('2d');
      var mercator = (0, _viewportMercatorProject2.default)(this.props);

      ctx.save();
      ctx.scale(pixelRatio, pixelRatio);
      ctx.clearRect(0, 0, this.props.width, this.props.height);

      function projectPoint(lon, lat) {
        var point = mercator.project([lon, lat]);
        /* eslint-disable no-invalid-this */
        this.stream.point(point[0], point[1]);
        /* eslint-enable no-invalid-this */
      }

      if (this.props.renderWhileDragging || !this.props.isDragging) {
        var transform = (0, _d3Geo.geoTransform)({ point: projectPoint });
        var path = (0, _d3Geo.geoPath)().projection(transform).context(ctx);
        this._drawFeatures(ctx, path);
      }
      ctx.restore();
    }
  }, {
    key: '_drawFeatures',
    value: function _drawFeatures(ctx, path) {
      var features = this.props.features;

      if (!features) {
        return;
      }
      var colorDomain = this.props.colorDomain || (0, _d3Array.extent)(features.toArray(), this.props.valueAccessor);

      var colorScale = (0, _d3Scale.scaleLinear)().domain(colorDomain).range(this.props.colorRange).clamp(true);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = features[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var feature = _step.value;

          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = '1';
          ctx.fillStyle = colorScale(this.props.valueAccessor(feature));
          var geometry = feature.get('geometry');
          path({
            type: geometry.get('type'),
            coordinates: geometry.get('coordinates').toJS()
          });
          ctx.fill();
          ctx.stroke();
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
  }, {
    key: 'render',
    value: function render() {
      var pixelRatio = _window2.default.devicePixelRatio || 1;
      return _react2.default.createElement('canvas', {
        ref: 'overlay',
        width: this.props.width * pixelRatio,
        height: this.props.height * pixelRatio,
        style: {
          width: this.props.width + 'px',
          height: this.props.height + 'px',
          position: 'absolute',
          pointerEvents: 'none',
          opacity: this.props.globalOpacity,
          left: 0,
          top: 0
        } });
    }
  }]);

  return ChoroplethOverlay;
}(_react.Component);

exports.default = ChoroplethOverlay;


ChoroplethOverlay.propTypes = PROP_TYPES;
ChoroplethOverlay.defaultProps = DEFAULT_PROPS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vdmVybGF5cy9jaG9yb3BsZXRoLnJlYWN0LmpzIl0sIm5hbWVzIjpbIlBST1BfVFlQRVMiLCJ3aWR0aCIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJoZWlnaHQiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInpvb20iLCJpc0RyYWdnaW5nIiwiYm9vbCIsInJlbmRlcldoaWxlRHJhZ2dpbmciLCJnbG9iYWxPcGFjaXR5IiwiZmVhdHVyZXMiLCJpbnN0YW5jZU9mIiwiTGlzdCIsImNvbG9yRG9tYWluIiwiYXJyYXkiLCJjb2xvclJhbmdlIiwidmFsdWVBY2Nlc3NvciIsImZ1bmMiLCJERUZBVUxUX1BST1BTIiwiZmVhdHVyZSIsImdldCIsIkNob3JvcGxldGhPdmVybGF5IiwiX3JlZHJhdyIsInBpeGVsUmF0aW8iLCJkZXZpY2VQaXhlbFJhdGlvIiwiY2FudmFzIiwicmVmcyIsIm92ZXJsYXkiLCJjdHgiLCJnZXRDb250ZXh0IiwibWVyY2F0b3IiLCJwcm9wcyIsInNhdmUiLCJzY2FsZSIsImNsZWFyUmVjdCIsInByb2plY3RQb2ludCIsImxvbiIsImxhdCIsInBvaW50IiwicHJvamVjdCIsInN0cmVhbSIsInRyYW5zZm9ybSIsInBhdGgiLCJwcm9qZWN0aW9uIiwiY29udGV4dCIsIl9kcmF3RmVhdHVyZXMiLCJyZXN0b3JlIiwidG9BcnJheSIsImNvbG9yU2NhbGUiLCJkb21haW4iLCJyYW5nZSIsImNsYW1wIiwiYmVnaW5QYXRoIiwic3Ryb2tlU3R5bGUiLCJsaW5lV2lkdGgiLCJmaWxsU3R5bGUiLCJnZW9tZXRyeSIsInR5cGUiLCJjb29yZGluYXRlcyIsInRvSlMiLCJmaWxsIiwic3Ryb2tlIiwicG9zaXRpb24iLCJwb2ludGVyRXZlbnRzIiwib3BhY2l0eSIsImxlZnQiLCJ0b3AiLCJwcm9wVHlwZXMiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQW1CQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7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QUFDTnhCLGlCQUFVLEtBQUtnQyxLQUFMLENBQVdoQyxLQUFyQixPQURNO0FBRU5HLGtCQUFXLEtBQUs2QixLQUFMLENBQVc3QixNQUF0QixPQUZNO0FBR040RCxvQkFBVSxVQUhKO0FBSU5DLHlCQUFlLE1BSlQ7QUFLTkMsbUJBQVMsS0FBS2pDLEtBQUwsQ0FBV3RCLGFBTGQ7QUFNTndELGdCQUFNLENBTkE7QUFPTkMsZUFBSztBQVBDLFNBSlYsR0FERjtBQWVEOzs7Ozs7a0JBaEZrQjdDLGlCOzs7QUFtRnJCQSxrQkFBa0I4QyxTQUFsQixHQUE4QnJFLFVBQTlCO0FBQ0F1QixrQkFBa0IrQyxZQUFsQixHQUFpQ2xELGFBQWpDIiwiZmlsZSI6ImNob3JvcGxldGgucmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTUgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cblxuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzLCBDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBWaWV3cG9ydE1lcmNhdG9yIGZyb20gJ3ZpZXdwb3J0LW1lcmNhdG9yLXByb2plY3QnO1xuaW1wb3J0IHdpbmRvdyBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCB7ZXh0ZW50fSBmcm9tICdkMy1hcnJheSc7XG5pbXBvcnQge3NjYWxlTGluZWFyfSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQge2dlb1BhdGgsIGdlb1RyYW5zZm9ybX0gZnJvbSAnZDMtZ2VvJztcbmltcG9ydCBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcblxuY29uc3QgUFJPUF9UWVBFUyA9IHtcbiAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGxhdGl0dWRlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGxvbmdpdHVkZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICB6b29tOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGlzRHJhZ2dpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHJlbmRlcldoaWxlRHJhZ2dpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGdsb2JhbE9wYWNpdHk6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgLyoqXG4gICAgKiBBbiBJbW11dGFibGUgTGlzdCBvZiBmZWF0dXJlIG9iamVjdHMuXG4gICAgKi9cbiAgZmVhdHVyZXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKEltbXV0YWJsZS5MaXN0KSxcbiAgY29sb3JEb21haW46IFByb3BUeXBlcy5hcnJheSxcbiAgY29sb3JSYW5nZTogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gIHZhbHVlQWNjZXNzb3I6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cbmNvbnN0IERFRkFVTFRfUFJPUFMgPSB7XG4gIHJlbmRlcldoaWxlRHJhZ2dpbmc6IHRydWUsXG4gIGdsb2JhbE9wYWNpdHk6IDEsXG4gIGNvbG9yRG9tYWluOiBudWxsLFxuICBjb2xvclJhbmdlOiBbJyNGRkZGRkYnLCAnIzFGQkFENiddLFxuICB2YWx1ZUFjY2Vzc29yKGZlYXR1cmUpIHtcbiAgICByZXR1cm4gZmVhdHVyZS5nZXQoJ3Byb3BlcnRpZXMnKS5nZXQoJ3ZhbHVlJyk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENob3JvcGxldGhPdmVybGF5IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9yZWRyYXcoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLl9yZWRyYXcoKTtcbiAgfVxuXG4gIF9yZWRyYXcoKSB7XG4gICAgY29uc3QgcGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMucmVmcy5vdmVybGF5O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNvbnN0IG1lcmNhdG9yID0gVmlld3BvcnRNZXJjYXRvcih0aGlzLnByb3BzKTtcblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnNjYWxlKHBpeGVsUmF0aW8sIHBpeGVsUmF0aW8pO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5wcm9wcy53aWR0aCwgdGhpcy5wcm9wcy5oZWlnaHQpO1xuXG4gICAgZnVuY3Rpb24gcHJvamVjdFBvaW50KGxvbiwgbGF0KSB7XG4gICAgICBjb25zdCBwb2ludCA9IG1lcmNhdG9yLnByb2plY3QoW2xvbiwgbGF0XSk7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cbiAgICAgIHRoaXMuc3RyZWFtLnBvaW50KHBvaW50WzBdLCBwb2ludFsxXSk7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnJlbmRlcldoaWxlRHJhZ2dpbmcgfHwgIXRoaXMucHJvcHMuaXNEcmFnZ2luZykge1xuICAgICAgY29uc3QgdHJhbnNmb3JtID0gZ2VvVHJhbnNmb3JtKHtwb2ludDogcHJvamVjdFBvaW50fSk7XG4gICAgICBjb25zdCBwYXRoID0gZ2VvUGF0aCgpLnByb2plY3Rpb24odHJhbnNmb3JtKS5jb250ZXh0KGN0eCk7XG4gICAgICB0aGlzLl9kcmF3RmVhdHVyZXMoY3R4LCBwYXRoKTtcbiAgICB9XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIF9kcmF3RmVhdHVyZXMoY3R4LCBwYXRoKSB7XG4gICAgY29uc3Qge2ZlYXR1cmVzfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFmZWF0dXJlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb2xvckRvbWFpbiA9IHRoaXMucHJvcHMuY29sb3JEb21haW4gfHxcbiAgICAgIGV4dGVudChmZWF0dXJlcy50b0FycmF5KCksIHRoaXMucHJvcHMudmFsdWVBY2Nlc3Nvcik7XG5cbiAgICBjb25zdCBjb2xvclNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgICAgLmRvbWFpbihjb2xvckRvbWFpbilcbiAgICAgIC5yYW5nZSh0aGlzLnByb3BzLmNvbG9yUmFuZ2UpXG4gICAgICAuY2xhbXAodHJ1ZSk7XG5cbiAgICBmb3IgKGNvbnN0IGZlYXR1cmUgb2YgZmVhdHVyZXMpIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSknO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9ICcxJztcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvclNjYWxlKHRoaXMucHJvcHMudmFsdWVBY2Nlc3NvcihmZWF0dXJlKSk7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IGZlYXR1cmUuZ2V0KCdnZW9tZXRyeScpO1xuICAgICAgcGF0aCh7XG4gICAgICAgIHR5cGU6IGdlb21ldHJ5LmdldCgndHlwZScpLFxuICAgICAgICBjb29yZGluYXRlczogZ2VvbWV0cnkuZ2V0KCdjb29yZGluYXRlcycpLnRvSlMoKVxuICAgICAgfSk7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBwaXhlbFJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICByZXR1cm4gKFxuICAgICAgPGNhbnZhc1xuICAgICAgICByZWY9XCJvdmVybGF5XCJcbiAgICAgICAgd2lkdGg9eyB0aGlzLnByb3BzLndpZHRoICogcGl4ZWxSYXRpbyB9XG4gICAgICAgIGhlaWdodD17IHRoaXMucHJvcHMuaGVpZ2h0ICogcGl4ZWxSYXRpbyB9XG4gICAgICAgIHN0eWxlPXsge1xuICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnByb3BzLndpZHRofXB4YCxcbiAgICAgICAgICBoZWlnaHQ6IGAke3RoaXMucHJvcHMuaGVpZ2h0fXB4YCxcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICAgICAgb3BhY2l0eTogdGhpcy5wcm9wcy5nbG9iYWxPcGFjaXR5LFxuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgdG9wOiAwXG4gICAgICAgIH0gfS8+XG4gICAgKTtcbiAgfVxufVxuXG5DaG9yb3BsZXRoT3ZlcmxheS5wcm9wVHlwZXMgPSBQUk9QX1RZUEVTO1xuQ2hvcm9wbGV0aE92ZXJsYXkuZGVmYXVsdFByb3BzID0gREVGQVVMVF9QUk9QUztcbiJdfQ==