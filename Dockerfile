# Copyright (c) 2019 , Veepee
#
# Permission  to use,  copy, modify,  and/or distribute  this software  for any
# purpose  with or  without  fee is  hereby granted,  provided  that the  above
# copyright notice and this permission notice appear in all copies.
#
# THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
# REGARD TO THIS  SOFTWARE INCLUDING ALL IMPLIED  WARRANTIES OF MERCHANTABILITY
# AND FITNESS.  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
# INDIRECT, OR CONSEQUENTIAL  DAMAGES OR ANY DAMAGES  WHATSOEVER RESULTING FROM
# LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
# OTHER  TORTIOUS ACTION,  ARISING OUT  OF  OR IN  CONNECTION WITH  THE USE  OR
# PERFORMANCE OF THIS SOFTWARE.

FROM vptech/node:10

RUN apt-get update  -qq && \
    apt-get upgrade -qq -y && \
    apt-get install -qq -y \
      build-essential \
      gifsicle \
      libavahi-compat-libdnssd-dev \
      libjpeg-progs \
      optipng \
      python \
      python-dev && \
    apt-clean

COPY . /opt/dashkiosk/

RUN cd /opt/dashkiosk && \
    yarn dist && \
    yarn cache clean

WORKDIR /opt/dashkiosk

EXPOSE 8080

ENV db__options__storage /opt/dashkiosk/db/dashkiosk.sqlite

ENTRYPOINT [ "/usr/bin/node", "/opt/dashkiosk/dist/server.js" ]

CMD [ "--environment", "production", "--port", "8080" ]

HEALTHCHECK NONE
# EOF
