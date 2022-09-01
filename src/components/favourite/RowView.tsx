import CardRowView from "../custom/CardRowView";

const RowView = (props: any) => {
  return (
    <ul className="products-list product-list-in-card pl-2 pr-2">
      {props.peoples.map((people: any, index:number) => (
        <li className="item" key={index}>
          <CardRowView 
              people={people}
              onAddContact={null}
              onDeleteContact={null}
              onAddFavourite={null}
              onDeleteFavourite={props.onDeleteFavourite}
              onEditPeople={null}
              onDeletePeople={null}/>
        </li>
      ))}
    </ul>
  );
};

export default RowView
