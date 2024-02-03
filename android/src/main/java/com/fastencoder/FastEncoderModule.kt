package com.fastencoder

import android.util.Log
import androidx.annotation.NonNull
import com.facebook.react.bridge.*

internal class FastEncoderModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  val TAG = "[FastEncoderModule]"

  external fun initialize(jsiPtr: Long);
  external fun destruct();
  external fun callJSI(jsiPtr: Long, name: String, payload: ByteArray): ByteArray;
  external fun callNative(name: String, payload: ByteArray): ByteArray;

  companion object {
    init {
      System.loadLibrary("fast-encoder")
    }
  }

  @ReactMethod
  fun callJSI(name: String, payload: ReadableArray, promise: Promise) {
    Log.d(TAG, "callJSI")
//    Thread {
//      reactApplicationContext.runOnJSQueueThread {
//        try {
//          val contextHolder = this.reactApplicationContext.javaScriptContextHolder!!.get()
//          if (contextHolder.toInt() == 0) {
//            call(name, payload, promise)
//            return@runOnJSQueueThread
//          }
//          Log.d(TAG, "before")
//          val bytes = ByteArray(payload.size()) { pos -> payload.getInt(pos).toByte() }
//          val result = callJSI(contextHolder, name, bytes)
//          Log.d(TAG, "after")
//          val resultList = Arguments.createArray()
//          for (i in result.indices) {
//            resultList.pushInt(result[i].toInt())
//          }
//          promise.resolve(resultList)
//        } catch (e: Exception) {
//          Log.d(TAG, "rejection")
//          promise.reject(e)
//        }
//      }
//    }.start()
  }

  @ReactMethod
  fun call(name: String, payload: ReadableArray, promise: Promise) {
    Log.d(TAG, "call")
    Thread {
      try {
        val bytes = ByteArray(payload.size()) { pos -> payload.getInt(pos).toByte() }
        val result = callNative(name, bytes)
        val resultList = Arguments.createArray()
        for (i in result.indices) {
          resultList.pushInt(result[i].toInt())
        }
        promise.resolve(resultList)
      } catch (e: Exception) {
        promise.reject(e)
      }
    }.start()
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun install(): Boolean {
    Log.d(TAG, "installing2")
    try {
      val contextHolder = this.reactApplicationContext.javaScriptContextHolder!!.get()
      if (contextHolder.toInt() == 0) {
        Log.d(TAG, "context not available")
        return false
      }
      initialize(contextHolder)
      Log.i(TAG, "successfully installed")
      return true
    } catch (exception: java.lang.Exception) {
      Log.e(TAG, "failed to install JSI", exception)
      return false
    }
  }

  override fun getName(): String {
    return "FastEncoder"
  }

  override fun onCatalystInstanceDestroy() {
    destruct();
  }
}
