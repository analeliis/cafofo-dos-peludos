
const express = require('express');

const router = express.Router();

// Rota inicial da área de pedidos de adoção.
// A lógica completa do CRUD será desenvolvida depois.
router.get('/', (req, res) => {
  res.json({
    mensagem: 'Rota de Pedidos de Adoção funcionando!'
  });
});

module.exports = router;