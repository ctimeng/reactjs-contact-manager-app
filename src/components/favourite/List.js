import ColumnView from "./ColumnView";
import RowView from "./RowView";
import { useState } from "react";
import { connect } from "react-redux";
import { FIREBASE_COLLECTION_PEOPLES, searchPeoples } from "../../global";
import {SearchBarView, FilterData, DISPLAY_COLUMN} from "../custom/SearchBarView";
import firebaseApp from '../../Firebase';
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const List = (props) => {
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(0);
  const filter = FilterData();

  const db = getFirestore(firebaseApp);

  const filteredPeoples = searchPeoples(props.peoples, filter.search, filter.city).filter(
    (people) => people.isFavourite === true
  );

  const updateFirebase = async(id, fields, loading) => {
    setLoading(loading)
    setSelectedId(id)
    const noteRef = doc(db, FIREBASE_COLLECTION_PEOPLES, id);
    await updateDoc(noteRef, fields).catch((err) => {
      console.error(err)
    }).finally(() => {
      setLoading(0)
    })
  }

  const onDeleteFavourite = (event, id) => {
    event.preventDefault();
    updateFirebase(id, {isFavourite: false}, 2);
  };

  return (
    <div>
      <SearchBarView cities={props.cities} filter={filter}/>
      {filter.option === DISPLAY_COLUMN ? (
        <ColumnView
          peoples={filteredPeoples}
          selectedId={selectedId}
          loading={loading}
          onDeleteFavourite={onDeleteFavourite}
        />
      ) : (
        <RowView
          peoples={filteredPeoples}
          selectedId={selectedId}
          loading={loading}
          onDeleteFavourite={onDeleteFavourite}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(List);
