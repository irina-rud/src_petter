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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODU3MzFjZDg1NDcxYWYzNTJkOTQiLCJ3ZWJwYWNrOi8vLy4vZmVlZC9mZWVkLmpzIiwid2VicGFjazovLy8uL2ZlZWQvYXBwLmpzIiwid2VicGFjazovLy8uL2ZlZWQvbmV3cy5qcyIsIndlYnBhY2s6Ly8vLi9mZWVkL2FydGljbGUuanMiLCJ3ZWJwYWNrOi8vLy4vZmVlZC9hZGQuanMiXSwibmFtZXMiOlsiZ2V0Q29va2llIiwibmFtZSIsImNvb2tpZVZhbHVlIiwiZG9jdW1lbnQiLCJjb29raWUiLCJjb29raWVzIiwic3BsaXQiLCJpIiwibGVuZ3RoIiwialF1ZXJ5IiwidHJpbSIsInN1YnN0cmluZyIsImRlY29kZVVSSUNvbXBvbmVudCIsIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwid2luZG93IiwiZWUiLCJFdmVudEVtaXR0ZXIiLCJSZWFjdERPTSIsInJlbmRlciIsImdldEVsZW1lbnRCeUlkIiwiYXBwX3JlbmRlcl9pbnRlcnZhbCIsInRpbWVvdXQiLCJBcHAiLCJSZWFjdCIsImNyZWF0ZUNsYXNzIiwiZ2V0SW5pdGlhbFN0YXRlIiwibmV3cyIsImZldGNoRGF0YSIsInNlbGYiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwic2V0U3RhdGUiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJjb21wb25lbnREaWRNb3VudCIsInNldFRpbWVvdXQiLCJmZXRjaF9uZXdzIiwiYWRkTGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImNsZWFySW50ZXJ2YWwiLCJyZW1vdmVMaXN0ZW5lciIsInN0YXRlIiwiTmV3cyIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5IiwiaXNSZXF1aXJlZCIsInByb3BzIiwibmV3c1RlbXBsYXRlIiwibWFwIiwiaXRlbSIsImluZGV4IiwiQXJ0aWNsZSIsInNoYXBlIiwidGV4dCIsInN0cmluZyIsInRpdGxlIiwiQWRkIiwidGl0bGVJc0VtcHR5IiwidGV4dElzRW1wdHkiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJmb2N1cyIsIm9uQnRuQ2xpY2tIYW5kbGVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGV4dEVsIiwidmFsdWUiLCJ0aXRsZUVsIiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwibWV0aG9kIiwic3VjY2VzcyIsImVtaXQiLCJiaW5kIiwiZXJyb3IiLCJ4aHIiLCJzdGF0dXMiLCJvbkZpZWxkQ2hhbmdlIiwiZmllbGROYW1lIiwidGFyZ2V0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOzs7Ozs7QUFFQSxVQUFTQSxTQUFULENBQW1CQyxJQUFuQixFQUF5QjtBQUNyQixTQUFJQyxjQUFjLElBQWxCO0FBQ0EsU0FBSUMsU0FBU0MsTUFBVCxJQUFtQkQsU0FBU0MsTUFBVCxJQUFtQixFQUExQyxFQUE4QztBQUMxQyxhQUFJQyxVQUFVRixTQUFTQyxNQUFULENBQWdCRSxLQUFoQixDQUFzQixHQUF0QixDQUFkO0FBQ0EsY0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLFFBQVFHLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUNyQyxpQkFBSUgsU0FBU0ssT0FBT0MsSUFBUCxDQUFZTCxRQUFRRSxDQUFSLENBQVosQ0FBYjtBQUNBO0FBQ0EsaUJBQUlILE9BQU9PLFNBQVAsQ0FBaUIsQ0FBakIsRUFBb0JWLEtBQUtPLE1BQUwsR0FBYyxDQUFsQyxLQUF5Q1AsT0FBTyxHQUFwRCxFQUEwRDtBQUN0REMsK0JBQWNVLG1CQUFtQlIsT0FBT08sU0FBUCxDQUFpQlYsS0FBS08sTUFBTCxHQUFjLENBQS9CLENBQW5C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QUFGLENBQVNkLEtBQVQsQ0FBZWhFLElBQWYsR0FBc0JGLE1BQXRCLEdBQStCLENBQW5DLEVBQXNDO0FBQ3BDLFlBQUs0QixRQUFMLHFCQUFnQixLQUFHbUQsU0FBbkIsRUFBOEIsS0FBOUI7QUFDRCxNQUZELE1BRU87QUFDTCxZQUFLbkQsUUFBTCxxQkFBZ0IsS0FBR21ELFNBQW5CLEVBQThCLElBQTlCO0FBQ0Q7QUFDRixJQWhEZ0M7QUFpRGpDbkUsV0FBUSxrQkFBVztBQUNqQixTQUFJNkMsZUFBZSxLQUFLakIsS0FBTCxDQUFXaUIsWUFBOUI7QUFBQSxTQUNJQyxjQUFjLEtBQUtsQixLQUFMLENBQVdrQixXQUQ3QjtBQUVBLFlBQ0U7QUFBQTtBQUFBLFNBQU0sV0FBVSxRQUFoQjtBQUNFO0FBQ0UsZUFBSyxNQURQO0FBRUUsb0JBQVUsd0JBRlo7QUFHRSxtQkFBVSxLQUFLb0IsYUFBTCxDQUFtQkosSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEIsY0FBOUIsQ0FIWjtBQUlFLHNCQUFZLHdEQUpkO0FBS0UsY0FBSTtBQUxOLFNBREY7QUFRRTtBQUNFLG9CQUFVLHVCQURaO0FBRUUsbUJBQVUsS0FBS0ksYUFBTCxDQUFtQkosSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEIsYUFBOUIsQ0FGWjtBQUdFLHNCQUFZLDJFQUhkO0FBSUUsY0FBSTtBQUpOLFNBUkY7QUFlRTtBQUFBO0FBQUEsV0FBUSxXQUFVLGdDQUFsQjtBQUNRLG9CQUFTLEtBQUtaLGlCQUR0QjtBQUVRLGdCQUFJLGNBRlo7QUFHUSxxQkFBVUwsZ0JBQWdCQyxXQUhsQztBQUFBO0FBQUE7QUFmRixNQURGO0FBd0JEO0FBNUVnQyxFQUFsQixDQUFWLEMiLCJmaWxlIjoiZmVlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg1NzMxY2Q4NTQ3MWFmMzUyZDk0IiwiaW1wb3J0IEFwcCBmcm9tICcuL2FwcCc7XG5cbmZ1bmN0aW9uIGdldENvb2tpZShuYW1lKSB7XG4gICAgdmFyIGNvb2tpZVZhbHVlID0gbnVsbDtcbiAgICBpZiAoZG9jdW1lbnQuY29va2llICYmIGRvY3VtZW50LmNvb2tpZSAhPSAnJykge1xuICAgICAgICB2YXIgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjb29raWUgPSBqUXVlcnkudHJpbShjb29raWVzW2ldKTtcbiAgICAgICAgICAgIC8vIERvZXMgdGhpcyBjb29raWUgc3RyaW5nIGJlZ2luIHdpdGggdGhlIG5hbWUgd2Ugd2FudD9cbiAgICAgICAgICAgIGlmIChjb29raWUuc3Vic3RyaW5nKDAsIG5hbWUubGVuZ3RoICsgMSkgPT0gKG5hbWUgKyAnPScpKSB7XG4gICAgICAgICAgICAgICAgY29va2llVmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQoY29va2llLnN1YnN0cmluZyhuYW1lLmxlbmd0aCArIDEpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29va2llVmFsdWU7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgICQuYWpheFNldHVwKHtcbiAgICAgICAgaGVhZGVyczogeyBcIlgtQ1NSRlRva2VuXCI6IGdldENvb2tpZShcImNzcmZ0b2tlblwiKSB9XG4gICAgfSk7XG59KTtcblxud2luZG93LmVlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5SZWFjdERPTS5yZW5kZXIoXG4gIDxBcHAgLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jylcbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mZWVkL2ZlZWQuanMiLCJ2YXIgYXBwX3JlbmRlcl9pbnRlcnZhbDtcbnZhciB0aW1lb3V0ID0gNTAwMDtcblxuaW1wb3J0IE5ld3MgZnJvbSAnLi9uZXdzJztcbmltcG9ydCBBZGQgZnJvbSAnLi9hZGQnO1xuXG5leHBvcnQgbGV0IEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmV3czogW11cbiAgICB9O1xuICB9LFxuICBmZXRjaERhdGEoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZldGNoKCcvcm91dGVyL3Bvc3RzJykudGhlbiggZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHNlbGYuc2V0U3RhdGUoe25ld3M6IGRhdGF9KTtcbiAgICAgIH0pXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yJywgZXJyKVxuICAgIH0pO1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5mZXRjaERhdGEoKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBhcHBfcmVuZGVyX2ludGVydmFsID0gc2V0VGltZW91dChmdW5jdGlvbiBmZXRjaF9uZXdzKCkge1xuICAgICAgc2VsZi5mZXRjaERhdGEoKTtcbiAgICAgIGFwcF9yZW5kZXJfaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KGZldGNoX25ld3MsIHRpbWVvdXQpO1xuICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgd2luZG93LmVlLmFkZExpc3RlbmVyKCdhZGRfbmV3cycsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5mZXRjaERhdGEoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdJIGFtIGluIGFkZF9uZXdzJyk7XG4gICAgfSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBjbGVhckludGVydmFsKGFwcF9yZW5kZXJfaW50ZXJ2YWwpO1xuICAgIHdpbmRvdy5lZS5yZW1vdmVMaXN0ZW5lcignYWRkX25ld3MnKVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nYXBwJz5cbiAgICAgICAgPEFkZCAvPlxuICAgICAgICA8aDM+0J3QvtCy0L7RgdGC0Lg8L2gzPlxuICAgICAgICA8TmV3cyBkYXRhPXt0aGlzLnN0YXRlLm5ld3N9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mZWVkL2FwcC5qcyIsImltcG9ydCBBcnRpY2xlIGZyb20gJy4vYXJ0aWNsZSc7XG5cbmV4cG9ydCBsZXQgTmV3cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcHJvcFR5cGVzOiB7XG4gICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcbiAgICB2YXIgbmV3c1RlbXBsYXRlO1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgbmV3c1RlbXBsYXRlID0gZGF0YS5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9PlxuICAgICAgICAgICAgPEFydGljbGUgZGF0YT17aXRlbX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3c1RlbXBsYXRlID0gPHA+0Jog0YHQvtC20LDQu9C10L3QuNGOLCDQvdC+0LLQvtGB0YLQtdC5INC90LXRgjwvcD5cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J25ld3MnPlxuICAgICAgICB7bmV3c1RlbXBsYXRlfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZmVlZC9uZXdzLmpzIiwiZXhwb3J0IGxldCBBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBwcm9wVHlwZXM6IHtcbiAgICBkYXRhOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxuICAgIH0pXG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRpdGxlID0gdGhpcy5wcm9wcy5kYXRhLnRpdGxlLFxuICAgICAgICB0ZXh0ID0gdGhpcy5wcm9wcy5kYXRhLnRleHQ7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J2FydGljbGUnPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmV3c19hdXRob3InPiA8YSBocmVmPVwiI1wiPtCf0LXRgtGPPC9hPiA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J25ld3NfdGl0bGUnPlxuICAgICAgICAgIDxwPnt0aXRsZX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmV3c190ZXh0Jz57dGV4dH08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZmVlZC9hcnRpY2xlLmpzIiwiZXhwb3J0IGxldCBBZGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlSXNFbXB0eTogdHJ1ZSxcbiAgICAgIHRleHRJc0VtcHR5OiB0cnVlXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy50aXRsZSkuZm9jdXMoKTtcbiAgfSxcbiAgb25CdG5DbGlja0hhbmRsZXI6IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHRleHRFbCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy50ZXh0KTtcbiAgICB2YXIgdGV4dCA9IHRleHRFbC52YWx1ZTtcbiAgICB2YXIgdGl0bGVFbCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy50aXRsZSk7XG4gICAgdmFyIHRpdGxlID0gdGl0bGVFbC52YWx1ZTtcblxuICAgIHZhciBpdGVtID0gW3tcbiAgICAgIFwidGl0bGVcIjogdGl0bGUsXG4gICAgICBcInRleHRcIjogdGV4dFxuICAgIH1dO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy4uL3JvdXRlci9wb3N0cy8nLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZGF0YTogaXRlbVswXSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnYWxsIGlzIGdvb2QsIGRhdGEgPSAgJywgZGF0YSk7XG4gICAgICAgIHdpbmRvdy5lZS5lbWl0KCdhZGRfbmV3cycpO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXR1czogJyArIHN0YXR1cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnI6ICcgKyBlcnIpO1xuICAgICAgICBjb25zb2xlLmxvZyh4aHIpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgICB0ZXh0RWwudmFsdWUgPSAnJztcbiAgICB0aXRsZUVsLnZhbHVlID0gJyc7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dGV4dElzRW1wdHk6IHRydWUsIHRpdGxlSXNFbXB0eTogdHJ1ZX0pO1xuICB9LFxuICBvbkZpZWxkQ2hhbmdlOiBmdW5jdGlvbihmaWVsZE5hbWUsIGUpIHtcbiAgICBpZiAoZS50YXJnZXQudmFsdWUudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1snJytmaWVsZE5hbWVdOmZhbHNlfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7WycnK2ZpZWxkTmFtZV06dHJ1ZX0pXG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aXRsZUlzRW1wdHkgPSB0aGlzLnN0YXRlLnRpdGxlSXNFbXB0eSxcbiAgICAgICAgdGV4dElzRW1wdHkgPSB0aGlzLnN0YXRlLnRleHRJc0VtcHR5O1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBjbGFzc05hbWU9J2FkZCBjZic+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgICAgY2xhc3NOYW1lPSdhZGRfdGl0bGUgZm9ybS1jb250cm9sJ1xuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uRmllbGRDaGFuZ2UuYmluZCh0aGlzLCAndGl0bGVJc0VtcHR5Jyl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9J9CX0LDQs9C+0LvQvtCy0L7QuidcbiAgICAgICAgICByZWY9J3RpdGxlJ1xuICAgICAgICAvPlxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICBjbGFzc05hbWU9J2FkZF90ZXh0IGZvcm0tY29udHJvbCdcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkZpZWxkQ2hhbmdlLmJpbmQodGhpcywgJ3RleHRJc0VtcHR5Jyl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9J9Ci0LXQutGB0YIg0L3QvtCy0L7RgdGC0LgnXG4gICAgICAgICAgcmVmPSd0ZXh0J1xuICAgICAgICA+PC90ZXh0YXJlYT5cblxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYWRkX2J0biBidG4gYnRuLXByaW1hcnkgYnRuLWxnJ1xuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub25CdG5DbGlja0hhbmRsZXJ9XG4gICAgICAgICAgICAgICAgcmVmPSdhbGVydF9idXR0b24nXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RpdGxlSXNFbXB0eSB8fCB0ZXh0SXNFbXB0eX0+XG4gICAgICAgICAg0J7Qv9GD0LHQu9C40LrQvtCy0LDRgtGMINC90L7QstC+0YHRgtGMXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9mb3JtPlxuICAgICk7XG4gIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2ZlZWQvYWRkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==