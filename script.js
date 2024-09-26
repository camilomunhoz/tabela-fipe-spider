$(async () => {

    $('button').on('click', async () => {

        const marcas = await getMarcas()
        console.log(marcas)

        // const modelos = await getModelos(80)
        // console.log(modelos)

        // const anos = await getAnosModelo(80, 2785) //cg 125
        // console.log(anos)
        
        // const info = await getInfosModelo(80, 2785, "1990-1") //cg 125
        // console.log(info)
    })


    getModelos('HONDA')
    
    const targetMarcas = [
        'HONDA',
        'YAMAHA',
        'SUZUKI',
        'HAOJUE',
        'BMW',
        'DUCATI',
        'Royal Enfield',
    ]
})

async function load(datatype) {
    return await $.get(`/data/${datatype}.json`)
}

/* -------------------------------------------------------------------------- */
/*                                 FIPE SCRAPE                                */
/* -------------------------------------------------------------------------- */

const baseURL = 'https://veiculos.fipe.org.br/api/veiculos/'

const endpoints = [
    'ConsultarMarcas',
    'ConsultarModelos',
    'ConsultarAnoModelo',
    'ConsultarValorComTodosParametros',
]

const common = {
    codigoTipoVeiculo: 2, // moto
    codigoTabelaReferencia: 313 // referente a setembro/2024 (e assim sucessivamente),
}

const payload = {
    marcas() {
        return { ...common }
    },
    modelos(marcaID) {
        return { ...common,
            codigoMarca: marcaID
        }
    },
    anosModelo(marcaID, modeloID) {
        return { ...common,
            codigoMarca: marcaID,
            codigoModelo: modeloID
        }
    },
    infosModelo(marcaID, modeloID, anoModelo) {
        return { ...common,
            codigoTipoCombustivel: 1,
            codigoMarca: marcaID,
            codigoModelo: modeloID,
            anoModelo: anoModelo,
            tipoVeiculo: 'moto',
            tipoConsulta: 'tradicional'    
        }
    }
}

async function seizeFromFipe(endpoint, payload) {
    return await new Promise((resolve) => {
            $.post(baseURL+endpoint, payload)
                .done(data => resolve(data))
    })
}

function parseResponse(response) {
    return Array(response).reduce((acc, marca) => {
        acc[marca.Value] = marca.Label
        return acc
    }, {})
}

async function getMarcas() {
    let entries = await seizeFromFipe(endpoints[0], payload.marcas())
    return parseResponse(entries)
}

async function getModelos(marcaID) {
    let entries = seizeFromFipe(endpoints[1], payload.modelos(marcaID))
    return parseResponse(entries)

}

async function getAnosModelo(marcaID, modeloID) {
    let entries = seizeFromFipe(endpoints[2], payload.anosModelo(marcaID, modeloID))
    return parseResponse(entries)
}

async function getInfosModelo(marcaID, modeloID, anoModelo) {
    let entries = seizeFromFipe(endpoints[3], payload.anosModelo(marcaID, modeloID, anoModelo))
    return parseResponse(entries)
}