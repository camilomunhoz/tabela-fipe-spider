import axios from 'axios';

/* -------------------------------------------------------------------------- */
/*                          FIPE ENDPOINTS REACHING                           */
/* -------------------------------------------------------------------------- */

const endpoints = {
    tabelas    : 'https://veiculos.fipe.org.br/api/veiculos/ConsultarTabelaDeReferencia',
    marcas     : 'https://veiculos.fipe.org.br/api/veiculos/ConsultarMarcas',
    modelos    : 'https://veiculos.fipe.org.br/api/veiculos/ConsultarModelos',
    anosModelo : 'https://veiculos.fipe.org.br/api/veiculos/ConsultarAnoModelo',
    infosModelo: 'https://veiculos.fipe.org.br/api/veiculos/ConsultarValorComTodosParametros',
}

const definitions = {
    tipos: {
        1: 'Carro',
        2: 'Moto',
        3: 'Caminhão',
    },
    combustiveis: {
        1: 'Gasolina',
        2: 'Álcool',
        3: 'Diesel',
        4: 'Flex',
        // Até o momento não há elétrico. Consideram à gasolina
    }
}

/* ---------------------------------- utils --------------------------------- */

const payload = {
    marcas(tabela_id, tipo_id) {
        return {
            codigoTabelaReferencia: tabela_id,
            codigoTipoVeiculo: tipo_id,
        }
    },
    modelos(tabela_id, tipo_id, marca_id) {
        return {
            codigoTabelaReferencia: tabela_id,
            codigoTipoVeiculo: tipo_id,
            codigoMarca: marca_id,
        }
    },
    anosModelo(tabela_id, tipo_id, marca_id, modelo_id) {
        return {
            codigoTabelaReferencia: tabela_id,
            codigoTipoVeiculo: tipo_id,
            codigoMarca: marca_id,
            codigoModelo: modelo_id,
        }
    },
    infosModelo(tabela_id, tipo_id, marca_id, modelo_id, anoModelo, combustivel_id) {
        return {
            codigoTabelaReferencia: tabela_id,
            codigoTipoVeiculo: tipo_id,
            codigoTipoCombustivel: combustivel_id,
            codigoMarca: marca_id,
            codigoModelo: modelo_id,
            anoModelo: anoModelo,
            // tipoVeiculo: 'moto', // presente nas chamadas originais mas irrelevante
            tipoConsulta: 'tradicional',
        }
    }
}

async function seizeFromFipe(endpoint, payload) {
    return await new Promise((resolve) => {
        axios.post(endpoint, payload, {
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Origin': 'https://veiculos.fipe.org.br',
                'Referer': 'https://veiculos.fipe.org.br/',
                'Accept-Language': 'pt-br',
                'X-Requested-With': 'XMLHttpRequest'
            },
        }).done(data => resolve(data))
    })
}

/**
 * Transforma retornos da API em um único objeto.
 * 
 * Retornos da API frequentemente vêm em múltiplos objetos:
 *    [{Label:<>, Value:<>}, ...]
 */
function response2object(response) {
    if (Array.isArray(response)) {
        return response.reduce((acc, marca) => {
            acc[marca.Value] = marca.Label
            return acc
        }, {})
    }
}

async function getTabelaPorMesAno(mes, ano) {
    let tabelas = await getTabelas()

    // dinamicamente transforma o número do mês nele por extenso
    mes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(2000, mes - 1, 1));
    
    return tabelas.find((tabela) => {
        return tabela.Mes.trim() === `${mes}/${ano}`
    }).Codigo
}

/* --------------------------------- getters -------------------------------- */

export async function getTabelas() {
    let response = await seizeFromFipe(endpoints.tabelas)
    return response
}

export async function getMarcas(tabela_id, tipo_id) {
    let response = await seizeFromFipe(
        endpoints.marcas,
        payload.marcas(tabela_id, tipo_id)
    )
    return response2object(response)
}

export async function getModelos(tabela_id, tipo_id, marca_id) {
    let response = await seizeFromFipe(
        endpoints.modelos,
        payload.modelos(tabela_id, tipo_id, marca_id)
    )
    return response2object(response.Modelos)
}

/**
 * Beware: A API concatena o tipo de combustível no ano
 * 
 * Exemplo: [
 *    {Label: '2020', Value:'2020-1'}
 *    {Label: '2023 Diesel', Value:'2023-3'}
 * ]
 */
export async function getAnosModelo(tabela_id, tipo_id, marca_id, modelo_id) {
    let response = await seizeFromFipe(
        endpoints.anosModelo,
        payload.anosModelo(tabela_id, tipo_id, marca_id, modelo_id)
    )
    return response2object(response)
}

export async function getInfosModelo(tabela_id, tipo_id, marca_id, modelo_id, anoModelo) {
    let response = await seizeFromFipe(
        endpoints.infosModelo,
        payload.infosModelo(tabela_id, tipo_id, marca_id, modelo_id, anoModelo)
    )
    return response
}