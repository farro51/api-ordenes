var axios = require('axios');
var express = require('express');
var router = express.Router();

const ordenes = [];

/* GET orders listing. */
router.get('/', (req, res, next) => {
  res.send(ordenes);
});

router.post('/', (req, res, next) => {
  const orden = req.body;

  axios.post(`http://localhost:3002/reglas/validarOrden`, orden)
      .then(result => {
        if(result.status === 210) {
          res.statusMessage = 'Orden no creada';
          res.status(210)
            .send(result.data);
        } else {
          orden.id = ordenes.length + 1;
          ordenes.push(orden); 
          res.send(orden);
        }
      }).catch((err) => {
        console.log(err);
        res.status(500).send(err.response.statusText);
      });
});

module.exports = router;
