import { transform, registerPlugin } from '@babel/standalone';
import plugin from './babel-plugin-code-preparator';

registerPlugin('code-preparator', plugin);
export const compileJsx = (code: string) =>
  transform(`"untransformed";\n${code.trim()}` || '', {
    presets: ['react', 'codePreparator']
  }).code.replace(/;$/, '');

export const validateCode = (code: string) => {
  try {
    compileJsx(code);
    return true;
  } catch (err) {
    return false;
  }
};
