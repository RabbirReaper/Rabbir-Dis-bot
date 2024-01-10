import {Events} from 'discord.js'
import fs from 'fs'

export const event = {
    name:Events.MessageCreate,
    once:false,
}
export const action = async(message) =>{
    if (message.author.bot) return;
    message.content = message.content.replace("<@1007521034515271742>","")//把一開始的tag 清除掉
    const check  = './r'
    // console.log(message.content)
    message.content = message.content.trim()
    if(message.content.substring(0,3) !== check) return
    message.content = message.content.slice(3).trim()
    message.reply("OK")
    writeJSON(message.content)
}

function writeJSON(msg) {
    fs.readFile("src\\events\\readMsg\\msg.json", function (err, data) {
        if (err) {
            return console.error(err);
        }
    //將二進制數據轉換為字串符
        let jdata = data.toString();
    //將字符串轉換為 JSON 對象
        jdata = JSON.parse(jdata);
    //將傳來的資訊推送到數組對象中
        jdata.temp.push(msg);
        // user.total = user.userInfo.length;
        console.log(jdata.temp);//因為fs 是非同步操作，它會等待讀取完整個文件後再執行回調函數

    //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
        const str = JSON.stringify(jdata);
    //將字串符傳入您的 json 文件中
        fs.writeFile("src\\events\\readMsg\\msg.json", str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('OK...')
        })
    })
}