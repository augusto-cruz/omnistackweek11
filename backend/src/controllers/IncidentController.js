const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        // Pega o valor do parametro page, se ele nao for passado usa o default = 1
        const { page = 1 } = request.query;

        // Retorna a quantidade de INCIDENTS
        // [count] - retorna apenas a primeira posicao do array em vez de retornar todo objeto
        const [count] = await connection('incidents')
            .count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // Pega os dados da ONG
            .limit(5) // Limita a 5 resultados
            .offset((page - 1) * 5) // Pega 5 por pagina (Ex: Pagina 1: 0-5, Pagina 2: 6-10)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        // Retorna a quantidade total de INCIDENTS no header da resposta
        response.header('X-Total-Count', count['count(*)'])

        return response.json({ incidents });
    },

    async create(request, response) {
        const { title, description, value } = request.body;

        // Pega o id da ONG que e enviado no header da requisicao
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        // Pega id do Incident na rota (Route params)
        const id = request.params.id;

        // Pega id da ONG logada - Para que apenas a ONG que criou possas deletar um INCIDENT
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (!incident) {
            return response.status(400).json({
                error: 'Incident not found'
            });
        }

        // Se outra ONG estiver tentando deletar um INCIDENT que nao criou retorna 401
        if (incident.ong_id != ong_id) {
            return response.status(401).json({
                error: 'Operation not permitted'
            });
        }

        await connection('incidents')
            .where('id', id)
            .delete();

        // 204 - Sucesso, mas sem conteudo a ser retornado
        // send() - Envia a resposta vazia
        return response.status(204).send();
    }

}