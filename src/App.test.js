import configureMockStore from 'redux-mock-store'
import redux from 'redux'
import thunk from 'redux-thunk'
//import * as actions from '../../actions/TodoActions'
//import * as types from '../../constants/ActionTypes'
import nock from 'nock'
import expect from 'expect' // You can use any testing library
import App from './App'
import { fetchTodos } from './App'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {

    nock('http://example.com/')
      .get('/todos')
      .reply(200, { body: { todos: ['do something'] } })

    const expectedActions = [
      { type: "FETCH_TODOS_REQUEST" },
      { type: "FETCH_TODOS_SUCCESS", body: { todos: ['do something'] } }
    ]
    const store = mockStore({ todos: [] })
    console.log('get state=',store.getState())

    return store.dispatch(fetchTodos()).then(() => {
      //console.log('get state=',store.getState())
      // return of async actions
      console.log('store.getActions()=',store.getActions())
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})
