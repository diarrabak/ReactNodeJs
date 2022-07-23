import apiRequest from "../../helpers/apiRequest";

const CURRENT_INFO="current_info";
const ALL_INFOS="all_infos";

const initialState={
    allInfos:[],
    currentInfo:{},
}

export const getInfos=():any=>{
    return apiRequest({
        url: "infos",
        method: "GET",
      });
};

export const createInfo=(data:any)=>{
    return apiRequest({
        url: "infos",
        method: "POST",
        data
      });
};


export const deleteInfo=(id:any)=>{
    return apiRequest({
        url: `info/${id}`,
        method: "DELETE",
      });
};

export const updateInfo=(id:any)=>{
    return apiRequest({
        url: `info/${id}`,
        method: "PUT",
      });
};

export const getInfo=(id:any)=>{
    return apiRequest({
        url: `info/${id}`,
        method: "GET",
      });
};

export const setInfos=(data:any)=>{
    return {
       type:ALL_INFOS,
       payload:data,
    }
};

export const setInfo=(data:any)=>{
    return {
       type:CURRENT_INFO,
       payload:data,
    }
};

export const infoReducer=(state=initialState, action:any={})=>{
    switch(action.type){
        case ALL_INFOS:
            return {
                ...state,
                allInfos:action.payload,
            };
        case CURRENT_INFO:
            return {
                ...state,
                currentInfo:action.payload,
            }
        default:
            return state;
    }

}
