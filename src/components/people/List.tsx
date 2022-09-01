import ColumnView from "./ColumnView";
import RowView from "./RowView";
import { useState } from "react";
import { connect } from "react-redux";
import { FIREBASE_COLLECTION_PEOPLES, searchPeoples } from "../../global";
import {SearchBarView, FilterData, DISPLAY_COLUMN} from "../custom/SearchBarView";
import firebaseApp from "../../Firebase";
import { doc, getFirestore, updateDoc, deleteDoc } from "firebase/firestore";

const List = (props: any) => {
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(0);
  const filter = FilterData();

  const filteredData = searchPeoples(props.peoples, filter.search, filter.city)

  const firestore = getFirestore(firebaseApp);

  const updateFirebase = async(id: string, fields: object, loading: number) => {
    setLoading(loading);
    setSelectedId(id);
    const noteRef = doc(firestore, FIREBASE_COLLECTION_PEOPLES, id);
    await updateDoc(noteRef, fields)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(0);
      });
  };

  const onAddContact = async (event: any, id: string) => {
    event.preventDefault();
    updateFirebase(id, { isContact: true }, 1);
  };

  const onDeleteContact = (event: any, id: string) => {
    event.preventDefault();
    updateFirebase(id, { isContact: false }, 1);
  };

  const onAddFavourite = (event: any, id: string) => {
    event.preventDefault();
    updateFirebase(id, { isFavourite: true }, 2);
  };

  const onDeleteFavourite = (event: any, id: string) => {
    event.preventDefault();
    updateFirebase(id, { isFavourite: false }, 2);
  };

  const onDeletePeople = async (event: any, id: string) => {
    event.preventDefault();
    const people = props.peoples.filter((people: any) => {
      return people.id === id;
    })[0];

    if (
      window.confirm("Are you sure, you want to delete [" + people.name + "] !")
    ) {
      setLoading(3);
      setSelectedId(id);
      const noteRef = doc(firestore, FIREBASE_COLLECTION_PEOPLES, id);
      await deleteDoc(noteRef)
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(0);
        });
    }
  };

  return (
    <div>
      <SearchBarView
        cities = {props.cities}
        filter = {filter}
      />
      {filter.option === DISPLAY_COLUMN ? (
        <ColumnView
          peoples={filteredData}
          selectedId={selectedId}
          loading={loading}
          onAddContact={onAddContact}
          onDeleteContact={onDeleteContact}
          onAddFavourite={onAddFavourite}
          onDeleteFavourite={onDeleteFavourite}
          onDeletePeople={onDeletePeople}
        />
      ) : (
        <RowView
          peoples={filteredData}
          loading={loading}
          selectedId={selectedId}
          onAddContact={onAddContact}
          onDeleteContact={onDeleteContact}
          onAddFavourite={onAddFavourite}
          onDeleteFavourite={onDeleteFavourite}
          onDeletePeople={onDeletePeople}
        />
      )}
      {props.peoples.length === 0 ? (
        <div className="overlay dark">
          <i className="fas fa-sync fa-spin"></i>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state: object) => ({
  ...state,
});

export default connect(mapStateToProps)(List);
