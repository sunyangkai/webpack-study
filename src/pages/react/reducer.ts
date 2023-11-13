import  { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ReactHomeState {
  value: number,
  data: string[],
  dataLoading: Boolean,
  dataError: string,

}

const initialState: ReactHomeState = {
  value: 0,
  data: [],
  dataLoading: false,
  dataError: '',
}

export const reactHomeSlice = createSlice({
  name: 'reactHome',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    setData: (state, action: PayloadAction<string[]>) => {
      state.data = action.payload
    },
    fetchRequest: (state) => {
      state.dataLoading = true; 
      state.dataError = '';
    }
  },
});

export const reactHomeActions = reactHomeSlice.actions;
export default reactHomeSlice.reducer;


/*
  redux工作流程： 
      派发 Action （一个js对象，里面有type字段和payload更新数据） -> 
      reudcer函数执行更新逻辑 （接收action，执行更新逻辑） -> 
      修改更新store （在reudcer函数里更新state） -> 
      UI响应变化 （通过connect或者useSelecthooks连接redux store更新UI）


  核心概念：
    Store
      是整个应用状态的集中存储处。在 Redux 中，整个应用只有一个 store。
      它提供了几个关键的方法，如 
          dispatch(action) 用于派发 action，
          getState() 用于获取当前 state，
          subscribe(listener) 用于注册监听器
    
    Action
      是一个普通的 JavaScript 对象，它描述了发生了什么  { type: 'xxx', payload: { data: [] }}
      Action 是改变 state 的唯一途径，并且是以同步方式派发的


    reducer
      Reducer 是一个函数，它接受当前的 state 和一个 action 作为参数，并返回新的 state
      它们必须是纯函数，即在相同的输入下始终返回相同的输出，并且不产生副作用
      大型应用通常将 reducer 拆分成多个小的 reducer，分别管理 state 树的不同部分，然后使用 combineReducers 将它们合并起来
        function todoReducer(state = [], action) {
          switch (action.type) {
            case 'ADD_ITEM':
              return [...state, action.payload];
            default:
              return state;
          }
        }


 */