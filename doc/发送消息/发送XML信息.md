# 发送XML信息

##### 简要描述

- 发送XML消息

##### 请求URL

- `http://127.0.0.1:8000/api/`

##### 请求方式

- POST

##### 参数
| 参数名    | 必选 | 类型   | 说明             |
| --------- | ---- | ------ | ---------------- |
| type      | 是   | int    | 接口编号         |
| userName  | 是   | string | 接收人wxid       |
| content  | 是   | string | xml内容     |

##### 请求示例

```json 
 {
  "type": 10053,
  "userName": "filehelper",
  "content": "<appmsg appid=\"\" sdkver=\"\">...</appmsg>"
}


```

##### 返回示例

```json
  {
  "error_code": 10000,
  "description": "",
  "data": {
    "status": 0,
    "desc": ""
  }
}



```
