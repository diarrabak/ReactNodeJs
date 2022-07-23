
import apiRequest from "../../helpers/apiRequest";

const CURRENT_ARTICLE="current_article";
const ALL_ARTICLES="all_articles";

const initialState={
    allArticles:[],
    currentArticle:{},
}
export const getArticles=():any=>{
    return apiRequest({
        url: "articles",
        method: "GET",
      });
};

export const createArticle=(data:any)=>{
    return apiRequest({
        url: "articles",
        method: "POST",
        data
      });
};


export const deleteArticle=(id:any)=>{
    return apiRequest({
        url: `article/${id}`,
        method: "DELETE",
      });
};

export const updateArticle=(id:any, data:any)=>{
    return apiRequest({
        url: `article/${id}`,
        method: "PUT",
        data
      });
};

export const getArticle=(id:any)=>{
    return apiRequest({
        url: `article/${id}`,
        method: "GET",
      });
};

export const setArticle=(data:any)=>{
    return {
       type:CURRENT_ARTICLE,
       payload:data,
    }
};

export const setArticles=(data:any)=>{
    return {
       type:ALL_ARTICLES,
       payload:data,
    }
};

export const articleReducer=(state=initialState, action:any={})=>{
    switch(action.type){
        case ALL_ARTICLES:
            return {
                ...state,
                allArticles:action.payload,
            };
        case CURRENT_ARTICLE:
            return {
                ...state,
                currentArticle:action.payload,
            }
        default:
            return state;
    }

}
