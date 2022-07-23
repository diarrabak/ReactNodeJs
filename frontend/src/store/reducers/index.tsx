import { researcherReducer } from "./researcherReducer";
import { articleReducer } from "./articleReducer";
import { jobReducer } from "./jobReducer";
import { infoReducer } from "./newsReducer";
import { eventReducer } from "./eventReducer";
import { combineReducers } from "redux";
import { groupReducer } from "./groupReducer";

const reducers=combineReducers({
    researchers:researcherReducer,
    articles:articleReducer,
    jobs:jobReducer,
    infos:infoReducer,
    events:eventReducer,
    groups:groupReducer,
});

export default reducers;