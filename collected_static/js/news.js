import Article from './article';

export let News = React.createClass({
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