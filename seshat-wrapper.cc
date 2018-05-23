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

  //Print sample information
  m.print();
  printf("\n");

  //Parse math expression
  seshat.parse_me(&m);
  
  return "haya";
}





#define MAXS 10000
void usage(char *str) {
  fprintf(stderr, "SESHAT - Handwritten math expression parser\nhttps://github.com/falvaro/seshat\n");
  fprintf(stderr, "Copyright (C) 2014, Francisco Alvaro\n\n");
  fprintf(stderr, "Usage: -i input \n\n", str);
  fprintf(stderr, "  -i input:  string in SCGInk format\n");
}

EMSCRIPTEN_KEEPALIVE
int main(int argc, char *argv[]) {

  char input[MAXS];
  bool ri=false;
  input[0] = 0;

  int option;
  while ((option = getopt (argc, argv, "i:")) != -1)
    switch (option) {  
    case 'i': strcpy(input,  optarg); ri=true; break;
    case '?': usage(argv[0]); return -1;
    }
  
  //Check mandatory args
  if( !ri ) {
    usage(argv[0]);
    return -1;
  }

  const char* result = recognizeSCGInk(input);
  printf("%s\n", result);
  return 0;
}

}
