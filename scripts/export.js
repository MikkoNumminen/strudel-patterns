#!/usr/bin/env node
/*
 * export.js — StrudelForge pattern exporter
 *
 * Strips the leading metadata-header comment block from a Strudel pattern file
 * and prints a paste-ready version to stdout (optionally to the clipboard).
 *
 * Usage:
 *   node scripts/export.js patterns/tracks/dark-techno-140.js
 *   node scripts/export.js patterns/tracks/dark-techno-140.js --copy
 *   node scripts/export.js patterns/tracks/      # lists files in the dir
 *
 * What gets stripped:
 *   - A run of consecutive `//` lines at the very top of the file whose
 *     content matches known metadata keys (Genre, Tempo, Key, Role, Notes,
 *     BPM, Description).
 *   - A leading block comment (/* ... *\/) whose body consists only of those
 *     same metadata keys.
 *
 * What is preserved:
 *   - Every other comment in the file. Inline comments are musical intent
 *     and stay put.
 *
 * No dependencies beyond Node's stdlib.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const METADATA_KEYS = [
  'genre',
  'tempo',
  'key',
  'role',
  'notes',
  'bpm',
  'description',
];

function printUsage() {
  const msg = [
    'Usage: node scripts/export.js <path-to-pattern.js> [--copy]',
    '',
    '  <path-to-pattern.js>   A Strudel pattern file.',
    '                         If a directory, lists files and exits.',
    '  --copy                 Best-effort copy to the system clipboard.',
  ].join('\n');
  process.stderr.write(msg + '\n');
}

function isMetadataLineComment(line) {
  const m = line.match(/^\s*\/\/\s*([A-Za-z]+)\s*:/);
  if (!m) return false;
  return METADATA_KEYS.includes(m[1].toLowerCase());
}

function isBlankOrCommentOnly(line) {
  return /^\s*(\/\/.*)?$/.test(line);
}

function stripLeadingMetadata(source) {
  const lines = source.split(/\r?\n/);
  let i = 0;

  // Skip a leading shebang if present (not expected, but harmless).
  if (lines[i] && lines[i].startsWith('#!')) i += 1;

  // Skip leading blank lines.
  while (i < lines.length && lines[i].trim() === '') i += 1;

  // Case 1: leading block comment /* ... */ that is metadata-only.
  if (lines[i] && /^\s*\/\*/.test(lines[i])) {
    let j = i;
    let ended = false;
    const blockLines = [];
    while (j < lines.length) {
      blockLines.push(lines[j]);
      if (/\*\//.test(lines[j])) {
        ended = true;
        break;
      }
      j += 1;
    }
    if (ended) {
      const body = blockLines
        .join('\n')
        .replace(/^\s*\/\*+/, '')
        .replace(/\*+\/\s*$/, '')
        .split(/\r?\n/)
        .map((l) => l.replace(/^\s*\*?\s?/, '').trim())
        .filter((l) => l.length > 0);

      const allMetadata =
        body.length > 0 &&
        body.every((l) => {
          const m = l.match(/^([A-Za-z]+)\s*:/);
          return m && METADATA_KEYS.includes(m[1].toLowerCase());
        });

      if (allMetadata) {
        i = j + 1;
        // swallow blank lines after the block.
        while (i < lines.length && lines[i].trim() === '') i += 1;
      }
    }
  }

  // Case 2: run of consecutive `//` metadata lines at the top.
  let k = i;
  let sawMetadata = false;
  while (k < lines.length) {
    const line = lines[k];
    if (isMetadataLineComment(line)) {
      sawMetadata = true;
      k += 1;
      continue;
    }
    // Allow interleaved blank or non-metadata `//` lines only while we are
    // still clearly inside the header; bail out otherwise.
    if (sawMetadata && line.trim() === '') {
      k += 1;
      continue;
    }
    break;
  }
  if (sawMetadata) {
    i = k;
    while (i < lines.length && lines[i].trim() === '') i += 1;
  }

  // Trim trailing blank lines.
  let end = lines.length;
  while (end > i && lines[end - 1].trim() === '') end -= 1;

  return lines.slice(i, end).join('\n') + '\n';
}

function copyToClipboard(text) {
  return new Promise((resolve) => {
    let cmd;
    let args = [];
    if (process.platform === 'win32') {
      cmd = 'clip.exe';
    } else if (process.platform === 'darwin') {
      cmd = 'pbcopy';
    } else {
      cmd = 'xclip';
      args = ['-selection', 'clipboard'];
    }
    let child;
    try {
      child = spawn(cmd, args, { stdio: ['pipe', 'ignore', 'ignore'] });
    } catch (_err) {
      resolve(false);
      return;
    }
    child.on('error', () => resolve(false));
    child.on('close', (code) => resolve(code === 0));
    try {
      child.stdin.end(text);
    } catch (_err) {
      resolve(false);
    }
  });
}

function listDirectory(dirPath) {
  const entries = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.js'))
    .map((e) => e.name)
    .sort();
  if (entries.length === 0) {
    process.stdout.write(`No .js files in ${dirPath}\n`);
    return;
  }
  process.stdout.write(`Files in ${dirPath}:\n`);
  for (const name of entries) {
    process.stdout.write(`  ${name}\n`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    printUsage();
    process.exit(1);
  }

  const copy = args.includes('--copy');
  const target = args.find((a) => !a.startsWith('--'));
  if (!target) {
    printUsage();
    process.exit(1);
  }

  const resolved = path.resolve(target);
  if (!fs.existsSync(resolved)) {
    process.stderr.write(`Not found: ${resolved}\n`);
    process.exit(1);
  }

  const stat = fs.statSync(resolved);
  if (stat.isDirectory()) {
    listDirectory(resolved);
    process.exit(0);
  }

  const source = fs.readFileSync(resolved, 'utf8');
  const cleaned = stripLeadingMetadata(source);

  process.stdout.write(cleaned);

  if (copy) {
    const ok = await copyToClipboard(cleaned);
    if (ok) {
      process.stderr.write('\n(copied to clipboard)\n');
    } else {
      process.stderr.write(
        '\n(clipboard tool not available — output above was not copied)\n'
      );
    }
  }
}

main().catch((err) => {
  process.stderr.write(`export.js: ${err.message}\n`);
  process.exit(1);
});
