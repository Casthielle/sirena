FROM node:10.16.0-stretch-slim

RUN apt-get update
RUN apt install nano -y
RUN npm install -g npm yarn
COPY ["package.json", "/usr/src/"]
WORKDIR /usr/src
RUN yarn install
COPY [".", "/usr/src/"]

EXPOSE 3000

CMD ["npm", "run", "server"]
