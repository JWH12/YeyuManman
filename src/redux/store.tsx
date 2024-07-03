import { combineReducers, createStore } from "redux";
import festivalEvalReducer from "./reducer";

const rootReducer = combineReducers({
  festivalEvalution: festivalEvalReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
