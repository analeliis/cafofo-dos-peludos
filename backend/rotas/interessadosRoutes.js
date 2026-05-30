const express = require('express');

const router = express.Router();

// Rota inicial da área de interessados.
// A lógica completa do CRUD será desenvolvida depois.
router.get('/', (req, res) => {
  res.json({
    mensagem: 'Rota de Interessados funcionando!'
  });
});

module.exports = router;