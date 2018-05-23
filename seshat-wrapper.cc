#include <cstdio>
#include <cstring>
#include <unistd.h>
#include "grammar.h"
#include "sample.h"
#include "meparser.h"
#include <emscripten.h>
#include <sstream>
#include <iostream>

extern "C" {


EMSCRIPTEN_KEEPALIVE
const char *recognizeSCGInk(const char *SCGInkText) {
 
  //Because some of the feature extraction code uses std::cout/cin
  ios_base::sync_with_stdio(true);

  //Load sample and system configuration
  std::istringstream iss(SCGInkText);

  Sample m( iss, false );
  meParser seshat("Config/CONFIG");

  //Parse math expression
  char *latex = seshat.parse_me(&m);


  return latex;
}




EMSCRIPTEN_KEEPALIVE
int main(int argc, char *argv[]) {

  return 0;
}

}
