import { all, fork } from "redux-saga/effects";
import tableSaga from "./table/table.actions";
import formSaga from "./form/form.actions";

export default function* root() {
  yield all([fork(tableSaga), fork(formSaga)]);
}
