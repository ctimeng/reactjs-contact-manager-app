import SocialIconView from "./SocialIconView";
import { Link } from "react-router-dom";

const CardRowView = ({
  people,
  selectedId = 0,
  loading = 0,
  onAddContact,
  onDeleteContact,
  onAddFavourite,
  onDeleteFavourite,
  onDeletePeople,
  onEditPeople,
}: {
  people: any;
  selectedId?: Number;
  loading?: Number;
  onAddContact: any;
  onDeleteContact: any;
  onAddFavourite: any;
  onDeleteFavourite: any;
  onDeletePeople: any;
  onEditPeople: any;
}) => {
  return (
    <div className="row">
      <div className="col-md-2 col-sm-12">
        <img
          src={people.avatar}
          alt={people.name}
          className="img-size-100 img-circle"
          style={{ width: "120px", height: "120px", margin: "19px" }}
        />
      </div>
      <div className="col-md-3 col-sm-12">
        <ul className="nav flex-column">
          <li className="nav-item pt-2 pb-2">
            <h5>{people.name}</h5>
          </li>
          <li className="nav-item pt-2 pb-2">
            {Object.keys(people.social_networks)
              .sort()
              .map((key, index) => (
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
        </ul>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="row">
          <div
            className="col-sm-12"
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
            className="col-sm-12"
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
          <div
            className="col-sm-12"
            style={{
              display: onEditPeople === null ? "none" : "block",
            }}
          >
            <Link
              to={{ pathname: `/contact/${people.id}/edit` }}
              className="btn btn-sm btn-info ml-2 mt-2 rounded-pill"
            >
              EDIT CONTACT
            </Link>
          </div>
          <div
            className="col-sm-12"
            style={{
              display: onDeletePeople === null ? "none" : "block",
            }}
          >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRowView;
