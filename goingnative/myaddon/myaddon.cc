#include <nan.h>
#ifndef _WIN32
#include <unistd.h>
#endif

using namespace v8;

// A worker class extending the NanAsyncWorker helper
// class, a simple encapsulation of worker-thread
// logic to make simple tasks easier

class MyWorker : public NanAsyncWorker {
 public:
  // Constructor
  MyWorker(NanCallback *callback, int delay)
    : NanAsyncWorker(callback), delay(delay) {}
  // Destructor
  ~MyWorker() {}

  // Executed inside the worker-thread.
  // It is not safe to access V8, or V8 data structures
  // here, so everything we need for input and output
  // should go on `this`.
  void Execute () {
    // Asynchronous, non-V8 work goes here
    #ifdef _WIN32
      Sleep(delay);
    #else
      usleep(delay * 1000);
    #endif
  }

  // Executed when the async work is complete
  // this function will be run inside the main event loop
  // so it is safe to use V8 again
  void HandleOKCallback () {
    NanScope();

    // NanCallback#Call() does a NanMakeCallback() for us
    callback->Call(0, NULL);
  }

 private:
  int delay;
};

NAN_METHOD(Delay) {
  NanScope();

  // get delay and callback
  int delay = args[0]->IntegerValue();
  Local<Function> callback = args[1].As<Function>();

  // create NanCallback instance wrapping the callback
  NanCallback* nanCallback = new NanCallback(callback);

  // create a MyWorker instance, passing the callback and delay
  MyWorker* worker = new MyWorker(nanCallback, delay);

  // queue the worker instance onto the thread-pool
  NanAsyncQueueWorker(worker);

  NanReturnUndefined();
}

void Init(Handle<Object> exports) {
  exports->Set(NanNew("delay"), NanNew<FunctionTemplate>(Delay)->GetFunction());
}

NODE_MODULE(myaddon, Init)
