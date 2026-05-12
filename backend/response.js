const response = (statusCode, message, data, res) => {
    res.status(statusCode).json({
        status: statusCode >= 400 ? 'Error' : 'Success',
        message: message,
        data: data,
    });
}

module.exports = response;
