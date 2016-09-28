'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var PROP_TYPES = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  latitude: _react.PropTypes.number.isRequired,
  longitude: _react.PropTypes.number.isRequired,
  zoom: _react.PropTypes.number.isRequired,
  redraw: _react.PropTypes.func.isRequired,
  isDragging: _react.PropTypes.bool.isRequired
};

var SVGOverlay = function (_Component) {
  _inherits(SVGOverlay, _Component);

  function SVGOverlay() {
    _classCallCheck(this, SVGOverlay);

    return _possibleConstructorReturn(this, (SVGOverlay.__proto__ || Object.getPrototypeOf(SVGOverlay)).apply(this, arguments));
  }

  _createClass(SVGOverlay, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var isDragging = _props.isDragging;

      var style = _extends({
        pointerEvents: 'none',
        position: 'absolute',
        left: 0,
        top: 0
      }, this.props.style);
      var mercator = (0, _viewportMercatorProject2.default)(this.props);
      var project = mercator.project;
      var unproject = mercator.unproject;


      return _react2.default.createElement(
        'svg',
        {
          ref: 'overlay',
          width: width,
          height: height,
          style: style },
        this.props.redraw({ width: width, height: height, project: project, unproject: unproject, isDragging: isDragging })
      );
    }
  }]);

  return SVGOverlay;
}(_react.Component);

exports.default = SVGOverlay;


SVGOverlay.propTypes = PROP_TYPES;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vdmVybGF5cy9zdmcucmVhY3QuanMiXSwibmFtZXMiOlsiUFJPUF9UWVBFUyIsIndpZHRoIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImhlaWdodCIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiem9vbSIsInJlZHJhdyIsImZ1bmMiLCJpc0RyYWdnaW5nIiwiYm9vbCIsIlNWR092ZXJsYXkiLCJwcm9wcyIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsInBvc2l0aW9uIiwibGVmdCIsInRvcCIsIm1lcmNhdG9yIiwicHJvamVjdCIsInVucHJvamVjdCIsInByb3BUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFyQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0EsSUFBTUEsYUFBYTtBQUNqQkMsU0FBTyxpQkFBVUMsTUFBVixDQUFpQkMsVUFEUDtBQUVqQkMsVUFBUSxpQkFBVUYsTUFBVixDQUFpQkMsVUFGUjtBQUdqQkUsWUFBVSxpQkFBVUgsTUFBVixDQUFpQkMsVUFIVjtBQUlqQkcsYUFBVyxpQkFBVUosTUFBVixDQUFpQkMsVUFKWDtBQUtqQkksUUFBTSxpQkFBVUwsTUFBVixDQUFpQkMsVUFMTjtBQU1qQkssVUFBUSxpQkFBVUMsSUFBVixDQUFlTixVQU5OO0FBT2pCTyxjQUFZLGlCQUFVQyxJQUFWLENBQWVSO0FBUFYsQ0FBbkI7O0lBVXFCUyxVOzs7Ozs7Ozs7Ozs2QkFDVjtBQUFBLG1CQUM2QixLQUFLQyxLQURsQztBQUFBLFVBQ0FaLEtBREEsVUFDQUEsS0FEQTtBQUFBLFVBQ09HLE1BRFAsVUFDT0EsTUFEUDtBQUFBLFVBQ2VNLFVBRGYsVUFDZUEsVUFEZjs7QUFFUCxVQUFNSTtBQUNKQyx1QkFBZSxNQURYO0FBRUpDLGtCQUFVLFVBRk47QUFHSkMsY0FBTSxDQUhGO0FBSUpDLGFBQUs7QUFKRCxTQUtELEtBQUtMLEtBQUwsQ0FBV0MsS0FMVixDQUFOO0FBT0EsVUFBTUssV0FBVyx1Q0FBaUIsS0FBS04sS0FBdEIsQ0FBakI7QUFUTyxVQVVBTyxPQVZBLEdBVXNCRCxRQVZ0QixDQVVBQyxPQVZBO0FBQUEsVUFVU0MsU0FWVCxHQVVzQkYsUUFWdEIsQ0FVU0UsU0FWVDs7O0FBWVAsYUFDRTtBQUFBO0FBQUE7QUFDRSxlQUFJLFNBRE47QUFFRSxpQkFBUXBCLEtBRlY7QUFHRSxrQkFBU0csTUFIWDtBQUlFLGlCQUFRVSxLQUpWO0FBTUksYUFBS0QsS0FBTCxDQUFXTCxNQUFYLENBQWtCLEVBQUNQLFlBQUQsRUFBUUcsY0FBUixFQUFnQmdCLGdCQUFoQixFQUF5QkMsb0JBQXpCLEVBQW9DWCxzQkFBcEMsRUFBbEI7QUFOSixPQURGO0FBV0Q7Ozs7OztrQkF4QmtCRSxVOzs7QUEyQnJCQSxXQUFXVSxTQUFYLEdBQXVCdEIsVUFBdkIiLCJmaWxlIjoic3ZnLnJlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE1IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG5cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzLCBDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBWaWV3cG9ydE1lcmNhdG9yIGZyb20gJ3ZpZXdwb3J0LW1lcmNhdG9yLXByb2plY3QnO1xuXG5jb25zdCBQUk9QX1RZUEVTID0ge1xuICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgbGF0aXR1ZGU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgbG9uZ2l0dWRlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIHpvb206IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgcmVkcmF3OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpc0RyYWdnaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTVkdPdmVybGF5IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBpc0RyYWdnaW5nfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgICAuLi50aGlzLnByb3BzLnN0eWxlXG4gICAgfTtcbiAgICBjb25zdCBtZXJjYXRvciA9IFZpZXdwb3J0TWVyY2F0b3IodGhpcy5wcm9wcyk7XG4gICAgY29uc3Qge3Byb2plY3QsIHVucHJvamVjdH0gPSBtZXJjYXRvcjtcblxuICAgIHJldHVybiAoXG4gICAgICA8c3ZnXG4gICAgICAgIHJlZj1cIm92ZXJsYXlcIlxuICAgICAgICB3aWR0aD17IHdpZHRoIH1cbiAgICAgICAgaGVpZ2h0PXsgaGVpZ2h0IH1cbiAgICAgICAgc3R5bGU9eyBzdHlsZSB9PlxuXG4gICAgICAgIHsgdGhpcy5wcm9wcy5yZWRyYXcoe3dpZHRoLCBoZWlnaHQsIHByb2plY3QsIHVucHJvamVjdCwgaXNEcmFnZ2luZ30pIH1cblxuICAgICAgPC9zdmc+XG4gICAgKTtcbiAgfVxufVxuXG5TVkdPdmVybGF5LnByb3BUeXBlcyA9IFBST1BfVFlQRVM7XG5cbiJdfQ==