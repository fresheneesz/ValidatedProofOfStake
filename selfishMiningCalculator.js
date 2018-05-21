var findKInN = require('./findKInN')
var costOfAttackCalc = require('./costOfAttackCalc')

var minutesInADay = 60*24
var attackerFraction = .44
var validators = 100
var blocktime = 2 // minute

//console.log(Math.pow(attackerFraction,validators))
console.log("Attacker with "+(attackerFraction*100)+"% of the actively minting coins, "+blocktime+" minute blocktime, and "+validators+" validators")

var signaturesNeeded = 3*(1+validators)
var probabilityAttackerWins = findKInN.probabilityAIsFirstToXEvents(attackerFraction, 1-attackerFraction, signaturesNeeded).valueOf()
console.log("Probability the attacker gets an opportunity to selfishly mine: "+new Number(probabilityAttackerWins).toPrecision(6))
console.log("Minting revenue advantage: "+new Number(probabilityAttackerWins*2*100).toPrecision(4)+'%') // times 2 because every time it selfishly mines the attacker gains an extra and the honest group loses one

var expectedPerecntOfAttackerBlocks = attackerFraction*(1+probabilityAttackerWins*2)
console.log("Expected percent of blocks minted: "+new Number(expectedPerecntOfAttackerBlocks*100).toPrecision(4)+'%')

var daysToOpportunity = costOfAttackCalc.avgDaysToOpportunity(probabilityAttackerWins,Math.floor(minutesInADay/blocktime)).valueOf()
var yearsToOpportunity = daysToOpportunity/365

console.log("Average time to selfish-mining opportunity: "+new Number(yearsToOpportunity).toPrecision(4)+" yrs ("+new Number(daysToOpportunity).toPrecision(4)+" days)")
