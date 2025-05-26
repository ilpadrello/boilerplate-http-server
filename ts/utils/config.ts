import fs from 'fs-extra';
import { resolve } from 'path';
import { ZodError, z } from 'zod';
import configSchema from '../schemas/config/config';
import path from 'path';
import jsYaml from 'js-yaml';
import * as dotenv from 'dotenv';

const pathToConfigDir = resolve(`config/`); //${process.env.NODE_ENV || 'development'}`)
const pathToConfigUntrackedDir = resolve(`config/untracked`);
const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.join(pathToConfigDir, environment + '.env') });

type Config = z.infer<typeof configSchema>;

let config: any;
if (fs.pathExistsSync(pathToConfigDir)) {
  try {
    config = { ...config, ...getConfigFromDir(pathToConfigDir) };
    config = { ...config, ...getConfigFromDir(pathToConfigUntrackedDir) };
    config = substituteEnvValues(config);
    configSchema.parse(config);
  } catch (error) {
    console.log('Error while charing config');
    if (error instanceof ZodError) {
      console.log(error.message);
      console.log(error.errors);
      process.exit();
    }
    if (error instanceof Error) {
      console.log(error.message);
      process.exit();
    }
    process.exit();
  }
} else {
  console.log('No configuration found in', path, 'aborting!');
  process.exit();
}

function getConfigFromDir(pathToConfigDir: string) {
  let config;
  if (fs.pathExistsSync(pathToConfigDir)) {
    const configDir = fs.readdirSync(pathToConfigDir);
    for (const filename of configDir) {
      const fileBaseName = path.parse(filename).name;
      if (fileBaseName === environment) {
        const pathToFile = path.join(pathToConfigDir, filename);
        const fileExtension = path.extname(pathToFile);
        const file = fs.readFileSync(pathToFile, 'utf8');
        switch (fileExtension) {
          case '.json':
            config = JSON.parse(file);
            break;
          case '.yaml':
          case '.yml':
            config = jsYaml.load(file);
        }
      }
    }
  }
  return config;
}

type GenericObject = { [key: string]: any };
function substituteEnvValues(obj: GenericObject): GenericObject {
  const envVarRegex = /^process\.env\.(.+)$/;

  const substitute = (value: any): any => {
    if (typeof value === 'string') {
      const match = envVarRegex.exec(value);
      if (match) {
        // Replace with environment variable, or keep the original string if not found
        return process.env[match[1]] ?? value;
      }
      return value;
    } else if (Array.isArray(value)) {
      return value.map(substitute);
    } else if (value && typeof value === 'object') {
      return substituteEnvValues(value);
    }
    return value;
  };
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = substitute(obj[key]);
    return acc;
  }, {} as GenericObject);
}

export default config as Config;
