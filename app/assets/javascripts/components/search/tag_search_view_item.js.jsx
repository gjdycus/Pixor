var TagSearchViewItem = React.createClass({
  render: function () {
    return (
      <div className="tag-search-view-item pull-left effect8">
        <a href={"#/posts/" + this.props.post.id}><img src={this.props.post.media_url} /></a>
      </div>
    );
  }
});
