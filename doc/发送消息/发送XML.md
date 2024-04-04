

[TOC]
    
##### 简要描述

- 发送XML消息

##### 请求URL
- ` http://127.0.0.1:8888/api/`
  
##### 请求方式
- POST 

##### 参数

| 参数名      | 必选 | 类型     | 说明      |   
|:---------|:---|:-------|---------|   
| type     | 是  | int    | 接口编号    |   
| userName | 是  | string | 接收人wxid |   
| content  | 是  | string | xml内容   |   

##### 请求示例

```
 {
  "type": 10053,
  "userName": "filehelper",
  "content": "<appmsg appid=\"\" sdkver=\"\">...</appmsg>",
 } 
```

##### 返回示例 

``` 
  {
    "data": {
      "status": 0,
      "desc": "",
    }
  }
```

##### 返回参数说明 

| 参数名         | 类型     | 说明   |   
|:------------|:-------|------|   
| error_code  | int    | 错误代码 |   
| description | string | 错误描述 |   
| data        | json   | 业务数据 |   

##### 备注 

- 更多返回错误代码请看[错误代码.md](../错误代码.md)






