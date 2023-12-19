import { spawn} from 'child_process';

export const run = async (input, userId, message) => {
    const dir = `userCodes\\${userId}.exe`;

    try {
        const process = spawn(dir);
        let isTimeout = false
        let output = "";
        const timeout = setTimeout(() => {
            isTimeout = true;
            process.kill(); // 終止子進程
        }, 1000);

        process.stdout.on('data', (data) => {
            output += data.toString();
        });

        process.stderr.on('data', (data) => {
            console.error("Error:", data);
            message.reply("程式執行錯誤！");
        });

        process.on('close', () => {
            if(isTimeout){
                message.reply("```\nTLE```");
            }else{
                output.trim()
                if(output.length > 1000){
                    output = output.slice(0, 1000)
                    output += "\n...(輸出被截斷)..."
                    message.reply("```\n"+output+"```")
                    return;
                }
                message.reply("```\n"+output+"```")
            }
        });

        process.stdin.write(input);
        process.stdin.end();
    } catch (error) {
        console.error("Error:", error);
        message.reply("```\n程式執行錯誤 !```");
    }
};


    // const childProcess = spawn(dir, [], { stdio: ['pipe', 'pipe', 'pipe'] });
    // childProcess.stdin.write(input)
    // childProcess.stdin.end()
    // let outputData = ''; // 用於存儲輸出的數據
    // let isTimeout = false;

    // const timeout = setTimeout(() => {
    //     isTimeout = true;
    //     childProcess.kill(); // 終止子進程
    // }, 1000);

    // childProcess.stdout.on('data', (datas) => {
    //     if (!isTimeout) {
    //         outputData += datas; // 將輸出數據累加
    //     }
    // });

    // childProcess.on('close', (code) => {
    //     clearTimeout(timeout) // 清除計時器
    //     if (code !== 0 && isTimeout) {
    //         message.reply("TLE"); // 回覆 Discord 用戶 TLE
    //     }else if(code === 0) {
    //         message.reply(`\`\`\`${outputData.replace(/\s+/g, ' ').trim()}\`\`\``);
    //     }else{
    //         message.reply('SE');
    //     }
    // });