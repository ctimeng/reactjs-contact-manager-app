import { useMemo } from "react";
import CardColumnView from "../custom/CardColumnView";
import { COLUMN_SIZE, gridData } from "../../global";

const ColumnView = (props) => {
  const peopleRows = useMemo(() => gridData(props.peoples), [props.peoples]);

  return (
    <div>
      {peopleRows.map((peopleColumns, i) => (
        <div className="row" key={i}>
          {peopleColumns.map((people, index) => (
            <div className={"col-md-" + COLUMN_SIZE} key={people.id}>
              <CardColumnView
                people={people}
                onAddContact={null}
                onDeleteContact={null}
                onAddFavourite={null}
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

export default ColumnView;
