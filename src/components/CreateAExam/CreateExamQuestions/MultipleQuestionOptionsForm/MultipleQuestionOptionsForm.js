import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './MultipleQuestionOptionsForm.css';

class MultipleQuestionOptionsForm extends React.Component {
  handleOptionAnswerChange = (e) => {
    const inputId = e.target.getAttribute('data-id');
    const childInput = e.target.querySelector('input');
    if (inputId) {
      this.props.onChangeOptionAnswer(inputId);
    } else {
      this.props.onChangeOptionAnswer(childInput.getAttribute('data-id'));
    }
  };

  handleOptionNameChange = (e) => {
    this.props.onChangeOptionName(
      e.target.getAttribute('data-id'),
      e.target.value,
    );
  };

  handleOptionDelete = (e) => {
    this.props.onDeleteOption(e.target.getAttribute('data-id'));
  };

  handleOptionAdd = (e) => {
    this.props.onAddOption(e.target.getAttribute('data-id'));
  };

  render() {
    return (
      <div className="MultipleQuestionOptionsForm">
        <Form.Label>
          {this.props.areOptionsBeingEdited ? 'Edit' : 'Create'} Your Options:
        </Form.Label>
        <p>
          Add or delete as many question options as you would like. Check the
          correct options.
        </p>
        {this.props.questionOptions.map((opt) => (
          <InputGroup key={`option-${opt.id}`}>
            <InputGroup.Prepend onClick={this.handleOptionAnswerChange}>
              {this.props.questionType === 'checkbox' ? (
                <InputGroup.Checkbox
                  checked={opt.answer === true}
                  name="answer"
                  data-id={opt.id}
                  onClick={this.handleOptionAnswerChange}
                />
              ) : (
                <InputGroup.Radio
                  data-id={opt.id}
                  checked={opt.answer === true}
                  name="answer"
                  onClick={this.handleOptionAnswerChange}
                />
              )}
            </InputGroup.Prepend>
            <FormControl
              data-id={opt.id}
              onChange={this.handleOptionNameChange}
              value={opt.name}
              name="option"
            />
            <InputGroup.Append>
              <Button
                variant="success"
                data-id={opt.id}
                onClick={this.handleOptionAdd}
              >
                +
              </Button>
              <Button
                variant="danger"
                data-id={opt.id}
                onClick={this.handleOptionDelete}
              >
                &times;
              </Button>
            </InputGroup.Append>
          </InputGroup>
        ))}
      </div>
    );
  }
}

export default MultipleQuestionOptionsForm;