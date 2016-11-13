export let Article = React.createClass({
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