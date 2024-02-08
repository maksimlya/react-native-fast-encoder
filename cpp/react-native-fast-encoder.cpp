#import "react-native-fast-encoder.h"
#include "libencoder_bridge.h"

#include <iostream>
#include <sstream>
#include <cstdlib>
#include <cstring>
#include <future>
#include <iostream>
#include <android/log.h>

using namespace facebook;

namespace fastEncoder {
    jsi::Value call(jsi::Runtime &runtime, const jsi::String &nameValue,
                    const jsi::String &payloadObject) {
        auto payloadString = payloadObject.utf8(runtime);
        auto payloadChar = payloadString.c_str();
        auto payload = const_cast<char *>(payloadChar);

        // auto payload = payloadObject.getArrayBuffer(runtime);
        // auto size = (int) (payload.length(runtime));
        // auto data = payload.data(runtime);
        // __android_log_print(ANDROID_LOG_DEBUG, "YourTag", "Payload: %s", payload);

        GoResponse* response = Encode(payload);
        uint8_t *resp = static_cast<uint8_t*>(response->message);

        size_t byteArraySize = response->size;
        // auto array = jsi::Array(runtime, byteArraySize);



        auto arrayBuffer = runtime.global().getPropertyAsFunction(
                runtime,
                "ArrayBuffer"
        );
        jsi::Object result = arrayBuffer.callAsConstructor(
                runtime,
                response->size
        ).getObject(runtime);
        jsi::ArrayBuffer buf = result.getArrayBuffer(runtime);
        memcpy(buf.data(runtime), response->message, response->size);
        return buf;
    }

    void install(jsi::Runtime &jsiRuntime) {

        std::cout << "Initializing react-native-fast-encoder" << "\n";

        auto bridgeCallSync = jsi::Function::createFromHostFunction(
                jsiRuntime,
                jsi::PropNameID::forAscii(jsiRuntime, "callSync"),
                2,
                [](jsi::Runtime &runtime, const jsi::Value &thisValue, const jsi::Value *arguments,
                   size_t count) -> jsi::Value {

                    if (!arguments[0].isString()) {
                        return jsi::Value(
                                jsi::String::createFromAscii(runtime, "name not an String"));
                    }
                    auto nameString = arguments[0].getString(runtime);

                    if (!arguments[1].isString()) {
                        return jsi::Value(
                                jsi::String::createFromAscii(runtime, "payload not an String"));
                    }
                    auto obj = arguments[1].getString(runtime);
                //     if (!obj.isArrayBuffer(runtime)) {
                //         return jsi::Value(
                //                 jsi::String::createFromAscii(runtime,
                //                                              "payload not an ArrayBuffer"));
                //     }

                    auto response = call(runtime, nameString, obj);

                //     __android_log_print(ANDROID_LOG_DEBUG, "YourTag", "Payload: %s", response);
                //     if (response.isString()) {
                //         // here in the future maybe we can throw an exception...
                //         return response;
                //     }
                    return response;
                }
        );

        // auto bridgeCallPromise = jsi::Function::createFromHostFunction(
        //         jsiRuntime,
        //         jsi::PropNameID::forAscii(jsiRuntime, "callPromise"),
        //         2,
        //         [](jsi::Runtime &runtime, const jsi::Value &thisValue, const jsi::Value *arguments,
        //            size_t count) -> jsi::Value {

        //             auto promise = runtime.global().getPropertyAsFunction(runtime, "Promise");
        //             auto rejecter = promise.getProperty(runtime, "reject").asObject(
        //                     runtime).asFunction(runtime);
        //             if (!arguments[0].isString()) {
        //                 return rejecter.call(
        //                         runtime,
        //                         jsi::JSError(runtime, "name not an String").value()
        //                 );
        //             }
        //             auto name = arguments[0].getString(runtime);

        //             if (!arguments[1].isObject()) {
        //                 return rejecter.call(
        //                         runtime,
        //                         jsi::JSError(runtime, "payload not an Object").value()
        //                 );
        //             }
        //             auto obj = arguments[1].getObject(runtime);
        //             if (!obj.isArrayBuffer(runtime)) {
        //                 return rejecter.call(
        //                         runtime,
        //                         jsi::JSError(runtime, "payload not an ArrayBuffer").value()
        //                 );
        //             }
        //             auto payload = obj.getArrayBuffer(runtime);

        //             auto payloadFuture = std::make_shared<jsi::ArrayBuffer>(std::move(payload));
        //             auto nameFuture = std::make_shared<jsi::String>(std::move(name));

        //             auto bridgeCallPromise = jsi::Function::createFromHostFunction(
        //                     runtime,
        //                     jsi::PropNameID::forAscii(runtime, "promise"),
        //                     2,
        //                     [nameFuture, payloadFuture](jsi::Runtime &runtime,
        //                                                 const jsi::Value &thisValue,
        //                                                 const jsi::Value *arguments,
        //                                                 size_t count) -> jsi::Value {

        //                         auto resolveFunction = arguments[0].getObject(runtime).asFunction(
        //                                 runtime);
        //                         auto rejectFunction = arguments[1].getObject(runtime).asFunction(
        //                                 runtime);

        //                         auto response = call(runtime, *nameFuture, *payloadFuture);

        //                         if (response.isString()) {
        //                             rejectFunction.call(runtime, response);
        //                         } else {
        //                             resolveFunction.call(runtime, response);
        //                         }

        //                         return jsi::Value(0);
        //                     }
        //             );


        //             jsi::Object o = promise.callAsConstructor(runtime, bridgeCallPromise.asFunction(
        //                     runtime)).getObject(
        //                     runtime);
        //             return o;
        //         }
        // );


        // for now im not sure why, but create an object don't work with hermes release, but debug yes
//        auto object = jsi::Object(jsiRuntime);
//        object.setProperty(jsiRuntime, "callPromise", std::move(bridgeCallPromise));
//        object.setProperty(jsiRuntime, "callSync", std::move(bridgeCallSync));
//        jsiRuntime.global().setProperty(jsiRuntime, "FastEncoder", std::move(object));
        // jsiRuntime.global().setProperty(jsiRuntime, "FastEncoderCallPromise",
        //                                 std::move(bridgeCallPromise));
        jsiRuntime.global().setProperty(jsiRuntime, "FastEncoderCallSync",
                                        std::move(bridgeCallSync));

    }

    void cleanup() {

    }
}
