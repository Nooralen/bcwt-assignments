'use strict';
const pool = require('../database/db');
const cats = [
  {
    id: '1',
    name: 'Frank',
    birthdate: '2010-10-30',
    weight: '5',
    owner: '1',
    filename: 'http://placekitten.com/400/300',
  },
  {
    id: '2',
    name: 'James',
    birthdate: '2015-12-25',
    weight: '11',
    owner: '2',
    filename: 'http://placekitten.com/400/302',
  },
];
const getAllCats = async () => {
  try {
    const [cats] = await pool.query(`
      SELECT c.cat_id, c.name,c.weight,c.filename, c.birthdate,c.owner, u.name AS ownername
      FROM wop_cat AS c
      LEFT JOIN wop_user AS u
      ON c.owner = u.user_id
    `);
    return cats;
  } catch (e) {
    console.error("error", e.message);
  }
};

const getCat = async (id) => {
  try {
    const [cat] = await pool.query('SELECT * FROM wop_cat WHERE cat_id = ?', [id])
    return cat;
  } catch (e) {
      console.error("error", e.message);
      return null;
  }
};


const addCat = async(cat) => {
  try {
    const [result] = await pool.query('INSERT into wop_cat (name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)', [
      cat.body.name,
      cat.body.weight,
      cat.body.owner,
      cat.file.filename,
      cat.body.birthdate
    ]);
    return result
  }catch (e) {
    console.error("error", e.message)
    return;
  }
};
const updateCat = async(cat) => {
  try {
    const [result] = await pool.query('UPDATE wop_cat SET name=?, weight=?, owner=?, birthdate=? WHERE cat_id=?', [
      cat.name,
      cat.weight,
      cat.owner,
      cat.birthdate,
      cat.id
    ]);
    return result
  }catch (e) {
    console.error("error", e.message)
    return;
  }
}
const deleteCat = async(id) => {
  try {
    const [result] = await pool.query('DELETE FROM wop_cat WHERE cat_id=?', [ id ]);
    console.log(`Cat ${getCat(id).name} deleted!`);
    return result
  } catch (e) {
    console.error("error", e.message)
    return;
  }
}
module.exports = {
  cats, getCat, getAllCats, addCat, updateCat, deleteCat
};