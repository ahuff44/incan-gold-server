FROM instructure/node-passenger:6

ENV APP_HOME /usr/src/app

USER root

RUN mkdir -p $APP_HOME
COPY . $APP_HOME
WORKDIR $APP_HOME
RUN npm install
RUN chown -R docker:docker $APP_HOME

USER docker
