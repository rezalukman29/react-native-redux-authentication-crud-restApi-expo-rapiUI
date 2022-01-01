import * as type from '../types/post'
import * as myFunction from '../../components/lib/function';
const apiUrl = `https://61c823f0adee460017260ba9.mockapi.io/api/azer29/posts`

export const getPosts = (users) => async dispatch => {

        dispatch({
          type: type.GET_POSTS_REQUEST,
        });


        try {
  
          const response = await fetch(apiUrl , {
            method: 'GET',
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json;charset=UTF-8",
            },
          
          })
          const result = await response.json();
         
          dispatch({
            type: type.GET_POSTS_SUCCESS,
            payload:  myFunction.merge(result,users)
          });
    
    } catch (error) {
      dispatch({
        type: type.GET_POSTS_FAILED,
        payload: error
      });
    }
  };

  
  export const removePost = (post) => async dispatch => {


    dispatch({
      type: type.DELETE_POST_REQUEST,
    });
      try {

              const response =  await fetch(apiUrl + '/' + post.id , {
                method: 'DELETE',
                headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json;charset=UTF-8",
                },
              
              })
              const result = await response.json();
              
              dispatch({
                type: type.DELETE_POST_SUCCESS,
                payload: result
              });

      } catch (error) {
        dispatch({
          type: type.DELETE_POST_FAILED,
          payload: error
        });
  }
};

export const setPost = (post) => {
  return (dispatch) => {


    dispatch({
      type: type.SET_POST,
      payload: post,
    });
  };
};


export const updatePost = (formUpdate) => async dispatch => {




  dispatch({
    type: type.UPDATE_POST_REQUEST,
  });
    try {

            const response =  await fetch(apiUrl + '/' + formUpdate.id, {
              method: 'PUT',
              headers: {
                Accept: "application/json, text/plain, */*",
                "content-type": "application/json; charset=utf-8",

              },
              body: JSON.stringify(myFunction.removeId(formUpdate))
            
            })
            const result = await response.json();
          
            dispatch({
              type: type.UPDATE_POST_SUCCESS,
              payload: result
            });
        

 

    } catch (error) {
      dispatch({
        type: type.UPDATE_POST_FAILED,
        payload: error
      });
}
};


export const createPost = (form) => async dispatch => {
  dispatch({
    type: type.CREATE_POST_REQUEST,
  });
    try {

            const response =  await fetch(apiUrl, {
              method: 'POST',
              headers: {
                Accept: "application/json, text/plain, */*",
                "content-type": "application/json; charset=utf-8",

         
              },
              body: JSON.stringify(form)
            
            })
            const result = await response.json();
    
            dispatch({
              type: type.CREATE_POST_SUCCESS,
              payload: result
            });

    } catch (error) {
      dispatch({
        type: type.CREATE_POST_FAILED,
        payload: error
      });
}
};





  

  




