import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from "./saga";
import reactHomeSlice from 'src/pages/react/reducer'

const sagaMiddleware = createSagaMiddleware();



const loggerMiddleware = store => next => action => {
    return next(action); // next 下一个中间件，中间件最后一个为reducer
};

const reduxthunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') { // 如果action是个函数，执行它
        return action(dispatch, getState)
    }
    return next(action)
}

/*
    中间件的思路就是增加钱store.dispatch
    function appluyMiddleWare(store, ...middlewares) {
        middlewares.reverse().forEach(middleWare => {
           store.dispatch =  middleWare(store)(store.dispatch)
        });
        Object.assign({}, store, { dispatch });
    }



    为什么要柯里化？
    const func1 =  middleware(store); // 
    // 中间还可以做很多事，甚至修改store.dispatch， store.dispatch = (aciton) => { xxxx; store.dispatch(aciton) }
    func1(store.dispatch)

*/


const store = configureStore({
  reducer: {
    react: reactHomeSlice
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat([loggerMiddleware, sagaMiddleware]),
/*
  Redux Thunk：用于在 Redux 中处理异步逻辑。其主要用途是允许 action creators 返回一个函数而不是一个 action 对象。这个函数可以执行异步操作
*/
});

sagaMiddleware.run(rootSaga); // Saga 中间件的运行依赖于 store 的存在，因此您需要先创建 store，然后再运行 Saga 中间件。

type RootState = ReturnType<typeof store.getState>; 
// typeof store.getState 返回的是 store.getState 函数的类型
// ReturnType<T> 是 TypeScript 中的一个工具类型，用于获取函数类型 T 的返回值类型。如果 T 不是一个函数类型，这会引发一个 TypeScript 错误。
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, useTypedSelector, useDispatch }









/*

    不使用tokit/redux会增加很多模版代码, init对象，switch匹配

1.store.js:
    import { createStore, combineReducers } from "redux";
    import { hooks } from "../home/hooks/reducer";
    import { javascript } from '../home/javascript/reducer';
    import { HookState } from '../home/hooks/reducer';

    export interface State {
        hooks: HookState
    }

    // 全局你可以创建多个reducer 在这里统一在一起
    const rootReducers = combineReducers({
        hooks,
        javascript
    })
    // 全局就管理一个store
    export const store = createStore(rootReducers)


2.hooks-reducer:
export const SET_LIST = 'SETLIST';
export const SET_TITLE = 'SET_TITLE';
const initData = {
    num: 0,
    title: '默认',
    list: []
}

const hooks = (state: HookState = initData, action ) => {
    switch (action.type) {
        case SET_LIST:
            return {
                ...state,
                list: action.list
            }
        case SET_TITLE:
            return {
                ...state,
                title: action.title
            }
        default:
            return state
    }
}



*/




/*
    自定义中间件：
        // 中间件的结构利用了柯里化，这是一种在函数式编程中常用的技术。柯里化是将一个多参数的函数转换成多个单参数函数的过程。
        // 这样的设计允许中间件在传递 store 和 next 函数时，以闭包的形式保留这些数据，以便于当 action 被传递时可以使用
        const myMiddleware = store => next => action => {
            // 在 action 被发送到 reducer 之前执行的代码
            return next(action);
        };

        store: 一个包含 getState 和 dispatch 方法的 Redux store 对象。
        next: 是一个将 action 传递到中间件链中下一个中间件的函数。
        action: 是当前被派发的 action。

*/