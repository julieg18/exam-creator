import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import shortid from 'shortid';
import clonedeep from 'lodash.clonedeep';
import MultipleQuestionOptionsForm from '../MultipleQuestionOptionsForm/MultipleQuestionOptionsForm';
import TrueOrFalseQuestionForm from '../TrueOrFalseQuestionForm/TrueOrFalseQuestionForm';
import './EditQuestion.css';

class EditQuestion extends React.Component {
  state = {
    questionType: this.props.question.type,
    questionName: this.props.question.name,
    questionOptions: this.props.question.options,
    questionAnswer:
      this.props.question.type === 'trueOrFalse'
        ? this.props.question.answer[0] === 'true'
        : this.props.question.answer,
    error: '',
  };

  handleQuestionTypeChange = (e) => {
    const questionType = e.target.value;
    const questionOptions =
      questionType === 'trueOrFalse'
        ? []
        : [
            {
              optionId: shortid.generate(),
              name: '',
              answer: false,
            },
            {
              optionId: shortid.generate(),
              name: '',
              answer: false,
            },
          ];
    const questionAnswer = questionType === 'trueOrFalse' ? true : [];
    this.setState({ questionType, questionOptions, questionAnswer });
  };

  handleQuestionNameChange = (e) => {
    this.setState({ questionName: e.target.value });
  };

  handleQuestionOptionNameChange = (optionId, newName) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const editedOptions = newQuestionOptions.map((opt) => {
      if (opt.optionId === optionId) {
        opt.name = newName;
      }
      return opt;
    });
    this.setState({
      questionOptions: editedOptions,
    });
  };

  handleQuestionOptionAdd = (optionId) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const newQuestionOption = {
      optionId: shortid.generate(),
      name: '',
      answer: false,
    };
    const optionIndex = newQuestionOptions.findIndex(
      (opt) => opt.optionId === optionId,
    );
    newQuestionOptions.splice(optionIndex + 1, 0, newQuestionOption);
    this.setState({
      questionOptions: newQuestionOptions,
    });
  };

  handleQuestionOptionDelete = (optionId) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const editedOptions = newQuestionOptions.filter(
      (opt) => opt.optionId !== optionId,
    );
    if (this.state.questionOptions.length > 2) {
      this.setState({
        questionOptions: editedOptions,
      });
    }
  };

  handleTrueOrFalseAnswerChange = () => {
    this.setState({ questionAnswer: !this.state.questionAnswer });
  };

  handleCheckboxAnswerChange = (optionId) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const editedOptions = newQuestionOptions.map((opt) => {
      if (optionId === opt.optionId) {
        opt.answer = !opt.answer;
      }
      return opt;
    });
    const editedAnswer = editedOptions
      .filter((opt) => opt.answer === true)
      .map((opt) => opt.optionId);
    this.setState({
      questionOptions: editedOptions,
      questionAnswer: editedAnswer,
    });
  };

  handleRadioAnswerChange = (optionId) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const editedOptions = newQuestionOptions.map((opt) => {
      if (opt.optionId === optionId) {
        opt.answer = true;
      } else {
        opt.answer = false;
      }
      return opt;
    });
    const editedAnswer = editedOptions
      .filter((opt) => opt.answer === true)
      .map((opt) => opt.optionId);
    this.setState({
      questionOptions: editedOptions,
      questionAnswer: editedAnswer,
    });
  };

  handleCompletingMultiOptionQuestion = (e) => {
    e.preventDefault();
    const question = {
      id: this.props.question.id,
      name: this.state.questionName,
      type: this.state.questionType,
      options: this.state.questionOptions,
      answer: this.state.questionAnswer,
    };

    const isNameEmpty = /^\s*$/.test(question.name);
    const isAOptionEmpty = question.options.some((opt) => {
      return /^\s*$/.test(opt.name);
    });
    const doesQuestionHaveAnswer = question.answer.length !== 0;

    if (isNameEmpty) {
      this.setState({
        error: 'Your exam question must have a name.',
      });
    } else if (isAOptionEmpty) {
      this.setState({
        error: 'Your question options must not be empty.',
      });
    } else if (!doesQuestionHaveAnswer) {
      this.setState({
        error: `Your question must have ${
          question.type === 'checkbox' ? 'some options' : 'an option'
        } checked as correct.`,
      });
    } else {
      this.props.editQuestion(question);
    }
  };

  handleCompletingTrueOrFalseQuestion = (e) => {
    e.preventDefault();
    const question = {
      id: this.props.question.id,
      name: this.state.questionName,
      type: this.state.questionType,
      options: [],
      answer: [this.state.questionAnswer.toString()],
    };

    const isNameEmpty = /^\s*$/.test(question.name);
    const isAnswerBoolean = typeof this.state.questionAnswer === 'boolean';

    if (isNameEmpty) {
      this.setState({
        error: 'Your exam question must have a name.',
      });
    } else if (!isAnswerBoolean) {
      this.setState({
        error: 'You must select true or false for your question.',
      });
    } else {
      this.props.editQuestion(question);
    }
  };

  renderFormType = () => {
    const radioForm = (
      <MultipleQuestionOptionsForm
        onChangeOptionAnswer={this.handleRadioAnswerChange}
        onAddOption={this.handleQuestionOptionAdd}
        onDeleteOption={this.handleQuestionOptionDelete}
        questionType={this.state.questionType}
        questionOptions={this.state.questionOptions}
        onChangeOptionName={this.handleQuestionOptionNameChange}
        areOptionsBeingEdited={true}
      />
    );
    const checkboxForm = (
      <MultipleQuestionOptionsForm
        onChangeOptionAnswer={this.handleCheckboxAnswerChange}
        onAddOption={this.handleQuestionOptionAdd}
        onDeleteOption={this.handleQuestionOptionDelete}
        onChangeOptionName={this.handleQuestionOptionNameChange}
        questionOptions={this.state.questionOptions}
        questionType={this.state.questionType}
        areOptionsBeingEdited={true}
      />
    );
    const trueOrFalseForm = (
      <TrueOrFalseQuestionForm
        questionAnswer={this.state.questionAnswer}
        onChangeAnswer={this.handleTrueOrFalseAnswerChange}
      />
    );
    switch (this.state.questionType) {
      case 'radio':
        return radioForm;
      case 'checkbox':
        return checkboxForm;
      default:
        return trueOrFalseForm;
    }
  };

  render() {
    return (
      <div className="EditQuestion">
        <div className="scrollOnOverflow">
          <h2>Edit Question:</h2>
          {this.state.error ? (
            <Alert variant="info">
              <span>&#9888; </span>
              {this.state.error}
            </Alert>
          ) : (
            ''
          )}
          <Form
            onSubmit={
              this.state.questionType === 'trueOrFalse'
                ? this.handleCompletingTrueOrFalseQuestion
                : this.handleCompletingMultiOptionQuestion
            }
          >
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                onChange={this.handleQuestionNameChange}
                placeholder="Name"
                type="text"
                value={this.state.questionName}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>What kind of question is it?</Form.Label>
              <Form.Control
                value={this.state.questionType}
                onChange={this.handleQuestionTypeChange}
                as="select"
              >
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="trueOrFalse">True Or False</option>
              </Form.Control>
            </Form.Group>
            {this.renderFormType()}
            <Button variant="info" type="submit">
              Edit Question
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default EditQuestion;
