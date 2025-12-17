import { Request, Response } from 'express'
import User from "../models/User"

/**
 * Obtiene el perfil público de un usuario por su handle
 */
export const getPublicProfile = async (req: Request, res: Response) => {
    try {
        const { handle } = req.params

        const user = await User.findOne({ handle: handle.toLowerCase() })

        if (!user) {
            const error = new Error('Perfil no encontrado')
            return res.status(404).json({ error: error.message })
        }

        // Retornar solo información pública del usuario
        res.json({
            handle: user.handle,
            name: user.name,
            description: user.description,
            image: user.image,
            links: user.links,
            visits: user.visits
        })
    } catch (e: any) {
        console.error(e)
        return res.status(500).json({ error: e.message || 'Error obteniendo perfil' })
    }
}
