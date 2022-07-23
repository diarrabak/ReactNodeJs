import apiRequest from "../../helpers/apiRequest";

const CURRENT_JOB="current_job";
const ALL_JOBS="all_jobs";

const initialState={
    allJobs:[],
    currentJob:{},
}

export const getJobs=():any=>{
    return apiRequest({
        url: "jobs",
        method: "GET",
      });
};

export const createJob=(data:any)=>{
    return apiRequest({
        url: "jobs",
        method: "POST",
        data
      });
};


export const deleteJob=(id:any)=>{
    return apiRequest({
        url: `job/${id}`,
        method: "DELETE",
      });
};

export const updateJob=(id:any)=>{
    return apiRequest({
        url: `job/${id}`,
        method: "PUT",
      });
};

export const getJob=(id:any)=>{
    return apiRequest({
        url: `job/${id}`,
        method: "GET",
      });
};

export const setJobs=(data:any)=>{
    return {
       type:ALL_JOBS,
       payload:data,
    }
};

export const setJob=(data:any)=>{
    return {
       type:CURRENT_JOB,
       payload:data,
    }
};

export const jobReducer=(state=initialState, action:any={})=>{
    switch(action.type){
        case ALL_JOBS:
            return {
                ...state,
                allJobs:action.payload,
            };
        case CURRENT_JOB:
            return {
                ...state,
                currentJob:action.payload,
            }
        default:
            return state;
    }

}
