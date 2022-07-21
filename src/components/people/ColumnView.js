import { useMemo } from "react";
import CardColumnView from "../CardColumnView"
import { COLUMN_SIZE, gridData} from "../../global";

const ColumnView = (props) => {
  const peopleRows = useMemo(() => gridData(props.peoples), [props.peoples]);

  return (
    <div>
      {peopleRows.map((peopleColumns, index) => (
        <div className="row" key={index}>
          {peopleColumns.map((people) => (
            <div className={'col-md-'+COLUMN_SIZE} key={people.id}>
              <CardColumnView 
              people={people} 
              onAddContact={props.onAddContact} 
              onDeleteContact={props.onDeleteContact} 
              onAddFavourite={props.onAddFavourite} 
              onDeleteFavourite={props.onDeleteFavourite}/>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ColumnView;
