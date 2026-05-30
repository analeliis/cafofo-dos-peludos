const express = require('express');

const router = express.Router();

// Rota inicial da área de relatório.
// A consulta JOIN será desenvolvida depois.
router.get('/', (req, res) => {
  res.json({
    mensagem: 'Rota de Relatório funcionando!'
  });
});

module.exports = router;