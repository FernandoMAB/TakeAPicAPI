const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT =  process.env.PORT || 3350;

const app = express();

app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'takeapic.mysql.database.azure.com',
    user:'sebas@takeapic',
    password:'takeapicXD123',
    database: 'takeapic',
    port: 3306
});

app.get("/", async (req, res) => {
  try {
    
    res.send('API de TakeAPIC')
    
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/likes/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const sql = `SELECT * FROM likes WHERE id = ${id}`;

      connection.query(sql,(error, results) =>{
          if(error) throw error;
        
          res.json(results);
      })
      
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/likes", async (req, res) => {
    try {
  
      const sql = 'SELECT * FROM likes';

        connection.query(sql,(error, results) =>{
            if(error) throw error;
            
            res.json(results); 
            
        })

    } catch (err) {
      console.error(err.message);
    }
  });

  app.post("/likes", async (req, res) => {
    try {
        const sql = `INSERT INTO likes SET ?`;

        const customerObj = {
            user_id: req.body.user_id,
            image_id: req.body.image_id,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at
        }

        connection.query(sql, customerObj, error => {
            if(error) throw error;
            res.send('Like created!')
        })
      
    } catch (err) {
      console.error(err.message);
    }
  });

  app.delete("/likes/:id", async (req, res) => {
    try {

        const {id} = req.params;

        const sql = `DELETE FROM likes WHERE id = ${id}`;

        connection.query(sql, error => {
            if(error) throw error;
            res.send('Delete like')
        })
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/images", async (req, res) => {
    try {
  
      const sql = 'SELECT * FROM images';

        connection.query(sql,(error, results) =>{
            if(error) throw error;
            res.json(results); 
        })

    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/images/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const sql = `SELECT * FROM images WHERE id = ${id}`;

      connection.query(sql,(error, results) =>{
          if(error) throw error;
        
          res.json(results);
      })
      
    } catch (err) {
      console.error(err.message);
    }
  });

  app.post("/images", async (req, res) => {
    try {
        const sql = `INSERT INTO images SET ?`;

        const customerObj = {
            user_id: req.body.user_id,
            category_id: req.body.category_id,
            image_path: req.body.image_path,
            description: req.body.description
        }

        connection.query(sql, customerObj, error => {
            if(error) throw error;
            res.send('Image created!')
        })
      
    } catch (err) {
      console.error(err.message);
    }
  });


  app.put("/up-images/:id", async (req, res) => {
    try {

        const {id} = req.params;

        const customerObj = {
            category_id: req.body.category_id,
            image_path: req.body.image_path,
            description: req.body.description
        }

        const sql = `UPDATE images SET category_id = '${customerObj.category_id}',
        image_path = '${customerObj.image_path}', description = '${customerObj.description}'
        WHERE id = ${id}`;

        connection.query(sql, error => {
            if(error) throw error;
            res.send('Image updated!')
        })
    } catch (err) {
      console.error(err.message);
    }
  });

  app.delete("/images/:id", async (req, res) => {
    try {

        const {id} = req.params;

        const sql = `DELETE FROM images WHERE id = ${id}`;

        connection.query(sql, error => {
            if(error) throw error;
            res.send('Delete images')
        })
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/users", async (req, res) => {
    try {
  
      const sql = 'SELECT * FROM users';

        connection.query(sql,(error, results) =>{
            if(error) throw error;
            
            res.json(results);
            
        })

    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/categories", async (req, res) => {
    try {
  
      const sql = 'SELECT * FROM categories';

        connection.query(sql,(error, results) =>{
            if(error) throw error;
            
            res.json(results);
            
        })

    } catch (err) {
      console.error(err.message);
    }
  });

connection.connect(error =>{
    if(error){
        throw error;
    }
    console.log('Database server running!!!!');
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));