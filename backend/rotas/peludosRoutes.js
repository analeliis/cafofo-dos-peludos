const express = require('express');

const router = express.Router();

// Rota inicial da área de peludos.
// A lógica completa do CRUD será desenvolvida depois.
router.get('/', (req, res) => {
  res.json({
    mensagem: 'Rota de Peludos funcionando!'
  });
});

module.exports = router;