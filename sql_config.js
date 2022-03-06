"use strict";

const config = {
    user: "SA",
    password: "Passw0rd2020",
    database: "student_record",
    server: 'localhost',
    port: 2433,
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

module.exports = config