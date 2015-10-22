var Navbar = React.createClass({
  logOut: function () {
    ApiUtil.logOut();
  },
  render: function () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Pixor</a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <form className="navbar-form search-form">
                  <SearchIndex />
                </form>
              </li>
              <li className="dropdown" role="presentation">
                <a className="dropdown-toggle" data-toggle="dropdown"
                   role="button" aria-haspopup="true" aria-expanded="false">
                   Activity <span className="badge">7</span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">These</a></li>
                  <li><a href="#">are</a></li>
                  <li><a href="#">sample</a></li>
                  <li><a href="#">notifications,</a></li>
                  <li><a href="#">not</a></li>
                  <li><a href="#">real</a></li>
                  <li><a href="#">ones.</a></li>
                </ul>
              </li>
              <li><a href="#/posts/upload" className="glyphicon glyphicon-camera"></a></li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown"
                   role="button" aria-haspopup="true" aria-expanded="false">
                    {window.CURRENT_USER_USERNAME} <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href={"#/users/" + window.CURRENT_USER_ID}>Profile</a></li>
                  <li><a href="#/settings">Account Settings</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a onClick={this.logOut}>Log out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
