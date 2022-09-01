import { useMemo } from "react";
import CardColumnView from "../custom/CardColumnView";
import { COLUMN_SIZE, gridData } from "../../global";

const ColumnView = (props: any) => {
  const peopleRows = useMemo(() => gridData(props.peoples), [props.peoples]);

  return (
    <div>
      {peopleRows.map((peopleColumns: any, index: number) => (
        <div className="row" key={index}>
          {peopleColumns.map((people: any) => (
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

export default ColumnView
