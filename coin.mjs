/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

export function coinFlip() {
  return Math.random() > 0.5 ? 'heads' : 'tails';
}

//console.log(coinFlip())

/** Multiple coin flips
 * 
 * Write a function that accepts one parameter (number of flips) and returns an array of 
 * resulting "heads" or "tails".
 * 
 * @param {number} flips 
 * @returns {string[]} results
 * 
 * example: coinFlips(10)
 * returns:
 *  [
      'heads', 'heads',
      'heads', 'tails',
      'heads', 'tails',
      'tails', 'heads',
      'tails', 'heads'
    ]
 */

export function coinFlips(number) {
  let results = [];
  for (let i = 0; i < number; i++) {
    results[i] = coinFlip();
  }
  return results
  
}
//console.log(coinFlips(10));

/** Count multiple flips
 * 
 * Write a function that accepts an array consisting of "heads" or "tails" 
 * (e.g. the results of your `coinFlips()` function) and counts each, returning 
 * an object containing the number of each.
 * 
 * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
 * { tails: 5, heads: 5 }
 * 
 * @param {string[]} array 
 * @returns {{ heads: number, tails: number }}
 */

export function countFlips(array) {
  let num_heads = 0;
  let num_tails = 0;

  for(let i = 0; i < array.length; i++) {
    if (array[i] == "heads"){
      num_heads++;
    } else {
      num_tails++;
    }
  }
  if (num_heads==0 && num_tails!=0){
    return {tails: num_tails}
  } else if (num_heads!=0 && num_tails==0){
    return {heads: num_heads}
  } else {
  return {
    heads: num_heads,
    tails: num_tails
  }
}
}
/** Flip a coin!
 * 
 * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
 * 
 * @param {string} call 
 * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
 * 
 * example: flipACoin('tails')
 * returns: { call: 'tails', flip: 'heads', result: 'lose' }
 */

export function flipACoin(call) {
  let flip = coinFlip();
  let result;

    if (call == flip) {
      result = "win";
    } else {
      result = "lose";
    }
    return {
      call,
      flip,
      result
    }
  
}

/** Export 
 * 
 * Export all of your named functions
*/
