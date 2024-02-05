import { NativeModules } from 'react-native';
import './shim';

const FastEncoderNativeModules = (NativeModules as NativeModulesDef)
  .FastEncoder;

export default class TextEncoder {
  private static loaded = false;
  private static TAG = '[FastEncoder]';

  static decode(
    message: number[]
  ) {
    this.assureJSILoaded()
    return global.FastEncoderCallSync("decode", message);
  }

  static encode(
    data: string
  ) {
    this.assureJSILoaded()
    return global.FastEncoderCallSync('encode', data);
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
