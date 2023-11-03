import fs from 'fs-extra'
import { resolve } from 'path'
import { ZodError } from 'zod'
import configSchema from '../../schemas/config/config'

const path = resolve(`config/${process.env.NODE_ENV || 'development'}.json`)
const pathUntracked = resolve(`config/untracked/${process.env.NODE_ENV || 'development'}.json`)

let config

if (fs.pathExistsSync(path)) {
    try {
        config = fs.readJsonSync(path)
        if (fs.pathExistsSync(pathUntracked)) {
            config = { ...config, ...fs.readJSONSync(pathUntracked) }
        }
        configSchema.parse(config)
    } catch (error) {
        if (error instanceof ZodError) {
            console.log(error.message)
            console.log(error.errors)
            process.exit()
        }
        if (error instanceof Error) {
            console.log(error.message)
            process.exit()
        }
        console.log('Error while charing config')
        process.exit()
    }
} else {
    console.log("No configuration found in", path, "aborting!")
    process.exit()
}