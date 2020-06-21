import { combineReducers } from "redux";
import settings from "./settings/reducer";
import menu from "./menu/reducer";
import authUser from "./auth/reducer";
import boardApp from "./board/reducer";
import ideaApp from "./idea/reducer";

const reducers = combineReducers({
  menu,
  settings,
  boardApp,
  ideaApp,

  authUser
});

export default reducers;
