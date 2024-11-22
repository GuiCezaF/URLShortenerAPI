FROM node:20.18-slim

WORKDIR /app

COPY . /app

COPY .env /app

COPY scripts/wait-for-it.sh /app/scripts/wait-for-it.sh

RUN chmod +x /app/scripts/wait-for-it.sh

RUN apt-get update -y && apt-get install -y openssl
RUN apt update -y && apt upgrade -y

RUN npm install

COPY ./scripts/start-app.sh /app/scripts/start-app.sh
RUN chmod +x /app/scripts/start-app.sh


RUN npm run build

RUN rm -rf /app/src

EXPOSE 3333

CMD ["sh", "/app/scripts/start-app.sh"]
