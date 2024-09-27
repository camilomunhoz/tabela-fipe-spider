import {
    getTabelas, getTabelaPorMesAno
} from '../src/fipeApi'

describe('Teste de funções relacionadas ao crawling', () => {

    test('deve retornar a tabela correta ao receber um mês e um ano', async () => {
        const tabelas = await getTabelas()
        expect(getTabelaPorMesAno(9, 2024, tabelas)).toBe(313)
    });
})