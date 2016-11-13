/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _app = __webpack_require__(1);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == name + '=') {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
	
	$(function () {
	    $.ajaxSetup({
	        headers: { "X-CSRFToken": getCookie("csrftoken") }
	    });
	});
	
	window.ee = new EventEmitter();
	
	ReactDOM.render(React.createElement(_app2.default, null), document.getElementById('root'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.App = undefined;
	
	var _news = __webpack_require__(2);
	
	var _news2 = _interopRequireDefault(_news);
	
	var _add = __webpack_require__(4);
	
	var _add2 = _interopRequireDefault(_add);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app_render_interval;
	var timeout = 5000;
	
	var App = exports.App = React.createClass({
	  getInitialState: function getInitialState() {
	    return {
	      news: []
	    };
	  },
	  fetchData: function fetchData() {
	    var self = this;
	    fetch('/router/posts').then(function (response) {
	      response.json().then(function (data) {
	        self.setState({ news: data });
	      });
	    }).catch(function (err) {
	      console.log('Error', err);
	    });
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.fetchData();
	
	    var self = this;
	    app_render_interval = setTimeout(function fetch_news() {
	      self.fetchData();
	      app_render_interval = setTimeout(fetch_news, timeout);
	    }, timeout);
	
	    window.ee.addListener('add_news', function () {
	      self.fetchData();
	      console.log('I am in add_news');
	    });
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    clearInterval(app_render_interval);
	    window.ee.removeListener('add_news');
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'app' },
	      React.createElement(_add2.default, null),
	      React.createElement(
	        'h3',
	        null,
	        '\u041D\u043E\u0432\u043E\u0441\u0442\u0438'
	      ),
	      React.createElement(_news2.default, { data: this.state.news })
	    );
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.News = undefined;
	
	var _article = __webpack_require__(3);
	
	var _article2 = _interopRequireDefault(_article);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var News = exports.News = React.createClass({
	  propTypes: {
	    data: React.PropTypes.array.isRequired
	  },
	  render: function render() {
	    var data = this.props.data;
	    var newsTemplate;
	
	    if (data.length > 0) {
	      newsTemplate = data.map(function (item, index) {
	        return React.createElement(
	          'div',
	          { key: index },
	          React.createElement(_article2.default, { data: item })
	        );
	      });
	    } else {
	      newsTemplate = React.createElement(
	        'p',
	        null,
	        '\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u043D\u043E\u0432\u043E\u0441\u0442\u0435\u0439 \u043D\u0435\u0442'
	      );
	    }
	
	    return React.createElement(
	      'div',
	      { className: 'news' },
	      newsTemplate
	    );
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Article = exports.Article = React.createClass({
	  propTypes: {
	    data: React.PropTypes.shape({
	      text: React.PropTypes.string.isRequired,
	      title: React.PropTypes.string.isRequired
	    })
	  },
	  render: function render() {
	    var title = this.props.data.title,
	        text = this.props.data.text;
	
	    return React.createElement(
	      'div',
	      { className: 'article' },
	      React.createElement(
	        'div',
	        { className: 'news_author' },
	        ' ',
	        React.createElement(
	          'a',
	          { href: '#' },
	          '\u041F\u0435\u0442\u044F'
	        ),
	        ' '
	      ),
	      React.createElement(
	        'div',
	        { className: 'news_title' },
	        React.createElement(
	          'p',
	          null,
	          title
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'news_text' },
	        text
	      )
	    );
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var Add = exports.Add = React.createClass({
	  getInitialState: function getInitialState() {
	    return {
	      titleIsEmpty: true,
	      textIsEmpty: true
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    ReactDOM.findDOMNode(this.refs.title).focus();
	  },
	  onBtnClickHandler: function onBtnClickHandler(e) {
	    e.preventDefault();
	    var textEl = ReactDOM.findDOMNode(this.refs.text);
	    var text = textEl.value;
	    var titleEl = ReactDOM.findDOMNode(this.refs.title);
	    var title = titleEl.value;
	
	    var item = [{
	      "title": title,
	      "text": text
	    }];
	
	    $.ajax({
	      url: '../router/posts/',
	      dataType: 'json',
	      method: 'POST',
	      data: item[0],
	      success: function (data) {
	        //console.log('all is good, data =  ', data);
	        window.ee.emit('add_news');
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.log('status: ' + status);
	        console.log('err: ' + err);
	        console.log(xhr);
	      }.bind(this)
	    });
	
	    textEl.value = '';
	    titleEl.value = '';
	    this.setState({ textIsEmpty: true, titleIsEmpty: true });
	  },
	  onFieldChange: function onFieldChange(fieldName, e) {
	    if (e.target.value.trim().length > 0) {
	      this.setState(_defineProperty({}, '' + fieldName, false));
	    } else {
	      this.setState(_defineProperty({}, '' + fieldName, true));
	    }
	  },
	  render: function render() {
	    var titleIsEmpty = this.state.titleIsEmpty,
	        textIsEmpty = this.state.textIsEmpty;
	    return React.createElement(
	      "form",
	      { className: "add cf" },
	      React.createElement("input", {
	        type: "text",
	        className: "add_title form-control",
	        onChange: this.onFieldChange.bind(this, 'titleIsEmpty'),
	        placeholder: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
	        ref: "title"
	      }),
	      React.createElement("textarea", {
	        className: "add_text form-control",
	        onChange: this.onFieldChange.bind(this, 'textIsEmpty'),
	        placeholder: "\u0422\u0435\u043A\u0441\u0442 \u043D\u043E\u0432\u043E\u0441\u0442\u0438",
	        ref: "text"
	      }),
	      React.createElement(
	        "button",
	        { className: "add_btn btn btn-primary btn-lg",
	          onClick: this.onBtnClickHandler,
	          ref: "alert_button",
	          disabled: titleIsEmpty || textIsEmpty },
	        "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u044C"
	      )
	    );
	  }
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODU3MzFjZDg1NDcxYWYzNTJkOTQiLCJ3ZWJwYWNrOi8vLy4vZmVlZC9mZWVkLmpzIiwid2VicGFjazovLy8uL2ZlZWQvYXBwLmpzIiwid2VicGFjazovLy8uL2ZlZWQvbmV3cy5qcyIsIndlYnBhY2s6Ly8vLi9mZWVkL2FydGljbGUuanMiLCJ3ZWJwYWNrOi8vLy4vZmVlZC9hZGQuanMiXSwibmFtZXMiOlsiZ2V0Q29va2llIiwibmFtZSIsImNvb2tpZVZhbHVlIiwiZG9jdW1lbnQiLCJjb29raWUiLCJjb29raWVzIiwic3BsaXQiLCJpIiwibGVuZ3RoIiwialF1ZXJ5IiwidHJpbSIsInN1YnN0cmluZyIsImRlY29kZVVSSUNvbXBvbmVudCIsIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwid2luZG93IiwiZWUiLCJFdmVudEVtaXR0ZXIiLCJSZWFjdERPTSIsInJlbmRlciIsImdldEVsZW1lbnRCeUlkIiwiYXBwX3JlbmRlcl9pbnRlcnZhbCIsInRpbWVvdXQiLCJBcHAiLCJSZWFjdCIsImNyZWF0ZUNsYXNzIiwiZ2V0SW5pdGlhbFN0YXRlIiwibmV3cyIsImZldGNoRGF0YSIsInNlbGYiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwic2V0U3RhdGUiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJjb21wb25lbnREaWRNb3VudCIsInNldFRpbWVvdXQiLCJmZXRjaF9uZXdzIiwiYWRkTGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNsZWFySW50ZXJ2YWwiLCJyZW1vdmVMaXN0ZW5lciIsInN0YXRlIiwiTmV3cyIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5IiwiaXNSZXF1aXJlZCIsInByb3BzIiwibmV3c1RlbXBsYXRlIiwibWFwIiwiaXRlbSIsImluZGV4IiwiQXJ0aWNsZSIsInNoYXBlIiwidGV4dCIsInN0cmluZyIsInRpdGxlIiwiQWRkIiwidGl0bGVJc0VtcHR5IiwidGV4dElzRW1wdHkiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJmb2N1cyIsIm9uQnRuQ2xpY2tIYW5kbGVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGV4dEVsIiwidmFsdWUiLCJ0aXRsZUVsIiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwibWV0aG9kIiwic3VjY2VzcyIsImVtaXQiLCJiaW5kIiwiZXJyb3IiLCJ4aHIiLCJzdGF0dXMiLCJvbkZpZWxkQ2hhbmdlIiwiZmllbGROYW1lIiwidGFyZ2V0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUFFQTs7Ozs7O0FBRUEsVUFBU0EsU0FBVCxDQUFtQkMsSUFBbkIsRUFBeUI7QUFDckIsU0FBSUMsY0FBYyxJQUFsQjtBQUNBLFNBQUlDLFNBQVNDLE1BQVQsSUFBbUJELFNBQVNDLE1BQVQsSUFBbUIsRUFBMUMsRUFBOEM7QUFDMUMsYUFBSUMsVUFBVUYsU0FBU0MsTUFBVCxDQUFnQkUsS0FBaEIsQ0FBc0IsR0FBdEIsQ0FBZDtBQUNBLGNBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixRQUFRRyxNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7QUFDckMsaUJBQUlILFNBQVNLLE9BQU9DLElBQVAsQ0FBWUwsUUFBUUUsQ0FBUixDQUFaLENBQWI7QUFDQTtBQUNBLGlCQUFJSCxPQUFPTyxTQUFQLENBQWlCLENBQWpCLEVBQW9CVixLQUFLTyxNQUFMLEdBQWMsQ0FBbEMsS0FBeUNQLE9BQU8sR0FBcEQsRUFBMEQ7QUFDdERDLCtCQUFjVSxtQkFBbUJSLE9BQU9PLFNBQVAsQ0FBaUJWLEtBQUtPLE1BQUwsR0FBYyxDQUEvQixD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aUIsTUFBRixDQUFTZCxLQUFULENBQWVoRSxJQUFmLEdBQXNCRixNQUF0QixHQUErQixDQUFuQyxFQUFzQztBQUNwQyxZQUFLNEIsUUFBTCxxQkFBZ0IsS0FBR21ELFNBQW5CLEVBQThCLEtBQTlCO0FBQ0QsTUFGRCxNQUVPO0FBQ0wsWUFBS25ELFFBQUwscUJBQWdCLEtBQUdtRCxTQUFuQixFQUE4QixJQUE5QjtBQUNEO0FBQ0YsSUFoRGdDO0FBaURqQ25FLFdBQVEsa0JBQVc7QUFDakIsU0FBSTZDLGVBQWUsS0FBS2pCLEtBQUwsQ0FBV2lCLFlBQTlCO0FBQUEsU0FDSUMsY0FBYyxLQUFLbEIsS0FBTCxDQUFXa0IsV0FEN0I7QUFFQSxZQUNFO0FBQUE7QUFBQSxTQUFNLFdBQVUsUUFBaEI7QUFDRTtBQUNFLGVBQUssTUFEUDtBQUVFLG9CQUFVLHdCQUZaO0FBR0UsbUJBQVUsS0FBS29CLGFBQUwsQ0FBbUJKLElBQW5CLENBQXdCLElBQXhCLEVBQThCLGNBQTlCLENBSFo7QUFJRSxzQkFBWSx3REFKZDtBQUtFLGNBQUk7QUFMTixTQURGO0FBUUU7QUFDRSxvQkFBVSx1QkFEWjtBQUVFLG1CQUFVLEtBQUtJLGFBQUwsQ0FBbUJKLElBQW5CLENBQXdCLElBQXhCLEVBQThCLGFBQTlCLENBRlo7QUFHRSxzQkFBWSwyRUFIZDtBQUlFLGNBQUk7QUFKTixTQVJGO0FBZUU7QUFBQTtBQUFBLFdBQVEsV0FBVSxnQ0FBbEI7QUFDUSxvQkFBUyxLQUFLWixpQkFEdEI7QUFFUSxnQkFBSSxjQUZaO0FBR1EscUJBQVVMLGdCQUFnQkMsV0FIbEM7QUFBQTtBQUFBO0FBZkYsTUFERjtBQXdCRDtBQTVFZ0MsRUFBbEIsQ0FBVixDIiwiZmlsZSI6ImZlZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4NTczMWNkODU0NzFhZjM1MmQ5NCIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcblxuZnVuY3Rpb24gZ2V0Q29va2llKG5hbWUpIHtcbiAgICB2YXIgY29va2llVmFsdWUgPSBudWxsO1xuICAgIGlmIChkb2N1bWVudC5jb29raWUgJiYgZG9jdW1lbnQuY29va2llICE9ICcnKSB7XG4gICAgICAgIHZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNvb2tpZSA9IGpRdWVyeS50cmltKGNvb2tpZXNbaV0pO1xuICAgICAgICAgICAgLy8gRG9lcyB0aGlzIGNvb2tpZSBzdHJpbmcgYmVnaW4gd2l0aCB0aGUgbmFtZSB3ZSB3YW50P1xuICAgICAgICAgICAgaWYgKGNvb2tpZS5zdWJzdHJpbmcoMCwgbmFtZS5sZW5ndGggKyAxKSA9PSAobmFtZSArICc9JykpIHtcbiAgICAgICAgICAgICAgICBjb29raWVWYWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudChjb29raWUuc3Vic3RyaW5nKG5hbWUubGVuZ3RoICsgMSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb29raWVWYWx1ZTtcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgJC5hamF4U2V0dXAoe1xuICAgICAgICBoZWFkZXJzOiB7IFwiWC1DU1JGVG9rZW5cIjogZ2V0Q29va2llKFwiY3NyZnRva2VuXCIpIH1cbiAgICB9KTtcbn0pO1xuXG53aW5kb3cuZWUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblJlYWN0RE9NLnJlbmRlcihcbiAgPEFwcCAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2ZlZWQvZmVlZC5qcyIsInZhciBhcHBfcmVuZGVyX2ludGVydmFsO1xudmFyIHRpbWVvdXQgPSA1MDAwO1xuXG5pbXBvcnQgTmV3cyBmcm9tICcuL25ld3MnO1xuaW1wb3J0IEFkZCBmcm9tICcuL2FkZCc7XG5cbmV4cG9ydCBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuZXdzOiBbXVxuICAgIH07XG4gIH0sXG4gIGZldGNoRGF0YSgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZmV0Y2goJy9yb3V0ZXIvcG9zdHMnKS50aGVuKCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7bmV3czogZGF0YX0pO1xuICAgICAgfSlcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3InLCBlcnIpXG4gICAgfSk7XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmZldGNoRGF0YSgpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGFwcF9yZW5kZXJfaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIGZldGNoX25ld3MoKSB7XG4gICAgICBzZWxmLmZldGNoRGF0YSgpO1xuICAgICAgYXBwX3JlbmRlcl9pbnRlcnZhbCA9IHNldFRpbWVvdXQoZmV0Y2hfbmV3cywgdGltZW91dCk7XG4gICAgfSwgdGltZW91dCk7XG5cbiAgICB3aW5kb3cuZWUuYWRkTGlzdGVuZXIoJ2FkZF9uZXdzJywgZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLmZldGNoRGF0YSgpO1xuICAgICAgY29uc29sZS5sb2coJ0kgYW0gaW4gYWRkX25ld3MnKTtcbiAgICB9KTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIGNsZWFySW50ZXJ2YWwoYXBwX3JlbmRlcl9pbnRlcnZhbCk7XG4gICAgd2luZG93LmVlLnJlbW92ZUxpc3RlbmVyKCdhZGRfbmV3cycpXG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdhcHAnPlxuICAgICAgICA8QWRkIC8+XG4gICAgICAgIDxoMz7QndC+0LLQvtGB0YLQuDwvaDM+XG4gICAgICAgIDxOZXdzIGRhdGE9e3RoaXMuc3RhdGUubmV3c30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2ZlZWQvYXBwLmpzIiwiaW1wb3J0IEFydGljbGUgZnJvbSAnLi9hcnRpY2xlJztcblxuZXhwb3J0IGxldCBOZXdzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBwcm9wVHlwZXM6IHtcbiAgICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5wcm9wcy5kYXRhO1xuICAgIHZhciBuZXdzVGVtcGxhdGU7XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICBuZXdzVGVtcGxhdGUgPSBkYXRhLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0+XG4gICAgICAgICAgICA8QXJ0aWNsZSBkYXRhPXtpdGVtfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdzVGVtcGxhdGUgPSA8cD7QmiDRgdC+0LbQsNC70LXQvdC40Y4sINC90L7QstC+0YHRgtC10Lkg0L3QtdGCPC9wPlxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nbmV3cyc+XG4gICAgICAgIHtuZXdzVGVtcGxhdGV9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mZWVkL25ld3MuanMiLCJleHBvcnQgbGV0IEFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHByb3BUeXBlczoge1xuICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICB0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG4gICAgfSlcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGl0bGUgPSB0aGlzLnByb3BzLmRhdGEudGl0bGUsXG4gICAgICAgIHRleHQgPSB0aGlzLnByb3BzLmRhdGEudGV4dDtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nYXJ0aWNsZSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSduZXdzX2F1dGhvcic+IDxhIGhyZWY9XCIjXCI+0J/QtdGC0Y88L2E+IDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmV3c190aXRsZSc+XG4gICAgICAgICAgPHA+e3RpdGxlfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSduZXdzX3RleHQnPnt0ZXh0fTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mZWVkL2FydGljbGUuanMiLCJleHBvcnQgbGV0IEFkZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGVJc0VtcHR5OiB0cnVlLFxuICAgICAgdGV4dElzRW1wdHk6IHRydWVcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnRpdGxlKS5mb2N1cygpO1xuICB9LFxuICBvbkJ0bkNsaWNrSGFuZGxlcjogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdGV4dEVsID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnRleHQpO1xuICAgIHZhciB0ZXh0ID0gdGV4dEVsLnZhbHVlO1xuICAgIHZhciB0aXRsZUVsID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnRpdGxlKTtcbiAgICB2YXIgdGl0bGUgPSB0aXRsZUVsLnZhbHVlO1xuXG4gICAgdmFyIGl0ZW0gPSBbe1xuICAgICAgXCJ0aXRsZVwiOiB0aXRsZSxcbiAgICAgIFwidGV4dFwiOiB0ZXh0XG4gICAgfV07XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnLi4vcm91dGVyL3Bvc3RzLycsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBkYXRhOiBpdGVtWzBdLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdhbGwgaXMgZ29vZCwgZGF0YSA9ICAnLCBkYXRhKTtcbiAgICAgICAgd2luZG93LmVlLmVtaXQoJ2FkZF9uZXdzJyk7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnc3RhdHVzOiAnICsgc3RhdHVzKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2VycjogJyArIGVycik7XG4gICAgICAgIGNvbnNvbGUubG9nKHhocik7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcblxuICAgIHRleHRFbC52YWx1ZSA9ICcnO1xuICAgIHRpdGxlRWwudmFsdWUgPSAnJztcbiAgICB0aGlzLnNldFN0YXRlKHt0ZXh0SXNFbXB0eTogdHJ1ZSwgdGl0bGVJc0VtcHR5OiB0cnVlfSk7XG4gIH0sXG4gIG9uRmllbGRDaGFuZ2U6IGZ1bmN0aW9uKGZpZWxkTmFtZSwgZSkge1xuICAgIGlmIChlLnRhcmdldC52YWx1ZS50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7WycnK2ZpZWxkTmFtZV06ZmFsc2V9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtbJycrZmllbGROYW1lXTp0cnVlfSlcbiAgICB9XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRpdGxlSXNFbXB0eSA9IHRoaXMuc3RhdGUudGl0bGVJc0VtcHR5LFxuICAgICAgICB0ZXh0SXNFbXB0eSA9IHRoaXMuc3RhdGUudGV4dElzRW1wdHk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxmb3JtIGNsYXNzTmFtZT0nYWRkIGNmJz5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICBjbGFzc05hbWU9J2FkZF90aXRsZSBmb3JtLWNvbnRyb2wnXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWVsZENoYW5nZS5iaW5kKHRoaXMsICd0aXRsZUlzRW1wdHknKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj0n0JfQsNCz0L7Qu9C+0LLQvtC6J1xuICAgICAgICAgIHJlZj0ndGl0bGUnXG4gICAgICAgIC8+XG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGNsYXNzTmFtZT0nYWRkX3RleHQgZm9ybS1jb250cm9sJ1xuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmllbGRDaGFuZ2UuYmluZCh0aGlzLCAndGV4dElzRW1wdHknKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj0n0KLQtdC60YHRgiDQvdC+0LLQvtGB0YLQuCdcbiAgICAgICAgICByZWY9J3RleHQnXG4gICAgICAgID48L3RleHRhcmVhPlxuXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdhZGRfYnRuIGJ0biBidG4tcHJpbWFyeSBidG4tbGcnXG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vbkJ0bkNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAgICAgICByZWY9J2FsZXJ0X2J1dHRvbidcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGl0bGVJc0VtcHR5IHx8IHRleHRJc0VtcHR5fT5cbiAgICAgICAgICDQntC/0YPQsdC70LjQutC+0LLQsNGC0Ywg0L3QvtCy0L7RgdGC0YxcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgKTtcbiAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZmVlZC9hZGQuanMiXSwic291cmNlUm9vdCI6IiJ9