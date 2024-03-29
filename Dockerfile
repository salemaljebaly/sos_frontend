FROM node:16.13.2
WORKDIR /usr/src/sos_frontend_app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 

CMD ["npm", "start"]