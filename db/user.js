class User {
  static client = null;

  static async bulkCreate(users) {
    const usersValuesString = users
      .map(
        ({ name, email }) =>
          `('${name.first}', '${name.last}', ${email ? `'${email}'` : 'NULL'})`
      )
      .join(',');

    return await User.client.query(
      `INSERT INTO users ("firstName", "lastName", "email") VALUES ${usersValuesString};`
    );
  }

  static async count() {
    const {
      rows: [{ count }],
    } = await User.client.query('SELECT count(*) FROM users;');
    return Number(count);
  }
}

module.exports = User;
