FROM node:14.19.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000

CMD ["npm", "run", "dev"]