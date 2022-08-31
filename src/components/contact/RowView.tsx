import CardRowView from "../custom/CardRowView";

const RowView = (props: any) => {
  return (
    <ul className="products-list product-list-in-card pl-2 pr-2">
      {props.peoples.map((people: any, index: undefined) => (
        <li className="item" key={index}>
          <CardRowView
            people={people}
            onAddContact={null}
            onDeleteContact={props.onDeleteContact}
            onAddFavourite={props.onAddFavourite}
            onDeleteFavourite={props.onDeleteFavourite}
            onDeletePeople={null}
            onEditPeople={null}
          />
        </li>
      ))}
    </ul>
  );
};

export default RowView;
