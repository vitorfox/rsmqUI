from node:6.9.1-slim
ADD package.json /
ADD node_modules/ /node_modules
RUN npm install
ADD . /
