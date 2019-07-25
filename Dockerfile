FROM node:10.16.0-alpine
WORKDIR /home/node/app
COPY package.json .
RUN npm install --production
ENV NODE_ENV production
COPY . .
USER node
EXPOSE 3000
CMD ["node", "./bin/www"]