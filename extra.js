async function getTable(tableName){
    let columns = `*`
    switch (tableName) {
        case 'course':
            columns = `[id]
            ,[course_name]
            ,[course_number]
            ,[modality]
            ,[date_start]`
            break;
        case 'grade':
            columns = `[id]
            ,[grader_percentage_from]
            ,[grader_percentage_to]
            ,[grade_letter]`
            break;
        case 'student':
            columns = `[id]
            ,[first_name]
            ,[middle_name]
            ,[last_name]
            ,[date_of_birth]
            ,[gender]`
            break;
        case 'student_grade':
            columns = `[id]
            ,[student_id]
            ,[course_id]
            ,[grade_id]`
            break;
    
        default:
            return 'Table Name does not match' 
            break;
    }

    let db = await sql.connect(dbConn)
    let result = await db.request().query(
        `SELECT ${columns} FROM ${tableName}`
    )
    return result.recordsets



}

async function insertRecord(...params){
    let NewQuery = `Insert into dbo.${params[0]}`
    switch (params[0]) {
        case 'course':
            NewQuery = NewQuery + `([course_name]
            ,[course_number]
            ,[modality]
            ,[date_start]
            ,[date_created]
            ,[date_modified]
            ,[is_deleted]
            ) 
            values ( ${params[1]},${params[2]},${params[3]},PARSE('${params[4]}' as date using 'en'), GETDATE(), GETDATE(), 0);`
            break;
        case 'grade':
            NewQuery = NewQuery + `([grader_percentage_from]
            ,[grader_percentage_to]
            ,[grade_letter]
            ,[date_created]
            ,[date_modified]
            ,[is_deleted]) values ( ${params[1]},${params[2]},${params[3]}), GETDATE(), GETDATE(), 0);`
            break;
        case 'student':
            NewQuery = NewQuery + `([first_name]
            ,[middle_name]
            ,[last_name]
            ,[date_of_birth]
            ,[gender]
            ,[date_created]
            ,[date_modified]
            ,[is_deleted]) values ( ${params[1]}, '${params[2]}', '${params[3]}',PARSE('${params[4]}' as date using 'en'), '${params[5]}', GETDATE(), GETDATE(), 0);`
            break;
        case 'student_grade':
            NewQuery = NewQuery + `([student_id]
            ,[course_id]
            ,[grade_id]
            ,[date_created],
            ,[date_modified]
            ,[is_deleted]) values ( ${params[1]},${params[2]},${params[3]}), GETDATE(), GETDATE(), 0);`
            break;
        default:
            return 'Incorrect Parameters'
            break;
    }
    console.log(`inserting query ==> ${NewQuery}`)

    let db = await sql.connect(dbConn)
    let result = await db.request().query(NewQuery).then(
        res => {
            console.info(res)
        }
    ).catch(
        err => {
            console.error(`************\n${err}`)
            
        }
    )

}
async function updateRecord(...params){
    let NewQuery = `Update table dbo.${params[0]} Set `
    switch (param[0]) {
        case 'course':
            NewQuery = `[course_name] = ${params[1]}
            ,[course_number]= ${params[2]}
            ,[modality] = ${params[3]}
            ,[date_start] = ${params[4]} where course_number = ${param[5]}`
            break;
        case 'grade':
            NewQuery = `[grader_percentage_from] = ${params[1]}
            ,[grader_percentage_to] = ${params[2]}
            ,[grade_letter] = ${params[3]} where [id] = ${param[4]};`
            break;
        case 'student':
            NewQuery = `[first_name] = ${params[1]}
            ,[middle_name] = ${params[2]}
            ,[last_name] = ${params[3]}
            ,[date_of_birth] = ${params[4]}
            ,[gender] = ${params[5]} where [id] = ${params[5]};`
            break;
        case 'student_grade':
            NewQuery = `[student_id]=${params[1]}
            ,[course_id] = ${params[2]}
            ,[grade_id] = ${params[3]} where [student_id] = ${params[4]}; `
            break;
        default:
            return 'Incorrect Parameters'
            break;
    }
    let db = await sql.connect(dbConn)
    let result = await db.request().query(
        NewQuery
    )
    return result.recordsets
}
async function deleteRow(...params){
    let NewQuery = `Delete from dbo.${params[0]} `
    switch (params[0]) {
        case 'course':
            NewQuery = `where [course_name] = ${params[1]}`
            break;
        case 'grade':
            NewQuery = `where [id] = ${param[1]};`
            break;
        case 'student':
            NewQuery = `where [id] = ${params[1]};`
            break;
        case 'student_grade':
            NewQuery = `[id] = ${params[1]};`
            break;
        default:
            return 'Incorrect Parameters'
            break;
    }
    let db = await sql.connect(dbConn)
    let result = await db.request().query(
        NewQuery
    )
    return result.recordsets
}