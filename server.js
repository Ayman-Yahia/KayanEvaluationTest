const express = require('express');
const bodyParser=require('body-parser')
const pgp=require('pg-promise')
const promise=require('bluebird')
const helmet=require('helmet')
const xmlparser=require('express-xml-bodyparser')
const xml=require('xml2js')
const pool = require("./db");


pool.query("Select * from interactions",(err,res)=>{
  if(!err){
    console.log(res.rows);
  }else{
    console.log(err.message);
  }
})

const port = process.env.PORT || 8000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.disable('x-powered-by');
app.set('port', port);

const xmlOptions = {
  charkey: 'value',
  trim: false,
  explicitRoot: false,
  explicitArray: false,
  normalizeTags: false,
  mergeAttrs: true,
};

// XML Builder configuration, https://github.com/Leonidas-from-XIV/node-xml2js#options-for-the-builder-class.
const builder = new xml.Builder({
  renderOpts: { 'pretty': false }
});

const bustHeaders = (request, response, next) => {
  request.app.isXml = false;

  if (request.headers['content-type'] === 'application/xml'
    || request.headers['accept'] === 'application/xml'
  ) {
    request.app.isXml = true;
  }

  next();
};

const buildResponse = (response, statusCode, data, preTag) => {
  response.format({
    'application/xml': () => {
      response.status(statusCode).send(builder.buildObject({ [preTag]: data }));
    },
    'default': () => {
      // log the request and respond with 406
      response.status(406).send('Not Acceptable');
    }
  });
};


app.get("/kayan", bustHeaders, xmlparser(xmlOptions), async (request, response) => {
  const { drug, disease, type } = (request.body['request'] || request.body);
  console.log(drug);
  if (request.app.isXml) {
    response.setHeader('Content-Type', 'application/xml');
  }
  await pool.query(
    "SELECT * FROM interactions WHERE drug= $1 and disease=$2 and type=$3",[drug,disease,type],(err,res)=>{
      if(!err){
        return buildResponse(response, 200, res.rows, 'response');
      }else{
        return buildResponse(response, 500, { message: 'INTERNAL SERVER ERROR' })
      }
    }
  );
});
// app.post('/kayan', bustHeaders, xmlparser(xmlOptions), async  (request, response) => {
//   const { drug,description, disease, type } = (request.body['request'] || request.body);
//       await pool.query(
//         `INSERT INTO interactions (drug,description,disease,type) values($1,$2,$3,$4 ) RETURNING drug `,[drug,description,disease,type],(err,res)=>{
//           if(!err){
//             return buildResponse(response, 200, res, 'response');
//           }else{
//             return buildResponse(response, 500, { message: 'INTERNAL SERVER ERROR' })
//           }
//         }
//       );
// });

// app.get('/kayan', bustHeaders, async (request, response) => {

//   if (request.app.isXml) {
//     response.setHeader('Content-Type', 'application/xml');
//   }
//     await pool.query(
//       "SELECT drug,description, disease, type FROM interactions",(err,res)=>{
//         if(!err){
//           return buildResponse(response, 200, res, 'response');
//         }else{
//           return buildResponse(response, 500, { message: 'INTERNAL SERVER ERROR' })
//         }
//       }
//     );
// });

app.listen(port);
console.log(`SERVER: started on port ${port}`);