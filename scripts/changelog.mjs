import { execaSync } from 'execa';
import fs from 'fs-extra';
import path from 'path';

const rootDir = process.cwd();

function getLog() {
  try {
    const { stdout } = execaSync(`git log --name-only --format='%n%n%n%ae %ad %h %s' --date=short -- '*.md'`, { 
      shell: true,
      cwd: rootDir,
      encoding: 'utf8',
    });
  
    console.log('output.....', stdout);
    return stdout;
  } catch (error) {
    console.error('output.....', error);
    return '';
  }
}

function getFileInfo(str) {
  if (!str) return;

  return str.split('\n\n\n\n').map(item => item.trim().split('\n\n')).reduce((acc, cur) => {
    const [author, date, commitId, ...rest] = cur[0].split(' ');
    const commitText = rest.join(' ');

    if (!/^(feat|fix)/.test(commitText) || !cur[1]) return acc;
    
    cur[1].split('\n').forEach(file => {
      if (acc.has(file)) {
        const info = acc.get(file);
        const historys = info.historys;
        historys.push({ author, date, commitText, commitId });

        acc.set(file, info);
      } else if (/(.*)\.(zh-CN|en-US)\.md$/.test(file)) {
        const fileInfo = /^(packages|components)\/(.*?)\/src\/(.*?)\/.*/.exec(file);

        acc.set(file, { 
          historys: [{ author, date, commitText, commitId }], 
          lastModifyAuthor: author, 
          lastModifyDate: date,
          group: fileInfo?.[2] || '',
          name: fileInfo?.[3],
          isCN: /zh-CN/.test(file),
        });
      }
    });

    return acc;
  }, new Map());
}

function groupBy(list, isCN) {
  return list.filter(item => item.isCN === isCN && item.group).reduce((acc, cur) => {
    if (acc.has(cur.group)) {
      const group = acc.get(cur.group);
      group.set(cur.name, cur);
    } else {
      acc.set(cur.group, new Map([[cur.name, cur]]));
    }

    return acc;
  }, new Map());
}

function toChangeLog(list, isCN) {
  const changelogPath = path.join(rootDir, `CHANGELOG.${isCN ? 'zh-CN' : 'en-US'}.md`);
  let md = '<div class="changelog"></div>\n\n';
  const changelogFile = fs.readFileSync(changelogPath, 'utf-8');
  const index = changelogFile.indexOf('<div class="changelog"></div>');
  if (index >= 0) {
    md = changelogFile.slice(0, index) + md;
  } else {
    md = changelogFile + md;
  }

  groupBy(list, isCN).forEach((values, key) => {
    md += `## ${key}\n`;

    values.forEach((value, name) => {
      md += `- ${name}\n`;
      value.historys.forEach(item => {
        md += `  - ${item.commitText} [#${item.commitId}](https://code.alibaba-inc.com/ae-fe/aepay-pkg/commit/${item.commitId}) \`${item.date}\` \n`;
      });
      md += '\n';
    });

    md += '\n\n---\n';
  });

  fs.writeFileSync(changelogPath, md, 'utf8');
}

function changelog() {
  const outPath = path.join(rootDir, '.dumi', 'manifest.json');
  const pkgPath = path.join(rootDir, 'package.json');

  const pkg = fs.readJsonSync(pkgPath, 'utf8');
  const str = getLog();
  const mdMap = getFileInfo(str);
  const manifest = JSON.stringify({
    fileMap: Object.fromEntries(mdMap),
    maintainers: pkg.maintainers || []
  }, null, 2);

  const list = [...mdMap.values()].sort((a,b) => a.group.localeCompare(b.group));

  // 生成changelog文件
  toChangeLog(list, true);
  toChangeLog(list, false);

  fs.writeFileSync(outPath, manifest, 'utf8');
}


changelog();


// git log --name-only --format="%n%n%n%an %ad %h %s" --date=short master..HEAD  -- '*.md' > git.txt
