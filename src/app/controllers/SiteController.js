const connection = require('../../config/db/index');
const formidable = require("formidable");
const path = require('path');
const appRoot = require('app-root-path')
const uploadFolder = path.join(appRoot.path, "src", "public", "files");
const fs = require('fs');

class SiteController {
   // [GET] /
   async index(req, res) {

      const [rows, fields] = await connection.execute('SELECT * FROM users');
      return res.render('home', { dataCourse: rows })

   }

   async detailUser(req, res) {
      let userId = req.params.id
      let [user] = await connection.execute(`SELECT * FROM users where id = ${userId}`);
      return res.send(JSON.stringify(user))
   }
   async createNewUser(req, res) {
      let { firstName, lastName, email } = req.body;

      await connection.execute(`INSERT INTO users(firstName, lastName, email) VALUES (?,?,?)`,
         [firstName, lastName, email]);

      return res.redirect('/')
   }
   async deleteUser(req, res) {
      let userId = req.params.id;
      await connection.execute(`delete from users where id = ${userId}`)
      return res.redirect('/')
   }
   async editUser(req, res) {
      let userId = await req.params.id;
      let [user] = await connection.execute(`SELECT * FROM users where id = ${userId}`);
      return res.render('update', { dataUser: user[0] });

   }

   async updateUser(req, res) {
      let { firstName, lastName, email, id } = req.body;
      await connection.execute(`update users set firstName=?, lastName=?, email=? where id=?`, [firstName, lastName, email, id])
      return res.redirect('/');
   }
   async getUploadFile(req, res) {
      return res.render('uploadFile');
   }
   async hanldeUploadFile(req, res) {

      const form = new formidable.IncomingForm();
      // Basic Configuration
      form.multiples = true;
      form.maxFileSize = 50 * 1024 * 1024; // 5MB
      form.uploadDir = uploadFolder;
      // console.log(uploadFolder);
      // console.log(form);
      // Parsing
      form.parse(req, async (err, fields, files) => {
         // console.log('files:', fields);
         // console.log("files: ", files);
         if (err) {
            console.log("Error parsing the files");
            return res.status(400).json({
               status: "Fail",
               message: "There was an error parsing the files",
               error: err,
            });
         }
         // Check if multiple files or a single file
         if (!files.myFile.length) {
            //Single file

            const file = files.myFile;
            // console.log(file);

            // checks if the file is valid
            const isValid = (file) => {
               const type = file.type.split("/").pop();
               const validTypes = ["jpg", "jpeg", "png", "pdf"];
               if (validTypes.indexOf(type) === -1) {
                  return false;
               }
               return true;
            };

            // creates a valid name by removing spaces
            const fileName = encodeURIComponent(file.originalFilename.replace(/\s/g, "-"));

            if (!isValid) {
               // throes error if file isn't valid
               return res.status(400).json({
                  status: "Fail",
                  message: "The file type is not a valid type",
               });
            }
            try {
               // renames the file in the directory
               // console.log("file.path : ", file.filepath);
               fs.renameSync(file.filepath, path.join(uploadFolder, Date.now().toString() + fileName));
            } catch (error) {
               console.log(error);
            }

            // now don't need to stores the fileName in database
            // try {
            //    // stores the fileName in the database
            //    const newFile = await File.create({
            //       name: `files/${fileName}`,
            //    });
            //    return res.status(200).json({
            //       status: "success",
            //       message: "File created successfully!!",
            //    });
            // } catch (error) {
            //    console.log(error);
            // }
         } else {
            // Multiple files
         }

      });

      return res.send('handle uploadFile')
   }
   // [GET] /search
   search(req, res) {
      return res.render('search');
   }

}
module.exports = new SiteController;