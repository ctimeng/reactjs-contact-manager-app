import { useMemo } from "react";
import CardColumnView from "../CardColumnView";
import { COLUMN_SIZE, gridData } from "../../global";

const ColumnView = (props) => {
  const peopleRows = useMemo(() => gridData(props.peoples), [props.peoples]);

  return (
    <div>
      {peopleRows.map((peopleColumns, index) => (
        <div className="row" key={index}>
          {peopleColumns.map((people, index2) => (
            <div className={"col-md-" + COLUMN_SIZE} key={index2}>
              <CardColumnView
                people={people}
                selectedId={props.selectedId}
                loading={props.loading}
                onAddContact={props.onAddContact}
                onDeleteContact={props.onDeleteContact}
                onAddFavourite={props.onAddFavourite}
                onDeleteFavourite={props.onDeleteFavourite}
                onDeletePeople={props.onDeletePeople}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ColumnView;
