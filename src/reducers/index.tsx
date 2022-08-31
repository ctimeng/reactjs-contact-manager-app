import {
  ADD_ALL_PEOPLE
} from "../actions";


const initialState = {
  peoples: [],
  cities: []
};

export default function variable(state = initialState, action: any) {
  switch (action.type) {
    case ADD_ALL_PEOPLE:
      let peopleCities: any = [];
      action.payload.forEach(function (people: any) {
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
