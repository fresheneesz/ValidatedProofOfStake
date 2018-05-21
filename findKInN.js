var BigNumber = require("decimal.js")

exports.probabilityAIsFirstToXEvents = probabilityAIsFirstToXEvents
exports.probabilityASeesXOutOfYEvents = probabilityASeesXOutOfYEvents
exports.findAtLeastKInN = findAtLeastKInN
exports.findKOrFewerInN = findKOrFewerInN
exports.probabilityOfExactkyKInN = probabilityOfExactkyKInN
exports.choose = choose
exports.fac = fac

// finds the probability that A finds `necessaryEvents` before B does
// https://math.stackexchange.com/questions/2727164/how-can-you-find-the-likelihood-that-one-event-with-a-continuous-probability-wil
function probabilityAIsFirstToXEvents(aEventProbability, bEventProbability, necessaryEvents) {
    var aRatio = aEventProbability/(aEventProbability+bEventProbability) // the fraction of events found on average by A
    return findAtLeastKInN(necessaryEvents, 2*(necessaryEvents-1), aRatio)
}

// finds the probability that A finds `aEvents` out of `totalEvents`
// aEventProbability - the probability of A finding an event
// bEventProbability - the probability of B finding an event
// totalEvents - The total events that happened in a given (arbitrary) time period
// aEvents - The number of events A finds in a given (arbitrary) time period
// see // https://math.stackexchange.com/questions/2727164/how-can-you-find-the-likelihood-that-one-event-with-a-continuous-probability-wil
function probabilityASeesXOutOfYEvents(aEventProbability, bEventProbability, totalEvents, aEvents) {
    var aRatio = aEventProbability/(aEventProbability+bEventProbability) // the fraction of events found on average by A
    return probabilityOfExactkyKInN(aEvents, totalEvents, aRatio)
}

function findAtLeastKInN(k,n, itemProbability) {
    var sum = new BigNumber(0)
    for(var x=k; x<=n; x++) {
        sum = sum.plus(probabilityOfExactkyKInN(x,n,itemProbability))
    }

    return sum
}

function findKOrFewerInN(k,n, itemProbability) {
    var sum = new BigNumber(0)
    for(var x=0; x<=k; x++) {
        sum = sum.plus(probabilityOfExactkyKInN(x,n,itemProbability))
    }

    return sum
}

// probability of finding the item k times in n tries with a liklihood of finding it each try of `itemProbability`
// relevant: https://math.stackexchange.com/questions/2727164/how-can-you-find-the-likelihood-that-one-event-with-a-continuous-probability-wil
function probabilityOfExactkyKInN(k,n,itemProbability) {
    var probabilityOfNotItem = (1-itemProbability)

    // probabilityOfNotItem^(n-k)*itemProbability^(k)*choose(n,k)
    return new BigNumber(probabilityOfNotItem+'').pow(n-k).times(new BigNumber(itemProbability+'').pow(k).times(choose(n,k)))
}

// n choose k
function choose(n,k) {
    if(k===0)
        return 1
    else
        return facRatio(n,k).div(fac(n-k)) // n!/(k!*(n-k)!)) // facRatio(n,k)/fac(n-k)
}

// factorial
function fac(x) {
    var product = new BigNumber(1)
    for(var a=new BigNumber(2); a.lte(x);a = a.plus(1)) {
        product = product.times(a)
    }

    return product
}

//// fast factorial
////https://cs.stackexchange.com/questions/14456/factorial-algorithm-more-efficient-than-naive-multiplication
//function fastFac(k) {
//  var f = new BigNumber(1)
//  for(var i=1; i<k-1; i++) {
//    f = f.times(oddprod(3, Math.pow(2, i+1) - 1)+'')
//  }
//
//  return f.times(new BigNumber(2).pow(new BigNumber(2).pow(k - 1)))
//}
//
//
//function oddprod(l,h) {
//  var p = 1
//  var ml = (l%2>0) ? l : (l+1)
//  var mh = (h%2>0) ? h : (h-1)
//  while(ml <= mh) {
//    p *= ml
//    ml += 2
//  }
//
//  return p
//}

// factorial ratio - num!/denom!
// optimizes precision (so you don't deal with as big of numbers)
function facRatio(num,denom) {
    if(num < denom) {
        return new BigNumber(1).div(facRatio(denom, num))
    } else {
        var product = new BigNumber(1)
        for(var n=num; n>denom; n--) {
            product = product.times(n)
        }

        return product
    }
}