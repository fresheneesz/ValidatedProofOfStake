// Note that this file can take a few minutes to calculate if K and N are both larger than 300

var costOfAttackCalc = require('./costOfAttackCalc')

var attackerFraction = .47
var validators = 100
var blocktime = 2 // minutes
var honestValidationHeight= 3 // the additional height honest validators are willing to sign non-longest chains

// @ 27 block finalization
console.log()

var blocksTilFinalization = 25

var validationsNeeded = blocksTilFinalization*validators
var signaturesNeeded = blocksTilFinalization + honestValidationHeight + validationsNeeded

var stats = costOfAttackCalc.calcAttackStats(attackerFraction, blocktime, signaturesNeeded)

console.log(validators+" validators, "+blocktime+" minute blocktime, "+blocksTilFinalization
            +" block finalization, attacker with "+new Number(attackerFraction*100).toPrecision(3)
            +"% of active stake, and honest validation height of "+honestValidationHeight)
costOfAttackCalc.printStats(stats)

// @ 40 block finalization
console.log()

attackerFraction = .476
blocksTilFinalization = 40

var validationsNeeded = blocksTilFinalization*validators
var signaturesNeeded = blocksTilFinalization + honestValidationHeight + validationsNeeded

var stats = costOfAttackCalc.calcAttackStats(attackerFraction, blocktime, signaturesNeeded)

console.log(validators+" validators, "+blocktime+" minute blocktime, "+blocksTilFinalization
            +" block finalization, attacker with "+new Number(attackerFraction*100).toPrecision(3)
            +"% of active stake, and honest validation height of "+honestValidationHeight)
costOfAttackCalc.printStats(stats)