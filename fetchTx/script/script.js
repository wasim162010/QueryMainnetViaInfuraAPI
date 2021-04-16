var express = require('express');
var app = express();
const Web3 = require('web3');
var path = require('path');
var bodyParser = require('body-parser');
/*
erc20 transfer : 0xde89620620653c155000d6f72c48a3948af189a42035c9e0035b33b265d1ee0d
*/

const web3 = new Web3("https://mainnet.infura.io/v3/9116e53c01e14b0580e566fc02645003");
// web3.eth.getTransaction('0x50aa4f5bb43608904729b9076489e2f9e247f5cfb87ff539418e7f0fd5cc2b06', function(error, result) {
//     console.log("txid queried");
//     console.log(result);
// });



///eth/api/v1/transaction
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
    console.log("resp");
   // console.log(resp);
    return resp;
}

async function fetchContractExecDetailByTxId(txid) {
    let resp;
    try {
         resp = await executeTx(txid);
    } catch(err) {
        resp = err;
    }
    //console.log("resp");
    //console.log(resp);
    return resp;
}

async function executeTx(txid) {
    let res;

    // await web3.eth.getTransaction(txid, function(error, result) {
    //     console.log("txid queried");
    //     console.log(result);
    //     res = result;
    // });

    await web3.eth.getTransactionReceipt(txid, function(error, result) {

        res = result;
      //  console.log(result);
    });

    return res;

}

//fetchAcTransferDetailByTxId('0x50aa4f5bb43608904729b9076489e2f9e247f5cfb87ff539418e7f0fd5cc2b06');
//fetchAcTransferDetailByTxId('0xbeae83e379e9a4c986cfc453fe90e1fa2ca50eaa692ad99abe2aee2214208132'); //0xde89620620653c155000d6f72c48a3948af189a42035c9e0035b33b265d1ee0d
//0xbeae83e379e9a4c986cfc453fe90e1fa2ca50eaa692ad99abe2aee2214208132

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8081);
console.log("server is up and running");
// /v1/eth/api/v1/transaction
app.get('/eth/api/v1/transaction', function(req, res){

    console.log("querytx");
    var tx = req.query.tx;
    // var opt = req.query.opt

   // var tx = req.body.tx;
    var opt = req.body.opt;
    //http://localhost:8081/eth/api/v1/transaction?tx=0x5f4a22c831e7920a6c4b417f4545cb6d0285714c3817904dbc2abfef87a49f67&opt=contexec

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
    console.log("                post api call                 ");
    console.log(resp);
    console.log("                res.send                ");
   // res.send(resp);

 });

 app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

