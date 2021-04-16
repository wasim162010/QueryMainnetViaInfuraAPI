var express = require('express');
var app = express();
const Web3 = require('web3');
var bodyParser = require('body-parser');


const web3 = new Web3("https://mainnet.infura.io/v3/9116e53c01e14b0580e566fc02645003");


async function fetchAcTransferDetailByTxId(txid) {
    let resp;
    try {
         resp = await executeTx(txid);
    } catch(err) {
        resp = err;
    }
    console.log("resp");
    console.log(resp);
    return resp;
}

async function fetchErc20TransferDetailByTxId(txid) {
    let resp;
    try {
         resp = await executeTx(txid);
    } catch(err) {
        resp = err;
    }
    return resp;
}

async function fetchContractExecDetailByTxId(txid) {
    let resp;
    try {
         resp = await executeTx(txid);
    } catch(err) {
        resp = err;
    }
    return resp;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8081);
console.log("server is up and running");

app.get('/eth/api/v1/transaction', function(req, res){

    console.log("querytx");
    var tx = req.query.tx;
    var opt = req.body.opt;
    /*
    actransfer : for account transfers
    erc20      : erc20 transfer
    contexec   : contract execution
    */
   
    let resp;
    console.log(tx); 
    if(opt == "actransfer") {
        console.log("Calling fetchAcTransferDetailByTxId");
        fetchAcTransferDetailByTxId(tx).then( (data)=> {
            console.log("promosed resolved");
            console.log(data);
            resp = data;
            res.send(resp);
        },(data) => {
            console.log("Then failure:" + data);
          }
        )
        
    } else if(opt == "erc20") {
        console.log("Calling fetchErc20TransferDetailByTxId")

        resp=  fetchErc20TransferDetailByTxId(tx).then( (data)=> {
            console.log("promised resolved");
            console.log(data);
            resp = data;
            res.send(resp);
        },(data) => {
            console.log("Then failure:" + data);
          }
        )

    } else if(opt == "contexec") {
        console.log("Calling fetchContractExecDetailByTxId")
        
        resp =  fetchContractExecDetailByTxId(tx).then( (data)=> {
            console.log("promised resolved");
            console.log(data);
            resp = data;
            res.send(resp);
        },(data) => {
            console.log("Then failure:" + data);
          }
        )
    }

 });

 async function executeTx(txid) {
    let res;
    await web3.eth.getTransactionReceipt(txid, function(error, result) {
        res = result;
    });
    return res;
}



