import React from 'react';
import Form from 'react-bootstrap/Form';
import './TrueOrFalseQuestionForm.css';

const TrueOrFalseQuestionForm = (props) => {
  function handleAnswerChange(e) {
    const value = e.target.value;
    const answer = value === 'true';
    props.onChangeAnswer(answer);
  }

  return (
    <div className="TrueOrFalseQuestionForm">
      <Form.Group>
        <Form.Label>What's the correct answer?</Form.Label>
        <div className="radio">
          <Form.Check
            value="true"
            name="trueOrFalse"
            type="radio"
            inline
            label="true"
            checked={props.questionAnswer === true}
            onChange={handleAnswerChange}
          />
          <Form.Check
            value="false"
            name="trueOrFalse"
            type="radio"
            inline
            label="false"
            checked={props.questionAnswer === false}
            onChange={handleAnswerChange}
          />
        </div>
      </Form.Group>
    </div>
  );
};

export default TrueOrFalseQuestionForm;
