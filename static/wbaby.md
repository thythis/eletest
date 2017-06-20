## Access-Control-Allow-Origin 站点跨域请求问题解决方案
#### Nginx服务器
> 通过Nginx模块HttpHeadersModule来添加Access-Control-Allow-Origin允许的地址。
在Nginx的conf目录下修改nginx.conf，添加以下代码

```javascript
// 括号内为允许跨域的文件类型
location ~* \.(eot|json|ttf|woff|svg|otf)$ {
     add_header Access-Control-Allow-Origin *;
}

// eot|ttf|woff|svg|otf，表示请求后缀类型，也可以直接写如下代码
location / {  
  add_header Access-Control-Allow-Origin *;  
}  
```
#### Apache服务器
> 若服务器为Apache，则可以按照如下配置：

```html
<IfModule mod_setenvif.c>  
    <IfModule mod_headers.c>  
        <FilesMatch "\.(cur|gif|json|ico|jpe?g|png|svgz?|webp)$">  
            SetEnvIf Origin ":" IS_CORS  
            Header set Access-Control-Allow-Origin "*" env=IS_CORS  
        </FilesMatch>  
    </IfModule>  
</IfModule>  
```
