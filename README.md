# KayanEvaluationTest
1-This project was done using node , react js with a PostgreSQL

the data base contain the following table 

Interactions: id, decription, drugCode, diseaseCode,  type.

Note:type field value could be 1 or 2

2-i built an API that  receive and respond xml transactions 

request e.g.:
<request>
<drug>abc133456</drug>
<disease>ffttaa567789</disease>
<type>2</tupe>
</request >

response eg:
<responses>
  with atag for each field in the retrieved record 
</response>

3-this service will parse the request and search in the table for the match and return the response per the up details.

4- has a user interface to fill in the request details then connect it to the API using the xml communications
