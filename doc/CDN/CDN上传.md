



#### 简要描述

- 上传CDN，获取fileid。

#### 请求URL
- ` http://127.0.0.1:8888/api/`

#### 请求方式
- POST 

#### 参数

| 参数名           | 必选 | 类型     | 说明                                                                                  |   
|:--------------|:---|:-------|-------------------------------------------------------------------------------------|   
| type          | 是  | int    | 接口编号                                                                                |   
| filePath      | 是  | string | 文件绝对路径                                                                              |   
| aeskey        | 是  | string | 文件的md5                                                                              |   
| fileType      | 是  | int    | 文件类型，可参考枚举值，更多类型可从消息XML获取                                                           |   
| bAsync        | 否  | bool   | 如果将该参数设置为true，则任务不再阻塞，接口响应内容会通过消息处理器返回，消息推送类型为0<br/>如果提供了asyncUserData参数，会随调用结果一起推送 |   
| asyncUserData | 否  | str    | xxxx                                                                                |   

#### 文件类型

| 文件类型        | 枚举值        |   
|:------------|:-----------|   
| 原图          | 1          |   
| 高清图         | 2,会创建thumb |   
| 缩略图         | 3,会创建thumb          |   
| 视频          | 4,会创建thumb |   
| 文件          | 5          |   
| 大文件(25M及以上) | 7          |   
| 语音          | 15         |   

#### 请求示例

```
 {
  "type": 7,
  "filePath": "C:\\xxx.txt",
  "aeskey": "e742f8ce990980e402b00f89dc8d1d4d",
  "fileType": 5
 } 

```

#### 返回示例

``` 
  {
    "data": {
      "status": 0,
      "desc": "",
        "data": {
            "aeskey": "askey", #### askey
            "encryptfilemd5": "encryptfilemd5",
            "filecrc": "filecrc",
            "fileid": "fileid",
            "filekey": "filekey",
            "isgetcdn": "0",
            "isoverload": "0",
            "isretry": "0",
            "rawfilekey": "rawfilekey",
            "rawfilemd5": "rawfilemd5",
            "rawtotalsize": "rawtotalsize",
            "recvlen": "recvlen",
            "retcode": "0",
            "retrysec": "0",
            "seq": "1",
            "ver": "0",
        },
    }
  }
```

#### 返回参数说明

| 参数名         | 类型     | 说明   |   
|:------------|:-------|------|   
| error_code  | int    | 错误代码 |   
| description | string | 错误描述 |   
| data        | json   | 业务数据 |   

#### 备注

- 更多返回错误代码请看[错误代码.md](../错误代码.md)







