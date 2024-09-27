import {
    getTabelas, getMarcas, getModelos,
    getAnosModelo, getInfosModelo
} from '../src/fipeApi'

describe('Teste dos endpoints da API da Fipe', () => {

    let tabela_id, tipo_id, marca_id, modelo_id, anoModelo, combustivel_id
    
    beforeAll(() => {
        tabela_id = 313
        tipo_id = 1
        marca_id = 29
        modelo_id = 11014
        anoModelo = 2025
        combustivel_id = 1
    })
    
    test('deve retornar as tabelas no formato correto', async () => {
        const data = await getTabelas()
        expect(data).toBeInstanceOf(Object)
        expect(data[0]).toHaveProperty('Codigo');
        expect(data[0]).toHaveProperty('Mes');
    });
    
    test('deve retornar as marcas no formato correto', async () => {
        const data = await getMarcas(tabela_id, tipo_id)
        validateObject(data)
    });
    
    test('deve retornar os modelos de uma marca no formato correto', async () => {
        const data = await getModelos(tabela_id, tipo_id, marca_id)        
        validateObject(data)
    });
    
    test('deve retornar os anos de um modelo corretamente', async () => {
        const data = await getAnosModelo(tabela_id, tipo_id, marca_id, modelo_id)
        expect(typeof Object.keys(data)[0] === 'string').toBeTruthy()
        expect(typeof Object.values(data)[0] === 'string').toBeTruthy()

    });
    
    test('deve retornar todas as infos de um modelo no formato correto', async () => {
        const data = await getInfosModelo(tabela_id, tipo_id, marca_id, modelo_id, anoModelo, combustivel_id)
        expect(data).toBeInstanceOf(Object)
        expect(data).toHaveProperty('Valor');
        expect(data).toHaveProperty('CodigoFipe');
    });

})

/**
 * Verifica se o objeto cumpre o formato chave-valor
 * onde a chave é int e o valor é string.
 */
export function validateObject(obj) {
    expect(obj).toBeInstanceOf(Object)
    expect(obj).not.toBeNull()
    expect(Number.isInteger(parseInt(Object.keys(obj)[0]))).toBeTruthy()
    expect(typeof Object.values(obj)[0] === 'string').toBeTruthy()
}