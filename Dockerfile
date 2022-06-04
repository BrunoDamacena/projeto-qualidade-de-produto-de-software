FROM node:16.10.0
WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]