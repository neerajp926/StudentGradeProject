const dbConn = require("./sql_config")
const sql = require("mssql")

const required = name => {
    throw new Error(`Parameter ${name} is required`);
};

async function getStudents(){
    let dbc = await sql.connect(dbConn)
    let query = await dbc.request().query("select id, first_name, middle_name, last_name, date_of_birth, gender from student where is_deleted=0")
    console.info('fetch successful')
    dbc.close()
    return query.recordset
}

async function getStudentById(student_id = required('student_id')){
    let dbc = await sql.connect(dbConn)
    let query = await dbc.request().query(`SELECT id, first_name, middle_name, last_name, date_of_birth, gender from student WHERE id=${student_id} and is_deleted=0`)
    return query.recordset
}

async function deleteStudentById(student_id = required("student_id")){
    sql.connect(dbConn)
    .then(
        sql => {
            sql
            .request()
            .query(`UPDATE STUDENT SET is_deleted = 1 where id=${student_id}`) // `Delete from student where id=${student_id}`
            .then(
                resp => {
                    // query successful
                    console.info(`${resp.rowsAffected} rows deleted`)

                }
            )
            .catch(
                err => console.error("Query not execute \n" + err)
            )
        }
    )
    .catch(
        err => {
            console.error('Connection NOT Established \n' + err)
        }
    )
}

//insertStudent
async function insertStudent(...params){
    sql.connect(dbConn)
    .then(
        sql => {
            sql
            .request()
            .query(`Insert into student ([first_name]
                ,[middle_name]
                ,[last_name]
                ,[date_of_birth]
                ,[gender], [date_created]
                ,[date_modified]
                ,[is_deleted]) values ('${params[0]}','${params[1]}','${params[2]}',
                 PARSE('${params[3]}' as date using 'en'),'${params[4]}',GETDATE(), GETDATE(), 0)`)
            .then(
                resp => {
                    // query successful
                    console.info(`${resp.rowsAffected} rows inserted`)

                }
            )
            .catch(
                err => console.error("Query not execute \n" + err)
            )
        }
    )
    .catch(
        err => {
            console.error('Connection NOT Established \n' + err)
        }
    )
}

async function updateStudentById(...params){
    sql.connect(dbConn)
    .then(
        sql => {
            sql
            .request()
            .query(`UPDATE STUDENT SET [first_name] = '${params[1]}',[middle_name] = '${params[2]}'
            ,[last_name] = '${params[3]}'
            ,[date_of_birth] = PARSE('${params[4]}' as date using 'en')
            ,[gender] = '${params[5]}' where [id] = ${params[0]}`)
            .then(
                resp => {
                    // query successful
                    console.info(`${resp.rowsAffected} rows updated`)

                }
            )
            .catch(
                err => console.error("Query not executed \n" + err)
            )
        }
    )
    .catch(
        err => {
            console.error('Connection NOT Established \n' + err)
        }
    )
}

module.exports = {
    getStudents: getStudents,
    getStudentById: getStudentById,
    deleteStudentById: deleteStudentById,
    insertStudent: insertStudent,
    updateStudentById: updateStudentById
}

/**
 * Tables -> student, grade, course, student grade
 * 
 * app.get(/student)
 * app.put() 
 * app.delete 
 * app.put(update)
 * 
 * SELECT 
 * Student 
 * getStudents --> all students
 * getStudentById --> from id
 * getStudentsByName --> from first / middle / last name search
 * 
 * course
 * getCourse --> all courses
 * getCourseById --> by course id
 * getCourseByName --> from name search
 * 
 * grade
 * getGrade --> all grades
 * getGradeById --> from id
 * getGradeByName --> from grade letter
 * 
 * student report
 * getStudentReportById --> generate report for a student by id
 * 
 * INSERT --> one row at a time simple insert query
 * Student 
 * insertStudent (values)
 * 
 * course
 * insertCourse (values)
 * 
 * grade
 * insertGrade (values) 
 * 
 * student report
 * insertStudentCourseGrade (sid,cid, gid)
 * 
 * UPDATE -- one row at a time
 * student
 * updateStudentById () update table set new values where columnId = queryId
 * grade
 * course
 * student grade
 * 
 * 
 * // student
 * // read students    all , by id
 * // delete students  all,  by id
 * // insert students  by 1 row
 * // update students  by 1 row
 * 
 */

