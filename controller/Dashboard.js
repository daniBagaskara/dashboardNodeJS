class Dashboard {
    index(req, res) {
           const baseUrl = req.app.get('baseUrl');
           const data = {
               title: 'Dashboard - eSPP',
               baseUrl: baseUrl,
               layout: '../views/layout/main-layout',
               error: null,
           };
           res.render('Dashboard', data);
       }
}
   
const object = new Dashboard();
module.exports = object;