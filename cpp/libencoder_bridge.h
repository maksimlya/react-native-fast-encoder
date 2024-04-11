#include <stdint.h>
#include <stdlib.h>
typedef struct { void *message; int size; char* error; } GoResponse;

#ifdef __cplusplus
extern "C" {
#endif
extern GoResponse* Encode(char* p0);
extern char* Decode(void* ptr, int length, char* enc, int index, int stream);
#ifdef __cplusplus
}
#endif
