import React from "react";
export default function QuestionDisplay({ questions }) {
  return (
    <div>
      <div id="question-list">
        <h1>Questions</h1>
        {questions.map((question) => {
          return (
            <>
              <p>
                Q{question.id}.{question.question}
              </p>
              <p>A.{question.answer}</p>
            </>
          );
        })}
      </div>
    </div>
  );
}
