const FIREBASE_ENABLE = true;
const FIREBASE_COLLECTION_PEOPLES: string = "peoples";
const GRID_COLUMN = 4;
const COLUMN_SIZE = 12 / GRID_COLUMN;

const gridData = (peoples: object[]) => {
  let rowData: object[] = [];
  let columnData: object[] = [];
  if (peoples.length <= GRID_COLUMN) {
    rowData.push(peoples);
  } else {
    peoples.forEach(function (people, i) {
      columnData.push(people);
      if ((i + 1) % GRID_COLUMN === 0 || i === peoples.length - 1) {
        rowData.push(columnData);
        columnData = [];
      }
    });
  }

  return rowData;
};

const searchPeoples = (
  peoples: any[] = [],
  search = '',
  city = ''
) => {
  return peoples
    .filter((people) => {
      if (search === "") {
        return people;
      } else {
        return (
          people.name.toLowerCase().includes(search.toLowerCase()) ||
          people.city.toLowerCase().includes(search.toLowerCase()) ||
          people.company.toLowerCase().includes(search.toLowerCase()) ||
          people.position.toLowerCase().includes(search.toLowerCase())
        );
      }
    })
    .filter((people) => {
      if (city === "") {
        return people;
      } else {
        return people.city.toLowerCase().includes(city.toLowerCase());
      }
    });
};

const getFindIndexById = (peoples: any[], id: Number) => {
  return peoples.findIndex(people => people.id === id)
}

export {
  FIREBASE_ENABLE,
  FIREBASE_COLLECTION_PEOPLES,
  GRID_COLUMN,
  COLUMN_SIZE,
  gridData,
  searchPeoples,
  getFindIndexById
};
