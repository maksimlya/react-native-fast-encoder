#import "react-native-fast-encoder.h"
#include "libencoder_bridge.h"

#include <iostream>
#include <sstream>
#include <cstdlib>
#include <cstring>
#include <future>
#include <iostream>

using namespace facebook;

namespace fastEncoder {
    jsi::Value call(jsi::Runtime &runtime, const jsi::String &nameValue,
                    const jsi::String &payloadObject) {
        auto payloadString = payloadObject.utf8(runtime);
        auto payloadChar = payloadString.c_str();
         
        GoResponse* response = Encode(const_cast<char *>(payloadChar));
        size_t byteArraySize = response->size;

        
        uint8_t *resp = static_cast<uint8_t*>(response->message);

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

        // Free memory
        free(response->message);
        free(response);
        return buf;
    }

     jsi::Value call(jsi::Runtime &runtime, const jsi::String &nameValue,
                    const jsi::Object &payloadObject, const jsi::String &encValue, const int index, const bool stream) {

        auto data = payloadObject.getArrayBuffer(runtime);
        auto size = (int) (data.length(runtime));

        auto encString = encValue.utf8(runtime);
        auto enc = encString.c_str();

        uint8_t* dataArray = static_cast<uint8_t*>(data.data(runtime));
          char* response = Decode(dataArray, size, enc, index, stream);
        jsi::Value result = jsi::String::createFromUtf8(runtime, response);

        // Free memory
        free(response);
        return result;
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


                        // TODO - Switch case on function name.
                        if(arguments[1].isString()) {
                                auto obj = arguments[1].getString(runtime);
                                auto response = call(runtime, nameString, obj);
                                return response;
                        } else {
                                auto obj = arguments[1].getObject(runtime);
                                auto encoding = arguments[2].getString(runtime);
                                int index = arguments[3].getNumber();
                                bool stream = arguments[4].getBool();
                                auto response = call(runtime, nameString, obj, encoding, index, stream);
                                return response;
                        }
                  
                }
        );
        jsiRuntime.global().setProperty(jsiRuntime, "FastEncoderCallSync",
                                        std::move(bridgeCallSync));

    }

    void cleanup() {

    }
}
