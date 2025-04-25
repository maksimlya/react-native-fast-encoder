#ifndef FASTENCODER_H
#define FASTENCODER_H

#include <jsi/jsilib.h>
#include <jsi/jsi.h>

#include <ReactCommon/CallInvoker.h>

using namespace facebook;

namespace fastEncoder {
    void install(jsi::Runtime &jsiRuntime, std::shared_ptr<react::CallInvoker> invoker);

    void cleanup();

    jsi::Value call(jsi::Runtime &runtime, const jsi::String &nameValue,
                            const jsi::Object &payloadValue,
                            const int index,
                            const bool stream);
    jsi::Value call(jsi::Runtime &runtime, const jsi::String &nameValue,
                            const jsi::Object &payloadValue);
}

#endif /* FASTENCODER_H */
