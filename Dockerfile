FROM node:6.14.4-alpine as dev

WORKDIR /app/

RUN apk update \
        && apk add --no-cache ca-certificates \
        build-base \
        git \
        curl \
        openssh-client \
        fontconfig \
        chromium \
        ruby \
        ruby-dev \
        ruby-irb \
        ruby-rake \
        ruby-io-console \
        ruby-bigdecimal \
        ruby-json \
        ruby-bundler \
        python \
        py-pip \
        autoconf \
        bash

RUN mkdir -p /usr/share && \
  cd /usr/share \
  && curl -Ls https://github.com/fgrehm/docker-phantomjs2/releases/download/v2.0.0-20150722/dockerized-phantomjs.tar.gz | tar xz -C /

ENV PHANTOMJS_BIN=/usr/local/bin/phantomjs
ENV CHROME_BIN=/usr/bin/chromium-browser

COPY package.json yarn.lock deploy.sh Gemfile Gemfile.lock ./

RUN npm install bower -g && \
    npm install grunt -g

RUN pip install awscli --upgrade

RUN echo '{ "allow_root": true }' > /root/.bowerrc
