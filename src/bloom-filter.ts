import * as crc32 from 'crc-32';

export class BloomFilter {
  public readonly array: Array<number>;

  constructor(protected size: number) {
    this.array = new Array(this.size).fill(0);
  }

  public check(value: string): boolean {
    const hash: number = Math.abs(crc32.buf(Buffer.from(value, 'binary'), 0));

    return this.array[hash % this.array.length] === 1 ? true : false;
  }

  public insert(value: string): void {
    const hash: number = Math.abs(crc32.buf(Buffer.from(value, 'binary'), 0));

    this.array[hash % this.array.length] = 1;
  }
}
