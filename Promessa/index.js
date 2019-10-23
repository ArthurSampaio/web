const states = {
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
}

function Promessa(executor) {
  const tryCall = cb => Promessa.try(() => cb(this.value))
  const calls = []
  const callLater = cbMember => cb =>
    new Promessa(resolve => calls.push(() => resolve(cbMember()(cb))))

  const members = {
    resolved: {
      state: states.resolved,
      then: tryCall, //onResolved => Promessa.resolve(onResolved(this.value)), //chain
      catch: _ => this,
    },
    rejected: {
      state: states.rejected,
      then: _ => this,
      catch: tryCall, //onResolved => Promessa.resolve(onResolved(this.value)), //chain,
    },
    pending: {
      state: states.pending,
      then: callLater(() => this.then),
      catch: callLater(() => this.catch),
    },
  }
  const changeState = state => Object.assign(this, members[state])
  const acceptCallOnlyInPendingState = (value, state) => {
    if (this.state === states.pending) {
      this.value = value
      changeState(state)
      for (const call of calls) {
        call()
      }
    } //else do nothing
  }

  const getCb = state => value => {
    if (value instanceof Promessa && state === states.resolved) {
      value.then(value => acceptCallOnlyInPendingState(value, states.resolved))
      value.catch(value => acceptCallOnlyInPendingState(value, states.rejected))
    } else {
      acceptCallOnlyInPendingState(value, state)
    }
  }
  const resolve = getCb(states.resolved)
  const reject = getCb(states.rejected)
  changeState(states.pending)
  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

Promessa.resolve = value => new Promessa(resolve => resolve(value))
Promessa.reject = value => new Promessa((_, reject) => reject(value))
Promessa.try = callback => new Promessa(resolve => resolve(callback()))

/** END OF PROMESSA */

const anything = () => {
  throw new Error('I can be anything because I should never get called!')
}
const throwSomethingWrong = () => {
  console.log('not ignored!')
  throw new Error('Something went wrong...')
}

console.log(
  '> s>',
  new Promessa(res => {
    throw new Error()
  })
)

const case1 = Promessa.resolve(42)
console.log('>>>', case1)

case1
  .catch(value => value) // resolves
  .catch(anything) // ignored
  .catch(anything) // ignored
  .then(value => console.log(value)) // logs 42
  .then(throwSomethingWrong) // logs not ignored!
  .catch(throwSomethingWrong) // logs not ignored!
  .catch(() => 24) // resolves
  .then(val => console.log(val))
// p is a Promessa
// p.state is states.resolved
// p.value is 24

let case2 = new Promessa((resolve, reject) => {
  resolve(42)
  reject(24) // ignored
  resolve() // ignored
})

case2
  .then(value => Promessa.reject(value)) // rejects
  .catch(value => console.log(value)) // logs 42

case2 = Promessa.resolve(Promessa.resolve(13)).then(value => console.log(value)) // 13
case2 = Promessa.reject(Promessa.resolve(13)).then(value => console.log(value)) // empty

// p.state is states.rejected
// p.value is a Promessa resolved to 42

const delay = milliseconds =>
  new Promessa(resolve => setTimeout(resolve, milliseconds))
const logThenDelay = milliseconds => total => {
  console.log(`${total / 1000.0} seconds!`)
  return delay(milliseconds).then(() => total + milliseconds)
}

logThenDelay(500)(0) // logs 0 seconds!
  .then(logThenDelay(500)) // after 0.5 seconds, logs 0.5 seconds!
  .then(logThenDelay(500)) // after 1 second, logs 1 seconds!
  .then(logThenDelay(500)) // after 1.5 seconds, logs 1.5 seconds!
// let p = delay(500)
// p.then(() => console.log('1st then!')) // after 0.5 seconds, logs 1st then!
// p.then(() => console.log('2nd then!')) // after 0.5 seconds, logs 2nd then!
// p.then(() => console.log('3rd then!')) // after 0.5 seconds, logs 3rd then!

// p = p.then(() => Promessa.reject())
// p.catch(() => console.log('1st catch!')) // after 0.5 seconds, logs 1st catch!
// p.catch(() => console.log('2nd catch!')) // after 0.5 seconds, logs 2nd catch!
// p.catch(() => console.log('3rd catch!')) // after 0.5 seconds, logs 3rd catch!
