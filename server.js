const express = require('express');
const bodyParser=require('body-parser')
// const pgp=require('pg-promise')
// const helmet=require('helmet')
const xmlparser=require('express-xml-bodyparser')
const xml=require('xml2js')
const pool = require("./db");
const cors = require('cors');


// pool.query("Select * from interactions where id=1",(err,res)=>{
//   if(!err){
//     console.log(res.rows);
//   }else{
//     console.log(err.message);
//   }
// })

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(helmet());
app.disable('x-powered-by');
app.set('port', port);

// XML Parser configurations, https://github.com/Leonidas-from-XIV/node-xml2js#options
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

  if (request.headers['content-type'] === 'text/xml'
    || request.headers['accept'] === 'text/xml'
  ) {
    request.app.isXml = true;
  }

  next();
};

const buildResponse = (response, statusCode, data, preTag) => {
  response.format({
    'text/xml': () => {
      response.status(statusCode).send(builder.buildObject({ [preTag]: data }));
    },
    'default': () => {
      // log the request and respond with 406
      response.status(406).send('Not Acceptable');
    }
  });
};

app.post("/kayan", bustHeaders, xmlparser(xmlOptions), async (request, response) => {
  const { drug, disease, type } = (request.body['Request'] || request.body);
  console.log(drug);
  if (request.app.isXml) {
    response.setHeader('Content-Type', 'application/xml');
  }
  await pool.query(
    "SELECT * FROM interactions WHERE drug= $1 and disease=$2 and type=$3",[drug,disease,type],(err,res)=>{
      if(!err){
        return buildResponse(response, 200, res.rows, 'Response');
      }else{
        return buildResponse(response, 500, { message: 'INTERNAL SERVER ERROR' })
      }
    }
  );
});
app.get("/kayan/:drug/:disease/:type", async (request, response) => {
  const { drug, disease, type }=request.params
  if (request.app.isXml) {
    response.setHeader('Content-Type', 'application/xml');
  }
  await pool.query(
    "SELECT * FROM interactions WHERE drug= $1 and disease=$2 and type=$3",[drug,disease,type],(err,res)=>{
      if(!err){
        return buildResponse(response, 200, res.rows, 'Response');
      }else{
        return buildResponse(response, 500, { message: 'INTERNAL SERVER ERROR' })
      }
    }
  );
});
// app.post('/kayans', bustHeaders, xmlparser(xmlOptions), async  (request, response) => {
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
