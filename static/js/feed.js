'use strict';

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
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

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired
    })
  },
  render: function() {
    var title = this.props.data.title,
        text = this.props.data.text;

    return (
      <div className='article'>
        <div className='news_author'> <a href="#">Петя</a> </div>
        <div className='news_title'>
          <p>{title}</p>
        </div>
        <div className='news_text'>{text}</div>
      </div>
    )
  }
});

var News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  render: function() {
    var data = this.props.data;
    var newsTemplate;

    if (data.length > 0) {
      newsTemplate = data.map(function(item, index) {
        return (
          <div key={index}>
            <Article data={item} />
          </div>
        )
      })
    } else {
      newsTemplate = <p>К сожалению, новостей нет</p>
    }

    return (
      <div className='news'>
        {newsTemplate}
      </div>
    );
  }
});

var Add = React.createClass({
  getInitialState: function() {
    return {
      titleIsEmpty: true,
      textIsEmpty: true
    };
  },
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.title).focus();
  },
  onBtnClickHandler: function(e) {
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
      success: function(data) {
        //console.log('all is good, data =  ', data);
        window.ee.emit('add_news');
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('status: ' + status);
        console.log('err: ' + err);
        console.log(xhr);
      }.bind(this)
    });

    textEl.value = '';
    titleEl.value = '';
    this.setState({textIsEmpty: true, titleIsEmpty: true});
  },
  onFieldChange: function(fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[''+fieldName]:false})
    } else {
      this.setState({[''+fieldName]:true})
    }
  },
  render: function() {
    var titleIsEmpty = this.state.titleIsEmpty,
        textIsEmpty = this.state.textIsEmpty;
    return (
      <form className='add cf'>
        <input
          type='text'
          className='add_title form-control'
          onChange={this.onFieldChange.bind(this, 'titleIsEmpty')}
          placeholder='Заголовок'
          ref='title'
        />
        <textarea
          className='add_text form-control'
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
          placeholder='Текст новости'
          ref='text'
        ></textarea>

        <button className='add_btn btn btn-primary btn-lg'
                onClick={this.onBtnClickHandler}
                ref='alert_button'
                disabled={titleIsEmpty || textIsEmpty}>
          Опубликовать новость
        </button>
      </form>
    );
  }
});

var app_render_interval;
var timeout = 5000;
var App = React.createClass({
  getInitialState: function() {
    return {
      news: []
    };
  },
  fetchData() {
    var self = this;
    fetch('/router/posts').then( function(response) {
      response.json().then(function (data) {
        self.setState({news: data});
      })
    }).catch(function (err) {
      console.log('Error', err)
    });
  },
  componentDidMount: function() {
    this.fetchData();

    var self = this;
    app_render_interval = setTimeout(function fetch_news() {
      self.fetchData();
      app_render_interval = setTimeout(fetch_news, timeout);
    }, timeout);

    window.ee.addListener('add_news', function() {
      self.fetchData();
      console.log('I am in add_news');
    });
  },
  componentWillUnmount: function() {
    clearInterval(app_render_interval);
    window.ee.removeListener('add_news')
  },
  render: function() {
    return (
      <div className='app'>
        <Add />
        <h3>Новости</h3>
        <News data={this.state.news} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
