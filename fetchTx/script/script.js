var express = require('express');
var app = express();
const Web3 = require('web3');

const web3 = new Web3("https://mainnet.infura.io/v3/9116e53c01e14b0580e566fc02645003");


async function fetchDetailByTxId(txid) {
    let resp;
    try {
         resp = await executeTx(txid);
    } catch(err) {
        resp = err;
    }
    return resp;
}



app.listen(8081);
console.log("server is up and running");

app.get('/eth/api/v1/transaction', function(req, res){

    console.log("querytx");
    var tx = req.query.tx;

    let resp;
    console.log(tx); 
    console.log("Calling fetchDetailByTxId");
    fetchDetailByTxId(tx).then( (data)=> {
        resp = data;
        res.send(resp);
    },(data) => {
        console.log("error" + data);
      }
    )

 });

 async function executeTx(txid) {
    let res;
    await web3.eth.getTransactionReceipt(txid, function(error, result) {
        res = result;
    });
    return res;
}



