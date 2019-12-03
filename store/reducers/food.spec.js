import { expect } from 'chai'
import reducer from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { getAllInventory } from './food'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  foods: []
}
const fakeFoods = [
  { name: 'apple', id: 2 },
  { name: 'pear', id: 1 },
  { name: 'orange', id: 4 }
]

describe('thunk creators', () => {
  let store
  let mockAxios
  let newState

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
    newState = reducer(initialState, {
      type: 'GOT_ALL_INVENTORY',
      foods: fakeFoods
    })
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('all foods', () => {
    it('gets all foods in users inventory', () => {
      expect(newState).to.be.deep.equal(fakeFoods)
    })
    xit('dispatches GOT_ALL_INVENTORY for user', async () => {
      mockAxios
        .onGet(`/api/foods`)
        .replyOnce(200, fakeFoods)
      await store.dispatch(getAllInventory())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ALL_INVENTORY')
      expect(actions[0].foods).to.be.deep.equal(fakeFoods)
    })
  })

  describe('add user food', () => {
    it('adds a food to the user inventory', () => {
      newState = {
        type: 'ADDED_FOOD',
        products: fakeFood
      }
      expect(newState).to.be.deep.equal(fakeFoods)
    })
    xit('eventually dispatches the ADDED_FOOD action', async () => {
      mockAxios.onPost(`/api/foods`).replyOnce(200, fakeFood)
      await store.dispatch(addFood(fakeFood)) //define products later
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADDED_FOOD')
      expect(actions[0].foods).to.be.deep.equal([...fakeFoods, food])
    })
  })
})
