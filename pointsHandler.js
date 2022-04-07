const express = require('express');
const router = express.Router();

var allPoints = 0;
var payersAndPointsDict = {};
var transactionList = [];

//GET /points - returns all current payer specific balances
router.get('/', (req, res) => {
    res.status(200).send(payersAndPointsDict)
});

//POST /points - add transaction
router.post('/', (req, res) => {
    const payer = req.body.payer.toUpperCase();
    const points = parseInt(req.body.points);
    var error
    if(!points) {
         res.status(400).send({ message: 'points value is missing' })
    }
    else if(points == 0){
        res.status(400).send({message: 'points cannot be zero'})
    }
    else{//points is valid data
        //check if subtracting points
        if(points < 0 && !(payer in payersAndPointsDict)){
            res.status(400).send({ message: 'payer has not had points added yet' })
        }
        else if(allPoints + points < 0){ //if subtracting this would bring total negative, do not do
            res.status(400).send({ message: 'user does not have enough points' })
        }
        else if(payersAndPointsDict[payer] + points < 0){ //if subtracting from this payer would make this payer negative
            res.status(400).send({ message: 'payer points cannot be negative.' })
        }
        else{
            //check if payer is not in payers and points dict
            if(!(payer in payersAndPointsDict)){//if not add to dict
                payersAndPointsDict[payer] = points;
            }
            else{//else add points to payer in dict
                payersAndPointsDict[payer] += points;
            }
            //add transaction to transaction list
            transactionList.push(req.body);
            //Sort transactionList by date from oldest to newest
            transactionList.sort(function(a, b) {return (a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0);});
            res.status(200).send({ success: "request added", transaction: req.body});
            allPoints += points;
        }
    }
});

router.post('/spend', (req, res) => {
    var points = parseInt(req.body.points);
    if(points <= 0){
        res.status(400).send({ message: 'points cannot be negative or be zero.' })
    }
    else if(allPoints - points < 0){ //if subtracting this would bring total negative, do not do
        res.status(400).send({ message: 'user does not have enough points.' })
    }
    else{//subtracting points does not bring us negative so we...
        let tIndex = 0; //index of transaction in transaction list
        let tPoints = 0; //points from this transaction
        let tPayer;
        let spendingDict = {};
        while(points > 0){//iterate through transactions and remove points from the oldest transactions by payer
            tPoints = parseInt(transactionList[tIndex]["points"]);
            tPayer = transactionList[tIndex]["payer"].toUpperCase();
            if(tPoints <= points){//We need to use all the points from this transaction
                points -= tPoints; //lower the points we have yet to subtract
                allPoints -= tPoints; //lower our total points 
                //Remove transaction and update ds's
                payersAndPointsDict[tPayer] -= tPoints;
                spendingDict[tPayer] = (spendingDict[tPayer] || 0) + tPoints;
                transactionList.splice(tIndex,1);
                tIndex--; //transaction was removed and thus index does not need to increment
            }
            else if(tPoints > points){ //We don't need to use all of the points of this transaction
                allPoints -= points;//lower total points
                payersAndPointsDict[tPayer] -= points;//lower points in payersAndPointsDict
                spendingDict[tPayer] = (spendingDict[tPayer] || 0) + points;
                transactionList[tIndex]["points"] -= points;//lower points in transaction
                points = 0;//lower points to 0
            }
            tIndex++;
        }
        let spendingList = [];
        for(const payer in spendingDict){spendingList.push({"payer": payer, "points": spendingDict[payer]*-1})}
        res.status(200).send(spendingList);
    }
});

module.exports = router