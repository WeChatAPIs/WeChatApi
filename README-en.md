## 🌍 *[English](README-en.md) ∙ [简体中文](README.md)*

# WeChat API - Powerful WeChat Interface and Hook Tool

## 🌟 Project Overview
The WeChat Black Technology project is developed based on the WeChat Windows protocol and Android protocol, offering a powerful set of WeChat API tools. Our goal is to provide users with more open and customizable WeChat access capabilities by being compatible with the WeChat protocol.

**Trial applications are automatically approved. Please set the email subject to: WechatApi Application for Trial-Individual Version or WechatApi Application for Trial-Enterprise Version. See below for email and template details**

## ✨ Features
- **Stability Without Getting Banned**: Many official risk control strategies include devices, behavior, content, etc. We can ensure that you won’t get banned because of this software.
- **Native Interface**: Direct encapsulation of the native WeChat interface.
- **Secondary Development Interface**: Expansion based on the native interface, implementing more functions.
- **Supports Multiple Instances**: Supports running multiple instances of WeChat.
- **WeChat Channel**: Integrates Android version [WeChat Channel API](doc/视频号).
- **Moments**: Integrates Android version [Moments API](doc/朋友圈).
- **Live Streaming Room**: Integrates Android version [Live Streaming Room API](doc/直播间).
- **Rich API**: Integrates APIs from both Android and Windows versions of WeChat [Click to view API](menu.md)

## 🚀 Quick Start
Please refer to our [Quick Start Guide](doc/快速启动.md) and [API Documentation](menu.md) to quickly start using the WeChat API.

## 🔧 Necessary Conditions for Use
- Device Requirements: Physical Windows PC with Win7 or higher, or Cloud Server Windows PC with Win7 or higher.
- WeChat Version Requirements: 3.9.5.* or 3.9.2.* (This version may lack some APIs, it is recommended to use 3.9.5.*)

## 🆓 Free and Paid Versions
- **Free Version**:
  - Freebie: Successful cracking of the paid version with a viable proposal, generous rewards.
  - Trial:
    - Individual users: Supports a single WeChat free trial for 7 days.
    - Enterprise users: Supports a single device free trial for 14 days.
  - Collaboration:
    - Developers: Develop tools based on this software, gain permanent device usage rights and extra bonuses.
      - Email subject: Application for Collaboration
      - Bonuses of 150,000 RMB have been distributed through this method (data as of: 2024/02/21)
    - Promoters: Promote the software, enjoy preferential purchasing and bonuses.
- **Paid Version**:
  - ~~WeChat Edition~~: Limited to WeChat accounts, unlimited number of devices. (WeChat can be re-bound) (To reduce maintenance costs, this version is temporarily not available)
  - Device Edition: Limited to devices, unlimited number of WeChat accounts. (Devices can be re-bound)
  - Unlimited Edition: Unlimited number of WeChat accounts and devices. (To regulate the market, not available for individual users for now)
  - Cooperation Edition: If you want to develop an upper-layer application based on this API with time-based subscription, please send an email (Application for Cooperation) for an independent cooperation quote

## 📞 Support and Services
- **Lacking Some WeChat APIs**: Free development.
- **Custom Business Functionality**: Negotiable.
- **New Version Upgrade**:
  - Individual users: Major version upgrade charge is 20%, minor version upgrades are free.
    - Optional, old versions can continue to be used without upgrading.
    - Major version definition: Supports major version updates such as new versions of WeChat, etc.
  - Enterprise users: Upgrade fees depend on whether there are customized functions.
- **Maintenance**: Full-time maintenance team.
- **Account Safety**: There have been no cases of accounts being banned due to the software historically, those knowledgeable in technology should understand that bans are mostly due to call frequency and content reasons.
  - Provides reference manuals for call frequency and content
- **Changing Binding of Device/WeChat**: Batch changes are made at a fixed time each month, please email if you need to change binding, you will be notified before the batch change is executed.
  - Email subject: [Change Binding Application]
  - Email content (please copy the format below):
```
Old Device Number: xxxx
New Device Number: xxxx
Contact Information (WeChat): xxxx
```

## 📬 Contact Information
- Business Inquiries: wetool_api@163.com
- Trial Inquiries: wetool_api@163.com
- **Email Format**:
  - **Trial applications are automatically approved, make sure to set the [Email Subject] to one of the following and leave a *valid* contact method**:
    - WechatApi Application for Trial-

Individual Version
- WechatApi Application for Trial-Enterprise Version
```
  Subject: [Purpose xxxx]
  Body:
  - Planned purchase version and quantity:
    - xxxxx
  - Contact information as follows:
    - QQ: xxxxx
    - WeChat: xxxxx
    - Phone: xxxxx
    - Telegram: xxxxx
    - WeChat: xxxxx
```


## 🤝 Contribution and Feedback
We welcome and encourage community contributions and feedback. If you have any suggestions or want to contribute code, please contact us through Issues or Pull Requests.

## 🌐 Social Media and Community
<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=8MaSQ1tV3E04ZYCzrFpfMQlTN6yhxT48&jump_from=webapi&authKey=Hm0kjqvTb47CLYU8x0Q3FYA4LbvDKvL8VY7Byw9Nle4rEdPw2cmg9Bem4/vyeybU"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="wechatAPI technical exchange" title="wechatAPI technical exchange"></a>(616651311) （Technical support only, no requirement, do not add!）

## 🔖 Tags
`WeChat` `API` `Hook` `WeChat Development` `Protocol Compatibility` `Multiple Instances of WeChat`

## 📅 Update Log
### 2024
- **March 6th**:
  - Updated the user manual
  - Updated documentation, added more examples: [Get All Friends List](doc/通讯录/获取所有好友列表.md)
  - Added API: [Get Enterprise Friends Nickname](doc/通讯录/获取企业用户昵称.md)
  - Added API: [Get Group List](doc/群管理/获取所有群列表.md)
  - Added documentation: [Brief Introduction to WeChat Database](doc/数据库/微信数据库简述.md)
  - Released version: [wechatAPI_1.1.3]() Anti-ban mechanism optimized, added mechanisms to avoid being recognized.
- **February 21st**:
  - Updated the user manual
  - No longer supports ARM systems (if the launcher is garbled after opening, it means it is not supported)
  - Added [Get All Friends List](doc/通讯录/获取所有好友列表.md)
- **February 18th**:
  - A good start to work!
  - Released repair version: [1.1.2.f1]() To avoid the launcher crash due to weak network environment on the computer, added known mechanisms to avoid being recognized.
  - Fixed the occasional unavailability issue of the [WeChat Anti-Revoke Notification](doc/其他功能/开启关闭防撤回.md) interface.
  - Added [Delete Single Message Callback Handler](doc/处理消息/移除处理器.md) interface
- **February 4th**:
  - Fixed the occasional exception of the [Add Group Members to Contacts](doc/群管理/添加群成员到通讯录.md) interface
  - Updated the [Send Voice Message](doc/发送消息/发送语音.md) interface documentation, no functionality change
  - Last update before the New Year, wishing everyone a Happy New Year
- **January 31st**:
  - Added [Forward Picture.md](doc/发送消息/转发图片.md) interface.
  - Added [Forward File.md](doc/发送消息/转发文件.md) interface.
  - Added [Forward Video.md](doc/发送消息/转发视频.md) interface.
  - Added [Forward Voice.md](doc/发送消息/转发语音.md) interface.
  - Added scene field to friend application interface, can be obtained from message XML.
  - Released version: 1.1.2
- **January 24th**:
  - Added [Open/Close Anti-Revoke](doc/其他功能/开启关闭防撤回.md) interface. When a message is retracted, the original message content will be pushed along with it.
  - Added [Text Translation](doc/其他功能/文本翻译.md) interface.
- **January 3rd**:
  - Prepared Moments interface XML example, see here: [Click to view](https://github.com/kawika-git/wechatSDK)
  - Prepared sending mini-program XML example
### 2023
- **December 23rd**:
  - Subsequent support for new APIs of version 3.9.2.* will no longer be continuous. Existing APIs will continue to be supported, and bugs will

be fixed.
- Fixed [Video Account Work Decryption](doc/视频号/视频号作品解密.md)
- Added [Send Video.md](doc/发送消息/发送视频.md)
- Added [Send Link.md](doc/发送消息/发送链接.md)
- **November 24th**:
  - Added fields to the [Get User Information](doc/通讯录/获取用户信息.md) interface, supporting obtaining user information through group chats.
  - Added [Add Group Members to Contacts](doc/群管理/添加群成员到通讯录.md) interface.
  - Added [WebSocket Handler](doc/处理消息/WebSocket处理器.md)
  - Added [Get Message Handler List](doc/处理消息/获取消息处理器列表.md) interface.
  - Added [Logout](doc/登录相关/退出登录.md) interface.
  - Message push and active call format optimization.
  - Fixed multi-threading call bug.
  - [Get Personal Information](doc/个人信息/获取个人信息.md) interface optimization.
- **November 11th**:
  - Exit event listening optimization.
  - Message push optimization.
  - Added point-to-point message handler.
  - Added a new interface call method.
  - Python sample code optimization.
- **September 19th**:
  - Fixed the bug of sending text messages causing WeChat to crash (only x64 version).
- **September 18th**:
  - Remember history, never forget national humiliation.
- **September 17th**:
  - Modified compilation options to reduce dependency on runtime libraries.
- **September 14th**:
  - Filtered out some actively sent message pushes.
  - Fixed the bug caused by inviting to join group chat interface.
  - Fixed the bug of x64 version having no return when calling interfaces during login initialization.
  - Messages sent through interfaces now will be displayed in the WeChat client.
  - Login event push optimization.
  - Add friend interface optimization.
- **September 6th**:
  - Supported the push of actively sent messages.
  - Added inviting to join group chat interface.
  - Added group chat invitation verification interface.
- **August 28th**:
  - Modified HttpServer logic to solve concurrency call error.
  - Minor interface number changes.
  - Added operation cloud function interface.
  - Added refresh mini-program session interface.
  - Added get mini-program usage record interface.
  - Added update mini-program usage record interface.
  - Added get mini-program information interface.
  - Added batch get mini-program information interface.
  - Added get mini-program package download address interface.
  - Lifted the restriction on virtual machines being unusable.
- **August 15th**:
  - Fixed the bug of incomplete file download through cdn download interface.
  - Updated 3.9.5.8164 bit version SDK.
  - wxrpd64.dll partial logic update.
- **August 10th**:
  - Fixed the bug of triggering WeChat to re-login after calling any interface in version 3.9.5.81.
  - Fixed the ineffective bug of delete group member interface.
  - Fixed the ineffective bug of close group chat mute interface.
  - Fixed the ineffective or causing WeChat to crash bug of save payment code interface.
  - Fixed the bug of some interface calls failing in version 3.9.5.81.
  - Fixed the bug of query database interface executing wrong sql after.
  - Added mini-program authorization interface.
  - Added lock WeChat interface.
  - Known issues of wxrpd64.dll and pyrpd fixed.
- **July 20th**:
  - Opened a series of video account related interfaces.
  - Opened get mini-program code interface.
  - Attempted to fix the bug of getting contacts interface getting stuck.
  - Adjusted document structure.
- **July 9th**:
  - Fixed the bug of offset set in search one search interface being ineffective.
  - Get database information interface optimization.
  - Opened database backup interface.
- **July 6th**:
  - Added automatic patch to WeChat's check for updates when injecting.
  - Added get H5Key interface.
  - Optimized search one search, get public account history messages interface.
  - Added get database information interface.
  - Added query database interface.
- **June 30th**:
  - Solved cdn download interface error problem.
- **June 29th**:
  - Added remark field to get user information interface.
  - Optimized batch get user information interface.
  - Fixed http service crash bug.
- **June 28th**:
  - Opened CDN download interface.
  - Opened search user information interface.
  - Added get backup library key interface.
  - Fixed the bug of failing to successfully get when friend count is greater than 100
.
- Migrated documentation to this site.
- **May 27th**:
  - Wrote and published this document.