webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(176);


/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	// use jsx to render html, do not modify simple.html
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(177);
	
	var _rcAntdStar = __webpack_require__(3);
	
	var _rcAntdStar2 = _interopRequireDefault(_rcAntdStar);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(173);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var ExtendStar = _react2['default'].createClass({
	  displayName: 'ExtendStar',
	
	  getInitialState: function getInitialState() {
	    return {
	      num: 3.5
	    };
	  },
	  hoverHandler: function hoverHandler(event, num) {
	    this.setState({
	      num: num
	    });
	  },
	  render: function render() {
	    var hover = this.hoverHandler;
	    return _react2['default'].createElement(
	      'div',
	      { className: 'extend-starbar' },
	      _react2['default'].createElement(_rcAntdStar2['default'], { prefixCls: 'extend', hover: hover }),
	      _react2['default'].createElement(
	        'div',
	        { className: 'warn-info' },
	        ' ',
	        this.state.num,
	        ' '
	      ),
	      ' '
	    );
	  }
	});
	
	_reactDom2['default'].render(_react2['default'].createElement(ExtendStar, null), document.getElementById('__react-content'));

/***/ },

/***/ 177:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=extend_star.js.map