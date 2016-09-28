'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _svgTransform = require('svg-transform');

var _svgTransform2 = _interopRequireDefault(_svgTransform);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _viewportMercatorProject = require('viewport-mercator-project');

var _viewportMercatorProject2 = _interopRequireDefault(_viewportMercatorProject);

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

function mouse(container, event) {
  var rect = container.getBoundingClientRect();
  var x = event.clientX - rect.left - container.clientLeft;
  var y = event.clientY - rect.top - container.clientTop;
  return [x, y];
}

var PROP_TYPES = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  latitude: _react.PropTypes.number.isRequired,
  longitude: _react.PropTypes.number.isRequired,
  zoom: _react.PropTypes.number.isRequired,
  points: _react.PropTypes.instanceOf(_immutable2.default.List).isRequired,
  isDragging: _react.PropTypes.bool.isRequired,
  keyAccessor: _react.PropTypes.func.isRequired,
  lngLatAccessor: _react.PropTypes.func.isRequired,
  onAddPoint: _react.PropTypes.func.isRequired,
  onUpdatePoint: _react.PropTypes.func.isRequired,
  renderPoint: _react.PropTypes.func.isRequired
};

var DEFAULT_PROPS = {
  keyAccessor: function keyAccessor(point) {
    return point.get('id');
  },
  lngLatAccessor: function lngLatAccessor(point) {
    return point.get('location').toArray();
  },

  onAddPoint: noop,
  onUpdatePoint: noop,
  renderPoint: noop,
  isDragging: false
};

var DraggablePointsOverlay = (_class = function (_Component) {
  _inherits(DraggablePointsOverlay, _Component);

  function DraggablePointsOverlay(props) {
    _classCallCheck(this, DraggablePointsOverlay);

    var _this = _possibleConstructorReturn(this, (DraggablePointsOverlay.__proto__ || Object.getPrototypeOf(DraggablePointsOverlay)).call(this, props));

    _this.state = {
      draggedPointKey: null
    };
    return _this;
  }

  _createClass(DraggablePointsOverlay, [{
    key: '_onDragStart',
    value: function _onDragStart(point, event) {
      event.stopPropagation();
      _document2.default.addEventListener('mousemove', this._onDrag, false);
      _document2.default.addEventListener('mouseup', this._onDragEnd, false);
      this.setState({ draggedPointKey: this.props.keyAccessor(point) });
    }
  }, {
    key: '_onDrag',
    value: function _onDrag(event) {
      event.stopPropagation();
      var pixel = mouse(this.refs.container, event);
      var mercator = (0, _viewportMercatorProject2.default)(this.props);
      var lngLat = mercator.unproject(pixel);
      var key = this.state.draggedPointKey;
      this.props.onUpdatePoint({ key: key, location: lngLat });
    }
  }, {
    key: '_onDragEnd',
    value: function _onDragEnd(event) {
      event.stopPropagation();
      _document2.default.removeEventListener('mousemove', this._onDrag, false);
      _document2.default.removeEventListener('mouseup', this._onDragEnd, false);
      this.setState({ draggedPoint: null });
    }
  }, {
    key: '_addPoint',
    value: function _addPoint(event) {
      event.stopPropagation();
      event.preventDefault();
      var pixel = mouse(this.refs.container, event);
      var mercator = (0, _viewportMercatorProject2.default)(this.props);
      this.props.onAddPoint(mercator.unproject(pixel));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var points = _props.points;
      var width = _props.width;
      var height = _props.height;
      var isDragging = _props.isDragging;
      var style = _props.style;

      var mercator = (0, _viewportMercatorProject2.default)(this.props);
      return _react2.default.createElement(
        'svg',
        {
          ref: 'container',
          width: width,
          height: height,
          style: _extends({
            pointerEvents: 'all',
            position: 'absolute',
            left: 0,
            top: 0,
            cursor: isDragging ? _config2.default.CURSOR.GRABBING : _config2.default.CURSOR.GRAB
          }, style),
          onContextMenu: this._addPoint },
        _react2.default.createElement(
          'g',
          { style: { cursor: 'pointer' } },
          points.map(function (point, index) {
            var pixel = mercator.project(_this2.props.lngLatAccessor(point));
            return _react2.default.createElement(
              'g',
              {
                key: index,
                style: { pointerEvents: 'all' },
                transform: (0, _svgTransform2.default)([{ translate: pixel }]),
                onMouseDown: _this2._onDragStart.bind(_this2, point) },
              _this2.props.renderPoint.call(_this2, point, pixel)
            );
          })
        )
      );
    }
  }]);

  return DraggablePointsOverlay;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, '_onDragStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onDragStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onDrag'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onDragEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onDragEnd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_addPoint', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_addPoint'), _class.prototype)), _class);
exports.default = DraggablePointsOverlay;


DraggablePointsOverlay.propTypes = PROP_TYPES;
DraggablePointsOverlay.defaultProps = DEFAULT_PROPS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vdmVybGF5cy9kcmFnZ2FibGUtcG9pbnRzLnJlYWN0LmpzIl0sIm5hbWVzIjpbIm5vb3AiLCJtb3VzZSIsImNvbnRhaW5lciIsImV2ZW50IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIngiLCJjbGllbnRYIiwibGVmdCIsImNsaWVudExlZnQiLCJ5IiwiY2xpZW50WSIsInRvcCIsImNsaWVudFRvcCIsIlBST1BfVFlQRVMiLCJ3aWR0aCIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJoZWlnaHQiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInpvb20iLCJwb2ludHMiLCJpbnN0YW5jZU9mIiwiTGlzdCIsImlzRHJhZ2dpbmciLCJib29sIiwia2V5QWNjZXNzb3IiLCJmdW5jIiwibG5nTGF0QWNjZXNzb3IiLCJvbkFkZFBvaW50Iiwib25VcGRhdGVQb2ludCIsInJlbmRlclBvaW50IiwiREVGQVVMVF9QUk9QUyIsInBvaW50IiwiZ2V0IiwidG9BcnJheSIsIkRyYWdnYWJsZVBvaW50c092ZXJsYXkiLCJwcm9wcyIsInN0YXRlIiwiZHJhZ2dlZFBvaW50S2V5Iiwic3RvcFByb3BhZ2F0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9vbkRyYWciLCJfb25EcmFnRW5kIiwic2V0U3RhdGUiLCJwaXhlbCIsInJlZnMiLCJtZXJjYXRvciIsImxuZ0xhdCIsInVucHJvamVjdCIsImtleSIsImxvY2F0aW9uIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRyYWdnZWRQb2ludCIsInByZXZlbnREZWZhdWx0Iiwic3R5bGUiLCJwb2ludGVyRXZlbnRzIiwicG9zaXRpb24iLCJjdXJzb3IiLCJDVVJTT1IiLCJHUkFCQklORyIsIkdSQUIiLCJfYWRkUG9pbnQiLCJtYXAiLCJpbmRleCIsInByb2plY3QiLCJ0cmFuc2xhdGUiLCJfb25EcmFnU3RhcnQiLCJiaW5kIiwiY2FsbCIsInByb3BUeXBlcyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6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QUtFK0Msb0JBQVFsQyxhQUFhLGlCQUFPbUMsTUFBUCxDQUFjQyxRQUEzQixHQUFzQyxpQkFBT0QsTUFBUCxDQUFjRTtBQUw5RCxhQU1LTixLQU5MLENBSkY7QUFZRSx5QkFBZ0IsS0FBS08sU0FadkI7QUFjRTtBQUFBO0FBQUEsWUFBRyxPQUFRLEVBQUNKLFFBQVEsU0FBVCxFQUFYO0FBRUVyQyxpQkFBTzBDLEdBQVAsQ0FBVyxVQUFDOUIsS0FBRCxFQUFRK0IsS0FBUixFQUFrQjtBQUMzQixnQkFBTW5CLFFBQVFFLFNBQVNrQixPQUFULENBQWlCLE9BQUs1QixLQUFMLENBQVdULGNBQVgsQ0FBMEJLLEtBQTFCLENBQWpCLENBQWQ7QUFDQSxtQkFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBTStCLEtBRFI7QUFFRSx1QkFBUSxFQUFDUixlQUFlLEtBQWhCLEVBRlY7QUFHRSwyQkFBWSw0QkFBVSxDQUFDLEVBQUNVLFdBQVdyQixLQUFaLEVBQUQsQ0FBVixDQUhkO0FBSUUsNkJBQWMsT0FBS3NCLFlBQUwsQ0FBa0JDLElBQWxCLFNBQTZCbkMsS0FBN0IsQ0FKaEI7QUFNSSxxQkFBS0ksS0FBTCxDQUFXTixXQUFYLENBQXVCc0MsSUFBdkIsU0FBa0NwQyxLQUFsQyxFQUF5Q1ksS0FBekM7QUFOSixhQURGO0FBV0QsV0FiRDtBQUZGO0FBZEYsT0FERjtBQW1DRDs7Ozs7a0JBbEZrQlQsc0I7OztBQXFGckJBLHVCQUF1QmtDLFNBQXZCLEdBQW1DekQsVUFBbkM7QUFDQXVCLHVCQUF1Qm1DLFlBQXZCLEdBQXNDdkMsYUFBdEMiLCJmaWxlIjoiZHJhZ2dhYmxlLXBvaW50cy5yZWFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlcywgQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXV0b2JpbmQgZnJvbSAnYXV0b2JpbmQtZGVjb3JhdG9yJztcblxuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuXG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJ3N2Zy10cmFuc2Zvcm0nO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJ2dsb2JhbC9kb2N1bWVudCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgVmlld3BvcnRNZXJjYXRvciBmcm9tICd2aWV3cG9ydC1tZXJjYXRvci1wcm9qZWN0JztcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIG1vdXNlKGNvbnRhaW5lciwgZXZlbnQpIHtcbiAgY29uc3QgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQgLSBjb250YWluZXIuY2xpZW50TGVmdDtcbiAgY29uc3QgeSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcCAtIGNvbnRhaW5lci5jbGllbnRUb3A7XG4gIHJldHVybiBbeCwgeV07XG59XG5cbmNvbnN0IFBST1BfVFlQRVMgPSB7XG4gIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBsYXRpdHVkZTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBsb25naXR1ZGU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgem9vbTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBwb2ludHM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKEltbXV0YWJsZS5MaXN0KS5pc1JlcXVpcmVkLFxuICBpc0RyYWdnaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBrZXlBY2Nlc3NvcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgbG5nTGF0QWNjZXNzb3I6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQWRkUG9pbnQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uVXBkYXRlUG9pbnQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHJlbmRlclBvaW50OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5jb25zdCBERUZBVUxUX1BST1BTID0ge1xuICBrZXlBY2Nlc3Nvcihwb2ludCkge1xuICAgIHJldHVybiBwb2ludC5nZXQoJ2lkJyk7XG4gIH0sXG4gIGxuZ0xhdEFjY2Vzc29yKHBvaW50KSB7XG4gICAgcmV0dXJuIHBvaW50LmdldCgnbG9jYXRpb24nKS50b0FycmF5KCk7XG4gIH0sXG4gIG9uQWRkUG9pbnQ6IG5vb3AsXG4gIG9uVXBkYXRlUG9pbnQ6IG5vb3AsXG4gIHJlbmRlclBvaW50OiBub29wLFxuICBpc0RyYWdnaW5nOiBmYWxzZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ2dhYmxlUG9pbnRzT3ZlcmxheSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGRyYWdnZWRQb2ludEtleTogbnVsbFxuICAgIH07XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgX29uRHJhZ1N0YXJ0KHBvaW50LCBldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uRHJhZywgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9vbkRyYWdFbmQsIGZhbHNlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnZ2VkUG9pbnRLZXk6IHRoaXMucHJvcHMua2V5QWNjZXNzb3IocG9pbnQpfSk7XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgX29uRHJhZyhldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IHBpeGVsID0gbW91c2UodGhpcy5yZWZzLmNvbnRhaW5lciwgZXZlbnQpO1xuICAgIGNvbnN0IG1lcmNhdG9yID0gVmlld3BvcnRNZXJjYXRvcih0aGlzLnByb3BzKTtcbiAgICBjb25zdCBsbmdMYXQgPSBtZXJjYXRvci51bnByb2plY3QocGl4ZWwpO1xuICAgIGNvbnN0IGtleSA9IHRoaXMuc3RhdGUuZHJhZ2dlZFBvaW50S2V5O1xuICAgIHRoaXMucHJvcHMub25VcGRhdGVQb2ludCh7a2V5LCBsb2NhdGlvbjogbG5nTGF0fSk7XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgX29uRHJhZ0VuZChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uRHJhZywgZmFsc2UpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9vbkRyYWdFbmQsIGZhbHNlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnZ2VkUG9pbnQ6IG51bGx9KTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBfYWRkUG9pbnQoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHBpeGVsID0gbW91c2UodGhpcy5yZWZzLmNvbnRhaW5lciwgZXZlbnQpO1xuICAgIGNvbnN0IG1lcmNhdG9yID0gVmlld3BvcnRNZXJjYXRvcih0aGlzLnByb3BzKTtcbiAgICB0aGlzLnByb3BzLm9uQWRkUG9pbnQobWVyY2F0b3IudW5wcm9qZWN0KHBpeGVsKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3BvaW50cywgd2lkdGgsIGhlaWdodCwgaXNEcmFnZ2luZywgc3R5bGV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtZXJjYXRvciA9IFZpZXdwb3J0TWVyY2F0b3IodGhpcy5wcm9wcyk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzdmdcbiAgICAgICAgcmVmPVwiY29udGFpbmVyXCJcbiAgICAgICAgd2lkdGg9eyB3aWR0aCB9XG4gICAgICAgIGhlaWdodD17IGhlaWdodCB9XG4gICAgICAgIHN0eWxlPXsge1xuICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdhbGwnLFxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgIGN1cnNvcjogaXNEcmFnZ2luZyA/IGNvbmZpZy5DVVJTT1IuR1JBQkJJTkcgOiBjb25maWcuQ1VSU09SLkdSQUIsXG4gICAgICAgICAgLi4uc3R5bGVcbiAgICAgICAgfSB9XG4gICAgICAgIG9uQ29udGV4dE1lbnU9eyB0aGlzLl9hZGRQb2ludCB9PlxuXG4gICAgICAgIDxnIHN0eWxlPXsge2N1cnNvcjogJ3BvaW50ZXInfSB9PlxuICAgICAgICB7XG4gICAgICAgICAgcG9pbnRzLm1hcCgocG9pbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwaXhlbCA9IG1lcmNhdG9yLnByb2plY3QodGhpcy5wcm9wcy5sbmdMYXRBY2Nlc3Nvcihwb2ludCkpO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGdcbiAgICAgICAgICAgICAgICBrZXk9eyBpbmRleCB9XG4gICAgICAgICAgICAgICAgc3R5bGU9eyB7cG9pbnRlckV2ZW50czogJ2FsbCd9IH1cbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm09eyB0cmFuc2Zvcm0oW3t0cmFuc2xhdGU6IHBpeGVsfV0pIH1cbiAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17IHRoaXMuX29uRHJhZ1N0YXJ0LmJpbmQodGhpcywgcG9pbnQpIH0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5yZW5kZXJQb2ludC5jYWxsKHRoaXMsIHBvaW50LCBwaXhlbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICA8L2c+XG4gICAgICA8L3N2Zz5cbiAgICApO1xuICB9XG59XG5cbkRyYWdnYWJsZVBvaW50c092ZXJsYXkucHJvcFR5cGVzID0gUFJPUF9UWVBFUztcbkRyYWdnYWJsZVBvaW50c092ZXJsYXkuZGVmYXVsdFByb3BzID0gREVGQVVMVF9QUk9QUztcbiJdfQ==