import {
  ADD_ALL_PEOPLE
} from "../actions";


const initialState = {
  peoples: [],
  cities: []
};

export default function variable(state = initialState, action) {
  switch (action.type) {
    case ADD_ALL_PEOPLE:
      let peopleCities = [];
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
    default:
      return state;
  }
}
