FROM node:12.9.1-alpine

#Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Copy app source from work directory to container
COPY . .

RUN npm install

EXPOSE 7777

CMD ["npm", "run", "deploy"]
