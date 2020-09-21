const axios = require('axios');
const { User, dbClient } = require('./db');
const PAGE_SIZE = 100;

(async function () {
  const count = await User.count();

  await User.bulkCreate(
    await getRandomUsers({
      page: Math.ceil(Number(count) / PAGE_SIZE) + 1,
    })
  );
  await dbClient.end();
})();

async function getRandomUsers({ page }) {
  const {
    data: { results },
  } = await axios.get(
    `https://randomuser.me/api/?seed=abrakadabra&page=${page}&results=${PAGE_SIZE}&inc=name,email`
  );

  return results;
}
