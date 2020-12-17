const connection = require('../database/connection');

async function index(request, response) {
  const { id_client } = request.params;

  const debts = await connection('debt')
    .join('user', 'debt.id_user', '=', 'user.id_user')
    .where('debt.id_client', id_client)
    .select([
      'debt.*',
      'user.name as name_user'
    ])
    .orderBy('debt.id_debt');

  return response.json(debts);
}

async function read(request, response) {
  const {id_debt} = request.params;

  const debt = await connection('debt')
    .where('id_debt', id_debt)
    .first()

  return response.json(debt);
}

async function create(request, response) {
  const { id_client, name_client, reason, value, date } = request.body;
  const id_user = request.headers.id_user;

  const [id_debt] = await connection('debt')
    .returning('id_debt')
    .insert({
      id_client,
      name_client,
      reason,
      value,
      date,
      id_user,
    });

  return response.json({ id_debt });
}

async function destroy(request, response) {
  const { id_debt } = request.params;

  await connection('debt')
    .where('id_debt', id_debt)
    .delete();

  return response.sendStatus(204);
}

async function destroyAll(request, response) {
  const {id_client} = request.params;

  await connection('debt')
    .where('id_client', id_client)
    .delete();

  return response.sendStatus(204);
}

async function update(request, response) {
  const { id_debt } = request.params;
  const { reason, value, date } = request.body;
  const id_user = request.headers.id_user;

  await connection('debt')
    .where('id_debt', id_debt)  
    .update({ reason: reason, value: value, date: date, id_user: id_user})

  return response.sendStatus(204);
}

module.exports = { index, read, create, destroy, destroyAll, update };