exports.redirectToFrontend = (req, res) => {
    try {
        //console.log('INDEX CONTROLLER')
        res.sendFile(process.env.INDEX)
    } catch(error) {
        throw error;
    }
}