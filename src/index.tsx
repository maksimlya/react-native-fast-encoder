import { NativeModules } from 'react-native';

interface props {
  stream: boolean
}

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
  'us-ascii': true
}

const FastEncoderNativeModules = NativeModules.FastEncoder;

export default class TextEncoder {
  private static counter: number = 0;
  private index: number;
  private encoding: string;
  private loaded = false;
  private TAG = '[FastEncoder]';

  constructor(encoding: string = 'utf-8') {
    this.index = TextEncoder.counter++;
    this.encoding = encoding.toLocaleLowerCase();
   }

  decode(
    data: Uint8Array,
    props: props
  ) {
    if(!supportedEncodings[this.encoding]) {
      console.error(`unsupported encoding! encoding: ${this.encoding}, propd: ${props}, index: ${this.index}, value: ${JSON.stringify(data)}`);
     }
    this.assureJSILoaded()
    const result = global.FastEncoderCallSync("decode", new Uint8Array(data || []).buffer, this.encoding, this.index, !!(props && props.stream));
    return result;
  }

  encode(
    data: string
  ) {
    this.assureJSILoaded()
    const res:any = global.FastEncoderCallSync('encode', data);
    const result = new Uint8Array(res);
    
    return result;
  }

  private assureJSILoaded() {
    if (!this.loaded) {
      this.loaded = FastEncoderNativeModules.install();
      console.log(
        this.TAG,
        `(assureJSILoaded)`,
        'JSI install:',
        this.loaded ? 'Installed' : 'Not Installed'
      );
    }
  }
}
