import Logger from '../libs/logger';

export default function () {
  const component = 'check-env-vars';
  const env_variable_that_must_exist = ['', '', '', '', '', ''];
  const missing = [];
  for (const env of env_variable_that_must_exist) {
    if (!process.env[env]) {
      missing.push(env);
    }
  }
  if (missing.length > 0) {
    const logger = new Logger({ component });
    logger.error({
      message: `Aborting! Missing one or more mandatory ENVIRONMENT VARIABLE list: [${missing.join(
        ','
      )}]`,
    });
    process.exit(1);
  }
}
