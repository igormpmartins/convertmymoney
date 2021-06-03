$('#formConvert').validate({
    rules: {
        cotacao: {
            required: true
        },
        qtde: {
            required: true
        }
    },
    messages: {
        cotacao: {
            required: '*'
        },
        qtde: {
            required: '*'
        }
    }
})