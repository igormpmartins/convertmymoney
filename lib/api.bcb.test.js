const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')

/*getUrl,
getCotacao, 
getCotacaoAPI,
*/

/* falta esse!
test('Test getUrl', () => {
    //const saida = api.getUrl('2021-01-01')
    //(jest.mock.calls[0][0]).toBe('url')
    //console.log(jest.mock)
})
*/

test('Test getCotacaoAPI', () => {

    const res = {
        data: {
            value: [{
                cotacaoVenda: 5.5462
            }]
        }
    }

    axios.get.mockResolvedValue(res)
    api.getCotacaoAPI('url').then(resp => {
        expect(resp).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })

})

test('Test extractCotacao', () => {
    const res = {
        data: {
            value: [{
                cotacaoVenda: 5.5462
            }]
        }
    }

    expect(api.extractCotacao(res)).toBe(5.5462)

})
