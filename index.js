const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/',require('./routes'));

app.listen(port,function(err)
{
    if(err)
    {  //interpolation is done in console.log
       console.log(`Error in running the server: ${err}`); 
    }   

    console.log(`Server running on port : ${port}`);
        
});