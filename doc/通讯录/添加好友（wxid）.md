以下是通过wxid添加好友的信息以及请求和返回示例的Markdown格式：

## 添加好友（wxid）

### 简要描述

通过wxid添加好友，只能添加有交集的人（以前是好友或在同一个群聊）。

### 请求URL

```
http://127.0.0.1:8000/api/
```

### 请求方式

POST

### 参数

| 参数名    | 必选 | 类型   | 说明       |
| --------- | ---- | ------ | ---------- |
| type      | 是   | int    | 接口编号   |
| userName  | 是   | string | wxid       |
| message   | 否   | string | 验证信息   |

### 请求示例

```json
{
  "type": 10034,
  "userName": "wxid_xxxx",
  "message": "我是xxx"
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

请注意，实际情况可能会根据您的应用程序的要求有所不同。返回的数据结构可能包括了 `status` 和 `desc`，您可以根据实际需要进行处理和解析。