import React, { useMemo } from "react";
import CardColumnView from "../custom/CardColumnView";
import { COLUMN_SIZE, gridData } from "../../global";

const ColumnView = (props: any) => {
  const peopleRows = useMemo(() => gridData(props.peoples), [props.peoples]);

  return (
    <div>
      {peopleRows.map((peopleColumns: any, columnIndex: number) => (
        <div className="row" key={columnIndex}>
          {peopleColumns.map((people: any, rowIndex: number) => (
            <div className={"col-md-" + COLUMN_SIZE} key={rowIndex}>
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
