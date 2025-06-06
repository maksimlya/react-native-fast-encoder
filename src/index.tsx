import FastEncoderNativeModules from './NativeFastEncoderModule';

let jsiLoaded = false;

interface props {
  stream: boolean;
}

// @ts-ignore
const supportedEncodings: { [key: string]: boolean } = {
  'utf-8': true,
  'windows-1250': true,
  'windows-1251': true,
  'windows-1252': true,
  'windows-1253': true,
  'windows-1254': true,
  'windows-1255': true,
  'windows-1256': true,
  'windows-1257': true,
  'windows-1258': true,
  'iso-8859-1': true,
  'iso-8859-2': true,
  'iso-8859-3': true,
  'iso-8859-4': true,
  'iso-8859-5': true,
  'iso-8859-6': true,
  'iso-8859-7': true,
  'iso-8859-8': true,
  'iso-8859-9': true,
  'iso-8859-10': true,
  'iso-8859-14': true,
  'iso-8859-15': true,
  'iso-8859-16': true,
  'us-ascii': true,
};

export default class TextEncoder {
  private static counter: number = 0;
  private index: number;
  private encoding: string;

  constructor(encoding: string = 'utf-8') {
    this.index = TextEncoder.counter++;
    this.encoding = encoding.toLocaleLowerCase();
  }

  decode(data: Uint8Array, props?: props) {
    this.assureJSILoaded();
    const result = global.FastEncoderCallSync(
      'decode',
      new Uint8Array(data || []).buffer,
      this.encoding,
      this.index,
      !!(props && props.stream)
    );
    return result;
  }

  encode(data: string) {
    this.assureJSILoaded();
    const res: any = global.FastEncoderCallSync('encode', data);
    const result = new Uint8Array(res);

    return result;
  }

  private assureJSILoaded() {
    if (!jsiLoaded) {
      jsiLoaded = FastEncoderNativeModules.install();
    }
  }
}
