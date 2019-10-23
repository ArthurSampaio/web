const states = {
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
}

class Promessa {
  constructor(ex) {
    const tryCall = cb => Promessa.try(() => cb(this.value))
    const members = {
      resolved: {
        state: states.resolved,
        then: tryCall, //onResolved => Promessa.resolve(onResolved(this.value)), //chain
        catch: _ => this,
      },
      rejected: {
        state: states.rejected,
        then: _ => this,
        catch: tryCall,
      },
      pending: {
        state: states.pending,
      },
    }
    const changeState = state => Object.assign(this, members[state])

    const getCb = state => value => {
      this.value = value
      changeState(state)
    }
    const resolve = getCb(states.resolved)
    const reject = getCb(states.rejected)
    changeState(states.pending)
    try {
      ex(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  static resolve(val) {
    return new Promessa(resolve => resolve(val))
  }
  static reject(val) {
    return new Promessa((_, reject) => reject(val))
  }
  static try(cb) {
    return new Promessa(resolve => resolve(cb()))
  }
}

const anything = () => {
  throw new Error('I can be anything because I should never get called!')
}
const throwSomethingWrong = () => {
  console.log('not ignored!')
  throw new Error('Something went wrong...')
}

console.log('>>', new Promessa(res => res(32)))

const p = Promessa.reject(42)
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
