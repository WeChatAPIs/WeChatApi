
#### 简要描述

- 发送XML消息

#### 请求URL
- ` http://127.0.0.1:8888/api/`
  
#### 请求方式
- POST 

#### 参数

| 参数名      | 必选 | 类型     | 说明      |   
|:---------|:---|:-------|---------|   
| type     | 是  | int    | 接口编号    |   
| userName | 是  | string | 接收人wxid |   
| content  | 是  | string | xml内容   |   

#### 请求示例
如果有些消息类型不知道怎么发，就用其他的号发一条消息查看回调的消息内容，xml复制过来改改就行了
如果下方提供的小程序消息模板不行了，就说明微信更新了，需要重新抓包获取新的小程序消息模板

```
 {
  "type": 10053,
  "userName": "filehelper",
  "content": "<appmsg appid=\"\" sdkver=\"\">...</appmsg>"
 } 
```
小程序消息模板
```
<appmsg appid="wxccbcac9a3ece5112" sdkver=""><title>点外卖有优惠，到店消费享折扣</title><des></des><action>view</action><type>33</type><showtype>0</showtype><content></content><url>https://mp.weixin.qq.com/mp/waerrpage?appid=wxccbcac9a3ece5112&amp;amp;type=upgrade&amp;amp;upgradetype=3#wechat_redirect</url><dataurl></dataurl><lowurl></lowurl><lowdataurl></lowdataurl><recorditem></recorditem><thumburl></thumburl><messageaction></messageaction><laninfo></laninfo><md5>45aa6d4173817719325046cd881fa92d</md5><extinfo></extinfo><sourceusername></sourceusername><sourcedisplayname>收钱吧</sourcedisplayname><commenturl></commenturl><appattach><totallen>0</totallen><attachid></attachid><emoticonmd5></emoticonmd5><fileext>jpg</fileext><filekey>dbb0e647bd45df3d1bd83d22d51b8073</filekey><cdnthumburl>3057020100044b304902010002048040484d02032df53d020448fec2010204659b5989042430353765643637352d323166332d343936342d623033322d3061663162646230653835300204011808030201000405004c51e500</cdnthumburl><aeskey>5efa5257be70f5fd634676f997e79129</aeskey><cdnthumbaeskey>5efa5257be70f5fd634676f997e79129</cdnthumbaeskey><cdnthumbmd5>45aa6d4173817719325046cd881fa92d</cdnthumbmd5><encryver>1</encryver><cdnthumblength>65264</cdnthumblength><cdnthumbheight>100</cdnthumbheight><cdnthumbwidth>100</cdnthumbwidth></appattach><webviewshared><publisherId></publisherId><publisherReqId>0</publisherReqId></webviewshared><weappinfo><pagepath>E1QDEFPQUJWB/8h7i19z4p8u6/index.html</pagepath><username>gh_d84dab09c109@app</username><appid>wxccbcac9a3ece5112</appid><type>2</type><weappiconurl>http://mmbiz.qpic.cn/sz_mmbiz_png/8j3ricAzicZb1uMHRianKEjniag0Y5ZYzibe81gKws0knrX2fwpJzS8QCjQvQ0ZEnFsrvt81aFvwI3fZqFo9paMPRqw/640?wx_fmt=png&amp;wxfrom=200</weappiconurl><appservicetype>0</appservicetype><shareId>2_wxccbcac9a3ece5112_3151816252_1704679817_1</shareId></weappinfo><websearch /></appmsg>
```


#### 返回示例 

``` 
  {
    "data": {
      "status": 0,
      "desc": "",
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






