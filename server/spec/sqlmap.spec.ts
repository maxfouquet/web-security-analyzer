import { expect } from 'chai'
import { SqlmapController } from '../src/controllers/sqlmap.controller'
import { SqlmapResponse } from '../src/controllers/sqlmap.controller'

describe('Sqlmap Controller', function() {
    it('Can render the index page', async function() {
        let index, url = 'http://fr.fr'
        index = new SqlmapController().index(url)
        try {
            index.then(function(res: SqlmapResponse) {
                expect(res).to.be.an('object')
                expect(res.file.substring(0, 6)).to.equal('sqlmap')
            })
        } catch (e) {
            console.error(e)
        }
    })
    it('Can\'t render the index page', async function() {
        let index, url = 'http://fr'
        index = new SqlmapController().index(url)
        try {
            index.then(function(res: SqlmapResponse) {
                expect(res).to.be.an('object')
                expect(res.file.substring(0, 6)).to.equal('sqlmap')
                expect(res.message).to.equal('URL bad format: ' + url)
            })
        } catch (e) {
            console.error(e)
        }
    })
})
