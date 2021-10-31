const connection = require('../../config/db/index');
class SiteController {
   // [GET] /
   async index(req, res) {

      const [rows, fields] = await connection.execute('SELECT * FROM users');
      res.render('home', { dataCourse: rows })

   }

   async detailUser(req, res) {
      let userId = req.params.id
      let [user] = await connection.execute(`SELECT * FROM users where id = ${userId}`);
      res.send(JSON.stringify(user))
   }
   async createNewUser(req, res) {
      let { firstName, lastName, email } = req.body;

      await connection.execute(`INSERT INTO users(firstName, lastName, email) VALUES (?,?,?)`,
         [firstName, lastName, email]);

      res.redirect('/')
   }
   async deleteUser(req, res) {
      let userId = req.params.id;
      await connection.execute(`delete from users where id = ${userId}`)
      res.redirect('/')
   }
   async editUser(req, res) {
      let userId = await req.params.id;
      let [user] = await connection.execute(`SELECT * FROM users where id = ${userId}`);
      res.render('update', { dataUser: user[0] });

   }

   async updateUser(req, res) {
      let { firstName, lastName, email, id } = req.body;
      await connection.execute(`update users set firstName=?, lastName=?, email=? where id=?`, [firstName, lastName, email, id])
      res.redirect('/');
   }

   // [GET] /search
   search(req, res) {
      res.render('search')
   }

}
module.exports = new SiteController;