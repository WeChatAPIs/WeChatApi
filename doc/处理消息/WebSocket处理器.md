

[TOC]
    
##### 简要描述

- 添加WebSocket消息处理器，您需要自己实现WebSocket Server。
- 该类处理器使用长连接，发送完成后不会断开。

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

##### 示例代码

```
import json
import os
import time
import sys

import requests
# pip install websockets
import websockets
# pip install psutil
import psutil
# pip install pyrpd
import pyrpd
import websockets.exceptions
import asyncio
import platform

if platform.system() == 'Windows':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)
loop = asyncio.get_event_loop()


class WebsocketServer:
    # dll_path = os.path.join(os.path.split(os.path.abspath(__file__))[0], "wxapi.dll")
    dll_path = os.path.join(os.path.split(os.path.abspath(__file__))[0], "wxapi64.dll")
    dll_name = os.path.split(dll_path)[1]
    host = "localhost"
    port = 8765
    server_port = 8888
    ws_url = f"ws://{host}:{port}/websocket/"
    ws_cookie = ''
    ping_interval = 5

    def __init__(self, pid: int):
        assert (pid != 0)
        self.wx = pyrpd.PyRProcess(pid)
        self.msg_count = 0

    # 初始化
    def client_init(self):
        if self.wx.GetModuleHandle(self.dll_name) != 0:
            self.close()
        self.wx.load(self.dll_path)
        time.sleep(2)
        if self.wx.call(self.dll_name, "start_http_server", self.server_port) == 0:
            self.wx.unload(self.dll_name)
            raise RuntimeError("client init failed")
        print("http server start success")
        if not self._start_listen():
            self.wx.unload(self.dll_name)
            raise RuntimeError("client init failed")
        print("websocket client start success")

    # 调用API
    def send_http(self, data: dict) -> dict:
        try:
            r = requests.post(f"http://{self.host}:{self.server_port}/api/", json.dumps(data))
            return r.json()
        except ConnectionResetError:
            if not self._start_listen():
                print("restart http server failed, server is shutdowning...")
                self.close()
                sys.exit()
            return self.send_http(data)

    def _start_listen(self):
        try:
            params = {"type": 1001, "protocol": 3, "url": self.ws_url}
            r = self.send_http(params)
            self.ws_cookie = r["data"]["cookie"]
            return True
        except KeyError:  # type: ignore
            return False

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

    def close(self):
        try:
            if self.ws_cookie != '':
                params = {"type": 1002, "cookie": self.ws_cookie}
                self.send_http(params)
            self.wx.call(self.dll_name, "stop_http_server", self.server_port)
        except OSError:
            pass
        print("robot shutdowning...")
        return self.wx.unload(self.dll_name)

    @classmethod
    def active(cls):
        pid = 0
        for p in psutil.process_iter():
            if p.name() == "WeChat.exe":
                pid = p.pid
                break
        return cls(pid) if pid != 0 else None


def start_websocket_server():
    ws = WebsocketServer.active()
    try:
        ws.client_init()
    except Exception as e:
        print("Unknown Error: " + str(e))
        ws.close()
        sys.exit()
    try:
        server = websockets.serve(ws.server_run, ws.host, ws.port, ping_interval=5)
        loop.run_until_complete(server)
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    except Exception as e:
        print("Unknown Error: " + str(e))
    ws.close()


if __name__ == '__main__':
    start_websocket_server()
```

##### 备注 

- 更多返回错误代码请看首页的错误代码描述







