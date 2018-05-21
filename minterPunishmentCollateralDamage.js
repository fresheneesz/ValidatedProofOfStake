var findKInN = require('./findKInN')
var costOfAttackCalc = require('./costOfAttackCalc')

var minutesInADay = 60*24
var blocktime = 2 // minute
var avgPropagationDelay = 10 // seconds

var probabilityOfABlockEachSecond = .5/(blocktime*60) // yeah I know this isn't correct statistics
var probabilityOfTwoBlocksIn10Seconds = probabilityOfABlockEachSecond*(1-Math.pow(1-probabilityOfABlockEachSecond,10))



var probabilityOfCollateralDamage = 1-probabilityOfTwoBlocksIn10Seconds

console.log(probabilityOfTwoBlocksIn10Seconds)

var daysToOpportunity = costOfAttackCalc.avgDaysToOpportunity(probabilityOfTwoBlocksIn10Seconds,minutesInADay*60).valueOf()
var yearsToOpportunity = daysToOpportunity/365

console.log("Average time to collateral damage: "+new Number(yearsToOpportunity).toPrecision(4)+" yrs ("+new Number(daysToOpportunity).toPrecision(4)+" days)")
