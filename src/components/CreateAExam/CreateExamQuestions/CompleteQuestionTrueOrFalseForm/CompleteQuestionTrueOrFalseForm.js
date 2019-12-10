import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CompleteQuestionTrueOrFalseForm extends React.Component {
  createQuestionInfo = (e) => {
    e.preventDefault();
    const value = e.target.elements.trueOrFalse.value;
    let answer = undefined;
    switch (value) {
      case 'true':
        answer = true;
        break;
      case 'false':
        answer = false;
        break;
      default:
        answer = undefined;
    }
    this.props.onCompleteQuestion(answer);
  };

  render() {
    return (
      <div className="CompleteQuestionTrueOrFalseForm">
        <Form onSubmit={this.createQuestionInfo}>
          <Form.Group>
            <Form.Label>What's the correct answer?</Form.Label>
            <div className="radio">
              <Form.Check
                value="true"
                name="trueOrFalse"
                type="radio"
                inline
                label="true"
              />
              <Form.Check
                value="false"
                name="trueOrFalse"
                type="radio"
                inline
                label="false"
              />
            </div>
          </Form.Group>
          <Button variant="info" type="submit">
            {this.props.questionToBeEdited.id
              ? 'Edit Question'
              : 'Add Question'}
          </Button>
        </Form>
      </div>
    );
  }
}

export default CompleteQuestionTrueOrFalseForm;