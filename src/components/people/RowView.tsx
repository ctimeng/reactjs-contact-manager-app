import CardRowView from "../custom/CardRowView";

const RowView = (props: any) => {
  return (
    <ul className="products-list product-list-in-card pl-2 pr-2">
      {props.peoples.map((people: object, index: number) => (
        <li className="item" key={index}>
          <CardRowView
            people={people}
            selectedId={props.selectedId}
            loading={props.loading}
            onAddContact={props.onAddContact}
            onDeleteContact={props.onDeleteContact}
            onAddFavourite={props.onAddFavourite}
            onDeleteFavourite={props.onDeleteFavourite}
            onDeletePeople={props.onDeletePeople}
            onEditPeople={null}
          />
        </li>
      ))}
    </ul>
  );
};

export default RowView
