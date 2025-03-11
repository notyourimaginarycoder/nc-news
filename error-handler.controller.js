exports.notFoundError = (request, response) => {
    response.status(404).send({msg: 'not found'})
}

exports.psqlError = (error, request, response, next) => {
    if (error.code === '22P02') {
        response.status(400).send({msg: 'invalid request to server'})
    } else {
        next(error)
    }
}

exports.customError = (error, request, response, next) => {
    if (error.status) {
        response.status(error.status).send({msg: error.msg})
    } else {
        next(error)
    }
}

exports.serverError = (error, request, response, next) => {
    response.status(500).send({msg: 'internal server error'})
}