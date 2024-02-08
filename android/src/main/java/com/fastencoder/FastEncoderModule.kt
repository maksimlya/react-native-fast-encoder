package com.fastencoder

import android.util.Log
import androidx.annotation.NonNull
import com.facebook.react.bridge.*

internal class FastEncoderModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  val TAG = "[FastEncoderModule]"

  external fun initialize(jsiPtr: Long);
  external fun destruct();

  companion object {
    init {
      System.loadLibrary("fast-encoder")
    }
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
