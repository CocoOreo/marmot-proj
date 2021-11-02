module.exports = (req, res, next) => {
    if(req.method === 'POST'){
        if(req.path === '/login' ||  req.path === '/register'){
            if(req.body.username === 'jack' && req.body.password === '123'){
                return res.status('200').json({
                    user:{
                        // jwt
                        token:'123',
                        username:'jack'
                    }
                })
            } else {
                return  res.status('400').json({
                    message:"Wrong username or password"
                })
            }
        }
    }
    next()
}