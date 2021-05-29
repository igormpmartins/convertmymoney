const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')

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

test('Test getUrl', () => {
    const saida = api.getUrl('04-19-2021')
    expect(saida).toBe(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='04-19-2021'&$top=1&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`)
})

describe('Group: test getQuoteDay', () => {

    const RealDate = Date

    function mockDate(date) {
        global.Date = class extends RealDate{
            constructor() {
                return new RealDate(date)
            }
        }
    } 

    afterEach(() => {
        global.Date = RealDate
    })

    test('Test getQuoteDay', ()=> {
        mockDate('2021-04-19T12:00:00z')
        const quoteDate = api.getQuoteDay()
        expect(quoteDate).toBe('4-19-2021')
    })

    test('Test getQuoteDay saturday', ()=> {
        mockDate('2021-05-01T12:00:00z')
        const quoteDate = api.getQuoteDay()
        expect(quoteDate).toBe('4-30-2021')
    })

    test('test getQuoteDay sunday', ()=> {
        mockDate('2021-05-02T12:00:00z')
        const quoteDate = api.getQuoteDay()
        expect(quoteDate).toBe('4-30-2021')
    })

})

describe('Group: test getCotacao', () => {

    const mockValCot = 5.5462    

    const res = {
        data: {
            value: [{
                cotacaoVenda: mockValCot
            }]
        }
    }    

    const getQuoteDay = jest.fn()
    getQuoteDay.mockReturnValue('04-19-2021')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    test('Test getCotacao Success', () => {

        const getCotacaoAPI = jest.fn()
        getCotacaoAPI.mockResolvedValue(res)

        const extractCotacao = jest.fn()
        extractCotacao.mockReturnValue(mockValCot)

        api.pure.getCotacao({getQuoteDay, getUrl, getCotacaoAPI, extractCotacao})().then(res =>{
            expect(res).toBe(mockValCot)
        })
    })

    test('Test getCotacao Fail', () => {

        const getCotacaoAPI = jest.fn()
        getCotacaoAPI.mockReturnValue(Promise.reject('erro'))

        const extractCotacao = jest.fn()
        extractCotacao.mockReturnValue(mockValCot)

        api.pure.getCotacao({getQuoteDay, getUrl, getCotacaoAPI, extractCotacao})().then(res =>{
            expect(res).toBe('')
        })

    })

})