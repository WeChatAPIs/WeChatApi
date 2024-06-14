// utils/loadLocaleData.js 或 .ts 如果你使用 TypeScript
const fs = require('fs');
const path = require("node:path");

function readDirectory(dir) {
    try {
        const files = fs.readdirSync(dir, {withFileTypes: true, recursive: false});
        const result = [];
        const nonDirectoryFiles = []; // 临时数组存储非目录文件
        files.forEach((file) => {
            const fileNameOri = file.name;
            const fileNameShort = file.name

            if (file.isDirectory()) {
                const subDirectory = path.join(dir, fileNameOri);
                result.push({
                    id: fileNameShort,
                    path: fileNameShort,
                    isDirectory: true,
                    content: readDirectory(subDirectory)
                });
            } else {
                const pathItem = dir.replace("\\", "/")
                nonDirectoryFiles.push({
                    id: fileNameShort,
                    title: fileNameShort.replace(".md", ""),
                    isDirectory: false,
                    path: pathItem + "/" + fileNameShort,
                    content: []
                });
            }
        });
        result.push(...nonDirectoryFiles);
        return result;

    } catch (error) {
        return []
    }
}

function writeFile(docsFileIndexPath, menuResult) {
    // 写入文件
    fs.writeFile(docsFileIndexPath, menuResult, (err) => {
        if (err) {
            console.error('error! ' + docsFileIndexPath, err);
        } else {
            console.log('successfully! ' + docsFileIndexPath);
        }
    });
}

function genDoc(docPath, docsIndexPath) {

    const docsFileIndexJsonData = readDirectory(docPath);

    var menuResult = "";
// 将 JSON 对象转换为字符串
    for (let i = 0; i < docsFileIndexJsonData.length; i++) {
        const docsFileIndexJsonString = docsFileIndexJsonData[i]
        if (docsFileIndexJsonString.isDirectory) {
            menuResult += "\n\n**" + docsFileIndexJsonString.id + "**\n"
        } else {
            menuResult + "\n\n"
            menuResult += "**[" + docsFileIndexJsonString.id.replace(".md", "") + "](" + docsFileIndexJsonString.path + ")**\n"
            continue
        }
        const docsFileIndexItem = docsFileIndexJsonString.content
        for (let j = 0; j < docsFileIndexItem.length; j++) {
            const item = docsFileIndexItem[j]
            menuResult += "-  ✅[" + item.id.replace(".md", "") + "](" + item.path + ")\n"
        }
    }
    writeFile(docsIndexPath, menuResult)
}


function readFileContent(filePath) {
    try {
        // 使用 fs.readFileSync 同步读取文件内容
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}


function genUpdateHistory(readMePath, docsIndexPath) {
    const data = readFileContent(readMePath)
    var hisStr = "## 📅 更新日志"
    hisStr += data.split("## 📅 更新历史记录")[1]
    writeFile(docsIndexPath, hisStr)
}

genDoc("doc", 'menu.md')
genUpdateHistory("README.md", 'doc/readme/更新日志.md')