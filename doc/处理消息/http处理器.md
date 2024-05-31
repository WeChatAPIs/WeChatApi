
#### 简要描述

- 添加HTTP消息处理器，你需要自己实现**Http Server**。
- 推送方式为`POST`

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
 {
  "type": 1001,
  "protocol": 2,
  "url": "http://127.0.0.1:18000/"
 } 
```
#### 常见问题
```
1、回调的远程服务器，为什么有时候接收不到消息
    1.1、为了防止消息堆积造成压力过大，底层做了http请求超时时间，加了超时时间就和网络、远程服务处理性能这些东西有关系
    建议：
      - 本地做一层中转，根据业务需求和服务器处理性能，自行控制超时时间和转发频率这类内容，多一层中转，也会有很多优势
      - 试用ws协议
2、回调的本地，为什么有时候消息会卡住，输入回车才能继续接收到消息
    2.1、window的黑窗口默认是开启【快速编辑模式】的，这个模式下，黑窗口阻塞运行，需要关掉该模式，自行百度即可

```

#### 推送示例
```
{
  "pushType": 1,
  "pushTime": 1685179951,
  "data": 
      {
          "from": "wxid_xxx",
          "to": "wxid_xxx",
		  "type": 1,
		  "content": "123",
		  "msgSvrID": 1111111111111111111111,
		  "reversed1": "xxx",
		  "createTime": 1685179951
      }
} 
```

#### 示例代码
- 包含了：
  - 自动回复文本消息
  - 接收来自群/好友的图片、视频、文件
  - 群中被@了回复才对方，并且也@对方
  - 语音消息转文字
  - 自动接收好友申请
```
import random
import re
import time

import requests
import xmltodict
from flask import Flask, request, jsonify

# Flask常规操作
app = Flask(__name__)
WECHAT_API_URL = 'http://127.0.0.1:8888/api/'


# 接受消息推送的接口，所有的消息都会回调到这个接口中，由于只是演示，就只支持一个微信，如果多开了微信回调到同一个服务的同一个接口，需自行解析处理
@app.route('/wechatSDK', methods=['POST'])
def chat():
    data = request.json
    print(data)
    pushType = data["pushType"]  #
    if pushType != 1:  # 这里演示，只处理同步类型消息，其他类型可以自行处理
        return jsonify({"success": "true"})
    # 消息类型详见： https://github.com/WeChatAPIs/wechatAPI/blob/main/doc/处理消息/消息类型.md
    if data["data"]['type'] == 1:
        # 文本消息
        hadle_text_msg(data)
    # 消息类型详见： https://github.com/WeChatAPIs/wechatAPI/blob/main/doc/处理消息/消息类型.md
    if data["data"]['type'] == 34:
        # 语音消息
        handle_audio_msg(data)
    if data["data"]['type'] == 3:
        # 图片消息
        handle_image_msg(data)
    if data["data"]['type'] == 49:
        # XML消息
        handle_xml_msg(data)
    if data["data"]['type'] == 37:
        # 收到被添加好友消息
        handle_add_friend_msg(data)
    return jsonify({"success": "true"})


# 调用GPT和API产生结果
def hadle_text_msg(data):
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

    # # 将API的结果给这个用户，其他的微信API能力，可以参考：https://github.com/WeChatAPIs/wechatAPI/blob/main/menu.md
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
        if login_wxid not in data['data']["reserved1"]:
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
    pass


def handle_audio_msg(data):
    xmlContent = data['data']['content']
    # 微信群发言是有前缀的，这里需要去掉
    split = xmlContent.split(":\n")
    xmlContent = len(split) > 1 and split[1] or xmlContent
    content = xmltodict.parse(xmlContent)
    aeskey = content['msg']['voicemsg']['@aeskey']
    fileid = content['msg']['voicemsg']['@voiceurl']
    # 下载音频文件
    requests.post(
        WECHAT_API_URL,
        json={
            "type": 66,
            "fileid": fileid,
            "aeskey": aeskey,
            "fileType": 15,
            "savePath": f"D:\\aa\\{aeskey}.slik"
        })
    # 识别音频文件
    text = requests.post(
        WECHAT_API_URL,
        json={
            "type": 10045,
            "filePath": "D:\\aa\\" + aeskey + ".slik"
        })
    print("语音转文字结果：" + text.json())
    pass


def handle_add_friend_msg(data):
    xmlContent = data['data']['content']
    content = xmltodict.parse(xmlContent)
    username = content['msg']['@encryptusername']
    ticket = content['msg']['@ticket']
    scene = content['msg']['@scene']  #todo  scene参数取值是随便写的已实际的节点为准，这里只是演示下
    # 同意好友请求，这里只是演示，实际应用中，自己处理
    # 等待一会儿处理，模拟人工晚发现有人添加好友
    randomTime = random.randint(10, 30)
    time.sleep(randomTime)
    requests.post(
        WECHAT_API_URL,
        json={
            "type": 10035,
            "encryptUserName": username,
            "ticket": ticket,
            "scene":scene
        })
    pass


def handle_xml_msg(data):
    xmlContent = data['data']['content']
    # 微信群发言是有前缀的，这里需要去掉
    split = xmlContent.split(":\n")
    xmlContent = len(split) > 1 and split[1] or xmlContent
    content = xmltodict.parse(xmlContent)
    type = content['msg']['appmsg']['type']
    if type == str(6):
        # type 6 是文件，可以下载的，其他类型的消息自行处理，这里只处理文件类型
        fileName = content['msg']['appmsg']['title']
        fileId = content['msg']['appmsg']['appattach']['cdnattachurl']
        aeskey = content['msg']['appmsg']['appattach']['aeskey']
        # 下载文件，部分类型的文件可能有多条xml消息回调，注意判别哪些消息是可以处理，哪些是不能处理的
        requests.post(
            WECHAT_API_URL,
            json={
                "type": 66,
                "fileid": fileId,
                "aeskey": aeskey,
                "fileType": 5,
                "savePath": f"D:\\aa\\{fileName}"
            })
    elif type == str(33):
        # type 33 是小程序，可以打开的，其他类型的消息自行处理，这里只处理小程序类型
        appId = content['msg']['appmsg']['weappinfo']['appid']
        username = content['msg']['appmsg']['weappinfo']['username']
        pageUrl = content['msg']['appmsg']['weappinfo']['pagepath']
        # 打开小程序
        requests.post(
            WECHAT_API_URL,
            json={
                'type': 10106,
                'appid': appId,
                'bizUserName': username,
                'pageUrl': pageUrl
            })
    print(content)
    pass


def handle_image_msg(data):
    xmlContent = data['data']['content']
    # 微信群发言是有前缀的，这里需要去掉
    split = xmlContent.split(":\n")
    xmlContent = len(split) > 1 and split[1] or xmlContent
    content = xmltodict.parse(xmlContent)
    aeskey = content['msg']['img']['@aeskey']
    fileid = content['msg']['img']['@cdnthumburl']
    # 下载图片
    requests.post(
        WECHAT_API_URL,
        json={
            "type": 66,
            "fileid": fileid,
            "aeskey": aeskey,
            "fileType": 2,
            "savePath": f"D:\\aa\\{aeskey}.png"
        })
    print(content)
    pass


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
    requests.post(WECHAT_API_URL, json={"type": 1001, "protocol": 2, "url": callBackUrl})


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

#### 返回参数说明 

| 参数名         | 类型     | 说明   |   
|:------------|:-------|------|   
| error_code  | int    | 错误代码 |   
| description | string | 错误描述 |   
| data        | json   | 业务数据 |   

#### 备注 

- 更多返回错误代码请看[错误代码.md](../错误代码.md)







