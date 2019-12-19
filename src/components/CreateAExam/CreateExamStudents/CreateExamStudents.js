import React from 'react';
import clonedeep from 'lodash.clonedeep';
import CreateStudent from './CreateStudent/CreateStudent';
import EditStudent from './EditStudent/EditStudent';
import StudentsSoFar from './StudentsSoFar/StudentsSoFar';

class CreateExamStudents extends React.Component {
  state = {
    students: this.props.examStudents,
    studentToBeEdited: {},
  };

  componentWillUnmount() {
    this.props.createExamStudents(this.state.students);
  }

  editStudentHandler = (student) => {
    const students = clonedeep(this.state.students);
    const editedStudent = clonedeep(student);
    const editedStudents = students.map((student) => {
      if (student.id === editedStudent.id) {
        return editedStudent;
      } else {
        return student;
      }
    });
    this.setState({
      students: editedStudents,
      studentToBeEdited: {},
    });
  };

  addStudentHandler = (student) => {
    const students = clonedeep(this.state.students);
    students.push(student);
    this.setState({ students });
  };

  deleteStudentHandler = (studentId) => {
    const students = clonedeep(this.state.students);
    const editedStudents = students.filter(
      (student) => student.id !== studentId,
    );
    this.setState({
      students: editedStudents,
    });
  };

  editStudentStartHandler = (studentToBeEdited) => {
    this.setState({
      studentToBeEdited,
    });
  };

  render() {
    return (
      <div className="CreateExamStudents">
        <h1>Add Students To Your Exam</h1>
        <p>
          Each person that is given the link to your exam will need to choose
          his or her name from your student list.
        </p>
        <div className="CreateExamStudentsMain">
          <StudentsSoFar
            editStudentStart={this.editStudentStartHandler}
            students={this.state.students}
            deleteStudent={this.deleteStudentHandler}
          />
          {this.state.studentToBeEdited.id ? (
            <EditStudent
              student={this.state.studentToBeEdited}
              editStudent={this.editStudentHandler}
            />
          ) : (
            <CreateStudent onCreateStudent={this.addStudentHandler} />
          )}
        </div>
      </div>
    );
  }
}

export default CreateExamStudents;
