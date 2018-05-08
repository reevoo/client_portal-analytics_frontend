FROM ubuntu:16.04

ENV NODE_MAJOR_VER=6

WORKDIR /app/

COPY .ruby-version .

RUN apt-get -q update && \
    apt-get -qy upgrade && \
    apt-get -qy install apt-transport-https git curl bzip2 build-essential unzip libssl-dev libreadline-dev zlib1g-dev \
    python-pip zlib1g-dev chromium-chromedriver

RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get -q update && \
    apt-get -qy install yarn

RUN curl -sL https://deb.nodesource.com/setup_${NODE_MAJOR_VER}.x | bash - && \
    apt-get -q update && \
    apt-get -qy install nodejs

RUN git clone https://github.com/rbenv/rbenv.git ~/.rbenv && \
    git clone https://github.com/sstephenson/ruby-build.git /root/.rbenv/plugins/ruby-build && \
    /root/.rbenv/plugins/ruby-build/install.sh

ENV PATH=/root/.rbenv/bin:/root/.rbenv/shims:$PATH
RUN echo 'eval "$(rbenv init -)"' >> /etc/profile.d/rbenv.sh

RUN rbenv install $(cat .ruby-version) && \
    rbenv global $(cat .ruby-version) && \
    gem install bundler

RUN pip install awscli --upgrade
