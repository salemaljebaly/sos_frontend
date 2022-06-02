FROM node:16.15.0
WORKDIR /usr/src/sos_frontend_app
COPY package.json ./
RUN yarn install
COPY . .

EXPOSE 5001
CMD ["yarn", "start"]