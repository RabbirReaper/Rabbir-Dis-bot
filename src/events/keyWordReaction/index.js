import {Events} from 'discord.js'
import fs from 'fs'
import {exec,spawn} from 'child_process'

export const event = {
    name:Events.MessageCreate,
    once:false,
}

export const action = async(message) =>{
    if (message.author.bot) return;
    message.content = message.content.replace("<@1007521034515271742>","")
    const check  = 'cpp'
    message.content = message.content.trim();
    // console.log(message.content)

    if(message.content.substr(3,3) === check){
        const code = message.content.slice(message.content.indexOf("cpp")+3, message.content.indexOf("``````")) // 從訊息文本中提取程式碼
        const userId = message.author.id; 
        let dir = "./userCodes"; // 存儲程式碼文件的文件夾
    
        if (!fs.existsSync(dir)){ // 如果文件夾不存在，則創建一個新的文件夾
            fs.mkdirSync(dir);
        }
    
        fs.writeFileSync(`${dir}/${userId}.cpp`, code) // 將提取出的程式碼保存到文件夾中
        exec(`g++ -Wall -Wextra -O2 -std=c++14 ${dir}\/${userId}.cpp -o ${dir}\/${userId}.exe`, (err, stdout, stdin) => { // 使用 g++ 命令編譯 C++ 程式
            //  "cd $dir & g++ -Wall -Wextra -O2 -std=c++14 \"$fileName\" -o \"$fileNameWithoutExt\" & $dir\"$fileNameWithoutExt\""
            if (err != null) { // 如果編譯出錯
                message.reply("```\n" + err.toString().slice(0, 1500) + "```") // 將錯誤消息傳回到 Discord 服務器
                return;
            }
        })

        dir = `userCodes\\${userId}.exe`;

        const input = message.content.slice(message.content.indexOf('``````')+6, message.content.lastIndexOf('```')) // 從Discord訊息獲取輸入的文本
        const childProcess = spawn(dir, [], { stdio: ['pipe', 'pipe', 'pipe'] });
        childProcess.stdin.write(input);
        childProcess.stdin.end();
        let outputData = ''; // 用於存儲輸出的數據
        let isTimeout = false;

        const timeout = setTimeout(() => {
            isTimeout = true;
            childProcess.kill(); // 終止子進程
        }, 1000);

        childProcess.stdout.on('data', (datas) => {
            if (!isTimeout) {
                outputData += datas; // 將輸出數據累加
            }
        });
        
        childProcess.on('close', (code) => {
            clearTimeout(timeout); // 清除計時器
            if (code !== 0 && isTimeout) {
                message.reply("TLE"); // 回覆 Discord 用戶 TLE
            }else if(code === 0) {
                message.reply(`\`\`\`${outputData.replace(/\s+/g, ' ').trim()}\`\`\``);
            }else{
                message.reply('SE');
            }
        });
    }
}
