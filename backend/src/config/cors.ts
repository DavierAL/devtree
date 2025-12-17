import { CorsOptions } from 'cors'

// lee la variable (puedes poner varias separadas por coma si quieres)
const FRONTEND = process.env.FRONTEND_URL // ejemplo: http://localhost:5173

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true)
    }

    // Normalizar URLs (quitar slash final si existe)
    const normalizeUrl = (url: string) => url ? url.replace(/\/$/, '') : ''

    const formattedFrontendUrl = normalizeUrl(FRONTEND ?? '')
    const requestOrigin = normalizeUrl(origin)

    // Lista blanca permitida
    const whiteList = [
      formattedFrontendUrl,
      formattedFrontendUrl.replace('localhost', '127.0.0.1'),
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000'
    ].filter(Boolean)

    if (whiteList.includes(requestOrigin)) {
      callback(null, true)
    } else {
      callback(new Error(`Error de CORS: origen no permitido - ${origin}. Esperaba: ${formattedFrontendUrl || 'variable FRONTEND_URL no definida'}`))
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
