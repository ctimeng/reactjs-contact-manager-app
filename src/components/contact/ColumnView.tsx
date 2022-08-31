import { useMemo } from "react";
import CardColumnView from "../custom/CardColumnView";
import { COLUMN_SIZE, gridData } from "../../global";

const ColumnView = (props: any) => {
  const peopleRows = useMemo(() => gridData(props.peoples), [props.peoples]);

  return (
    <div>
      {peopleRows.map((peopleColumns: any, i) => (
        <div className="row" key={i}>
          {peopleColumns.map((people: any) => (
            <div className={"col-md-" + COLUMN_SIZE} key={people.id}>
              <CardColumnView
                people={people}
                selectedId={0}
                loading={0}
                onAddContact={null}
                onDeleteContact={props.onDeleteContact}
                onAddFavourite={props.onAddFavourite}
                onDeleteFavourite={props.onDeleteFavourite}
                onDeletePeople={null}
                onEditPeople={null}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ColumnView
