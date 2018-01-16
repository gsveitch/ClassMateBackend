const TeacherLoginRoute = '/login';
const StudentLoginRoute = '/studentLogin';

const DashboardRoute = '/dashboard'; // send user_id and get back the session_id, session_name and due_dates

const JoinClassRoute = '/joinClass'; // POST user_id and joincode => get back name_class and session_id and particpant_id
// DONE

const AddClassRoute = '/addClass'; // send class name, teacher_id, joincode => get back ?
// DONE

const SendHomeworkRoute = '/upload'; // POST participant_id and assignment_id

const ClassSchedule = '/classSchedule'; // googleCalendar API

// Student Dashboard to be populated when logged in
const ClassRoster = '/classRoster'; // send session_id => get back all the participants

const GetAssignments = '/getAssignment'; // send session_id => get back all the assignments

const StudentInformation = '/studentInformation'; // send student_id and get back specific student info 