drop database if exists syncora;
create database syncora;
use syncora;

create table Departments(
    dept_id int primary key auto_increment,
    dept_name varchar (20),
    created_timestamp datetime default CURRENT_TIMESTAMP
);

create table Employees(
    emp_id int primary key auto_increment,
    name varchar(20),
    email varchar(20) unique,
    password varchar(100),
    dept_no int,
    doj datetime,
    manager_id int references Employees(emp_id),
    project_id int,
    created_timestamp datetime default CURRENT_TIMESTAMP,
    foreign key(dept_no) references Departments(dept_id)
);

create table Projects(
    project_id int primary key auto_increment,
    emp_id int,
    pname varchar(50) unique,
    description varchar(1000),
    created_timestamp datetime default CURRENT_TIMESTAMP,
    actual_start_date datetime,
    actual_end_date datetime,
    start_date datetime,
    end_date datetime,
    project_status varchar(20),
    project_code varchar(20),
    foreign key(emp_id) references Employees(emp_id)
);

create table Sprints(
    sprint_id int primary key auto_increment,
    sname varchar(50) unique,
    description varchar(1000),
    actual_start_date datetime,
    actual_end_date datetime,
    start_date datetime,
    end_date datetime,
    status varchar(20),
    project_id int,
    created_timestamp datetime default CURRENT_TIMESTAMP,
    created_by int,
    foreign key(project_id) references Projects(project_id)
);

create table Stories(
    story_id int primary key auto_increment,
    title varchar(50),
    description varchar(1000),
    project_id int,
    sprint_id int,
    created_by int,
    created_timestamp datetime default CURRENT_TIMESTAMP,
    story_point char(3),
    actual_start_date datetime,
    actual_end_date datetime,
    start_date datetime,
    end_date datetime,
    foreign key(project_id) references Projects(project_id),
    foreign key(sprint_id) references Sprints(sprint_id)
);

create table Tasks(
    task_id int primary key auto_increment,
    title varchar(50),
    description varchar(1000),
    status varchar(20),
    priority char(5),
    assigned_to int,
    assigned_by int,
    creator_name varchar(20),
    assignee_name varchar(20),
    project_id int,
    sprint_id int,
    story_id int,
    created_timestamp datetime default CURRENT_TIMESTAMP,
    debug_count int,
    testing_count int,
    debug_flag char(1),
    testing_flag char(1),
    actual_start_date datetime,
    actual_end_date datetime,
    start_date datetime,
    end_date datetime,
    foreign key(project_id) references Projects(project_id),
    foreign key(sprint_id) references Sprints(sprint_id),
    foreign key(assigned_to) references Employees(emp_id),
    foreign key(assigned_by) references Employees(emp_id),
    foreign key(story_id) references Stories(story_id)
);

create table Bugs(
    bug_id int primary key auto_increment,
    project_id int default 0,
    task_id int default 0,
    title varchar(20),
    description varchar(1000),
    status varchar(20),
    priority char(5),
    reported_by int,
    assigned_to int,
    created_timestamp datetime default CURRENT_TIMESTAMP,
    reopen_count int,
    actual_start_date datetime,
    actual_end_date datetime,
    start_date datetime,
    end_date datetime,
    foreign key(task_id) references Tasks(task_id),
    foreign key(project_id) references Projects(project_id),
    foreign key(assigned_to) references Employees(emp_id),
    foreign key(reported_by) references Employees(emp_id)
 );

create table Comments(
    comment_id int primary key auto_increment,
    content varchar(1000),
    task_id int default 0,
    bug_id int default 0,
    user_id int,
    user_name varchar(20),
    created_timestamp datetime default CURRENT_TIMESTAMP,
    foreign key(user_id) references Employees(emp_id),
    foreign key(task_id) references Tasks(task_id),
    foreign key(bug_id) references Bugs(bug_id)
);

create table Attachments(
    attachment_id int primary key auto_increment,
    task_id int default 0,
    project_id int default 0,
    story_id int default 0,
    bug_id int default 0,
    file_name varchar(1000),
    uploader_userId int,
    uploaded_by varchar(20),
    created_timestamp datetime default CURRENT_TIMESTAMP,
    foreign key(task_id) references Tasks(task_id),
    foreign key(project_id) references Projects(project_id),
    foreign key(story_id) references Stories(Story_id),
    foreign key(uploader_userId) references Employees(emp_id),
    foreign key(bug_id) references Bugs(bug_id)
);