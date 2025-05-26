import { z } from 'zod';

const levelSchema = z.enum(['silly', 'debug', 'info', 'warning', 'error']);

const logTransportSchema = z.object({
  level: levelSchema,
});

const sqliteConnection = z.object({
  filename: z.string().trim(),
});

const mysqlConnection = z.object({
  host: z.string(),
  port: z.string().optional(),
  user: z.string(),
  password: z.string().optional(),
  database: z.string().optional(),
});

export default z.object({
  server: z.object({
    port: z.number().min(1024).max(49151),
  }),
  databases: z.object({
    mysql: mysqlConnection.optional(),
    sqlite: sqliteConnection.optional(),
    redis: z
      .object({
        host: z.string(),
        port: z.number().min(1).max(65535),
        password: z.string().optional(),
        db: z.number().int().min(0).max(15).optional(),
      })
      .optional(),
  }),
  log: z
    .object({
      globalMinlevel: levelSchema.optional(),
      transports: z.object({
        console: logTransportSchema.optional(),
        database: logTransportSchema.optional(),
      }),
    })
    .optional(),
});
