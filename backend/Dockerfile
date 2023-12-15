FROM node:14-alpine

WORKDIR /app

COPY tsconfig.json .
COPY shared ./shared

COPY backend/src ./backend/src

COPY backend/package.json ./backend/

COPY backend/tsconfig.json ./backend/
COPY backend/nodemon.json ./backend/

WORKDIR /app/backend

RUN npm install
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
