//setImmediate(Prority(P)2)-> check Handler queue //setTimeout(P1)-> timer Queue  //process.nextTick 

function add(a, b){
    console.log(a+b);
}

setTimeout(()=>{    //doubt  P1
    add(4, 5)
    console.log("This is set Timeout");
})

setImmediate(()=>{
    add(2, 3) //callback register
    console.log("This is setImmediate");
})

process.nextTick(()=>{
    add(5, 5)
    console.log("This is next tick");
})

