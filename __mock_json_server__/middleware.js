module.exports = (req, res, next) => {
    if(req.method === 'POST' && (req.path === '/login' ||  '/register')){
        if(req.body.username === 'jack' && req.body.password === '123'){
            return res.status('200').json({
                user:{
                    // jwt
                    token:'123',
                    username:'jack'
                }
            })
        }
    }
    next()
}