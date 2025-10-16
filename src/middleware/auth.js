const adminAuth = (req, res, next) => {
    console.log("Admin authorized is getting checked !")
    const token = "abc"
    const isAuthorized = token === "abc"
    if(!isAuthorized){
        res.send("Unauthrized token")
    }else{
        next()
    }
}

module.exports = {
    adminAuth
}