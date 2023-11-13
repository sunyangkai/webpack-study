/*
    


    强缓存: 由本地浏览器在确定是否使用缓存
    Expires
        服务器响应：服务端返回相应头中包含 "Expires: Wed, 21 Oct 2025 07:28:00 GMT"，是一个具体的日期
        客户端缓存：客户接收相应，缓存对应的资源和过期时间。
        再次访问资源：在Expires指定时间之前从缓存中获取。
        资源过期：在Expires指定时间之后继续发起请求

        注意点：存在客户端和服务点时间不一致的行为
    cache-control
        max-age=3600  当前时间+3600秒期间内使用缓存
        s-maxage=7200 共享缓存资源最大缓存时间7200秒 共享缓存储存资源在中间位置的代理服务器，如CDN。注意，代理服务器不一定实现了s-maxage的读取，具体需要看官方文档。这只是https1.1的规范
        private   只允许客户端本身储存缓存
        public  允许任何地方缓存，包括客户端和共享的代理服务器
        no-store  完全禁止缓存，不允许浏览器/代理服务器缓存任何资源到本地，这对重要信息防止泄漏很关键
        no-cache  即使代理和浏览器有缓存，也必须向服务器验证缓存是否有效。服务器返回304则使用缓存，否则服务器返回新的资源。no-chche并非完全禁止缓存，不能字面理解。
    细节：
        当指定cache-controll: public/private。但不指定max-age，浏览器不会缓存。
    总结，强缓存命中的情况
        1.服务端返回 Expires头，并且请求发生在Expires指定的时间内。  指定绝对过期时间。
        2.服务端返回 cache-control：max-age=xxx, public/private，  指定相对过期时间，通常搭配public、private
    


    协商缓存：本地没有命中强缓存则向服务器发送请求协商缓存
        有基于内容和基于时间的两种方案：
        1.基于内容： Etag/If-None-Match
        服务端： 返回Etag: '123456789abcdef' 和 对应的资源
        客户端： 缓存资源 和 Etag
        客户端： 请求同一个资源时，头部包含 If-None-Match: "123456789abcdef"，这个就是Etag的值。
        服务端：计算当前资源的Etag和客户端传来的If-None-Match，相同则返回304，否则返回200 和新的Etag

        2.基于时间 Last-Modified/If-Modified-Since
        服务端：返回Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT ，上次修改时间
        客户端：缓存资源和 Last-Modified ，下次请求同一个资源带上If-Modified-Since，这个值等于Last-Modified 。
        服务端：对比客户端传来的If-Modified-Since和当前资源的Last-Modified ，相同则返回304，否则返回200 和 新的Last-Modified。
    
    细节：
        当服务端同时接收 If-None-Match和If-Modified-Since时，If-None-Match优先。意思是基于内容的比对是优先的，因为基于内容的比对是精确的。


    
    缓存方案的选择：
        协商缓存适合一定频率更新的较大资源。如果资源较小，不如直接获取，开销与收益不匹配。维护协商缓存程序和服务器计算协商缓存规则也需要额外的开销。

    对于前端项目的部署：
        入口文件index.html通常 设置协商缓存
        其余文件有hash值设置强缓存
    
    
    ngix配置：
        打开 /etc/nginx/nginx.conf

        http {
    # 一般的HTTP设置
    ...

    server {
        listen 80; # 监听80端口
        server_name your-domain.com; # 你的域名

        # 设置项目的根目录
        root /var/www/your-project;
        index index.html;

        # 设置HTML文件的基于时间的协商缓存
        location ~* \.html$ {
            add_header Cache-Control "public, max-age=60"; # 60秒的缓存时间
            try_files $uri $uri/ =404;
        }

        # 设置其他静态文件的强缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
            add_header Cache-Control "public, max-age=31536000, immutable"; # 1年的缓存时间
            expires +1y;
            try_files $uri $uri/ =404;
        }

        # 其他通用设置
        location / {
            try_files $uri $uri/ =404;
        }

        # 错误页面设置
        error_page 404 /404.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }

        # 你可能还想添加其他设置，例如SSL、日志等
    }
}

    # 通用设置和其他服务器块
    ...

}



    cookie: 基于http是无状态协议，维护一个状态，告知服务端后续请求是否来自同一个浏览器。
        1.保存在客户端，请求时，会匹配请求的url域名和本地存储的域名，匹配上则携带这部分cookie
        2.cookie不可跨域，每个cookie绑定单一域名。一、二级域名可以靠dommain共用，example.com 和 sub.example.com,
         服务端指定 res.cookie('name', 'value', { domain: '.example.com' }); 
         客户端指定 document.cookie = "name=value; domain=.example.com; path=/";
        3. 主要属性：name=value; domain='xxx';path='/';maxAge=10000;secure=true;httpOnly=true;
            domain：手动指定cookie所属域名，默认当前域名。 只能指定一个，不能是多个。
            path: 指定浏览器发出 HTTP 请求时，哪些路径要附带这个 Cookie。 比如PATH属性是/，那么请求/docs路径也会包含该 Cookie
            secure：只有安全协议cookie才有效，http中cookie不生效
            httpOnly：不允许js脚本读取cookie
            maxAge： 指定多少秒后失效
            expire：指定具体的实效时间

            服务端设置：res.cookie('name', 'value', { httpOnly: true, secure: true });

            注意的问题：
                1.因为存储在客户端，容易被客户端篡改，使用前需要验证合法性。使用签名
                2.不要存储敏感数据，比如用户密码，账户余额
                3.使用 httpOnly 在一定程度上提高安全性
                4.尽量减少 cookie 的体积，能存储的数据量不能超过 4kb
                5.设置正确的 domain 和 path，减少数据传输
                6.cookie 无法跨域
                7.一个浏览器针对一个网站最多存 20 个Cookie，浏览器一般只允许存放 300 个Cookie
                8.移动端对 cookie 的支持不是很好，而 session 需要基于 cookie 实现，所以移动端常用的是 token

    session: 存储在服务器端，sessionId 会被存储到客户端的cookie 中。
        用户登录，通过验证后服务端创建session。并储存在服务端。推荐储存在redis中，访问快。 不能存内存中，服务重启就没了。存数据库里，速度慢。
        服务端返回sessionId
        客户端拿到sessionId储存在cookie中。
        客户端之后的请求携带cookie，服务端从cookie里拿到sessionId，用sessionId去匹配获取session

        Session 比 Cookie 安全，Session 是存储在服务器端的，Cookie 是存储在客户端的
        cookie可以长时间保存，Session持续时间相对较短
    
    Token：通常使用 JWT：JSON Web Token  跨域认证解决方案。

        用户登录成功后，服务端通过用户信息、过期时间、密钥生成加密字符串作为token
        客户端拿到token保存在localstarage中。
        客户端下次请求时从localstarage获取并写在header中的Authorization字段里。



        放在header中的 Authorization字段




    客户端储存鉴权token存在 cookie和localstarage中 ？
     一般放在localstorage 中。 cookie会有xsrf攻击风险。
    

    对比cookie-session 登录鉴权方案，JWT解决了什么问题？
    在一个服务集群中，跨域请求是常见的。例如网站A和网站B是关联业务，这就需要单点登录。
    方案1. 把登录后的session数据做成一个单独的服务。集群中的每个服务器都请求这个登录服务验证。  但是登录服务挂了，整个集群都会登录不上，风险大。
    方案2.JWT。把登录身份保存在客户端，服务端变成无状态。JWT是一个很长的字符串，分三部分用.隔开。例如: 234djojadf.asfjodasjfodjfasdfsdf.ajfojdsaofjosdf。
         JWT三个部分分别是：
           1.header 头部  一个json对象。用Base64URL编码转化为字符串
                {
                    "alg": "HS256",   // 签名算法
                    "typ": "JWT"  // token类型
                }
           2.Payload 载体 一个json对象。用Base64URL编码转化为字符串
                {
                    // 官方推荐的7个字段
                    iss (issuer)：签发人
                    exp (expiration time)：过期时间
                    sub (subject)：主题
                    aud (audience)：受众
                    nbf (Not Before)：生效时间
                    iat (Issued At)：签发时间
                    jti (JWT ID)：编号
                    ... // 也可以加自定义字段
                }
           3.Signatrue 签名 一个字符串。对头部和载体使用密钥加密，生成Signatrue字符串。
                HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret);

          最后将三个部分合并得到JWT的token：  Header.Payload.Signature

          注意： 1.使用Base64URL而不是Base64编码。
                JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。
                Base64 有三个字符+、/和=，在 URL 里面有特殊含义，所以要被替换掉：=被省略、+替换成-，/替换成_ 。这就是 Base64URL 算法。

                2.JWT 如果不加密，不要将敏感信息写入JWT。再生产JWT后，可以再次加密。

                3.JWT 无法被服务端主动废除登录态。

                4.JWT一旦泄露，任何人都能获取所有权限。应该使用https减少泄漏风险。





 */