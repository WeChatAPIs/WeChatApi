

[TOC]
    
##### 简要描述

- 添加HTTP消息处理器，您需要自己实现**Http Server**。
- 该类处理器使用短连接，发送完成后会自动断开。
- 推送方式为`POST`

##### 请求URL
- ` http://127.0.0.1:8888/api/`
  
##### 请求方式
- POST 

##### 参数

| 参数名      | 必选 | 类型     | 说明    |   
|:---------|:---|:-------|-------|   
| type     | 是  | int    | 接口编号  |   
| protocol | 是  | int    | 协议类型  |   
| url      | 是  | string | 服务器地址 |   

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
    "data": {
      "status": 0,
      "desc": "",
      "cookie": ""
    }
  }
```

##### 示例代码

```
import re

import requests
from flask import Flask, request, jsonify

# Flask常规操作
app = Flask(__name__)
WECHAT_API_URL = 'http://127.0.0.1:8888/api/'


# 调用GPT和API产生结果
@app.route('/wechatSDK', methods=['POST'])
def chat():
    data = request.json
    print(data)
    pushType = data["pushType"]  #
    # 仅接受群、好友发送的文本消息，其他消息类型不处理
    # 消息类型详见： https://github.com/kawika-git/wechatAPI/blob/main/doc/doc/处理消息/消息类型.md
    if pushType != 1 or data["data"]['type'] != 1:
        return jsonify({"success": "true"})
    msg_obj = data["data"]
    # 哪个好友发送的消息，还是哪个群发送的消息
    sendChannel = msg_obj["from"]
    # 发送的消息内容是什么
    msgContent = msg_obj["content"]

    # 如果消息渠道包含@chatroom关键字，说明是群消息，这时需要解析下消息内容，因为消息内容中包含了发送者的id和@信息
    ifGroupMessage = "@chatroom" in sendChannel

    group_mes_send_user = None
    if ifGroupMessage:
        send_content = msgContent.split(":\n")
        # 解析出是哪个群成员发送的消息，和实际发送的消息内容
        group_mes_send_user, msgContent = send_content[0], send_content[1]
        msgContent = re.sub(r'@[^\u2005]+( |   $)', '', msgContent).strip()

    # # 调用随机名言API、当然，你可以调用任何你想调用的API，比如ChatGPT
    # replayMsg = requests.get("https://api.7585.net.cn/yan/api.php?lx=mj").text

    # # 将API的结果给这个用户，其他的微信API能力，可以参考：https://github.com/kawika-git/wechatAPI/blob/main/menu.md
    # requests.post(WECHAT_API_URL, json={
    #     "type": 10009,
    #     "userName": sendChannel,  # 哪个好友发送的消息就回复给哪个好友，哪个群发送的消息就回复给哪个群
    #     "msgContent": replayMsg  # 回复的内容
    # })

    # # 如果我想监听群消息，有人说话我就回复应该怎么样？
    # if ifGroupMessage:
    #     # 调用随机名言API、当然，你可以调用任何你想调用的API，比如ChatGPT
    #     replayMsg = requests.get("https://api.7585.net.cn/yan/api.php?lx=mj").text
    #     requests.post(WECHAT_API_URL, json={
    #         "type": 10009,
    #         "userName": sendChannel,  # 哪个好友发送的消息就回复给哪个好友，哪个群发送的消息就回复给哪个群
    #         "msgContent": replayMsg  # 回复的内容
    #     })

    # 如果我想别人在群里@我的时候，我才回复，并且回复的时候我@对方，该怎么办呢？
    # 必须是群消息，才能有@功能
    if ifGroupMessage:
        # 先获取到自己的微信id
        login_wxid = data['robot']['userName']
        # 如果不是@我的消息，我就不回复了
        if login_wxid not in data['data']["reversed1"]:
            return jsonify({"success": "true"})
        # 调用随机名言API、当然，你可以调用任何你想调用的API，比如ChatGPT
        replayMsg = requests.get("https://api.7585.net.cn/yan/api.php?lx=mj").text

        # 获取到发送人的微信名
        group_mes_send_user_Name = msg_obj["chatroomMemberInfo"]["nickName"]
        # 把@消息拼到回复消息中
        replayMsg = f"@{group_mes_send_user_Name} {replayMsg}"
        requests.post(
            WECHAT_API_URL,
            json={
                "type": 10009,
                "userName": sendChannel,  # 哪个好友发送的消息就回复给哪个好友，哪个群发送的消息就回复给哪个群
                "msgContent": replayMsg,  # 回复的内容
                "atUserList": [group_mes_send_user]
            })

    print(f"{sendChannel} 发送了消息：{msgContent}")
    return jsonify({"success": "true"})


def addCallBackUrl(callBackUrl):
    """
    设置回调地址，当有人发送消息时，微信会就把信息发送到这个接口中
    :param callBackUrl: 回调地址，当有人发送消息时，微信会就把信息发送到这个接口中
    :return: 
    """
    # 获取所有的回调地址
    resdatalist = requests.post(WECHAT_API_URL, json={
        "type": 1003,
    }).json()["data"]["data"]
    # 删除之前的回调地址
    for item in resdatalist:
        requests.post(WECHAT_API_URL,
                      json={
                          "type": 1002,
                          "cookie": item["cookie"],
                      })
    # 设置新的回调地址
    requests.post(WECHAT_API_URL,
                  json={
                      "type": 1001,
                      "protocol": 2,
                      "url": callBackUrl
                  })


if __name__ == '__main__':
    # 将微信回调地址设置为这个服务的地址
    try:
        # 给微信设置回调地址，当有人给发送消息时，微信会就把信息发送到这个接口中
        addCallBackUrl("http://127.0.0.1:18000/wechatSDK")
        print("连接微信成功")
    except Exception as e:
        print("连接微信失败", e)
    app.run(host='0.0.0.0', port=18000)

```

##### 返回参数说明 

| 参数名         | 类型     | 说明   |   
|:------------|:-------|------|   
| error_code  | int    | 错误代码 |   
| description | string | 错误描述 |   
| data        | json   | 业务数据 |   

##### 备注 

- 更多返回错误代码请看[错误代码.md](../错误代码.md)







