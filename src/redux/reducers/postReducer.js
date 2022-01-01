import * as type from '../types/post'
const initialStatePost = {
    posts: [],
    error: '',
    isLoading: false,
    isFetching: false,
    post: {}
   

  };

  function postReducer(state = initialStatePost, action) {
    switch (action.type) {
                case type.GET_POSTS_REQUEST:  
                  return { 
                    ...state, 
                    isFetching: true,
                    error: ''
                      };
                case type.GET_POSTS_SUCCESS:
                  return { 
                    ...state,
                    isFetching: false,
                    posts: action.payload,
                  };
                case type.GET_POSTS_FAILED:
                  return {
                    ...state,
                    isFetching: false,
                    error: action.payload
                  };

                  case type.DELETE_POST_REQUEST:  
                  return { 
                    ...state, 
                    isLoading: true,
                    error: ''
                      };
                case type.DELETE_POST_SUCCESS:
                  return { 
                    ...state,
                    isLoading: false,
                    posts: state.posts.filter((item) => item.id !== action.payload.id),
                  };
                case type.DELETE_POST_FAILED:
                  return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                  };
                  case type.SET_POST:
                    return {
                      ...state,
                      post: action.payload
                    };

                  case type.UPDATE_POST_REQUEST:  
                    return { 
                      ...state, 
                      isLoading: true,
                      error: ''
                        };
                  case type.UPDATE_POST_SUCCESS:
                    return { 
                      ...state,
                      isLoading: false,
                      posts: state.posts.map(    
                        (form, i) => form.id === action.payload.id ? {...form, 
                          title : action.payload.title ,  
                          description: action.payload.description,
                          image: action.payload.image,
                          createdAt: action.payload.createdAt,
                        }   : form)  ,
                    };
                  case type.UPDATE_POST_FAILED:
                    return {
                      ...state,
                      isLoading: false,
                      error: action.payload
                    };

                    case type.CREATE_POST_REQUEST:  
                    return { 
                      ...state, 
                      isLoading: true,
                      error: ''
                        };
                  case type.CREATE_POST_SUCCESS:
                    return { 
                      ...state,
                      isLoading: false,
                      posts: [...state.posts, action.payload],
                    };
                  case type.CREATE_POST_FAILED:
                    return {
                      ...state,
                      isLoading: false,
                      error: action.payload
                    };

                    
             
           
         
       
        

      default:
        return state;
    }
  }

  export default postReducer;