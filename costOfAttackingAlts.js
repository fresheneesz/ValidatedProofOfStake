// Note that this file can take a few minutes to calculate if K and N are both larger than 300

var costOfAttackCalc = require('./costOfAttackCalc')
var findKInN = require('./findKInN')
var minutesInADay = 60*24


console.log("\nPeerCoin\n")

var attackerFraction = .09
var avgCoinAge = Math.floor(365*2/3) // days
var avgAttackerWaitTime = 365/2 // days
var blocktime = 10 // minute
var blocksTilFinalization = 6

var adjustedAttackerFraction = attackerFraction/(avgCoinAge/avgAttackerWaitTime)
var stats = costOfAttackCalc.calcAttackStats(adjustedAttackerFraction, blocktime, blocksTilFinalization)

console.log("Avg minter coin age of "+avgCoinAge+" days, "+blocktime+" minute blocktime, "+blocksTilFinalization
            +" block finalization, attacker with "+new Number(attackerFraction*100).toPrecision(3)
            +"% of active stake")
costOfAttackCalc.printStats(stats)


console.log("\nNxt\n")

// Nxt @ 10 block finalization

attackerFraction = .098
blocktime = 1 // minute
blocksTilFinalization = 10

var stats = costOfAttackCalc.calcAttackStats(attackerFraction, blocktime, blocksTilFinalization)

console.log(blocktime+" minute blocktime, "+blocksTilFinalization
            +" block finalization, attacker with "+new Number(attackerFraction*100).toPrecision(3)
            +"% of active stake")
costOfAttackCalc.printStats(stats)


// Nxt @ 60 block finalization (~1 hour)

attackerFraction = .301
blocksTilFinalization = 60

var stats = costOfAttackCalc.calcAttackStats(attackerFraction, blocktime, blocksTilFinalization)

console.log()
console.log(blocktime+" minute blocktime, "+blocksTilFinalization
            +" block finalization, attacker with "+new Number(attackerFraction*100).toPrecision(3)
            +"% of active stake")
costOfAttackCalc.printStats(stats)


console.log("\nCasper\n")

attackerFraction = .42
blocktime = 10 // minutes
var validatorsInSet = 300

var epochLength = 50 // blocks
var epochTime = blocktime*epochLength

var validatorsNeeded = (validatorsInSet)/2+1
var probabilityAttackerWins = findKInN.findAtLeastKInN(validatorsNeeded, validatorsInSet, attackerFraction)
    
var epochsPerDay = minutesInADay/epochTime
var avgDaysToOpportunity = costOfAttackCalc.avgDaysToOpportunity(probabilityAttackerWins, epochsPerDay).valueOf()*2
    
var stats = {
    probabilityAttackerWins: probabilityAttackerWins, blocksPerDay: epochsPerDay,
    avgDaysToOpportunity:avgDaysToOpportunity   
}

console.log(epochTime+" minute epochTime, "+validatorsInSet
            +" validators, attacker with "+new Number(attackerFraction*100).toPrecision(3)
            +"% of active stake")
costOfAttackCalc.printStats(stats)