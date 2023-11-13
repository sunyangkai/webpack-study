


import { ReactHome } from './react/index';
import { JavascriptHome } from './javascript/index';


export const routesConfig = [
    {
      path: '/hooks',
      component:  JavascriptHome,
    },
    {
      path: '/react',
      component: ReactHome,
    },
    {
      path: '',
      component:  ReactHome,
    }
  ]
  