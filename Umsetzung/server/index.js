/**
 * Created by kevin_000 on 25.11.2017.
 */

// setting up express
// let app = require('express')();
// let http = require('http').Server(app)

// setting up socket.io
let io = require('socket.io')(3000, {log: false, origins: '*:*'});

// setting up diffsync's DataAdapter
let diffsync    = require('diffsync');
let dataAdapter = new diffsync.InMemoryDataAdapter();

// setting up the diffsync server
let diffSyncServer = new diffsync.Server(dataAdapter, io);

// http.listen(3000, function(){
  // console.log('listening on *:3000');
// });

