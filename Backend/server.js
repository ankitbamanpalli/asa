import express from 'express';
import { createPool } from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

const conn=createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "try"
});


app.post('/entriess',(request,response)=>{
    var insertQry=`INSERT INTO entries VALUES(?,?,?);`
    const Username=request.body.USERNAME;
    const Name=request.body.NAME;
    const Password = request.body.PASSWORD;
    
    conn.query(insertQry,[Username,Name,Password],(error,result)=>{
        if (error) {
            response.status(500).send({message:'Error in inserting entries'});
        }
        else{
            response.status(200).send({message:'entries registered successfully'});
        }
    });
});

app.get('/entriess/log',(request,response)=>{
    var selectQry="SELECT * FROM entries";
    conn.query(selectQry,(error,result)=>{
        if (error) {
            response.status(500).send({message:'Error in fetching entriess'});
        } else {
            response.status(200).send(result);
        }
    })
});

// app.get('/students/:id',(request,response)=>{
//     var selectQry="SELECT * FROM entries WHERE id="+request.params.id;
//     conn.query(selectQry,(error,result)=>{
//         if (error) {
//             response.status(500).send({message:'Error in fetching entriess'});
//         } else {
//             response.status(200).send(result);
//         }
//     })
// });

app.delete('/students/:id',(request,response)=>{
    var deleteQry="DELETE FROM entries WHERE id="+request.params.id;
    conn.query(deleteQry,(error,result)=>{
        if (error) {
            response.status(500).send({message:'Error in deleting entriess'});
        } else {
            response.status(200).send({message:'Successfully deleted entriess'});
        }
    })
});

app.get('/students/name/:pattern',(request,response)=>{
    var fetchQry=`SELECT * FROM entries WHERE name like '${request.params.pattern}%'`;
    conn.query(fetchQry,(error,result)=>{
        if (error) {
            response.status(500).send({message:'Error in fetching entriess'});
        } else {
            response.status(200).send(result);
        }
    });
});

app.listen(9800,()=>{
    console.log('listening on 9800');
});