FROM node:latest
WORKDIR /vault
RUN yarn install
COPY . .
CMD ["yarn", "run"]