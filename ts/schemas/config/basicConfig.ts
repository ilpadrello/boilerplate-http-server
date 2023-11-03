import { z } from 'zod'

export default z.object({
    server: z.object({
        port: z.number().min(1024).max(49151)
    })
})