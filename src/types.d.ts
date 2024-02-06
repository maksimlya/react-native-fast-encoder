
/**
 * `ArrayBuffer`: returned only by pure JSI implementation
 * `String`: returned only by pure JSI implementation, maybe we can inprove this in the future
 *
 * @see `FastEncoderJSI.callPromise`
 * @see `FastEncoderJSI.callSync`
 */
type BridgeResponseJSI = ArrayBuffer | string;

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
