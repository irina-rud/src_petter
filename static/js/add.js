export let Add = React.createClass({
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