#include <jni.h>
#include "react-native-fast-encoder.h"
#include <android/log.h>
#include <libencoder_bridge.h>

extern "C"
JNIEXPORT void JNICALL
Java_com_fastencoder_FastEncoderModule_initialize(JNIEnv *env, jobject thiz,
                                                             jlong jsi_ptr) {
    __android_log_print(ANDROID_LOG_VERBOSE, "react-native-fast-encoder",
                        "Initializing");
    fastEncoder::install(*reinterpret_cast<facebook::jsi::Runtime *>(jsi_ptr));
}

extern "C"
JNIEXPORT void JNICALL
Java_com_fastencoder_FastEncoderModule_destruct(JNIEnv *env, jobject thiz) {
    fastEncoder::cleanup();
}
extern "C"
JNIEXPORT jbyteArray JNICALL
Java_com_fastencoder_FastEncoderModule_callNative(JNIEnv *env, jobject thiz,
                                                       jstring name, jbyteArray payload) {

    auto nameConstChar = env->GetStringUTFChars(name, nullptr);
    auto payloadBytes = env->GetByteArrayElements(payload, nullptr);
    auto size = env->GetArrayLength(payload);

    auto nameChar = const_cast<char *>(nameConstChar);
    auto response = Encode(nameChar);

    env->ReleaseStringUTFChars(name, nameConstChar);
    env->ReleaseByteArrayElements(payload, payloadBytes, 0);

    // if (response->error != nullptr) {
    //     auto error = response->error;
    //     free(response);
    //     jclass Exception = env->FindClass("java/lang/Exception");
    //     env->ThrowNew(Exception, error);
    //     return nullptr;
    // }
    return env->NewByteArray(10);
    // auto result = env->NewByteArray(response->len);
    // env->SetByteArrayRegion(result, 0, response->len, (jbyte*) response->data);
    // free(response);
    // return result;
}


extern "C"
JNIEXPORT jbyteArray JNICALL
Java_com_fastencoder_FastEncoderModule_callJSI(JNIEnv *env, jobject thiz, jlong jsi_ptr,
                                                          jstring name, jbyteArray payload) {
    auto &runtime = *reinterpret_cast<jsi::Runtime *>(jsi_ptr);
    auto nameConstChar = env->GetStringUTFChars(name, nullptr);
    auto payloadBytes = env->GetByteArrayElements(payload, nullptr);
    auto size = env->GetArrayLength(payload);

    auto nameValue = jsi::String::createFromAscii(runtime, nameConstChar);
    env->ReleaseStringUTFChars(name, nameConstChar);


    auto arrayBuffer = runtime.global().getPropertyAsFunction(runtime, "ArrayBuffer");
    jsi::Object o = arrayBuffer.callAsConstructor(runtime, size).getObject(runtime);
    jsi::ArrayBuffer payloadValue = o.getArrayBuffer(runtime);
    memcpy(payloadValue.data(runtime), payloadBytes, size);
    env->ReleaseByteArrayElements(payload, payloadBytes, 0);

    auto response = fastEncoder::call(runtime, nameValue, payloadValue);

    if (response.isString()) {
        auto error = response.asString(runtime);
        jclass Exception = env->FindClass("java/lang/Exception");
        env->ThrowNew(Exception, error.utf8(runtime).c_str());
        return nullptr;

    }
    auto byteResult = response.asObject(runtime).getArrayBuffer(runtime);
    auto sizeResult = byteResult.size(runtime);
    auto result = env->NewByteArray(sizeResult);
    env->SetByteArrayRegion(result, 0,  sizeResult, (jbyte*) byteResult.data(runtime));
    return result;
}
