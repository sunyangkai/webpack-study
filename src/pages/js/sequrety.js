
/*
    总结： 我们的目的是防止浏览器执行不被信任的脚本，防止我们的cookie被不受信任的网站发送和读取，防止服务的响应不被信任的请求
        防范思路是
            1.过滤掉特殊字符，我们的目的是浏览器展示内容，而不是执行脚本。浏览器的解释和我们的目的存在差异。我们使用编码转义来抹平这个差异。
                对于重要的输入交互入口，我们做输入字符串编码转移。重点防范储存型xss，让我们储存的字符都是安全的。
                对于所有输出口，都做编码转义，避免浏览器错误解释。
            2. origin referer请求字段帮助我们建立服务器白名单，可以直接403拒绝不受信任的访问。
            3. 服务端设置同源策略防止不受信任的网站读取我们的cookie
            4. cookie地sameSite=lax可以限制跨站点请求发送我们的cookie


    1.xsrf: 跨站请求伪造。 
        前言：这里重点关注第三方网站发起的请求。我们一般不允许第三方网站发起请求时带上我们的cookie，因为第三方网站通常是不可靠的。
        如果我们明确和哪些第三方网站有业务交集，可以明确指定哪些第三方网站可以访问我们的网站。 
        我们还可以通过请求header的origin和referer字段，在服务端建立白名单。直接通过403响应拒绝响应不被信任的第三方请求。 安全性高，用户体验低，过于严格。
        通过sameSite允许同站点发送cookie。 安全性高，但是无法指定白名单，只能同站点共享cookie。

        我们的思路是根据具体业务场景建立起不同的安全等级策略，在用户体验、架构成本、安全性之间作权衡。


        当请求的url的域名和存储cookies的域名相匹配，浏览器回自动带上对应的cookie。
        在这个过程中，攻击者不需要读取cookie，而是利用浏览器自动携带cookie通过目标网站的验证。
        攻击方式是构造get/post请求。引导用户点击进入攻击者构造的网页

    防范：
        1.限制不明外域的访问，在跨域请求中通常会携带origin和referer字段。
            1.1 origin 可能在IE11跨域请求中不存在。302重定向后origin字段不会被带上
            1.2 Referer 浏览器本身实现有风险，可能不存在。https跳转http所有referer都会丢失。老版本IE window.location.href=url、window.open跳转也会丢失。
            1.3 如果 origin和 Referer都没有，直接限制访问
            server {
                listen 80;
                server_name example.com;

                set $allowed_origin "http://www.allowed-origin.com";
                set $allowed_referer "http://www.allowed-referer.com";

                if ($http_origin != $allowed_origin) {
                    return 403;
                }

                if ($http_referer !~* ^$allowed_referer) {
                    return 403;
                }

                location / {
                    # 正常的配置在这里，例如代理设置或静态文件服务
                }
            }
        2.token验证。通常采用JWT方案。
            当客户端登录成功后，服务端返回token字段给客户端。
            客户端拿到token后保存在localStorage中。
            客户端以后每次请求都带上这个token在header中的authorition字段里

        3.sameSite  chrome 80版本之后则默认是Lax了， 有三个值 Strict lax None。规定了跨站点发送cookie地限制
                    同站点：相同域（有效顶级域 + 1）和下面的子域
                            例如：   sun1.yang.com 和 sun2.yang.com 是同站点。  顶级域.com  注册域.yang  子域 sun1 、 sun2
                                    example.co.uk和example2.co.uk 不是同站点。 顶级域.co.uk 是二级的。 注册域分别是example和example2
                                    sun1.yang.com 和 sun2.yang.com 不是同源的，同源规定协议，整个域名、端口都必须完全一致。

            使用：服务端设置cookie的原理是在响应头里设置Set-Cookie字段。
                Set-Cookie: sessionid=12345; SameSite=Lax;


            值：

                Strict：严格禁止第三方站点发送cookie。 例如A中嵌套B网站的iframe

                Lax：大部分情况下不允许第三方站点发送cookie。 导航到目标网站的Get请求除外（链接、get表单、预加载）
                    这样做是为了在安全和体验直接做一个权衡。在合理的业务场景汇总允许跨站请求。
                    当用户从一个站点导航到另一个站点（例如通过点击一个链接或提交一个 GET 形式的表单）时，他们通常期望其会话状态（例如登录状态）在新的站点上得以保持。
                    为什么允许GET请求发送cookie不允许post请求发送数据 ?
                        如果目标站点遵循http规范，GET请求不会修改服务端数据。
                        而如果只需要查看敏感信息，有浏览器同源策略阻止javascript读取响应数据，除非攻击者能够截获响应数据，这是很困难的。

                    如果a链接跳转不发送cookie，直接跳转到对应的目标站点首页，目标站点首页通过js调用验证接口发送cookie通过验证，也能登录。但是中间会有一个等待的过程，提高了安全性牺牲了用户体验

                None：完全放开。前提是设置secure属性，否则无效。

    总结：
            两套方案 1. session-cookie   登录场景简单 高效率用户体验好
                    2. token （一般是JWT） 特别是涉及到单点登录的问题，必选。简单有效，不用维护复杂的服务端验证机制。
       

        
    2.xss Cross Site Script跨站脚本攻击。
            在客户端浏览器上注入恶意脚本。
            1.反射型
                黑客就是用户客户端，通过人机交互输入恶意脚本，被攻击网站会返回这个恶意脚本到浏览器端，然后被执行。
                典型的场景就是搜索框，输入关键词后服务端返回含有关键词的信息。如果关键词被替换为恶意脚本，则浏览器会执行这段脚本。可以用来获取敏感信息，破解网站权限，发起恶意请求等。
                如何防范？
                0.通常现代前端框架都有xss安全考虑。
                1.做输出编码： 输出字符要做转义处理，确保不会被解释为代码。对于 HTML，字符如 <, >, & 和 " 应该被转义为 &lt;, &gt;, &amp; 和 &quot;。
                    推荐库 loash.escape()
                2.避免使用不安全的 JavaScript 函数：eval(), document.write(), innerHTML, outerHTML 
                3.CSP 内容安全策略。 白名单制度，开发者明确指出哪些资源可以执行和加载。
                    启动方式：
                     1. 通过网页头部的meta标签。  <meta http-equiv="Content-Security-Policy" content="script-src 'self'">
                     2. 服务端设置http相应头Content-Security-Policy
                    常见配置：default-src ‘none’; script-src ‘self’; connect-src ‘self’; img-src ‘self’; style-src ‘self’;
                        default-src 默认，适用所有内容
                        script-src 限制哪些外部脚本可以执行
                        connect-src 限制能够连接到的服务器（例如 AJAX 请求、WebSocket、EventSource 等）
                            例： Content-Security-Policy: connect-src 'self'; 只允许和同源服务器连接
                                Content-Security-Policy: connect-src 'self' api.external-service.com; 允许和同源服务器以及指定的API连接

                        img-src 限制哪些图像可以加载。
                        style-src 限制哪些样式表可以加载和执行。

                        值的解释：
                            'none': 不允许加载任何内容。
                            'self': 只允许从同源加载。
                            'unsafe-inline': 允许使用内联脚本、样式和 javascript: URLs。但使用它会降低 CSP 的安全性。
                            'unsafe-eval': 允许文本到代码的不安全解析（例如，使用 eval()）。
                4. http only的cookie。这不是为了防止xss发生，而是减少xss发生后对cookie的读取，以免造成敏感信息被劫持的后果。

            
            2.储存型 xxs。用户提交的攻击脚本会留存在服务器上。常见业务场景事留言板，评论区等。
                储存型xss要重点关注用户提交的内容，对其进行编码和内容过滤。

            3.dom型 xss  用户提交恶意脚本 被插入到dom中执行。不涉及到服务端响应

                重点关注用户提交的内容，对其进行编码和内容过滤。
            4. 一些特殊的。
                1.通过 img标签的 onerror事件注入脚本。
                攻击者上传图片url， x" onerror="javascript:alert('XSS'); 浏览器加载这个url， 发生错误触发 onerror中的恶意脚本
                2.基于事件的注入
                 
            
            



*/