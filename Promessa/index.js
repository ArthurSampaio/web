const states = {
  PEDING: 'peding',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

class Promessa {
  constructor(ex) {
    this.state = states.PEDING
    const getCb = state => value => {
      this.value = value
      this.state = state
    }
    const resolve = () => getCb(states.RESOLVED)
    const reject = () => getCb(states.REJECTED)
    try {
      ex(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  static resolve(val) {
    new Promessa(resolve => resolve(val))
  }
  static reject(val) {
    new Promessa(rejected => rejected(val))
  }
}

const a = new Promessa(resolve => {
  throw new Error('error')
})
console.log('Pass an error >>', a)

const b = new Promessa(resolve => resolve(123))
console.log('Pass a valid value for resolve >>', b)

// Ignore
let p = Promessa.reject(42)
  .then(() => console.log('why')) // ignored
  .then(() => console.log('you')) // ignored
  .then(() => console.log('ignoring me?!')) // ignored!
// p is a Nancy
// p.state is states.rejected
// p.value is 42

const carry = output => input => {
  console.log(input)
  return output
}

// Chain
p = Promessa.resolve(0)
  .then(carry(1)) // logs 0
  .then(carry(2)) // logs 1
  .then(carry(3)) // logs 2
// p is a Nancy
// p.state is states.resolved
// p.value is 3
