

[TOC]
    
##### 简要描述

- 添加HTTP消息处理器，您需要自己实现**Http Server**。
- 该类处理器使用短连接，发送完成后会自动断开。
- 推送方式为`POST`

##### 请求URL
- ` http://127.0.0.1:8000/api/`
  
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
  "protocol": 2,
  "url": "http://127.0.0.1:8888/",
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

##### 示例代码

```
import json
import logging
import time
import traceback

import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse


log = logging.getLogger(__name__)

app = FastAPI()

# 创建一个FIFO链式数据表缓存
callbackMes = []
lastPullTime = time.time()

@app.get('/')
def index():
    return "Hello World"

@app.post('/weixinCallback')
def weixinCallback(request: Request):
    user_input = await request.json()
    # 当前时间和最后一次拉取时间间隔5分钟，则追加消息
    global lastPullTime, callbackMes
    if lastPullTime is not None and time.time() - lastPullTime < 300:
        callbackMes.append(user_input)
    else:
        callbackMes = []
    # 打印消息
    print(user_input)
    return {"response": "success"}


@app.get('/weixinCallback')
def weixinCallbackMsg():
    global lastPullTime
    lastPullTime = time.time()
    if callbackMes:
        message = callbackMes.pop(0)
        logging.info('Message retrieved and removed from FIFO queue')
        return json.dumps(message), 200
    return '', 200


# 定义全局异常处理器
@app.exception_handler(Exception)
def handle_exception(request: Request, exc: Exception):
    # 获取异常的堆栈信息
    exc_info = traceback.format_exc()
    # 记录错误日志
    logging.error(f"Unhandled Exception: {type(exc).__name__}: {exc}\n{exc_info}")
    # 返回错误响应
    return JSONResponse(status_code=500, content={"message": f"An error occurred: {exc}"})


def runHttpServer():
    host = "0.0.0.0"
    port = 18000
    uvicorn.run(app, host=host, port=port)

if __name__ == '__main__':
    runHttpServer()
```

##### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|error_code |int   |错误代码  |
|description|string|错误描述|
|data|json|业务数据|

##### 备注 

- 更多返回错误代码请看首页的错误代码描述







