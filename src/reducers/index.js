import {
  ADD_ALL_PEOPLE,
  ADD_CONTACT,
  DELETE_CONTACT,
  ADD_FAVOURITE,
  DELETE_FAVOURITE
} from "../actions";

import { FIREBASE_COLLECTION_PEOPLES, getFindIndexById } from "../global";
import firebaseApp from '../Firebase';
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const initialState = {
  peoples: [],
  cities: []
};

const db = getFirestore(firebaseApp);

const updateFirebase = async(id, fields) => {
  const noteRef = doc(db, FIREBASE_COLLECTION_PEOPLES, id);
  await updateDoc(noteRef, fields);
}

export default function variable(state = initialState, action) {
  let index = 0
  let refId = ''

  switch (action.type) {
    case ADD_ALL_PEOPLE:
      let peopleCities = ["All City"];
      action.payload.forEach(function (people, i) {
        if (!peopleCities.includes(people.city)) {
          peopleCities.push(people.city);
        }
      });

      return {
        ...state,
        peoples: action.payload,
        cities: peopleCities
      };
    case ADD_CONTACT:
      index = getFindIndexById(state.peoples, action.payload)
      state.peoples[index].isContact = true;
      refId = state.peoples[index].refId
      if ( refId !== '') {
        updateFirebase(refId, { isContact : true })
      }

      return {
        ...state,
        peoples: [...state.peoples],
      };
    case DELETE_CONTACT:
      index = getFindIndexById(state.peoples, action.payload)
      state.peoples[index].isContact = false;
      refId = state.peoples[index].refId
      if ( refId !== '') {
        updateFirebase(refId, { isContact : false })
      }

      return {
        ...state,
        peoples: [...state.peoples],
      };
    case ADD_FAVOURITE:
      index = getFindIndexById(state.peoples, action.payload)
      state.peoples[index].isFavourite = true;
      refId = state.peoples[index].refId
      if ( refId !== '') {
        updateFirebase(refId, { isFavourite : true })
      }

      return {
        ...state,
        peoples: [...state.peoples],
      };
    case DELETE_FAVOURITE:
      index = getFindIndexById(state.peoples, action.payload)
      state.peoples[index].isFavourite = false;
      refId = state.peoples[index].refId
      if ( refId !== '') {
        updateFirebase(refId, { isFavourite : false })
      }

      return {
        ...state,
        peoples: [...state.peoples],
      };
    default:
      return state;
  }
}
