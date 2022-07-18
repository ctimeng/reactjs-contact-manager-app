const RowView = () => {
  return (
    <ul className="products-list product-list-in-card pl-2 pr-2">
      <li className="item">
        <div className="product-img">
          <img
            src="img/user2-160x160.jpg"
            alt="Product asfd"
            className="img-size-100 img-circle"
          />
        </div>
        <div className="product-info">
          <a href="#/" className="product-title">
            Samsung TV
          </a>
          <span className="product-description">
          <ul className="nav flex-column">
                <li className="nav-item pt-2 pb-2">
                  <a href="#/" className="btn btn-sm btn-outline-primary">
                    <i className="fab fa-facebook-f fa-fw"></i>
                  </a>
                  <a href="#/" className="btn btn-sm btn-outline-primary ml-2">
                    <i className="fab fa-twitter fa-fw"></i>
                  </a>
                  <a href="#/" className="btn btn-sm btn-outline-primary ml-2">
                    <i className="fab fa-instagram fa-fw"></i>
                  </a>
                  <a href="#/" className="btn btn-sm btn-outline-primary ml-2">
                    <i className="fab fa-linkedin fa-fw"></i>
                  </a>
                  <a href="#/" className="btn btn-sm btn-outline-primary ml-2">
                    <i className="fab fa-skype fa-fw"></i>
                  </a>
                </li>
                <li className="nav-item pt-2 pb-2">
                  Ukraine, Lviv
                </li>
                <li className="nav-item pt-2 pb-2">
                  <a href="#/" className="btn btn-sm btn-primary">
                    Add to Contact
                  </a>
                </li>
              </ul>
          </span>
        </div>
      </li>
    </ul>
  );
};

export default RowView;
