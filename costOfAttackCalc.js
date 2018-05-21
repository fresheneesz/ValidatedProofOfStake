// Note that this file can take a few minutes to calculate if K and N are both larger than 300

var BigNumber = require("decimal.js")
var findKInN = require('./findKInN')

var minutesInADay = 60*24


// attackerFraction - The fraction of block creation power (hashpower or stake power) that the attacker has
// blocktime - In minutes
// blocksTilFinalization - How many blocks it takes for a transaction to be considered finalized
exports.calcAttackStats = function(attackerFraction, blocktime, blocksTilFinalization) {     
    var totalBlocksInCompetition = blocksTilFinalization*2-1  
    
    var probabilityAttackerWins = findKInN.findAtLeastKInN(blocksTilFinalization, totalBlocksInCompetition, attackerFraction)
    
    var blocksPerDay = minutesInADay/blocktime
    var avgDaysToOpportunity = exports.avgDaysToOpportunity(probabilityAttackerWins, blocksPerDay).valueOf()
    
    return {
        probabilityAttackerWins: probabilityAttackerWins, blocksPerDay: blocksPerDay,
        avgDaysToOpportunity:avgDaysToOpportunity   
    }
}

exports.avgDaysToOpportunity = function(probability, triesPerDay) {    
    // likelihoodOfAttackOpportunity = 1 - (1-probabilityAttackerWins)^(days*blocksPerDay)
    // likelihoodOfAttackOpportunity = .5;
    // .5 = 1 - (1-probabilityAttackerWins)^(days*blocksPerDay)
    // (1-probabilityAttackerWins)^(days*blocksPerDay) = .5
    // days = log_(1-probabilityAttackerWins)(.5)/blocksPerDay
    // daysTo50PercentLiklihood = days
    // avgDaysToOpportunity = daysTo50PercentLiklihood*2
    return BigNumber.log(.5, new BigNumber(1).minus(probability)).div(triesPerDay).times(2)
}

exports.printStats = function(stats) {
    console.log("Probability the attacker gets an opportunity to double-spend:\t"
                +new Number(stats.probabilityAttackerWins.valueOf()).toPrecision(4)
    )
                
    var yearsToOpportunity = stats.avgDaysToOpportunity/365
    
    console.log("Average time to double-spend opportunity:\t\t\t"+new Number(yearsToOpportunity).toPrecision(4)
                +" yrs ("+new Number(stats.avgDaysToOpportunity).toPrecision(4)+" days)"
    )

    // sanity check
    // likelihoodOfAttackOpporutnityInTimeframe = 1 - (1 - probabilityAttackerWins)^(avgDaysToOpportunity*blocksPerDay))
    var likelihoodOfAttackOpporutnityInTimeframe = new BigNumber(1).minus(
        new BigNumber(1).minus(stats.probabilityAttackerWins).pow(stats.avgDaysToOpportunity/2*stats.blocksPerDay)
    ).valueOf()
    console.log("Probability of an attack opporutnity in "
                +new Number(stats.avgDaysToOpportunity/2).toPrecision(3)
                +" days:\t\t"+likelihoodOfAttackOpporutnityInTimeframe)
}