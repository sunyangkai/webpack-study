import { call, put, takeLatest, takeEvery, cancelled } from 'redux-saga/effects';
import { reactHomeActions } from './reducer';
import { fetchApi1 } from './http-service';


function* fetchApi1Effect() {
  console.log('fetchApi1Effect')
  try {
    const data = yield call(fetchApi1);
    yield put(reactHomeActions.setData(data));
  } catch (e) {
    console.log('error', e)
    throw(e);
  } finally {
    if (yield cancelled()) {
        console.log('cancelled')
    } else {
      console.log('success')
    }
  }
}

export function* watchReactSaga() {
  yield takeLatest(reactHomeActions.fetchRequest.type, fetchApi1Effect);
}

/*
  在 Redux 中，一个 action 是一个具有 type 属性的普通 JavaScript 对象。它可用于描述状态应如何改变。
  在 Redux-Saga 中，effect 是一种特殊的对象，它指示 Saga 中间件执行特定的副作用
    比如 call 创建了一个 effect，用于调用 fetchTodoApi 函数。它不会立即调用该函数，而是返回一个描述对象，告诉 Saga 中间件如何调用这个函数
*/
/*


 call: 用于调用异步函数。它创建一个 Effect 描述信息

 put:用于派发一个 action。它创建一个 Effect，指示 middleware 派发一个 action 到 store

 select: 用于从 state 中选择一部分数据.
      const selectData = state => state.data;
      function* saga() {
        const data = yield select(selectData);
      }

take: 用于监听 Redux store 中的特定 actions
      import { take } from 'redux-saga/effects';

      function* saga() {
        const action = yield take('ACTION_TYPE'); // ACTION_TYPE aciton执行时这行代码才继续前进
      }

fork: fork 用于创建一个新的任务。它类似于 call，都用于调用函数，但不同的是 fork 是非阻塞的。
      当您 fork 一个任务时，Saga 会在后台启动该任务，然后立即继续执行后面的代码，而不会等待 fork 的任务完成。
      import { fork } from 'redux-saga/effects';

      function* someTask() {
        // 执行一些操作
      }

      function* saga() {
        yield fork(someTask);
        // 'someTask' 已在后台启动，Saga 会继续执行这里的代码
      }

takeEvery: 自动处理并行执行多个相同类型的 action。
      import { takeEvery } from 'redux-saga/effects';

      function* watchSaga() {
        yield takeEvery('ACTION_TYPE', saga);
      }

takeLatest: takeEvery 类似，但它只会执行最后一次触发的 action。
      import { takeLatest } from 'redux-saga/effects';

      function* watchSaga() {
        yield takeLatest('ACTION_TYPE', saga);
      }

all:  用于同时执行多个 Effect，并等待它们全部完成
      import { all, call } from 'redux-saga/effects';

      function* saga() {
        yield all([
          call(saga1),
          call(saga2),
        ]);
      }

race: 用于同时执行多个 Effect，并只等待第一个完成
      import { race, call, take } from 'redux-saga/effects';

      function* saga() {
        yield race({
          data: call(fetchData),
          timeout: take('TIMEOUT_ACTION'),
        });
      }
*/