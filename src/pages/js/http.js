// 请求头例子：
// GET /api/index.php?r=yxzs/site/auto-login&from=h5&token=vwvmjp1457763919&proj_id=39f6699d-edcd-6c55-0218-2fee2c402547&orgcode=fangzhiadmin_test&user_id=39f9ed06-4e2d-411a-a9f1-f325ffbdd8ea&user_type=2&ydxsclienttoken=966a2331-308b-45bf-b211-27206aa1b066&orgCode=fangzhiadmin_test&ydxs_user_id=39f9ed06-4e2d-411a-a9f1-f325ffbdd8ea&channel=ydxs HTTP/1.1
// Accept: */*
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh-CN,zh;q=0.9
// Connection: keep-alive
// Cookie: __tracker_user_id__=2570f7c063c9d40-3fd4006df3-46743b28; _ga=GA1.1.338071868.1686298438; env_orgcode=fangzhiadmin_test; ydxs_app_identity=f83fa65c68226ef28f5f6ed74695e7ce906ec12d61a63d103648fdfda228c975a%3A2%3A%7Bi%3A0%3Bs%3A17%3A%22ydxs_app_identity%22%3Bi%3A1%3Bs%3A140%3A%22%5B%22fangzhiadmin_test%40%4039f9ed06-4e2d-411a-a9f1-f325ffbdd8ea%40%40364936966398e3ebf3f1f874aa926fd5%22%2C%2239f9ed06-4e2d-411a-a9f1-f325ffbdd8ea%22%2C2592000%5D%22%3B%7D; PHPSESSID=2ta16jgtg5cp9clc496s49lbe6; __fast_sid__=258ef2a0b5f8d60-03b600134a-8f205f47
// Host: localhost:3000
// Referer: http://localhost:3000/sub-frontend-mono/task-center/manager/task-center?from=h5&orgcode=fangzhiadmin_test&token=vwvmjp1457763919&proj_id=39f6699d-edcd-6c55-0218-2fee2c402547&user_id=39f9ed06-4e2d-411a-a9f1-f325ffbdd8ea&user_type=2&_history_len=2
// Sec-Fetch-Dest: empty
// Sec-Fetch-Mode: cors
// Sec-Fetch-Site: same-origin
// User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1

// 相应头例子：

// HTTP/1.1 200 OK
// X-Powered-By: Express
// access-control-allow-origin: 0
// date: Tue, 08 Aug 2023 09:34:28 GMT
// content-type: application/json; charset=UTF-8
// transfer-encoding: chunked
// connection: close
// set-cookie: acw_tc=2f624a2616914872682521763e0e0095915d6fd51c84024cbf1541f6127352;path=/;HttpOnly;Max-Age=1800
// set-cookie: PHPSESSID=2ta16jgtg5cp9clc496s49lbe6; path=/; HttpOnly
// yk-cloud-env: origin
// vary: Accept-Encoding
// expires: Thu, 19 Nov 1981 08:52:00 GMT
// cache-control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
// pragma: no-cache
// access-control-allow-headers: Origin, X-Requested-With, Content-Type, Accept, x-fast-trace-id
// access-control-allow-methods: GET, POST, OPTIONS
// access-control-allow-credentials: true
// content-encoding: gzip
// apisix-cache-status: MISS
// server: YK-WAF


/*
    起始行
    GET /home HTTP/1.1 【请求方法、路径、http版本】
    HTTP/1.1 200 OK 【响应 http版本、状态码、原因】

    头部
        请求头： 描述客户端期望的文件类型、文件编码格式、请求体格式、解压缩方法、语言、持久连接方式、cookie，请求来源、客户端代理信息
        响应头：响应体格式、服务端信息、set-cookie、指定跨域 地址/头部字段/方法、 access-control-allow-credentials、location 重定向地址
        请求头
            Accept: text/plain;charset=UTF-8   告诉服务端客户端可处理的媒体类型和子类型（MIME）,在这里指定字符编码不是标准行为
                    服务器会根据这些首选项和它们自己的能力，返回最合适的资源版本。如果服务器不能满足客户端的Accept头的要求，它可以返回406 Not Acceptable响应。
                    一般浏览器会自动设置对应的accept在请求头里。RESTful API客户端需要手动设置。
                    服务端一般有框架帮助实现。
                例子：Accept: text/html, application/xhtml+xml, application/xml;q=0.9, image/webp;q=0.8
                MIME类型：
                    text/plain：纯文本文件。
                    text/html：HTML文件。
                    application/json：JSON数据格式。
                    application/xml：XML数据格式。
                    application/pdf：PDF文件。
                    image/jpeg：JPEG图像文件。
                    image/png：PNG图像文件。
                    audio/mpeg：MPEG音频文件。
                    video/mp4：MP4视频文件。
            Content-Type: 
                application/x-www-form-urlencoded: 这是HTML表单提交时最常用的类型。数据被编码为键值对，用&分隔。 application/x-www-form-urlencoded 字段用于告诉服务器请求体中的内容类型(post/put请求)
                multipart/form-data: 这种类型常用于文件上传。new formData()它允许在请求体中发送多部分数据，每一部分可能是不同类型的数据。
                application/json: 当你需要将JSON对象发送到服务器时使用。
            Accept-Charset: UTF-8  指定响应字符编码
            Accept-Encoding:gzip, deflate, br  指定客户端能处理的解压缩方法
            Accept-Language:zh-CN,zh;q=0.9 指定客户端理解的语言
            Connection: keep-alive  管理持久连接  
                keep-alive连接默认是持久的，即连接在传输完一个请求/响应对后不会立即关闭
                close 响应完成后关闭连接

            Cookie: __tracker_user_id__=2570f7c063c9d40-3fd4006df3-46743b28;
            Referer: http://localhost:3000/sub-frontend-mono/task-center  告诉服务器请求是从哪个具体地址发起的。   用途：隐私/日志/请求控制
            User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)  客户端信息：览器名称、版本、操作系统、设备类型等信息  用途： 隐私/日志/请求控制
        响应头
            Content-Type 
            server
            set-cookie:acw_tc=2f624a2616914872682521763e0e0095915d6fd51c84024cbf1541f6127352;path=/;HttpOnly;Max-Age=1800
            access-control-allow-origin   用于指定哪些源站可以访问资源
            access-control-allow-headers: Origin, X-Requested-With, Content-Type, Accept, x-fast-trace-id 只有这些指定的自定义头可以在跨域请求中使用
            access-control-allow-methods: GET, POST, OPTIONS
            access-control-allow-credentials: true  这样做允许浏览器在发出跨域请求时携带凭据（如cookies）
            location    当客户端接收到301状态码时，浏览器通常会自动重定向到响应头中的Location字段所指定的新URL。
    空行

    正文
    消息正文包含请求或响应的有效载荷。对于请求报文，正文可能包含提交的表单数据或上传的文件等。
    对于响应报文，正文通常包含HTML文档、图像或其他资源。消息正文与头部字段之间有一个空行，以便区分。

*/



// https://juejin.cn/post/6844904100035821575


/*

    状态码
    1xx 信息响应
        100 Continue: 请求部分已经被服务器接收，客户端应该继续发送其余部分。
            客户端发送请求头中包含 Expect: 100-continue，表明自己正在请求验证，希望接下来的请求可以继续。
            服务器读取HTTP请求的头部，并检查是否满足所有条件和限制
            如果一切正常，服务器会返回一个100 Continue响应，告诉客户端可以继续发送请求体了。

            这个100状态码通常应用于可能被拒绝的大文件，有助于节省网络带宽和服务器计算资源。
        101 Switching Protocols: 服务器已理解切换协议的请求，并进行协议切换。 通常用于 http和WebSocket之间的切换
            客户端发出请求，并在请求头中包括Upgrade字段，该字段指定了客户端希望切换到的协议（例如 WebSocket）。同时还可能包括Connection: Upgrade字段，表明这是一个协议升级请求。
            服务器解析请求并检查是否支持所请求的协议。如果支持并愿意升级，服务器将响应状态码101 Switching Protocols，并在响应头中包括相同的Upgrade字段，表明服务器同意切换到的协议。
            一旦客户端接收到此响应，连接的协议将更改为Upgrade头中指定的协议，随后的通信将使用新协议。
    2xx 成功响应
        200 OK: 请求成功。
        201 Created: 请求成功，并且服务器已创建了新的资源。 通常在响应头中返回location：uri。实行这个标准有利于多方交互，也不必解析响应体。扩展性考虑：否则当多方交互的时候，需要解析响应体并理解自定义的逻辑
        202 accept 服务端已经接收处理，但未处理完毕。通常用于耗时较长的任务。
            可以让客户端知道请求正在被处理，而不是被忽略或者卡住。
            返回一个uri让客户端可以通过轮询查询服务端完成进度
            优化服务端资源，让耗时请求后台异步处理，以便于响应其它请求。
        204 No Content: 请求成功，但没有需要返回的内容。 通常用于PUT/DELETE 请求。  通常这是基于语义和扩展性考虑。空响应体节省带宽不大
    3xx 重定向
        300 Multiple Choices: 针对请求，服务器可执行多项操作。  例如返回多语言版本的文档，并在响应体中包括每种语言版本的链接。不常见
        301 Moved Permanently: 永久重定向
            请求的URL已永久移动到新位置。  当客户端接收到301状态码时，浏览器通常会自动重定向到响应头中的Location字段所指定的新URL。
            由于301是永久重定向，浏览器可能会缓存这个重定向的信息。这意味着，将来访问旧URL的请求可能会直接由浏览器重定向到新URL，
            但如果重定向信息有所更改，可能会引发问题。
        302 Found: 临时重定向，浏览器不会缓存这个重定向的信息
        304 Not Modified: 自从上次请求后，请求的资源未被修改过。命中了缓存
    4xx 客户端错误
        400 Bad Request: 服务器不理解请求的语法。  http格式不对，少了请求头参数/无效请求参数/请求大小超出限制
        401 Unauthorized: 请求要求身份验证。  没有登录
        403 Forbidden: 服务器理解请求，但拒绝执行它。权限错误
        404 Not Found: 请求的资源无法在服务器上找到。
        429 Too Many Requests: 用户在给定的时间内发送了太多的请求。
    5xx 服务端错误
        500 Internal Server Error: 服务器遇到错误，无法完成请求。 一般是程序报错了
        501 Not Implemented: 服务器不具备完成请求的功能。  某些Web服务器可能仅支持标准的GET和POST方法，而不支持例如PUT或DELETE等其他方法。
        502 Bad Gateway: 服务器作为网关或代理，从上游服务器收到了无效的响应。 上游服务器挂了，检查上游服务器日志
        503 Service Unavailable: 服务器目前无法使用（由于过载或停机维护

    服务端需要配合实现这些状态码的正确返回



    http1 和 http2 对比

        1.多路复用。http2底层允许多个http请求/响应 建立在一个tcp连接上。http1 chrome限制同时存在6个tcp连接。
            在丢包的时候，http2性能会比较差。由于多个http请求都建立在一个tcp连接之上，当tcp底层发生丢包的时候，后面所有http都要等待底层tcp完成重传。
            会对服务器早上瞬时压力，因为多路复用没有限制同时请求数量。这个可以通过负载均衡解决
        2.二进制和header压缩。http1 使用文本传输，http2使用二进制传输，解析、编码和传输更加高效。
        3.服务器推送。http2支持服务器推送。
        4. https基本上只支持http2.  间接的http2安全性提高，虽然为了兼容性http2依然是明文传输。



    TCP:
        报文格式：
            源端口号 (Source Port) - 16位：它表示发送端的端口号。

            目的端口号 (Destination Port) - 16位：表示接收端的端口号。

            序列号 (Sequence Number) - 32位：如果SYN标志被设置，这是这个连接的初始序列号。否则，这是这个报文段中的第一个数据字节的累积序列号。

            确认号 (Acknowledgment Number) - 32位：只有当ACK标志被设置时，这个字段的值才有效。它包含了接收方期望接收的下一个序列号，从而确认了该序列号之前的所有数据都已成功接收。

            数据偏移 (Data Offset) - 4位：这表示了TCP头部的长度，告诉系统数据从哪里开始。

            保留 (Reserved) - 3位：为将来使用而保留，并设置为零。

            控制位 (Control Flags) - 9位：这些标志用于控制TCP的不同方面。

            NS - 1位：隐私标志。
            CWR - 1位：拥塞窗口减少标志。
            ECE - 1位：ECN回应标志。
            URG - 1位：表示紧急指针字段有效。
            ACK - 1位：表示确认字段有效。
            PSH - 1位：表示Push操作。
            RST - 1位：重置连接。
            SYN - 1位：同步序列号。
            FIN - 1位：没有更多的传输数据。
            窗口大小 (Window Size) - 16位：此字段指定了接收方允许发送方发送的字节数，用于流量控制。

            校验和 (Checksum) - 16位：用于检查头部和数据部分的错误。

            紧急指针 (Urgent Pointer) - 16位：只有当URG标志被设置时才有效。它指出在报文中紧急数据的结束位置。

            可选字段和填充：例如最大报文段长度（MSS），窗口扩大因子等。

            数据：实际要发送的数据。

        
        三次握手：
            目的：
                确定客户端能响应，确定服务端能响应。确保数据有序可靠的传输
                初始化序列号，TCP使用序列号来跟踪每个连接中发送的数据字节，确保数据的完整性和顺序。在握手过程中，双方都会随机生成一个序列号并通知对方，这样双方都知道从哪个数字开始计数。
                三次握手确保连接是唯一的，防止因网络延迟或其他原因导致的连接请求重复创建连接。
                防止过时的连接请求突然出现
                

            过程：
                客户端 发送TCP段，SYN = 1，序列号 = 随机数A
                服务端 接收客户端TCP段。发送TCP段， SYN = 1，ACK = 1，确认号 = A + 1，序列号 = 随机数B
                客户端 接收服务端TCP段。发送TCP段， ACK = 1， 确认号 = B + 1
        四次挥手：
            目的：
                确保双方都完成了传输
            过程：
                FIN：当客户端完成数据发送后，它发送一个FIN（完成）包给服务器，表示它已经完成数据发送并想关闭连接。

                ACK：服务器接收到FIN包后，发送一个ACK包给客户端，确认收到了FIN包。但服务器可能还有数据要发送，所以它不立即关闭连接。

                FIN：当服务器完成数据发送后，它也发送一个FIN包给客户端。

                ACK：客户端接收到服务器的FIN包后，发送一个ACK包给服务器，确认收到了FIN包。此后，客户端进入等待状态，以确保服务器收到了它的确认包，等待时间通常设为2倍的最大段寿命（MSL）。

                连接此时被关闭。
        
        异常处理：
             1.超时与重传
                超时定时器：每当TCP发送一个段，它就会为这个段设置一个超时定时器。如果在超时时间内没有接收到这个段的确认，则认为该段已经丢失。
                            超时定时器是一个内部机制，它存在于发送TCP段的端系统，并不在报文中。

                重传：一旦超时定时器到期，TCP会重传那个没有被确认的段。

                指数退避算法：每次重传后，TCP都会加倍其超时时间，这被称为“指数退避”。这样做是为了避免在网络仍然拥塞的情况下过多地重传，这会进一步加剧拥塞。
            
            2. 拥塞控制
                TCP使用了几种算法来进行拥塞控制，其中包括：
                1.慢启动（Slow Start）：
                    当一个TCP连接开始时，它的拥塞窗口（cwnd）被设置为一个很小的值。它是TCP可以在未被确认前发送的最大数据量
                    对于每个收到的确认，cwnd都会翻倍增加，这会导致数据发送速率呈指数增长。
                    但是，当cwnd达到一个名为ssthresh（慢启动阈值）的值时，TCP将转换到“拥塞避免”模式。

                2.拥塞避免（Congestion Avoidance）：
                    在这种模式下，cwnd的增长速率会降低，通常是每次增加一个MSS（最大段大小）。
                    这样，拥塞窗口的增长将是线性的，而不是指数的。

                3.快重传和快恢复（Fast Retransmit & Fast Recovery）：
                    当发送方连续收到三个相同的ACK时（三重重复ACK），它假定下一个段已经丢失并立即重传，而不等待定时器超时。这就是“快重传”。
                    在快重传后，而不是进入慢启动，TCP进入“快恢复”阶段，在此期间，它调整拥塞窗口和阈值，然后转到拥塞避免模式。

                4.拥塞窗口减小：
                如果TCP认为网络已经拥塞（例如，由于超时或三重重复的ACK），它会降低拥塞窗口，从而降低发送速率，以减少进一步的拥塞。
*/





const activeRequests = {}; 
// 超时取消，重试
const request = ({ method, url, timeout = 2000, maxRetry = 3 }) => {
    return new Promise((resolve, reject) => {
        let retries = 0;
        const makeRequest = () => {
            const existsXhr = activeRequests[url];
            if (existsXhr) {
                existsXhr.abort();
            }
            const xhr = new XMLHttpRequest();
            let timeid = setTimeout(() => {
                    xhr.abort();
                    delete activeRequests[url];
                    retries++;
                    if (retries < maxRetry) {
                        makeRequest();
                    } else {
                        reject({ status: -1, errorText: '超时取消' })
                        retries = 0;
                    }
            }, timeout);

            xhr.open(method, url, true) // true 异步执行
            activeRequests[url] = xhr;
            isRequest = true;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    clearTimeout(timeid);
                    delete activeRequests[url];
                    retries = 0;
                    if (xhr.status === 200) {
                        var response = xhr.responseText;
                        resolve(response);
                    } else {
                        var errorText = xhr.getResponseHeader("errorText");
                        reject({ status: xhr.status, errorText })
                    }
                }
            }
            xhr.send();
        }
        makeRequest();
    });
}