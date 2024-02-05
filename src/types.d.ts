/**
 * `Array`: returned by NativeModules due to lack of ByteArray support
 *
 * @see `FastEncoderNativeModules.callJSI`
 * @see `FastEncoderNativeModules.call`
 */
type BridgeResponseNativeModules = Array<number>;

/**
 * `ArrayBuffer`: returned only by pure JSI implementation
 * `String`: returned only by pure JSI implementation, maybe we can inprove this in the future
 *
 * @see `FastEncoderJSI.callPromise`
 * @see `FastEncoderJSI.callSync`
 */
type BridgeResponseJSI = ArrayBuffer | string;

/**
 * Combination of all available types
 *
 * @see `BridgeResponseNativeModules`
 * @see `BridgeResponseJSI`
 */
type BridgeResponse = BridgeResponseNativeModules | BridgeResponseJSI;

/**
 * Contains all method available inside of `NativeModules`
 */
interface FastEncoderNativeModules {
  /**
   * this method use `NativeModules` but also will send `JSI` reference to use same thread
   * but it runs in a separated thread also.
   */
  callJSI(
    name: string,
    payload: Array<number>
  ): Promise<BridgeResponseNativeModules>;
  /**
   * this method use `NativeModules` in a more traditional way
   * using `JNI` on android in order to call shared a library.
   */
  call(
    name: string,
    payload: Array<number>
  ): Promise<BridgeResponseNativeModules>;
  /**
   * this method will install JSI definitions
   */
  install(): boolean;
}

interface NativeModulesDef {
  FastEncoder: FastEncoderNativeModules;
}

interface Global {
  BigInt: any;
  /**
   * this method use `JSI`, and will use in a Sync way,
   * be careful if the method that you are using is a complex one like generate a new Key
   */
  FastEncoderCallSync(name: string, payload: string): BridgeResponseJSI;
  FastEncoderCallSync(name: string, payload: number[]): BridgeResponseJSI;
}

declare const global: Global;
declare const module: any;
