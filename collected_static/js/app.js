var app_render_interval;
var timeout = 5000;

import News from './news';
import Add from './add';

export let App = React.createClass({
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