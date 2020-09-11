if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: "mongodb+srv://admin:admin@cluster0.yahed.mongodb.net/BO_DB?retryWrites=true&w=majority",
        secret: 'boosteropener'
    };
} else {
    module.exports = {
        mongoURI: "mongodb+srv://admin:admin@cluster0.yahed.mongodb.net/BO_DB?retryWrites=true&w=majority",
        secret: 'boosteropener'
    };
}