import fs from 'fs-extra';
import path from 'path';

export default async () => {
  // Read the package.json file to get the version
  const packageJsonPath = path.resolve(__dirname, '../../', 'package.json');
  const packageJson = await fs.readJSON(packageJsonPath);
  return packageJson.version;
};
