const chai = require('chai')
const should = chai.should()


describe('tests', () => {
  it('should test', done => {
    let one = 1
    one.should.equal(1)
    done()
  })
})