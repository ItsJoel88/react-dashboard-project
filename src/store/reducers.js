import { combineReducers } from "redux";
import { reducer as tableSaga } from "./table/table.reducer";
import { reducer as formSaga } from "./form/form.reducer";

const reducers = combineReducers({
  table: tableSaga,
  form: formSaga,
});

export default reducers;
