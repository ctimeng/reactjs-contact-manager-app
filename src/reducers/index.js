import {
  ADD_ALL_PEOPLE,
  ADD_CONTACT,
  DELETE_CONTACT,
  ADD_FAVOURITE,
  DELETE_FAVOURITE,
  GetDefualtContact,
} from "../actions";

const initialState = {
  peoples: [],
  cities: []
};

export default function variable(state = initialState, action) {
  switch (action.type) {
    case ADD_ALL_PEOPLE:
      let peopleCities = [""];
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
      state.peoples.forEach((people, index) => {
        if (Number(people.id) === Number(action.payload)) {
          state.peoples[index].isContact = true;
        }
      });

      return {
        ...state,
        peoples: [...state.peoples],
      };
    case DELETE_CONTACT:
      state.peoples.forEach((people, index) => {
        if (Number(people.id) === Number(action.payload)) {
          state.peoples[index].isContact = false;
        }
      });

      return {
        ...state,
        peoples: [...state.peoples],
      };
    case ADD_FAVOURITE:
      state.peoples.forEach((people, index) => {
        if (Number(people.id) === Number(action.payload)) {
          state.peoples[index].isFavourite = true;
        }
      });

      return {
        ...state,
        peoples: [...state.peoples],
      };
    case DELETE_FAVOURITE:
      state.peoples.forEach((people, index) => {
        if (Number(people.id) === Number(action.payload)) {
          state.peoples[index].isFavourite = false;
        }
      });

      return {
        ...state,
        peoples: [...state.peoples],
      };
    default:
      return state;
  }
}
