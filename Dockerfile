FROM node:18.18.1
WORKDIR /app
VOLUME /home/ubuntu/1:/app/1
VOLUME /home/ubuntu/2:/app/2
COPY package.json .
COPY package-lock.json .
RUN npm install 
COPY . ./ 
EXPOSE 8080
CMD ["npm", "run", "start"]