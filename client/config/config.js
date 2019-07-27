// const env = process.env.NODE_ENV || "development";

const setCredentials = (route) => {
    const env = "development"

    switch (env) {
        case "development":
        {
            return "http://localhost:5000/" + route
        }
    }
}

module.exports = {
    SERVER_LOGS: setCredentials("logs"),
    SERVER_SQLMAP: setCredentials("sqlmap")
}