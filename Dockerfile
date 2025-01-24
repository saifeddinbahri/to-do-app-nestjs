FROM node:18
WORKDIR /todoapp
COPY package*.json ./
RUN npm install
RUN npm install -g @nestjs/cli
COPY . .
RUN chown -R node:node /todoapp
USER node
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
