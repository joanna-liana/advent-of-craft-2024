import * as crypto from 'crypto';
import { readFile } from 'node:fs/promises';
import * as path from "node:path";

export function convertKey(key: string): string {
    const sha256 = crypto.createHash('sha256');
    sha256.update(key);
    return sha256.digest('base64');
}

export function convertIv(iv: string): string {
    const md5 = crypto.createHash('md5');
    md5.update(iv);
    return md5.digest('base64');
}

export function loadFile(fileName: string): Promise<string> {
    const filePath = path.resolve(__dirname, 'resources', fileName);
    return readFile(filePath, 'utf-8');
}
