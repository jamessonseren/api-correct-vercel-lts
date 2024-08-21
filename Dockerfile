FROM node:18.17.0

WORKDIR /home/node/app

RUN apt-get update && apt-get install -y openssl

COPY package*.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
