import SocialIconView from "./SocialIconView";

const CardRowView = ({
  people,
  onAddContact,
  onDeleteContact,
  onAddFavourite,
  onDeleteFavourite,
}) => {
  return (
    <div>
      <div className="product-img">
        <img
          src={people.avatar}
          alt={people.name}
          className="img-size-100 img-circle"
          style={{ width: "120px", height: "120px", margin: "19px" }}
        />
      </div>
      <div className="product-info">
        <a href="#/" className="product-title">
          {people.name}
        </a>
        <span className="product-description">
          <ul className="nav flex-column">
            <li className="nav-item pt-2 pb-2">
              {Object.keys(people.social_networks).map((key, index) => (
                <a
                  href={people.social_networks[key]}
                  className="btn btn-sm btn-outline-primary ml-2"
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIconView social={key} />
                </a>
              ))}
            </li>
            <li className="nav-item pt-2 pb-2">{people.city}</li>
            <li className="nav-item pt-2 pb-2">
              <div className="row">
                <div
                  className="col-md-2 col-sm-12"
                  style={{
                    display:
                      onAddContact === null && onDeleteContact === null
                        ? "none"
                        : "inline",
                  }}
                >
                  {people.isContact === false ? (
                    <a
                      href="#/"
                      className="btn btn-sm btn-primary mt-2 rounded-pill"
                      onClick={(e) => onAddContact(e, `${people.id}`)}
                    >
                      ADD TO CONTACTS
                    </a>
                  ) : (
                    <a
                      href="#/"
                      className="btn btn-sm btn-danger mt-2 rounded-pill"
                      onClick={(e) => onDeleteContact(e, `${people.id}`)}
                    >
                      DELETE FROM CONTACTS
                    </a>
                  )}
                </div>
                <div
                  className="col-md-2 col-sm-12"
                  style={{
                    display:
                      onAddFavourite === null && onDeleteFavourite === null
                        ? "none"
                        : "inline",
                  }}
                >
                  {people.isFavourite === false ? (
                    <a
                      href="#/"
                      className="btn btn-sm btn-primary mt-2 rounded-pill"
                      onClick={(e) => onAddFavourite(e, `${people.id}`)}
                    >
                      ADD TO FAVOURITES
                    </a>
                  ) : (
                    <a
                      href="#/"
                      className="btn btn-sm btn-danger mt-2 rounded-pill"
                      onClick={(e) => onDeleteFavourite(e, `${people.id}`)}
                    >
                      DELETE FROM FAVOURITES
                    </a>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </span>
      </div>
    </div>
  );
};

export default CardRowView;
