import { getTabelas, getTabelaPorMesAno } from '../src/fipeApi'
import { crawlForModelos } from '../src/crawler'
import { validateObject } from './fipeApi.test';

describe('Teste de funções relacionadas ao crawling', () => {

    /**
     * Dados de referência:
     * 
     * > tabela_id = 313
     * > tipo_id = 1
     * > marca_id = 29
     * > modelo_id = 11014
     * > anoModelo = 2025
     * > combustivel_id = 1
     */

    test('deve retornar a tabela correta ao receber um mês e um ano', async () => {
        const tabelas = await getTabelas()
        expect(getTabelaPorMesAno(9, 2024, tabelas)).toBe(313)
    });

    test('deve retornar os modelos de uma lista de marcas', async () => {
        const data = await crawlForModelos(313, 1, [29, 15])

        expect(data.length).toBe(2)

        data.forEach(entry => {
            validateObject(entry)
        })
    });
})