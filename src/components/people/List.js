import ColumnView from "./ColumnView";
import RowView from "./RowView";
import { useState } from "react";
import { connect } from "react-redux";
import {
  AddContact,
  DeleteContact,
  AddFavourite,
  DeleteFavourite,
} from "../../actions";

import firebaseApp from "../../Firebase";
import {
  getFirestore,
  doc,
  query,
  collection,
  where,
  getDocs,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore/lite";
import { FIREBASE_COLLECTION_PEOPLES, searchPeoples } from "../../global";

const List = (props) => {
  const [option, setOption] = useState("1");
  const [selectedCity, setSelectedCity] = useState("");
  const [search, setSearch] = useState("");

  const db = getFirestore(firebaseApp);

  const filteredData = searchPeoples(props.peoples, search, selectedCity);

  const firebaseSearch = async (search) => {
    /*There are no content searches in Firebase need to integrate with ElasticSearch */
    /*const q = query(collection(db, FIREBASE_COLLECTION_PEOPLES), where("name", "==", search));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    if (querySnapshot.exists) {
      console.log("the document exists");
    } else {
      console.log("the document not exists");
    }*/

    /*const q = query(
        collection(db, FIREBASE_COLLECTION_PEOPLES),
        orderBy("name"),
        startAt(`%${search}%`),
        endAt(search+'\uf8ff')
      )*/

    const q = query(
      collection(db, FIREBASE_COLLECTION_PEOPLES),
      orderBy("name"),
      startAt(search),
      endAt("\uf8ff")
    );

    /*const q = query(
      collection(db, FIREBASE_COLLECTION_PEOPLES),
      orderBy("name"),
      where("name", ">=", search),
      where("name", "<=", search + "\uf8ff")
    );*/

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);
  };

  const onAddContact = (event, id) => {
    event.preventDefault();
    props.AddContact(id);
  };

  const onDeleteContact = (event, id) => {
    event.preventDefault();
    props.DeleteContact(id);
  };

  const onAddFavourite = (event, id) => {
    event.preventDefault();
    props.AddFavourite(id);
  };

  const onDeleteFavourite = (event, id) => {
    event.preventDefault();
    props.DeleteFavourite(id);
  };

  const onSearchHandler = () => {
    firebaseSearch(search);
  };

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-2">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className={'btn btn-info '+ (option==="1"?'active':'')}>
                <input
                  type="radio"
                  name="options"
                  id="option_a1"
                  autoComplete="off"
                  checked=""
                  value="1"

                  onChange={(event) => setOption(event.target.value)}
                />{" "}
                <i className="fas fa-th-large"></i>
              </label>
              <label className={'btn btn-info '+ (option==="2"?'active':'')}>
                <input
                  type="radio"
                  name="options"
                  id="option_a2"
                  autoComplete="off"
                  value="2"
                  onChange={(event) => setOption(event.target.value)}
                />{" "}
                <i className="fas fa-align-justify"></i>
              </label>
            </div>
          </div>
          <div className="col-7">
            <div className="form-group">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  onChange={(event) => setSearch(event.target.value)}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={onSearchHandler}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <select
                className="form-control"
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value)}
              >
                {props.cities.map((city, i) => (
                  <option value={city} key={i}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
      {option==="1" ? (
        <ColumnView
          peoples={filteredData}
          onAddContact={onAddContact}
          onDeleteContact={onDeleteContact}
          onAddFavourite={onAddFavourite}
          onDeleteFavourite={onDeleteFavourite}
        />
      ) : (
        <RowView
          peoples={filteredData}
          onAddContact={onAddContact}
          onDeleteContact={onDeleteContact}
          onAddFavourite={onAddFavourite}
          onDeleteFavourite={onDeleteFavourite}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

function mapDispatchToProps(dispatch) {
  return {
    AddContact: (id) => dispatch(AddContact(id)),
    DeleteContact: (id) => dispatch(DeleteContact(id)),
    AddFavourite: (id) => dispatch(AddFavourite(id)),
    DeleteFavourite: (id) => dispatch(DeleteFavourite(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
