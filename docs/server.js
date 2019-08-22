let express = require('express');
let opn = require('opn')
const path = require('path');
app = express();
// DEFINE DIRECTORY
// ROOT = __dirname+'/<folder>' (__dirname+'/public')
console.log(__dirname)
app.use(express.static(__dirname));
path.resolve('./', './docs/')
// app.use(express.static('./index.html'))

const port = 3000;
app.listen(port);
const url = `http://localhost:${port}`;
console.log(`Server running on ${url}`);
// console.log('app will start in 3 seconds...');


// if (keys.length){
// 	url += '?';
// 	for (let j = 0; j < keys.length; j++){
// 		url += keys[j] + '=' + vals[j];
// 		if ((keys.length - 1) !== j){
// 			url += '&';
// 		}
// 	}
// }

console.log('attempting to launch app in chrome: ' + url);
opn(url, {app: 'chrome'})
.then(()=>{
  console.log('opened app in chrome');
})
.catch((err)=>{
  console.log('error opening on chrome, attempting on firefox');
  opn(url, {app: 'firefox'})
    .then(()=>{
      console.log('opened app in firefox');
    })
    .catch((err)=>{
      console.log('error opening in firefox, attempting default browser');
      opn(url); // default browser
    });
});
