import { expect } from 'chai'
import { IndexController } from '../src/controllers/index.controller'

describe('Index Controller', function() {
    it('Can render the index page', async function() {
        let index
        index = new IndexController().index()
        index.then(function(res: Promise<any>) {
            expect(res).to.deep.equal({})
        })
    })
})
