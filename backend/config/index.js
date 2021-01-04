if (process.env.ENVIRONMENT === 'production') { 

} else {
    require('dotenv').config()
}

const config = {
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PW: process.env.DB_PW,
    DB_PORT: process.env.DB_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_DB: process.env.REDIS_DB,
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    PROJECT_ID: process.env.PROJECT_ID,
    GCP_STORAGE_NAME: process.env.GCP_STORAGE_NAME
}
module.exports = config