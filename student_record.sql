-- use master
-- GO

-- alter DATABASE student_record set single_user with rollback IMMEDIATE;
-- GO

-- drop DATABASE student_record
-- go

Create database student_record;
GO

USE student_record
go

CREATE TABLE student
(id int NOT NULL IDENTITY PRIMARY KEY ,
first_name Varchar(30) ,
middle_name Varchar(30),
last_name Varchar(30) ,
date_of_birth Date,
gender char NOT NULL,
date_created DATETIME NOT NULL,
date_modified DATETIME NOT NULL,
is_deleted BIT
);
GO


CREATE TABLE course
(id int NOT NULL IDENTITY PRIMARY KEY,
course_name Varchar(30) ,
course_number int ,
modality BIT,
date_start DATE NOT NULL,
date_created DATETIME NOT NULL,
date_modified DATETIME NOT NULL,
is_deleted BIT
);
GO

CREATE TABLE grade
(id int NOT NULL IDENTITY PRIMARY KEY,
grader_percentage_from int ,
grader_percentage_to int ,
grade_letter CHAR(2),
date_created DATETIME NOT NULL,
date_modified DATETIME NOT NULL,
is_deleted BIT
);
GO

CREATE TABLE student_grade
(id int NOT NULL IDENTITY PRIMARY KEY,
student_id int REFERENCES student(id),
course_id int REFERENCES course(id),
grade_id int REFERENCES grade(id),
date_created DATETIME NOT NULL,
date_modified DATETIME NOT NULL,
is_deleted BIT
);
GO


INSERT INTO student(
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    gender,
    date_created,
    date_modified,
    is_deleted
) 
values
('meet', 'a', 'sanghvi', PARSE('03/13/1998' as date using 'en'), 'm', GETDATE(), GETDATE(), 0),
('neeraj', '', 'patel', PARSE('05/12/1998' as date using 'en'), 'm', GETDATE(), GETDATE(), 0),
('vyshnavi', '', 'acharya', PARSE('01/13/1998' as date using 'en'), 'f', GETDATE(), GETDATE(), 0),
('saaransh', '', 'rana', PARSE('02/27/1998' as date using 'en'), 'm', GETDATE(), GETDATE(), 0),
('darshin', '', 'shah', PARSE('03/30/1998' as date using 'en'), 'm', GETDATE(), GETDATE(), 0),
('neel', '', 'nishant', PARSE('04/20/1998' as date using 'en'), 'm', GETDATE(), GETDATE(), 0),
('palak', '', 'Toshniwal Jaiswal', PARSE('05/20/1998' as date using 'en'), 'f', GETDATE(), GETDATE(), 0),
('priya', '', 'nayak', PARSE('06/26/1998' as date using 'en'), 'f', GETDATE(), GETDATE(), 0),
('jaya', '', 'chadha', PARSE('07/29/1998' as date using 'en'), 'f', GETDATE(), GETDATE(), 0),
('sanjana', '', 'balaji', PARSE('08/20/1998' as date using 'en'), 'f', GETDATE(), GETDATE(), 0)
GO

INSERT INTO course(
    course_name,
    course_number,
    modality,
    date_start,
    date_created,
    date_modified,
    is_deleted
)
values
('Middleware Programming', 598, '0', PARSE('01/10/2022' as date using 'en'), GETDATE(), GETDATE(), 0),
('Cloud Architecture', 498, '0', PARSE('01/10/2022' as date using 'en'), GETDATE(), GETDATE(), 0),
('Programming Paradigm', 502, '0', PARSE('01/10/2022' as date using 'en'), GETDATE(), GETDATE(), 0),
('NLP', 598, '0', PARSE('01/10/2022' as date using 'en'), GETDATE(), GETDATE(), 0),
('System Design', 510, '0', PARSE('01/10/2022' as date using 'en'), GETDATE(), GETDATE(), 0)
GO

INSERT INTO grade(
grader_percentage_from, grader_percentage_to, grade_letter, date_created, date_modified, is_deleted
)
values
(98, 100, 'A+', GETDATE(), GETDATE(), 0),
(93, 98, 'A', GETDATE(), GETDATE(), 0),
(90, 93, 'A-', GETDATE(), GETDATE(), 0),
(88, 90, 'B+', GETDATE(), GETDATE(), 0),
(83, 88, 'B', GETDATE(), GETDATE(), 0),
(80, 83, 'B-', GETDATE(), GETDATE(), 0),
(78, 80, 'C+', GETDATE(), GETDATE(), 0),
(70, 78, 'C', GETDATE(), GETDATE(), 0),
(60, 70, 'D', GETDATE(), GETDATE(), 0),
(50, 60, 'E', GETDATE(), GETDATE(), 0),
(00, 50, 'F', GETDATE(), GETDATE(), 0)
GO

INSERT INTO student_grade(
student_id, course_id, grade_id, date_created, date_modified, is_deleted
)
values
(1, 1, 1, GETDATE(), GETDATE(), 0),
(1, 2, 1,  GETDATE(), GETDATE(), 0),
(2, 3, 2, GETDATE(), GETDATE(), 0),
(3, 4, 3, GETDATE(), GETDATE(), 0),
(4, 5, 2, GETDATE(), GETDATE(), 0),
(5, 1, 1, GETDATE(), GETDATE(), 0),
(6, 2, 1, GETDATE(), GETDATE(), 0),
(7, 3, 4, GETDATE(), GETDATE(), 0),
(8, 4, 2, GETDATE(), GETDATE(), 0),
(9, 5, 3, GETDATE(), GETDATE(), 0),
(10, 1, 3, GETDATE(), GETDATE(), 0)
GO