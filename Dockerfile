FROM node:10

RUN yarn global add bower grunt-cli
RUN apt-get -qq update && apt-get install -qq gifsicle libjpeg-progs optipng libavahi-compat-libdnssd-dev

WORKDIR /dashkiosk
COPY . /dashkiosk/
RUN yarn install && \
    grunt && \
    cd dist && \
    yarn install --production && \
    yarn cache clean

RUN chmod +x /dashkiosk/entrypoint.sh

# We use SQLite by default. If you want to keep the database between
# runs, don't forget to provide a volume for /database.
VOLUME /database

ENV NODE_ENV production
ENV port 8080
ENV db__options__storage /database/dashkiosk.sqlite

ENTRYPOINT [ "/dashkiosk/entrypoint.sh" ]
EXPOSE 8080
