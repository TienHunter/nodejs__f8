const connection = require('../../config/db/index');
class APIController {
   // [GET] /
   async getAllUsers(req, res) {
      const [rows, fields] = await connection.execute('SELECT * FROM users');

      return res.status(200).json({
         message: 'oke',
         data: rows
      })
   }
   // [POST] /
   async createUser(req, res) {
      let { firstName, lastName, email } = req.body;

      if (!firstName || !lastName || !email) {
         return res.status(200).json({
            message: 'missing parammeters',
         })
      }
      await connection.execute(`INSERT INTO users(firstName, lastName, email) VALUES (?,?,?)`,
         [firstName, lastName, email]);
      return res.status(200).json({
         message: 'oke create',
      })
   }
   // [PUT] /
   async updateUser(req, res) {
      let { firstName, lastName, email, id } = req.body;
      if (!firstName || !lastName || !email || !id) {
         return res.status(200).json({
            message: 'missing parammeters',
         })
      }
      await connection.execute(`update users set firstName=?, lastName=?, email=? where id=?`,
         [firstName, lastName, email, id])
      return res.status(200).json({
         message: 'oke update',
      })
   }
   // [DELETE] /
   async deleteUser(req, res) {
      let userId = req.params.id;
      if (!userId) {
         return res.status(200).json({
            message: 'missing parammeters',
         })
      }
      await connection.execute(`delete from users where id = ${userId}`)
      return res.status(200).json({
         message: 'oke delete',
      })
   }

}
module.exports = new APIController;