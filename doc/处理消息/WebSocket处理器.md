

[TOC]
    
##### 简要描述

- 添加WebSocket消息处理器，您需要自己实现WebSocket Server。
- 该类处理器使用长连接，发送完成后不会断开。

##### 请求URL
- ` http://127.0.0.1:8888/api/`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|type |是  |int | 接口编号    |
|protocol |是  |int | 协议类型    |
|url     |是  |string | 服务器地址    |

##### 请求示例

```
 {
  "type": 1001,
  "protocol": 3,
  "url": "ws://127.0.0.1:8888",
 }
```

##### 返回示例 

``` 
  {
    "error_code": 10000,
    "description": "",
    "data": {
      "status": 0,
      "desc": "",
      "cookie": ""
    }
  }
```

##### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|error_code |int   |错误代码  |
|description|string|错误描述|
|data|json|业务数据|

##### 备注 

- 更多返回错误代码请看首页的错误代码描述







