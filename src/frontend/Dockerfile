FROM node:14-alpine

WORKDIR /app

COPY tsconfig.json .
COPY shared ./shared

COPY frontend/src ./frontend/src
COPY frontend/public ./frontend/public

COPY frontend/package.json ./frontend/

COPY frontend/tsconfig.json ./frontend/
COPY frontend/postcss.config.js ./frontend/
COPY frontend/tailwind.config.js ./frontend/

WORKDIR /app/frontend

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
