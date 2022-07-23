import apiRequest from "../../helpers/apiRequest";

const CURRENT_GROUP="current_group";
const ALL_GROUPS="all_groups";

const initialState={
    allGroups:[],
    currentGroup:{},
}

export const getGroups=():any=>{
    return apiRequest({
        url: "groups",
        method: "GET",
      });
};

export const createGroup=(data:any)=>{
    return apiRequest({
        url: "groups",
        method: "POST",
        data
      });
};


export const deleteGroup=(id:any)=>{
    return apiRequest({
        url: `group/${id}`,
        method: "DELETE",
      });
};

export const updateGroup=(id:any)=>{
    return apiRequest({
        url: `group/${id}`,
        method: "PUT",
      });
};

export const getGroup=(id:any)=>{
    return apiRequest({
        url: `group/${id}`,
        method: "GET",
      });
};

export const setGroups=(data:any)=>{
    return {
       type:ALL_GROUPS,
       payload:data,
    }
};

export const setGroup=(data:any)=>{
    return {
       type:CURRENT_GROUP,
       payload:data,
    }
};

export const groupReducer=(state=initialState, action:any={})=>{
    switch(action.type){
        case ALL_GROUPS:
            return {
                ...state,
                allGroups:action.payload,
            };
        case CURRENT_GROUP:
            return {
                ...state,
                currentGroup:action.payload,
            }
        default:
            return state;
    }

}
