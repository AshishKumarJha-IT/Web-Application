//used for backend

const events = require('events');

//create new event object
const eventsEmitter = new events.EventEmitter();

//create event handler 
var connectHandler = function connect(){
    console.log('Connection successful.');

    //fire the data_recieved event
    eventsEmitter.emit('data_received');
}

//bind the connection event with the handler
eventsEmitter.on('connection', connectHandler);

eventsEmitter.on('data_received', function(){
    console.log('data received successful');
})

eventsEmitter.on('data_received', ()=>{
    console.log('new data received successful');
})

eventsEmitter.emit('connection');
eventsEmitter.emit('data_received');