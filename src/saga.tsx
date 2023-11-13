import { all } from 'redux-saga/effects';
import { watchReactSaga } from 'src/pages/react/saga';

export default function* rootSaga() {
  yield all([
    watchReactSaga(),
    // 其他模块的 Sagas 可以在这里添加
  ]);
}
