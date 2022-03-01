FROM node:14-alpine

WORKDIR /app

# Bundle app source
COPY /build/ ./

COPY package.json ./
RUN npm install --production

EXPOSE 80
CMD [ "node", "main/server.js" ]