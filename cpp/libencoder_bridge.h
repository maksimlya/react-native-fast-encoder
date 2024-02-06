#include <stdint.h>
#include <stdlib.h>
typedef struct { void *message; int size; char* error; } GoResponse;

#ifdef __cplusplus
extern "C" {
#endif
extern GoResponse* Encode(char* p0);
extern char* Decode(char* p0, void* p1, int p2);
#ifdef __cplusplus
}
#endif
