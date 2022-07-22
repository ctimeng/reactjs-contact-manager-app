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
import SearchBarView from "../SearchBarView";

const List = (props) => {
  const [option, setOption] = useState("1");
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  const db = getFirestore(firebaseApp);

  const filteredData = () => { 
    const peoples = searchPeoples(props.peoples, search, city)
    if (props.isContact === true) {
      return peoples.filter((people) => people.isContact === props.isContact);
    } else if (props.isFavourite === true) {
      return peoples.filter((people) => people.isFavourite === props.isFavourite);
    }
    return peoples
  };

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
      <SearchBarView cities={props.cities} option={option} setOption={setOption} setCity={setCity} setSearch={setSearch}/>
      {option === "1" ? (
        <ColumnView
          peoples={filteredData()}
          onAddContact={onAddContact}
          onDeleteContact={onDeleteContact}
          onAddFavourite={onAddFavourite}
          onDeleteFavourite={onDeleteFavourite}
        />
      ) : (
        <RowView
          peoples={filteredData()}
          onAddContact={onAddContact}
          onDeleteContact={onDeleteContact}
          onAddFavourite={onAddFavourite}
          onDeleteFavourite={onDeleteFavourite}
        />
      )}
      {props.peoples.length === 0 ? (
        <div className="overlay dark">
          <i className="fas fa-2x fa-sync-alt"></i>
        </div>
      ) : (
        ""
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
