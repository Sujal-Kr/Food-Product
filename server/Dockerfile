FROM node:22.4.1
WORKDIR /aap.js
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm" ,"start" ]