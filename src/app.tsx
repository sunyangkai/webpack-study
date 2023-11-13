import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './reducer';

import { AppRouter } from './router';


const MOUNT_NODE = document.getElementById('wrap');

const AppContainer = () => (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)


const render = () => {
    const root = createRoot(MOUNT_NODE);
    root.render(<AppContainer />,)
}
 



export default render;