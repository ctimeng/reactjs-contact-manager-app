import ColumnView from "./ColumnView";
import RowView from "./RowView";
import { useState } from "react";
import { connect } from "react-redux";
import { searchPeoples, FIREBASE_COLLECTION_PEOPLES } from "../../global";
import SearchBarView from "../SearchBarView";
import firebaseApp from '../../Firebase';
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const List = (props) => {
  const [option, setOption] = useState("1");
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(0);

  const db = getFirestore(firebaseApp);

  const filteredData = searchPeoples(props.peoples, search, city).filter(
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
      <SearchBarView
        cities={props.cities}
        option={option}
        setOption={setOption}
        setCity={setCity}
        setSearch={setSearch}
      />
      {option === "1" ? (
        <ColumnView
          peoples={filteredData}
          selectedId={selectedId}
          loading={loading}
          onDeleteFavourite={onDeleteFavourite}
        />
      ) : (
        <RowView
          peoples={filteredData}
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
