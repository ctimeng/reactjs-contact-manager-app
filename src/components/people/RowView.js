import CardRowView from "../CardRowView";

const RowView = (props) => {
  return (
    <ul className="products-list product-list-in-card pl-2 pr-2">
      {props.peoples.map((people, index) => (
        <li className="item" key={index}>
          <CardRowView 
              people={people} 
              onAddContact={props.onAddContact} 
              onDeleteContact={props.onDeleteContact} 
              onAddFavourite={props.onAddFavourite} 
              onDeleteFavourite={props.onDeleteFavourite}/>
        </li>
      ))}
    </ul>
  );
};

export default RowView;
