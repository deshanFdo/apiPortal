const cryptoService = require('../services/crypto.service');

class CryptoController {
    /**
     * Handle request for all supported crypto prices
     */
    async getAllCrypto(req, res, next) {
        try {
            const data = await cryptoService.getAllCrypto();
            res.json({
                success: true,
                count: data.length,
                data: data
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CryptoController();
