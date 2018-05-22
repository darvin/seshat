FROM trzeci/emscripten

RUN apt-get update -y

WORKDIR /build-deps

ADD https://ftp.osuosl.org/pub/blfs/conglomeration/boost/boost_1_56_0.tar.bz2 ./

RUN tar xf boost_1_56_0.tar.bz2 && rm boost_1_56_0.tar.bz2

WORKDIR /src
