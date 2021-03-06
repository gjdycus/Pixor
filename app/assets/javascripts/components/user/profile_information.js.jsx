var ProfileInformation = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return { editingBiography: false,
             biography: this.props.user.biography,
             profilePicUrl: this.props.user.profile_pic_url,
             following: ProfileStore.following(),
             editingProfilePic: false };
  },
  componentDidMount: function () {
    ProfileStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    ProfileStore.removeChangeListener(this._onChange);
  },
  componentWillReceiveProps: function () {
    BootstrapDialog.closeAll();
    this.setState({ editingBiography: false, editingProfilePic: false });
  },
  editBiography: function () {
    this.setState({ editingBiography: true });
  },
  updateBiography: function (e) {
    e.preventDefault();

    if (this.state.biography) {
      ApiUtil.updateUser({ biography: this.state.biography });
    }

    this.setState({ editingBiography: false });
  },
  editProfilePic: function () {
    this.setState({ editingProfilePic: !this.state.editingProfilePic, editingBiography: false });
  },
  updateProfilePic: function (media_url) {
    ApiUtil.updateUser({ profile_pic_url: media_url });
    this.setState({ editingProfilePic: false });
  },
  toggleFollow: function () {
    ApiUtil.toggleFollow(this.props.user.id, this.state.following, function (status) {
      if (status.following) {
        ApiUtil.createNotification({ user_id: this.props.user.id,
                                     message: window.CURRENT_USER_USERNAME + " has started following you.",
                                     href: "#/users/" + window.CURRENT_USER_ID });
      }
    }.bind(this));
  },
  showFollowers: function () {
    var followers =
      this.props.user.followers.map(function (follower) {
        return '<a href="#/users/' + follower.id + '">' + follower.username + '</a>';
      }).join('<br/>');

    BootstrapDialog.show({
      title: "Followers",
      message: followers
    });
  },
  showFollowing: function () {
    var followees =
      this.props.user.followees.map(function (followee) {
        return '<a href="#/users/' + followee.id + '">' + followee.username + '</a>';
      }).join('<br/>');

    BootstrapDialog.show({
      title: "Following",
      message: followees
    });
  },
  _onChange: function () {
    this.setState({ following: ProfileStore.following() });
  },
  render: function () {
    return (
      <div>
        <div className="page-header">
          {
            this.props.user.id === window.CURRENT_USER_ID ?
            (
              this.state.editingProfilePic ?
              <div>
                <UploadWidget mediaUploadedHandler={this.updateProfilePic} />
                <button className="btn btn-default" onClick={this.editProfilePic}>Cancel</button>
              </div> :
              (
                !this.state.editingBiography ?
                <a onClick={this.editBiography}>Edit Bio</a> :
                ""
              )
            ) :
            (
              this.state.following ?
              <button className="btn btn-default" onClick={this.toggleFollow}>Unfollow</button> :
              <button className="btn btn-primary" onClick={this.toggleFollow}>Follow</button>
            )
          }
          <h1>
            {
              this.props.user.id === window.CURRENT_USER_ID ?
              <a onClick={this.editProfilePic}><img className="profile-pic" src={this.props.user.profile_pic_url} /></a> :
              <img className="profile-pic" src={this.props.user.profile_pic_url} />
            }
            <small>{this.props.user.username}</small>
          </h1>
          <div className="profile-information wrapword">
            {
              this.state.editingBiography ?
              <form className="form-group clearfix" onSubmit={this.updateBiography}>
                <textarea className="form-control" valueLink={this.linkState("biography")}
                          defaultValue={this.props.user.biography}></textarea>
                <button type="submit" className="btn btn-primary form-control">Update</button>
              </form> :
              <div>
                <p>{this.props.user.biography}</p>
              </div>
            }
          </div>
          <div className="user-stats clearfix">
            <div className="num-posts">
              <h3>
                {
                  this.props.user.posts ?
                  this.props.user.posts.length :
                  ""
                }
                <small>
                  {
                    this.props.user.posts && this.props.user.posts.length == 1 ?
                    " post" :
                    " posts"
                  }
                </small>
              </h3>
            </div>
            <div className="num-followers" onClick={this.showFollowers}>
              <h3>
                {
                  this.props.user.followers ?
                  this.props.user.followers.length :
                  ""
                }
                <small>
                  {
                    this.props.user.followers && this.props.user.followers.length == 1 ?
                    " follower" :
                    " followers"
                  }
                </small>
              </h3>
            </div>
            <div className="num-following" onClick={this.showFollowing}>
              <h3>
                {
                  this.props.user.followees ?
                  this.props.user.followees.length :
                  ""
                }
                <small>
                  following
                </small>
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
