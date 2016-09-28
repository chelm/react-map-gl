'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
  redraw: _react.PropTypes.func.isRequired,
  project: _react.PropTypes.func.isRequired,
  isDragging: _react.PropTypes.bool.isRequired
  // TODO: style
};

var HTMLOverlay = function (_Component) {
  _inherits(HTMLOverlay, _Component);

  function HTMLOverlay() {
    _classCallCheck(this, HTMLOverlay);

    return _possibleConstructorReturn(this, (HTMLOverlay.__proto__ || Object.getPrototypeOf(HTMLOverlay)).apply(this, arguments));
  }

  _createClass(HTMLOverlay, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var project = _props.project;
      var isDragging = _props.isDragging;

      var style = _extends({
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        width: width,
        height: height
      }, this.props.style);
      return _react2.default.createElement(
        'div',
        { ref: 'overlay', style: style },
        this.props.redraw({ width: width, height: height, project: project, isDragging: isDragging })
      );
    }
  }]);

  return HTMLOverlay;
}(_react.Component);

exports.default = HTMLOverlay;


HTMLOverlay.propTypes = PROP_TYPES;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vdmVybGF5cy9odG1sLnJlYWN0LmpzIl0sIm5hbWVzIjpbIlBST1BfVFlQRVMiLCJ3aWR0aCIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJoZWlnaHQiLCJyZWRyYXciLCJmdW5jIiwicHJvamVjdCIsImlzRHJhZ2dpbmciLCJib29sIiwiSFRNTE92ZXJsYXkiLCJwcm9wcyIsInN0eWxlIiwicG9zaXRpb24iLCJwb2ludGVyRXZlbnRzIiwibGVmdCIsInRvcCIsInByb3BUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7Ozs7Ozs7K2VBcEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlBLElBQU1BLGFBQWE7QUFDakJDLFNBQU8saUJBQVVDLE1BQVYsQ0FBaUJDLFVBRFA7QUFFakJDLFVBQVEsaUJBQVVGLE1BQVYsQ0FBaUJDLFVBRlI7QUFHakJFLFVBQVEsaUJBQVVDLElBQVYsQ0FBZUgsVUFITjtBQUlqQkksV0FBUyxpQkFBVUQsSUFBVixDQUFlSCxVQUpQO0FBS2pCSyxjQUFZLGlCQUFVQyxJQUFWLENBQWVOO0FBQzNCO0FBTmlCLENBQW5COztJQVNxQk8sVzs7Ozs7Ozs7Ozs7NkJBRVY7QUFBQSxtQkFDc0MsS0FBS0MsS0FEM0M7QUFBQSxVQUNBVixLQURBLFVBQ0FBLEtBREE7QUFBQSxVQUNPRyxNQURQLFVBQ09BLE1BRFA7QUFBQSxVQUNlRyxPQURmLFVBQ2VBLE9BRGY7QUFBQSxVQUN3QkMsVUFEeEIsVUFDd0JBLFVBRHhCOztBQUVQLFVBQU1JO0FBQ0pDLGtCQUFVLFVBRE47QUFFSkMsdUJBQWUsTUFGWDtBQUdKQyxjQUFNLENBSEY7QUFJSkMsYUFBSyxDQUpEO0FBS0pmLG9CQUxJO0FBTUpHO0FBTkksU0FPRCxLQUFLTyxLQUFMLENBQVdDLEtBUFYsQ0FBTjtBQVNBLGFBQ0U7QUFBQTtBQUFBLFVBQUssS0FBSSxTQUFULEVBQW1CLE9BQVFBLEtBQTNCO0FBQ0ksYUFBS0QsS0FBTCxDQUFXTixNQUFYLENBQWtCLEVBQUNKLFlBQUQsRUFBUUcsY0FBUixFQUFnQkcsZ0JBQWhCLEVBQXlCQyxzQkFBekIsRUFBbEI7QUFESixPQURGO0FBS0Q7Ozs7OztrQkFsQmtCRSxXOzs7QUFxQnJCQSxZQUFZTyxTQUFaLEdBQXdCakIsVUFBeEIiLCJmaWxlIjoiaHRtbC5yZWFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlcywgQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFBST1BfVFlQRVMgPSB7XG4gIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICByZWRyYXc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHByb2plY3Q6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlzRHJhZ2dpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgLy8gVE9ETzogc3R5bGVcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhUTUxPdmVybGF5IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIHByb2plY3QsIGlzRHJhZ2dpbmd9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgLi4udGhpcy5wcm9wcy5zdHlsZVxuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgcmVmPVwib3ZlcmxheVwiIHN0eWxlPXsgc3R5bGUgfT5cbiAgICAgICAgeyB0aGlzLnByb3BzLnJlZHJhdyh7d2lkdGgsIGhlaWdodCwgcHJvamVjdCwgaXNEcmFnZ2luZ30pIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSFRNTE92ZXJsYXkucHJvcFR5cGVzID0gUFJPUF9UWVBFUztcbiJdfQ==