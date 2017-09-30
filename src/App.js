import fetch from 'isomorphic-fetch'

function fetchTodosRequest() {
    return {
        type: 'FETCH_TODOS_REQUEST'
    }
}

function fetchTodosSuccess(body) {
    return {
        type: 'FETCH_TODOS_SUCCESS', body
    }
}

function fetchTodosFailure(ex) {
    return {
        type: "FETCH_TODOS_FAILURE",
        ex
    }
}

//todo how does this work???
//this is a thunk which returns an action as a function
export function fetchTodos(i) {
  return dispatch => {
    dispatch(fetchTodosRequest())
      return fetch('http://example.com/todos/'+i)
      .then(res => res.json())
      .then(json => dispatch(fetchTodosSuccess(json.body)))
      .catch(ex => dispatch(fetchTodosFailure(ex)))
  }
}
