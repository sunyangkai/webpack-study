import { Suspense, useEffect } from 'react';
import { Route, Switch, BrowserRouter, HashRouter, Router   } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history'; // history@4.x版本配合 react-router@5.x

import { routesConfig } from './pages/router';

const history = createBrowserHistory<{ basename: string }>({ basename: '/main' }); 


// 如果要自定义history 加入自定义逻辑
// 尽可能地限制对 history 方法的修改。如果必须修改，确保变更尽可能小，并且不要影响原有方法的主要功能。
// 尽可能有文档说明
// 虽然覆写 history 对象的方法可以为您提供额外的灵活性，但这需要谨慎处理
const appHistory = {      
    ...history,
    push: (path, state) => { //  // 在这里添加自定义逻辑
         /*
                if (location.state) {
                    const key = randomString(15);
                    sessionStorage.setItem(key, JSON.stringify(location.state));
                    location.query = {
                        ...location.query,
                        __key: key
                    }
                }
         */
        history.push(path, state);
    },
}


/*
    react-router 提供了路由的核心功能，而 react-router-dom 在此基础上添加了专门针对 Web 应用的功能和组件 .
    在开发 Web 应用时，通常直接使用 react-router-dom，因为它包括了 react-router 的所有功能，

    react-router: 
        它包括了路由所需的基础组件和钩子（Hooks），例如 <Route>、<Switch>、useHistory、useLocation 等
        提供了基本的路由功能，如路由定义、路由匹配、历史记录管理等。
    react-router-dom:
        提供了一些专门用于 Web 的组件，如 <BrowserRouter>、<Link>、<NavLink> 等
         DOM 相关的功能，比如通过链接进行页面跳转、浏览器历史记录的管理等。
*/
/*
    react-router 提供了路由的核心功能，而 react-router-dom 在此基础上添加了专门针对 Web 应用的功能和组件 .
    在开发 Web 应用时，通常直接使用 react-router-dom，因为它包括了 react-router 的所有功能，
*/




interface RouteConfig {
    path: string,
    component?: any,
    children?: RouteConfig[]
  }
  interface Props {
    routes: RouteConfig[],
    fatherPath: string,
  }


 const RenderAppRoutes = ({ routes, fatherPath }: Props) => {
    return (
        <Switch>
            {routes.map((route) => {
                const { children, component, path } = route;
                const newFatherPath = fatherPath + path;
                return (
                    <Route
                        key={route.path || 'index'}
                        path={newFatherPath}
                        render={(props) => {
                            const Component = route.component; 
                            return (
                                <Suspense fallback={<div>。。。</div>}>
                                    {!component && children && <RenderAppRoutes routes={children} fatherPath={newFatherPath} />}
                                    {component && children && (
                                        <Component {...props}>
                                            <RenderAppRoutes routes={children} fatherPath={newFatherPath}/>
                                        </Component>
                                    )}
                                    {component && !children && <Component {...props}  />}
                                </Suspense>
                            );
                        }}
                    />
                );
            })}
        </Switch>
    );
  };
  
export const AppRouter = () => (
    <Router history={appHistory}>
        <RenderAppRoutes routes={routesConfig} fatherPath="" />
    </Router>
)

/*
    前端路由实现方式：它们的主要区别在于如何与浏览器的历史记录（History API）交互以及如何处理 URL
    hash路由

        在 hash 模式下，路由的实际路径被放置在 URL 的哈希部分（即 # 后面的部分）。例如：http://example.com/#/your/route/path。
        浏览器不会将哈希部分发送到服务器，这意味着哈希变化不会引起页面的重新加载。
        路由变化通过监听 window 上的 hashchange 事件来实现
        load 事件在整个页面及所有依赖资源如样式表和图片都已完成加载时触发。先记录一次浏览器的url

        优点：
        由于哈希变化不会导致浏览器向服务器发送请求，因此不需要服务器端特别配置即可运行。
        可以很好地兼容旧式浏览器。

        缺点：
        URL 中哈希部分可能看起来不够美观。
        由于整个路由路径都在哈希中，搜索引擎可能无法正确索引这些内容
    browser路由
        核心是window.history 对象
        browser 模式使用 HTML5 的 History API （pushState、replaceState、popstate 事件）来维护浏览器历史记录。
            1.history.pushState(state,title,path)
            2.history.replaceState(state,title,path)
                1.state：一个与指定网址相关的状态对象， popstate 事件触发时，该对象会传入回调函数。如果不需要可填 null。
                2 title：新页面的标题，但是所有浏览器目前都忽略这个值，可填 null。
                3 path：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个地址
            3.window.addEventListener('popstate',function(e){ })
                同一个文档的 history 对象出现变化时，就会触发 popstate 事件
                history.pushState 可以使浏览器地址改变，但是无需刷新页面
                history.pushState() 或者 history.replaceState() 不会触发 popstate 事件
                popstate 事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮或者调用 history.back()、history.forward()、history.go()方法

        在这种模式下，URL 看起来就像正常的请求路径，例如：http://example.com/your/route/path。
        路由变化会导致浏览器地址栏中的 URL 发生变化，但不会导致页面重新加载
        需要确保服务器正确地处理前端路由。这意味着无论用户访问哪个路径，服务器都应返回同一个 HTML 文件（通常是应用的入口点）。这样，React 可以接管路由并渲染相应的组件。

        优点：

            URL 看起来更“干净”和标准，更利于 SEO。
            与现代 Web 应用的用户体验更一致。
        缺点：

            需要服务器正确配置，以确保在前端路由路径下刷新页面时返回正确的页面。
            不支持不兼容 HTML5 History API 的旧式浏览器。

        https://juejin.cn/post/6886290490640039943
        https://juejin.cn/post/7198081320873918525?searchId=2023111115550026936CBD1E5D93CB1869

*/

/*

    reactv3 -》 reactv5的变化：
        包的变化：
            react-router：只提供核心的路由和函数。一般的应用不会直接使用
            react-router-dom：供浏览器/Web应用使用的API。依赖于react-router， 同时将react-router的API重新暴露(export)出来
            react-router-native:供 React Native 应用使用的API。同时将react-router的API重新暴露(export)出来；
        router组件变化：
            v5里没有 Router 组件，换成更具体的组件了,HashRouer 和BrowserRouter。但原来的方式还可以用，尤其是要自定义history对象的时候
        route组件变化
            v3只有 <Route component={Home}/>
            增加了render渲染函数 <Route render={(props) => (<Home></Home>)/>， 意味着我们可以直接修改组件的传参了。
                这个很关键，它使得我升级v3 - v5的时候可以做一些传递参数的兼容，不用到处改代码
            exact属性，精确匹配

        Switch组件
            渲染和 path 相匹配的第一个路由,当匹配到一个路由后就不会继续往后匹配
            <Route path="/about" component={About} />
            <Route path="/:user" component={User} />

        不再强制集中路由
            原来必须写一块儿：
                   <Router history={browserHistory}>
                        <Route path="/" component={Layout}>
                        <IndexRoute component={HomePage} />
                        <Route path="/users" component={UsersPage} />
                        </Route>
                    </Router>
            v4、v5的理念是路由也是组件。
                <header>
                    React Router 5 App
                </header>
                <main>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/users" component={UsersPage} />
                </main>

        取值变化：
            v3: 
                this.props.params
                this.props.location.query
                this.props.location.action
            v5:
                this.props.match.params
                this.props.location.search 要自己解析search为一个js对象
                this.props.history.action
                URL中的哈希部分之后无法传递 state 参数，props.history.push('/hooks', { word: 'hello' })中无法传递state: { word: 'hello' }

            


            所有的兼容：
                const compatibleProps = (props) => {
                    const params = urlParse(props.location.search);
                    const { __key, ...rest } = params;
                    const state = JSON.parse(sessionStorage.getItem(__key)) || undefined;
                    props.location = {
                        // router 从 v3 升级到 v5 location原来到属性做兼容处理，保留原有的功能
                        ...props.location,
                        action: props.history.action,
                        query: { ...rest },
                        state,
                    };
                    props.params = props.match.params;
                    props.router = props.history;
                    props.router.location = props.location;
                };
        
        
        控制事件onEnter onLeave移除
                兼容写法
                render(props) => {
                    useEffect(() => {
                        onEnter();
                        return () => onLeave();
                    }, [])
                }


*/