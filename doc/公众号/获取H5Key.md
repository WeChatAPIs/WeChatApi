

[TOC]
    
##### 简要描述

- 获取H5Key，可用于获取公众号历史消息、搜一搜等。

##### 请求URL
- ` http://127.0.0.1:8888/api/`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|type |是  |int | 接口编号    |

##### 请求示例

```
 {
  "type": 2,
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
      "h5AuthKey": "",
      "bizSessionID": 0,
    }
  }
```

##### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|error_code |int   |错误代码  |
|description|string|错误描述|
|h5AuthKey|string|H5Key|
|bizSessionID|int|sessionid|

##### 备注 

- 更多返回错误代码请看[错误代码.md](../错误代码.md)







