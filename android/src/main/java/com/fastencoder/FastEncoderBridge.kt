package com.fastencoder

import com.facebook.react.bridge.ReactContext
import com.facebook.react.turbomodule.core.CallInvokerHolderImpl
import com.facebook.react.common.annotations.FrameworkAPI
import com.facebook.react.bridge.RuntimeExecutor

@OptIn(FrameworkAPI::class)
class FastEncoderBridge {
  private external fun installNativeJsi(jsiPtr: Long, jsCallInvokerHolder: CallInvokerHolderImpl);
  private external fun clearStateNativeJsi()


  fun install(context: ReactContext) {
    val jsContextPointer = context.javaScriptContextHolder!!.get()
    val jsCallInvokerHolder = context.catalystInstance.jsCallInvokerHolder as CallInvokerHolderImpl
    installNativeJsi(jsContextPointer, jsCallInvokerHolder)
  }

  companion object {
    val instance = FastEncoderBridge()
  }
}