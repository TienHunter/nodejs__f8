
class NewsController {
   // [GET] /new 
   index(req, res) {
      return res.render('news')
   }

   // [GET] /new/:slug 
   show(req, res) {
      res.send('News detail')
   }

}
module.exports = new NewsController;