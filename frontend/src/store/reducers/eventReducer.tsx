import apiRequest from "../../helpers/apiRequest";

const CURRENT_EVENT="current_event";
const ALL_EVENTS="all_events";

const initialState={
    allEvents:[],
    currentEvent:{},
}

export const getEvents=():any=>{
    return apiRequest({
        url: "events",
        method: "GET",
      });
};

export const createEvent=(data:any)=>{
    return apiRequest({
        url: "events",
        method: "POST",
        data
      });
};


export const deleteEvent=(id:any)=>{
    return apiRequest({
        url: `event/${id}`,
        method: "DELETE",
      });
};

export const updateEvent=(id:any, data:any)=>{
    return apiRequest({
        url: `event/${id}`,
        method: "PUT",
        data
      });
};

export const getEvent=(id:any)=>{
    return apiRequest({
        url: `event/${id}`,
        method: "GET",
      });
};

export const setEvents=(data:any)=>{
    return {
       type:ALL_EVENTS,
       payload:data,
    }
};

export const setEvent=(data:any)=>{
    return {
       type:CURRENT_EVENT,
       payload:data,
    }
};

export const eventReducer=(state=initialState, action:any={})=>{
    switch(action.type){
        case ALL_EVENTS:
            return {
                ...state,
                allEvents:action.payload,
            };
        case CURRENT_EVENT:
            return {
                ...state,
                currentEvent:action.payload,
            }
        default:
            return state;
    }

}
