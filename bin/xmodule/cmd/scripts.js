const fse = require('fs-extra');

const {
  colorStr: {
    yellow,
    cyan,
  },
  underPath,
  icons: {
    hollowCircle,
  },
  log: {
    log,
  },
  shouldBe: {
    sbValidValue,
    sbValidDir,
    sbValidPlainObject,
  },
  fileOp: {
    getExistFiles,
  },
  strAdjust: {
    strAdjustRight,
  },
} = require('../../../utils');

/**
 * 显示当前项目 package.json 中的 scripts 脚本
 */
module.exports = (dir) => {
  const targetDir = underPath('cur', dir);

  sbValidDir(targetDir, `invalid path: ${yellow(dir)}`);

  const [pkgJson] = getExistFiles(targetDir, file => file === 'package.json');

  sbValidValue(pkgJson, `no ${yellow('package.json')} under: ${targetDir}`);

  const { scripts } = fse.readJsonSync(underPath(targetDir, 'package.json'));

  sbValidPlainObject(scripts, `no ${yellow('scripts')} in package.json`);

  log();
  const scriptEntries = Object.entries(scripts);
  const maxLen = scriptEntries.reduce((len, [key]) => Math.max(len, key.length), 0);
  scriptEntries.forEach(([key, value]) => {
    log(` ${cyan(hollowCircle)} ${yellow(strAdjustRight(key, maxLen + 2))} ${value}`);
  });
  log();
};
