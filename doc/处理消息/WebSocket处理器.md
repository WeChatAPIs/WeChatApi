
#### 简要描述

- 添加WebSocket消息处理器，您需要自己实现WebSocket Server。
- 该类处理器使用长连接，发送完成后不会断开。

#### 请求URL
- ` http://127.0.0.1:8888/api/`
  
#### 请求方式
- POST 

#### 参数

| 参数名      | 必选 | 类型     | 说明    |   
|:---------|:---|:-------|-------|   
| type     | 是  | int    | 接口编号  |   
| protocol | 是  | int    | 协议类型  |   
| url      | 是  | string | 服务器地址 |   

#### 请求示例

```
有断开重连机制

 {
  "type": 1001,
  "protocol": 3,
  "url": "ws://127.0.0.1:18000"
 }
```

#### 返回示例 

``` 
  {
    "data": {
      "status": 0,
      "desc": "",
      "cookie": ""
    }
  }
```

#### ws服务器代码示例

```
import asyncio
import json
import platform
import sys

import requests
import websockets
import websockets.exceptions

if platform.system() == 'Windows':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)
loop = asyncio.get_event_loop()


class WebsocketServer:
    def __init__(self):
        self.msg_count = 0

    # 调用API
    def send_http(self, data: dict) -> dict:
        r = requests.post(WECHAT_API_URL, json.dumps(data))
        return r.json()

    # 消息处理
    async def server_recv(self, websocket):
        async for message in websocket:
            try:
                self.msg_count += 1
                data = json.loads(message)
                print(data)
            except (json.JSONDecodeError, GeneratorExit):
                pass
            except Exception as ex:
                print("handle err", ex)
            await websocket.send("ok")

    # 握手
    @staticmethod
    async def server_hands(websocket):
        while True:
            recv_text = await websocket.recv()
            print("client: " + recv_text)
            if recv_text == "hello":
                print("connected success")
                await websocket.send("hello")
                return True
            else:
                await websocket.send("connected fail")

    # 握手并且接收数据
    async def server_run(self, websocket, path):
        print(path)
        try:
            await self.server_hands(websocket)
            await self.server_recv(websocket)
        except websockets.exceptions.ConnectionClosedError:
            print("client disconnect")
            sys.exit(0)
        except Exception as ex:
            print("Unknown Error: " + str(ex))


def addCallBackUrl(callBackUrl):
    """
    设置回调地址，当有人发送消息时，微信会就把信息发送到这个接口中
    :param callBackUrl: 回调地址，当有人发送消息时，微信会就把信息发送到这个接口中
    :return:
    """
    # 获取所有的回调地址
    resdatalist = requests.post(WECHAT_API_URL, json={"type": 1003}).json()["data"]["data"]
    # 删除之前的回调地址
    for item in resdatalist:
        requests.post(WECHAT_API_URL, json={"type": 1002, "cookie": item["cookie"]})
    # 设置新的回调地址
    requests.post(WECHAT_API_URL, json={"type": 1001, "protocol": 3, "url": callBackUrl})


WECHAT_API_URL = "http://127.0.0.1:8888/api/"

if __name__ == '__main__':
    # 给微信设置回调地址，当有人给发送消息时，微信会就把信息发送到这个接口中# 给微信设置回调地址，当有人给发送消息时，微信会就把信息发送到ws服务中
    addCallBackUrl("ws://127.0.0.1:18001/websocket/")
    # 启动ws服务器
    wsServer = WebsocketServer()
    server = websockets.serve(wsServer.server_run, "127.0.0.1", 18001, ping_interval=5)
    loop.run_until_complete(server)
    loop.run_forever()

```

#### 返回参数说明 

| 参数名         | 类型     | 说明   |   
|:------------|:-------|------|   
| error_code  | int    | 错误代码 |   
| description | string | 错误描述 |   
| data        | json   | 业务数据 |   

#### 备注 

- 更多返回错误代码请看[错误代码.md](../错误代码.md)







