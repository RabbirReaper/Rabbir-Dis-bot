import {Events} from 'discord.js'
import {useAppStore} from '@/store/app'
import { async } from 'fast-glob'
import djson from '@/store/msg.json'


export const event = {
    name:Events.InteractionCreate,
    once:false,
}

export const action = async(interaction) =>{
    if (!interaction.isAutocomplete()) return;
    if(interaction.commandName !== 'find') return

    const key = interaction.options.getString('name')

    let choices = []

    for (let i = 0; i < djson.ans_key.length; i++) {//
        if(key !== null){
            let j;
            for (j = 0; j < key.length; j++) {
                if(check(j,djson.ans_key[i],key)) break
            }
            if(j !== key.length) continue;
        }
        const choice = {
            name: djson.ans_key[i],
            value: djson.ans_key[i]
        };
        choices.push(choice)
    }
    await interaction.respond(choices.slice(0,25))
}

function check( _j,a, b) {
    return _j >= a.length || b[_j] !== a[_j]
}