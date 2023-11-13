


const serverPush = () => {
    // 导入所需模块
    const http2 = require('http2');
    const fs = require('fs');
    const path = require('path');

    // 读取证书文件，HTTP/2 需要使用 HTTPS
    const serverOptions = {
    key: fs.readFileSync('your-private-key.pem'),
    cert: fs.readFileSync('your-certificate.pem')
    };

    // 创建 HTTP/2 服务器
    const server = http2.createSecureServer(serverOptions);

    // 处理请求
    server.on('stream', (stream, headers) => {
        const requestPath = headers[':path'];

        // 如果客户端请求 index.html
        if (requestPath === '/') {
            stream.respondWithFile(path.join(__dirname, 'index.html'), {
            'content-type': 'text/html'
            });

            // 服务端推送 main.js
            const pushStream = stream.pushStream({ ':path': '/main.js' }, (err, pushStream, headers) => {
            if (err) {
                console.error(err);
                return;
            }

            pushStream.respondWithFile(path.join(__dirname, 'main.js'), {
                'content-type': 'application/javascript'
            });
            });

        } else if (requestPath === '/main.js') {
            // 客户端直接请求 main.js 时的处理
            stream.respondWithFile(path.join(__dirname, 'main.js'), {
            'content-type': 'application/javascript'
            });

        } else {
            // 其他请求返回 404
            stream.respond({ ':status': 404 });
            stream.end('Not Found');
        }
    });

    // 启动 HTTP/2 服务器
    server.listen(3000, () => {
    console.log('HTTP/2 server is listening on port 3000');
    });

}

const sslConfigForNgix = () => {
    /*
            要为您的网站申请 SSL 证书，您可以选择购买商业证书或使用免费证书。免费证书的一个流行选择是 Let's Encrypt。以下是使用 Let's Encrypt 为您的网站申请免费 SSL 证书的方法：

            1. 安装 Certbot：
            Certbot 是 Let's Encrypt 官方推荐的工具，用于自动申请、配置和续订 SSL 证书。访问 Certbot 网站 (https://certbot.eff.org/)，然后选择您的 Web 服务器软件和操作系统。按照网站上提供的说明安装 Certbot。

            2. 停止 Web 服务器：
            在申请证书之前，您可能需要暂时停止 Web 服务器。这是因为 Certbot 在验证域名所有权时可能需要使用 80 或 443 端口。使用您的 Web 服务器的控制命令停止服务器，例如 `sudo service nginx stop`（对于 Nginx）或 `sudo service apache2 stop`（对于 Apache）。

            3. 申请 SSL 证书：
            使用 Certbot 为您的域名申请证书。在命令行中运行以下命令，替换 `your-domain.com` 为您的域名：
            
            ```
            sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com
            ```
            
            Certbot 会引导您完成验证域名所有权的过程。验证成功后，您的证书和私钥将被存储在 `/etc/letsencrypt/live/your-domain.com/` 目录中。

            4. 配置 Web 服务器：
            根据您的 Web 服务器和应用程序，配置 SSL 证书和私钥。以下是一个 Nginx 示例：

            ```
            server {
                listen 80;
                server_name your-domain.com www.your-domain.com;
                return 301 https://$host$request_uri;
            }

            server {
                listen 443 ssl;
                server_name your-domain.com www.your-domain.com;

                ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
                ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

                # 其他 SSL 和服务器配置
            }
            ```

            对于 Node.js，您需要在 `https.createServer` 函数中指定证书文件的路径，如之前的回答中所示。

            5. 重启 Web 服务器：
            重新启动您的 Web 服务器以使更改生效。例如 `sudo service nginx start`（对于 Nginx）或 `sudo service apache2 start`（对于 Apache）。

            6. 设置自动续订：
            Let's Encrypt 证书的有效期为 90 天。要避免过期，您可以设置一个 cron 任务以自动续订证书。在命令行中运行 `sudo crontab -e`，然后添加以下行：

            ```
            0 3 * * * /usr/bin/certbot renew --quiet --post-hook "service nginx reload"
            ```
    */
    
}




const https = () => {
    /*
        https提供三大功能
        1.加密（Encryption），对数据加密来使其免受窃听者对数据的监听
        2.数据一致性(Data integrity)，数据在传输的过程中不会被窃听者所修改
        3.身份认证(Authentication)，防止中间人攻击并建立用户信任

        HTTP 是明文传输，HTTPS 通过 SSL\TLS 进行了加密
        对称密钥： 加密/解密 使用同一个密钥。   密钥被截获则通讯被破解
        非对称密钥。公钥和私钥，公钥加密只能私钥解密，私钥加密只能公钥解密。这两个密钥在数学上是相关的，但从公钥推导出私钥是不可行的。RSA、DSA



    */
}

const tsl = () => {
    /*
        TLS(Transport Layer Security) 是 SSL(Secure Socket Layer) 的后续版本。
        SSL/TLS 通过将称为 X.509 证书的数字文档将 网站和公司的实体信息 绑定到加密密钥来进行工作。
        SSL 是一个独立的协议，不只有 HTTP 可以使用，其他应用层协议也可以使用，比如 SMTP(电子邮件协议)、Telnet(远程登录协议) 等都可以使用。


        对称加密：指加密和解密时使用的密钥都是同样的密钥。 要保证密钥传输的安全性。简单速度快，适合加密大量数据。 DES，AES 
        非对称加密：公钥加密，私钥解密。复杂速度慢。非对称加密通常用于密钥交换、身份验证和数字签名，而不是直接加密大量数据。RSA，ECC
        混合加密：对称加密用于数据传输，非对称加密用于密钥交换。

        数字签名生成：一段文本 -> hash函数 生成消息摘要 -> 私钥加密 生成数字签名


        过程：无论客户端和服务端的连接走 HTTP 还是 TLS 协议，所有连接最初都要经过 TCP 三次握手，而 TLS 四次握手是在 TCP 建立连接之后进行的。

            客户端请求到服务端的443端口
            服务端返回CA证书（包含公钥和其它信息（公司、签发机构、时间等）），服务端保存了CA证书和一对公钥和私钥
            客户端验证证书，通过则取出公钥。客户端生成一个新的密钥，使用公钥加密新的密钥传给服务端。
            服务端用私钥解密客户端传来的密钥，作为之后对称加密的密钥。
            

            https://juejin.cn/post/6895624327896432654#heading-8
            1.浏览器向服务器发送随机数 client_random，TLS 版本和供筛选的加密套件列表。
            2.服务器接收到，立即返回 server_random，确认好双方都支持的加密套件
            以及数字证书 (证书中附带公钥 Public key certificate)。
            3.浏览器接收，先验证数字证书。若通过，接着使用加密套件的密钥协商算法 RSA 
            算法生成另一个随机数 pre_random，并且用证书里的公钥加密，传给服务器。
            4.服务器用私钥解密这个被加密后的 pre_random，参考 “非对称加密”。



     */

}

