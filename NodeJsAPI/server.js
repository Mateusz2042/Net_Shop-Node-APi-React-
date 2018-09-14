var app = require('./app');
const cors = require('cors');
var port = process.env.PORT || 4000;

app.use(cors());

var server = app.listen(port, function() {
  console.log(`Server is running on port: ${port}`)
});
