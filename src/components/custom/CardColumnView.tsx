import SocialIconView from "./SocialIconView";
import { Link } from "react-router-dom";

const CardColumnView = ({
  people,
  selectedId = 0,
  loading = 0,
  onAddContact,
  onDeleteContact,
  onAddFavourite,
  onDeleteFavourite,
  onDeletePeople,
  onEditPeople
}) => {
  const myStyle = {
    borderBottom: 0,
  };

  return (
    <div className="card card-widget widget-user">
      <div className="widget-user-header"></div>
      <div className="widget-user-image">
        <img
          className="img-circle elevation-2"
          src={people.avatar}
          alt={people.name}
        />
      </div>
      <div className="card-footer" style={{ textAlign: "center" }}>
        <h3 className="widget-user-username">{people.name}</h3>
        <h5 className="widget-user-desc">{people.position}</h5>
        <ul className="nav flex-column">
          <li className="nav-item pt-2 pb-2" style={myStyle}>
            {Object.keys(people.social_networks).sort().map((key, index) => (
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
          <li className="nav-item pt-2 pb-2" style={myStyle}>
            <span className="badge bg-success">{people.city}</span>
          </li>
          <li className="nav-item pt-2 pb-2" style={myStyle}>
            <span
              style={{
                display:
                  onAddContact === null && onDeleteContact === null
                    ? "none"
                    : "block",
              }}
            >
              {people.isContact === false && onAddContact !== null ? (
                <a
                  href="#/"
                  className="btn btn-sm btn-primary ml-2 rounded-pill"
                  onClick={(e) => onAddContact(e, `${people.id}`)}
                >
                  ADD TO CONTACTS{" "}
                  {people.id === selectedId && loading === 1 ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    ""
                  )}
                </a>
              ) : (
                <a
                  href="#/"
                  className="btn btn-sm btn-danger ml-2 rounded-pill"
                  onClick={(e) => onDeleteContact(e, `${people.id}`)}
                >
                  DELETE FROM CONTACTS{" "}
                  {people.id === selectedId && loading === 1 ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    ""
                  )}
                </a>
              )}
            </span>
            <span
              style={{
                display:
                  onAddFavourite === null && onDeleteFavourite === null
                    ? "none"
                    : "block",
              }}
            >
              {people.isFavourite === false && onAddFavourite !== null ? (
                <a
                  href="#/"
                  className="btn btn-sm btn-primary ml-2 mt-2 rounded-pill"
                  onClick={(e) => onAddFavourite(e, `${people.id}`)}
                >
                  ADD TO FAVOURITES{" "}
                  {people.id === selectedId && loading === 2 ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    ""
                  )}
                </a>
              ) : (
                <a
                  href="#/"
                  className="btn btn-sm btn-danger ml-2 mt-2 rounded-pill"
                  onClick={(e) => onDeleteFavourite(e, `${people.id}`)}
                >
                  DELETE FROM FAVOURITES{" "}
                  {people.id === selectedId && loading === 2 ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    ""
                  )}
                </a>
              )}
            </span>
            <span style={{
                display:
                onEditPeople === null
                    ? "none"
                    : "block",
              }}>
              <Link
                to={{ pathname: `/contact/${people.id}/edit` }}
                className="btn btn-sm btn-info ml-2 mt-2 rounded-pill"
              >
                EDIT CONTACT
              </Link>
            </span>
            <span style={{
                display:
                onDeletePeople === null
                    ? "none"
                    : "block",
              }}>
            <a
                  href="#/"
                  className="btn btn-sm btn-danger ml-2 mt-2 rounded-pill"
                  onClick={(e) => onDeletePeople(e, `${people.id}`)}
                >
                  DELETE PEOPLE
                  {people.id === selectedId && loading === 3 ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    ""
                  )}
                </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardColumnView;
