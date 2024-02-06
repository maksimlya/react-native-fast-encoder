import { NativeModules } from 'react-native';

const FastEncoderNativeModules = NativeModules.FastEncoder;

export default class TextEncoder {
  private static loaded = false;
  private static TAG = '[FastEncoder]';

  static decode(
    message: number[]
  ) {
    this.assureJSILoaded()
    const result = global.FastEncoderCallSync("decode", message);
    return result;
  }

  static encode(
    data: string
  ) {
    this.assureJSILoaded()
    const startTime = Date.now();
    const result = new Uint8Array(global.FastEncoderCallSync('encode', data));
    console.error('end ' + (Date.now() - startTime));
    
    return result;
  }

  private static assureJSILoaded() {
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
