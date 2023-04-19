'use strict';
const pool = require('../database/db');
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];

const getAllUsers = async () => {
  try {
    const [users] = await pool.query(`SELECT user_id, name, email, role FROM wop_user`);
    return users;
  } catch (e) {
    console.error("error", e.message);
  }
};

const getUser = async(id) => {
  try {
    const [user] = await pool.query('SELECT user_id, name, email, role FROM wop_user WHERE user_id = ?', [id])
    return user
  }catch (e) {
      console.error("error", e.message);
      return;
    }
  };
  const addUser = async(user) => {
    console.log(user);
    try {
      const [result] = await pool.query('INSERT INTO wop_user (name, email, password, role) VALUES (?, ?, ?, ?)', [
        user.name,
        user.email,
        user.passwd,
        user.role,
      ]);
      return result;
    } catch (e) {
      console.error("error", e.message);
      return;
    }
};
const getUserLogin = async (params) => {
  try {
    //console.log('getUserLogin params:', params);
    const [rows] = await pool.execute(
      'SELECT * FROM wop_user WHERE email = ?;',
      [params]);
    //console.log('getUserLogin rows:', rows);
    return rows;
  } catch (e) {
    console.log('getUserLogin error:', e.message);
  }
};

module.exports = {
  users,getUser, getAllUsers, addUser, getUserLogin
};