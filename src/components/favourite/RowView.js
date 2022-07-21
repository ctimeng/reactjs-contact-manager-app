import CardRowView from "../CardRowView";

const RowView = (props) => {
  return (
    <ul className="products-list product-list-in-card pl-2 pr-2">
      {props.peoples.map((people, i) => (
        <li className="item" key={i}>
          <CardRowView 
              people={people}
              onAddContact={null}
              onDeleteContact={null}
              onAddFavourite={props.onAddFavourite}
              onDeleteFavourite={null}/>
        </li>
      ))}
    </ul>
  );
};

export default RowView;
