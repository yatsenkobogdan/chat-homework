const http = require('http')
const index = require('ws')
const fs = require('fs')
const path = require('path');

function readBody(req) {
  return new Promise((resolve, reject) => {
    let dataRaw = '';

    req.on('data', (chunk) => (dataRaw += chunk));
    req.on('error', reject);
    req.on('end', () => resolve(JSON.parse(dataRaw)));
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    if (/\/photos\/.+\.png/.test(req.url)) {
      
      const [, imageName] = req.url.match(/\/photos\/(.+\.png)/) || [];
      const fallBackPath = path.resolve(__dirname, 'public/images/blankAvatar.png');
      console.log(fallBackPath)
      const filePath = path.resolve(__dirname, '../photos', imageName);

      if (fs.existsSync(filePath)) {
        return fs.createReadStream(filePath).pipe(res);
      } else {
        return fs.createReadStream(fallBackPath).pipe(res);
      }
    } else if (req.url.endsWith('/upload-photo')) {
      const body = await readBody(req);
      const name = body.name.replace(/\.\.\/|\//, '');
      const [, content] = body.image.match(/data:image\/.+?;base64,(.+)/) || [];
      const filePath = path.resolve('./photos', `${name}.png`);
      if (name && content) {
        fs.writeFileSync(filePath, content, 'base64');
        broadcast(connections, { type: 'photo-changed', data: { name } });
      } else {
        return res.end('fail');
      }
    }

    res.end('ok');
  } catch (e) {
    console.error(e);
    res.end('fail');
  }
});

const wss = new index.Server({server});
const connections = new Map();

wss.on('connection', (socket) => {
  connections.set(socket, {});

  socket.on('message', (messageData) => {
    const message = JSON.parse(messageData);
    let excludeItself = false; 

    if (message.type === 'userConnected') {
      excludeItself = true;
      connections.get(socket).userName = message.data.userName;

      sendMessageTo({
        type: 'users',
        data: [...connections.values()].map((item) => item.userName).filter(Boolean),
      }, socket);
    }

    sendMessageFrom(connections, message, socket, excludeItself)
  })

  socket.on('close', () => {
    sendMessageFrom(connections, {type: 'userDisconnected'}, socket)
    connections.delete(socket)
  })
})

  function broadcast(connections, message) {
    for (const connection of connections.keys()) {
      connection.send(JSON.stringify(message));
    }
  }

  function sendMessageTo(message, to){
    to.send(JSON.stringify(message))
  }

  function sendMessageFrom(connections, message, from, excludeItself) {
    const socketData = connections.get(from);
    
    if(!socketData){
      return;
    }

    message.from = socketData.userName
    
    for (const connection of connections.keys()) {
      if(connection === from && excludeItself){
        continue;
      }
      connection.send(JSON.stringify(message))
    }
  }

  server.listen(3000, ()=>console.log('server started'))