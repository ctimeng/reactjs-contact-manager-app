import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {

  const handleLogout = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="wrapper">
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#/"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>
      </nav>

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <div className="sidebar">
          <div className="card card-widget widget-user">
            <div className="widget-user-header"></div>
            <div className="widget-user-image">
              <img
                className="img-circle elevation-2"
                src="img/user2-160x160.jpg"
                alt="User Avatar"
              />
            </div>
            <div className="card-footer">
              <h3 className="widget-user-username">Alexander Pierce</h3>
              <h5 className="widget-user-desc">Founder &amp; CEO</h5>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <NavLink
                  className={isActive =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                  to="/"
                >
                  <i className="nav-icon fas fa-home"></i>
                  <p>HOME</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                   className={isActive =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                  to="/contact"
                >
                  <i className="nav-icon fas fa-address-book"></i>
                  <p>CONTACTS</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                   className={isActive =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                  to="/favourite"
                >
                  <i className="nav-icon fas fa-heart"></i>
                  <p>FAVOURITES</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                   className={isActive =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                  to="/people"
                >
                  <i className="nav-icon fas fa-user"></i>
                  <p>PEOPLE</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                   className={isActive =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                  to="/company"
                >
                  <i className="nav-icon fas fa-shopping-bag"></i>
                  <p>COMPANIES</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <a href="#/" className="nav-link" onClick={handleLogout}>
                  <i className="nav-icon fas fa-arrow-right-from-bracket"></i>
                  <p>Logout</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div className="content-wrapper">
        <Outlet />
      </div>
      <footer className="main-footer">
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0.0
        </div>
      </footer>

      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default Layout;
