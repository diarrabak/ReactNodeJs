import apiRequest from "../../helpers/apiRequest";

const CURRENT_RESEARCHER="current_researcher";
const ALL_RESEARCHERS="all_researchers";

const initialState={
    allResearchers:[],
    currentResearcher:{},
}

export const getResearchers=():any=>{
    return apiRequest({
        url: "researchers",
        method: "GET",
      });
};

export const createResearcher=(data:any)=>{
    return apiRequest({
        url: "researchers",
        method: "POST",
        data
      });
};


export const deleteResearcher=(id:any)=>{
    return apiRequest({
        url: `researcher/${id}`,
        method: "DELETE",
      });
};

export const updateResearcher=(id:any)=>{
    return apiRequest({
        url: `researcher/${id}`,
        method: "PUT",
      });
};

export const getResearcher=(id:any)=>{
    return apiRequest({
        url: `researcher/${id}`,
        method: "GET",
      });
};

export const setResearchers=(data:any)=>{
    return {
       type:ALL_RESEARCHERS,
       payload:data,
    }
};

export const setResearcher=(data:any)=>{
    return {
       type:CURRENT_RESEARCHER,
       payload:data,
    }
};

export const researcherReducer=(state=initialState, action:any={})=>{
    switch(action.type){
        case ALL_RESEARCHERS:
            return {
                ...state,
                allResearchers:action.payload,
            };
        case CURRENT_RESEARCHER:
            return {
                ...state,
                currentResearcher:action.payload,
            }
        default:
            return state;
    }

}
