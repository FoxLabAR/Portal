export function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // O tu dominio específico
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    next();
  }
  