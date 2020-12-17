const connection = require('../database/connection');

async function index(request, response) {
  const debts = await connection('debt')
    .groupBy('id_client', 'name_client')
    .select('id_client', 'name_client')
    .sum({ debt_total: 'value' })
    .orderBy('id_client');
  return response.json(debts);
}

module.exports = { index };