#include <jni.h>
#include "test-lib.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_testlib_TestLibModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return testlib::multiply(a, b);
}
