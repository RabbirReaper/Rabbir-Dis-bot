import {spawn} from 'child_process';

export const run = async (input, userId, message) => {
    const dir = `userCodes\\${userId}.exe`;

    try {
        const startTime = process.hrtime(); // 程式開始時間
        const childProcess = spawn(dir);
        let isTimeout = false
        let output = "";
        const timeout = setTimeout(() => {
            isTimeout = true;
            childProcess.kill(); // 終止
        }, 1000);

        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error("Error:", data);
            message.reply("程式執行錯誤！");
        });

        childProcess.on('close', () => {
            if(isTimeout){
                message.reply("```\nTLE```");
            }else{
                const endTime = process.hrtime(startTime); // 計算執行時間差值
                output.trim()
                if(output.length > 1000){
                    output = output.slice(0, 1000)
                    output += "\n...(輸出被截斷)..."
                }
                message.reply("```\n"+output+"```"+"```\n執行時間 : " + (endTime[0]*1000 + endTime[1]/1e6).toFixed(0) +"豪秒```")
                // message.reply("```\n"+output+"```"+"```\n執行時間 : " + endTime[1] +"豪秒```")
            }
        });

        childProcess.stdin.write(input);
        childProcess.stdin.end();
    } catch (error) {
        console.error("Error:", error);
        message.reply("```\n程式執行錯誤 !```");
    }
};
