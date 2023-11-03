import * as dotenv from 'dotenv'
import figlet from 'figlet'
import fs from 'fs-extra'
import os from 'os'
import { resolve } from 'path'
// import Logger from './utils/logger'
import path from 'path'

// import app from './server/app'
// import config from './utils/config'
const packagePath = resolve(`./package.json`)
const pjson = fs.readJSONSync(packagePath)

const basePath = __dirname
const envVariablePath = path.join(`./config/.${process.env.NODE_ENV || 'development'}.env`)

console.log(basePath)

// Loading the correct .env file, this should no be necessary in production, and should not raise an error
// dotenv.config({ path: envVariablePath })
//     (async () => {
//         const logger = new Logger()
//         // Hello
//         console.log(
//             figlet.textSync(pjson.name, {
//                 font: "Small",
//                 horizontalLayout: "default",
//                 verticalLayout: "default"
//             })
//         )
//         console.log() // Empty line 

//         app.set('port', config.server.port)
//         app.listen(config.server.port, '0.0.0.0')
//         console.log(`${pjson.name} \x1b[0m running \x1b[10m on  \x1b[31m port ${config.server.port} \x1b[0m`)

//         await logger.debug({
//             component: "server.ts",
//             message: "This is the message"
//         })
//     })()
