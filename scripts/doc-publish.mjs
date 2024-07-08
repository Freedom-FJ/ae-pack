import { execaSync, execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';

const rootDir = process.cwd();
const docDir = '.docs';
const docPath = path.join(rootDir, docDir);
const destDir = 'docs-dist';
const destPath = path.join(rootDir, destDir);

const publishBranch = {
  pre: 'gitlab_pages/pre',
  prod: 'gitlab_pages/prod',
};

function getRemoteUrl() {
  try {
    const { stdout } = execaSync(`git config remote.origin.url`, { shell: true, cwd: rootDir, encoding: 'utf8' });
    return stdout;
  } catch (error) {
    console.error('output.....', error);
    return '';
  }
}

async function generatorDocs() {
  try {
    const options = {
      shell: true, 
      cwd: rootDir,
      stdio: 'inherit',
      listeners: {
        stdout: (data) => {
          result.output += data.toString();
        }
      }
    };
    const result = await execa('pnpm run docs:build', options);
    console.log('文档构建完成...');
  } catch (e) {
    console.log('error...', e)
  }
}

async function initGitBranch(branch, remoteURL, workDir) {
  let result = {
    exitCode: 0,
    output: ''
  };

  try {
    await fs.remove(workDir);
    result = await execaSync('git', ['clone', '--depth=1', '--single-branch', '--branch', branch, remoteURL, workDir]);
    if (result.exitCode === 0) {
      console.info(`git 分支 ${branch} 初始化成功...`);
      return true;
    }

    return false;
  } catch (e) {
    console.log('error...', e);
    return false;
  }
}

async function publish(branch, needReGenerateDocs = true) {
  // 删除发布文件夹
  await fs.remove(docDir);
  console.log('清空发布文件夹成功...');
  // 构建文档
  if (needReGenerateDocs) {
    await generatorDocs();
  }
  // 发布文档
  const remoteURL = getRemoteUrl();
  const isSuccess = await initGitBranch(branch, remoteURL, docDir);

  if (isSuccess) {
    await clearDirectory(docDir);
    fs.copySync(destPath, docPath, { overwrite: true });
    console.log('文件复制替换成功...');
  }

  try {
    let result = execaSync('git', ['add', '-A'], { cwd: docDir });
    console.log('git add ...');
    result = execaSync('git', ['commit', '-m', 'update docs'], { cwd: docDir });
    console.log('git commit ...');
    result = execaSync('git', ['push', '-f', 'origin', branch], { cwd: docDir });
    console.log('git push...');

    // 删除发布文件夹
    await fs.remove(docDir);    
  } catch (e) {
    console.log('error...', e);
  }
}

async function clearDirectory(directoryPath) {
  const files = await fs.readdir(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    if (file !== ".git" && !file.startsWith('cd.')) {
      await fs.remove(filePath);
    }
  }
}

await publish(publishBranch.pre, true);
await publish(publishBranch.prod, false);