package com.fastencoder

import android.util.Log
import androidx.annotation.NonNull
import com.facebook.react.bridge.*
import com.facebook.react.turbomodule.core.CallInvokerHolderImpl
import com.fastencoder.FastEncoderBridge

internal class FastEncoderModule(context: ReactApplicationContext?) : ReactContextBaseJavaModule(context) {

  val TAG = "[FastEncoderModule]"

  external fun destruct();

  companion object {
    init {
      System.loadLibrary("fast-encoder")
    }
  }



  @ReactMethod(isBlockingSynchronousMethod = true)
  fun install(): Boolean {
    Log.d(TAG, "installing2")
    return try {
      FastEncoderBridge.instance.install(reactApplicationContext)
      Log.i(TAG, "successfully installed")
      true
    } catch (exception: java.lang.Exception) {
      Log.e(TAG, "failed to install JSI", exception)
      false
    }
  }

  override fun getName(): String {
    return "FastEncoderModule"
  }
}
