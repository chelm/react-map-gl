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

var CanvasOverlay = function (_Component) {
  _inherits(CanvasOverlay, _Component);

  function CanvasOverlay() {
    _classCallCheck(this, CanvasOverlay);

    return _possibleConstructorReturn(this, (CanvasOverlay.__proto__ || Object.getPrototypeOf(CanvasOverlay)).apply(this, arguments));
  }

  _createClass(CanvasOverlay, [{
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
      var pixelRatio = _window2.default.devicePixelRatio || 1;
      var canvas = this.refs.overlay;
      var ctx = canvas.getContext('2d');
      ctx.save();
      ctx.scale(pixelRatio, pixelRatio);
      var mercator = (0, _viewportMercatorProject2.default)(this.props);
      this.props.redraw({
        width: this.props.width,
        height: this.props.height,
        ctx: ctx,
        project: mercator.project,
        unproject: mercator.unproject,
        isDragging: this.props.isDragging
      });
      ctx.restore();
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
          left: 0,
          top: 0
        } });
    }
  }]);

  return CanvasOverlay;
}(_react.Component);

exports.default = CanvasOverlay;


CanvasOverlay.propTypes = PROP_TYPES;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vdmVybGF5cy9jYW52YXMucmVhY3QuanMiXSwibmFtZXMiOlsiUFJPUF9UWVBFUyIsIndpZHRoIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImhlaWdodCIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiem9vbSIsInJlZHJhdyIsImZ1bmMiLCJpc0RyYWdnaW5nIiwiYm9vbCIsIkNhbnZhc092ZXJsYXkiLCJfcmVkcmF3IiwicGl4ZWxSYXRpbyIsImRldmljZVBpeGVsUmF0aW8iLCJjYW52YXMiLCJyZWZzIiwib3ZlcmxheSIsImN0eCIsImdldENvbnRleHQiLCJzYXZlIiwic2NhbGUiLCJtZXJjYXRvciIsInByb3BzIiwicHJvamVjdCIsInVucHJvamVjdCIsInJlc3RvcmUiLCJwb3NpdGlvbiIsInBvaW50ZXJFdmVudHMiLCJsZWZ0IiwidG9wIiwicHJvcFR5cGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQXRCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFNQSxJQUFNQSxhQUFhO0FBQ2pCQyxTQUFPLGlCQUFVQyxNQUFWLENBQWlCQyxVQURQO0FBRWpCQyxVQUFRLGlCQUFVRixNQUFWLENBQWlCQyxVQUZSO0FBR2pCRSxZQUFVLGlCQUFVSCxNQUFWLENBQWlCQyxVQUhWO0FBSWpCRyxhQUFXLGlCQUFVSixNQUFWLENBQWlCQyxVQUpYO0FBS2pCSSxRQUFNLGlCQUFVTCxNQUFWLENBQWlCQyxVQUxOO0FBTWpCSyxVQUFRLGlCQUFVQyxJQUFWLENBQWVOLFVBTk47QUFPakJPLGNBQVksaUJBQVVDLElBQVYsQ0FBZVI7QUFQVixDQUFuQjs7SUFVcUJTLGE7Ozs7Ozs7Ozs7O3dDQUVDO0FBQ2xCLFdBQUtDLE9BQUw7QUFDRDs7O3lDQUVvQjtBQUNuQixXQUFLQSxPQUFMO0FBQ0Q7Ozs4QkFFUztBQUNSLFVBQU1DLGFBQWEsaUJBQU9DLGdCQUFQLElBQTJCLENBQTlDO0FBQ0EsVUFBTUMsU0FBUyxLQUFLQyxJQUFMLENBQVVDLE9BQXpCO0FBQ0EsVUFBTUMsTUFBTUgsT0FBT0ksVUFBUCxDQUFrQixJQUFsQixDQUFaO0FBQ0FELFVBQUlFLElBQUo7QUFDQUYsVUFBSUcsS0FBSixDQUFVUixVQUFWLEVBQXNCQSxVQUF0QjtBQUNBLFVBQU1TLFdBQVcsdUNBQWlCLEtBQUtDLEtBQXRCLENBQWpCO0FBQ0EsV0FBS0EsS0FBTCxDQUFXaEIsTUFBWCxDQUFrQjtBQUNoQlAsZUFBTyxLQUFLdUIsS0FBTCxDQUFXdkIsS0FERjtBQUVoQkcsZ0JBQVEsS0FBS29CLEtBQUwsQ0FBV3BCLE1BRkg7QUFHaEJlLGdCQUhnQjtBQUloQk0saUJBQVNGLFNBQVNFLE9BSkY7QUFLaEJDLG1CQUFXSCxTQUFTRyxTQUxKO0FBTWhCaEIsb0JBQVksS0FBS2MsS0FBTCxDQUFXZDtBQU5QLE9BQWxCO0FBUUFTLFVBQUlRLE9BQUo7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBTWIsYUFBYSxpQkFBT0MsZ0JBQVAsSUFBMkIsQ0FBOUM7QUFDQSxhQUNFO0FBQ0UsYUFBSSxTQUROO0FBRUUsZUFBUSxLQUFLUyxLQUFMLENBQVd2QixLQUFYLEdBQW1CYSxVQUY3QjtBQUdFLGdCQUFTLEtBQUtVLEtBQUwsQ0FBV3BCLE1BQVgsR0FBb0JVLFVBSC9CO0FBSUUsZUFBUTtBQUNOYixpQkFBVSxLQUFLdUIsS0FBTCxDQUFXdkIsS0FBckIsT0FETTtBQUVORyxrQkFBVyxLQUFLb0IsS0FBTCxDQUFXcEIsTUFBdEIsT0FGTTtBQUdOd0Isb0JBQVUsVUFISjtBQUlOQyx5QkFBZSxNQUpUO0FBS05DLGdCQUFNLENBTEE7QUFNTkMsZUFBSztBQU5DLFNBSlYsR0FERjtBQWNEOzs7Ozs7a0JBNUNrQm5CLGE7OztBQStDckJBLGNBQWNvQixTQUFkLEdBQTBCaEMsVUFBMUIiLCJmaWxlIjoiY2FudmFzLnJlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE1IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG5cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzLCBDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBWaWV3cG9ydE1lcmNhdG9yIGZyb20gJ3ZpZXdwb3J0LW1lcmNhdG9yLXByb2plY3QnO1xuaW1wb3J0IHdpbmRvdyBmcm9tICdnbG9iYWwvd2luZG93JztcblxuY29uc3QgUFJPUF9UWVBFUyA9IHtcbiAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGxhdGl0dWRlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGxvbmdpdHVkZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICB6b29tOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIHJlZHJhdzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaXNEcmFnZ2luZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzT3ZlcmxheSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fcmVkcmF3KCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5fcmVkcmF3KCk7XG4gIH1cblxuICBfcmVkcmF3KCkge1xuICAgIGNvbnN0IHBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMucmVmcy5vdmVybGF5O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnNjYWxlKHBpeGVsUmF0aW8sIHBpeGVsUmF0aW8pO1xuICAgIGNvbnN0IG1lcmNhdG9yID0gVmlld3BvcnRNZXJjYXRvcih0aGlzLnByb3BzKTtcbiAgICB0aGlzLnByb3BzLnJlZHJhdyh7XG4gICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgICBjdHgsXG4gICAgICBwcm9qZWN0OiBtZXJjYXRvci5wcm9qZWN0LFxuICAgICAgdW5wcm9qZWN0OiBtZXJjYXRvci51bnByb2plY3QsXG4gICAgICBpc0RyYWdnaW5nOiB0aGlzLnByb3BzLmlzRHJhZ2dpbmdcbiAgICB9KTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIHJldHVybiAoXG4gICAgICA8Y2FudmFzXG4gICAgICAgIHJlZj1cIm92ZXJsYXlcIlxuICAgICAgICB3aWR0aD17IHRoaXMucHJvcHMud2lkdGggKiBwaXhlbFJhdGlvIH1cbiAgICAgICAgaGVpZ2h0PXsgdGhpcy5wcm9wcy5oZWlnaHQgKiBwaXhlbFJhdGlvIH1cbiAgICAgICAgc3R5bGU9eyB7XG4gICAgICAgICAgd2lkdGg6IGAke3RoaXMucHJvcHMud2lkdGh9cHhgLFxuICAgICAgICAgIGhlaWdodDogYCR7dGhpcy5wcm9wcy5oZWlnaHR9cHhgLFxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgIHRvcDogMFxuICAgICAgICB9IH0vPlxuICAgICk7XG4gIH1cbn1cblxuQ2FudmFzT3ZlcmxheS5wcm9wVHlwZXMgPSBQUk9QX1RZUEVTO1xuIl19