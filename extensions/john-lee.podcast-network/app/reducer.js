import { storage, collection } from "@shoutem/redux-io";
import { combineReducers } from "redux";
import { ext } from "./const";

// combine reducers into one root reducer
export default combineReducers({
  podcasts: storage(ext("Podcasts")),
  allPodcasts: collection(ext("Podcasts"), "all")
});
