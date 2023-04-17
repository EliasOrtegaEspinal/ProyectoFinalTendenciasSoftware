FROM node:14-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY ./src ./src
COPY ./public ./public
EXPOSE 8080
CMD ["yarn", "start"]
