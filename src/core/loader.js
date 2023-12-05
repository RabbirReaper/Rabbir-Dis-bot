import {REST,Routes,Collection} from 'discord.js'
import fg, { async } from 'fast-glob'
import {useAppStore} from '@/store/app'

const updateSlashCommands = async(_commands) =>{
    const rest = new REST({version:10}).setToken(process.env.Token)
    const result = await rest.put(
        Routes.applicationGuildCommands(process.env.Application_ID,'795152910270857236'),
        {
            body:_commands
        }
    )
}

export const loadCommands = async() =>{
    const appStore = useAppStore()
    const files = await fg('src/commands/**/index.js')
    const commands = []
    const actions = new Collection()
    for (const file of files) {
        const cmd = await import(file)
        commands.push(cmd.command)
        actions.set(cmd.command.name,cmd.action)
    }
    await updateSlashCommands(commands)
    appStore.commandsActionMap = actions
    // console.log(appStore.commandsActionMap)
}

export const loadEvents = async() =>{
    const appStore = useAppStore()
    const client = appStore.client
    const files = await fg('src/events/**/index.js')
    
    for (const file of files) {
        const eventFile = await import(file)

        if(eventFile.event.once){
            client.once(eventFile.event.name, eventFile.action)

        }else{
            client.on(eventFile.event.name, eventFile.action)
        }
    }
}