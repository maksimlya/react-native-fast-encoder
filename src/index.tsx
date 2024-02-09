import { NativeModules } from 'react-native';

const FastEncoderNativeModules = NativeModules.FastEncoder;

export default class TextEncoder {
  private loaded = false;
  private TAG = '[FastEncoder]';

  decode(
    data: Uint8Array
  ) {
    this.assureJSILoaded()
    const result = global.FastEncoderCallSync("decode", data.buffer);
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
