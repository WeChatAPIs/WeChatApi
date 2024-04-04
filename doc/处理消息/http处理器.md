以下是HTTP处理器的信息以及请求和返回示例的Markdown格式：

## HTTP处理器

### 简要描述

添加HTTP消息处理器，需要自己实现Http Server。该处理器使用短连接，发送完成后会自动断开。推送方式为POST。

### 请求URL

```
http://127.0.0.1:8000/api/
```

### 请求方式

POST

### 参数

| 参数名      | 必选 | 类型     | 说明    |
|----------|----|--------|-------|
| type     | 是  | int    | 接口编号  |
| protocol | 是  | int    | 协议类型  |
| url      | 是  | string | 服务器地址 |

### 请求示例

```json
{
  "type": 1001,
  "protocol": 2,
  "url": "http://127.0.0.1:8888/"
}
```

### 返回示例

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

