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

import firebaseApp from '../../Firebase';
import { getFirestore, updateDoc, doc, query, collection, where, getDocs, orderBy, startAt, endAt } from 'firebase/firestore/lite';
import { FIREBASE_COLLECTION_PEOPLES, searchPeoples } from "../../global";

const List = (props) => {
  const [isColumn, setIsColumn] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [search, setSearch] = useState('');

  const db = getFirestore(firebaseApp);

  const filteredData = searchPeoples(props.peoples, search, selectedCity)

  const firebaseSearch = async(search) => {
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
    /*firebaseApp.database()
     .ref(`/rooms/$roomKey/messages`)
     .orderByKey()
     .startAt(`${15039996197}`).on('value', snapshot => { console.log('test') });*/
    
    /* const startAt = 10; // Choose any value. The result of the query is always the same. The value is ignored.
    const limit = 10;

    collection(db, FIREBASE_COLLECTION_PEOPLES)
      .orderBy('name')
      .startAt(startAt)
      .limit(limit)
      .get()
      .then((data) => {
        // Always returns the same set of results.
        // No matter what the `startAt` value is the query aleays returns as it was `0`
      });*/

      const q = query(
        collection(db, FIREBASE_COLLECTION_PEOPLES),
        orderBy("name"),
        startAt(`%${search}%`),
        //endAt(search+'\uf8ff')
      )

      /*const q = query(
        collection(db, FIREBASE_COLLECTION_PEOPLES), 
        orderBy("name"), 
        where("name", ">=", search.toUpperCase()), 
        where("name", "<=", search.toLowerCase()+ "\uf8ff")
      );*/
      
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs)
  }

  const columnViewHandler = (e) => {
    setIsColumn(true);
  };

  const rowViewHandler = (e) => {
    setIsColumn(false);
  };

  const handleChange = (e) => {
    setSelectedCity(e.target.value)
  }

  const updateFirebaseContact = async(id, isContact) => {
    let peoples = props.peoples.filter((people) => {
      return Number(people.id) === Number(id)
    })
    const noteRef = doc(db, FIREBASE_COLLECTION_PEOPLES, peoples[0].refId);
    await updateDoc(noteRef, {
      isContact: isContact
    });
  }

  const onAddContact = (event, id) => {
    event.preventDefault();
    props.AddContact(id);
    updateFirebaseContact (id, true)
  };

  const onDeleteContact = (event, id) => {
    event.preventDefault();
    props.DeleteContact(id);
    updateFirebaseContact (id, false)
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
    firebaseSearch(search)
  }

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-2">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-info active"
                onClick={columnViewHandler}
              >
                <i className="fas fa-th-large"></i>
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={rowViewHandler}
              >
                <i className="fas fa-align-justify"></i>
              </button>
            </div>
          </div>
          <div className="col-7">
            <div className="form-group">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  onChange={event => setSearch(event.target.value)}
                />
                <div className="input-group-append">
                  <button type="button" className="btn btn-default" onClick={onSearchHandler}>
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <select className="form-control" value={selectedCity} onChange={handleChange}>
                {
                  props.cities.map((city, i) => (
                    <option value={city} key={i}>{city}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
      </form>
      {isColumn ? <ColumnView peoples={filteredData} onAddContact={onAddContact} onDeleteContact={onDeleteContact} onAddFavourite={onAddFavourite} onDeleteFavourite={onDeleteFavourite}/> : 
      <RowView peoples={filteredData} onAddContact={onAddContact} onDeleteContact={onDeleteContact} onAddFavourite={onAddFavourite} onDeleteFavourite={onDeleteFavourite}/>}
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
