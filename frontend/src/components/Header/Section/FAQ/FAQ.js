import React, { useState, useEffect } from "react";
import "./FAQ.css";

function Question({ query }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <p className="question">
        <span onClick={() => setIsOpen(!isOpen)}>{isOpen ? "-" : "+"}</span>
        &nbsp;&nbsp;{query.question}
      </p>
      {isOpen && <p className="answer">{query.answer}</p>}
    </>
  );
}

export default function FAQ() {
  const [faqClicked, setFaqClicked] = useState(false);
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    setFaqs([
      {
        question: "How does the disease prediction system work?",
        answer:
          "Our disease prediction system uses advanced algorithms and machine learning techniques to analyze the symptoms provided by the patient. It compares the symptoms with a database of known diseases and their associated symptoms to generate accurate predictions.",
      },
      {
        question: "How accurate is the disease prediction system?",
        answer:
          "While our system strives for high accuracy, it's important to note that it provides predictions based on the symptoms provided by the patient. The accuracy may vary depending on the completeness and accuracy of the symptom information. It is always recommended to consult a medical professional for a definitive diagnosis.",
      },
      {
        question:
          "Can I rely solely on the disease prediction system for a diagnosis?",
        answer:
          " Our disease prediction system serves as a helpful tool for generating potential disease suggestions based on symptoms. However, it should not be considered a substitute for professional medical advice. We strongly recommend consulting with a qualified healthcare provider for a thorough evaluation and diagnosis.",
      },
      {
        question: "What symptoms should I provide for accurate predictions?",
        answer:
          "To enhance the accuracy of the predictions, it's important to provide a comprehensive list of symptoms that you are experiencing. Include details such as the nature of the symptoms, their duration, severity, and any other relevant information. The more accurate and detailed the information, the better the predictions will be.",
      },
      {
        question: "Can the disease prediction system handle rare diseases?",
        answer:
          "Our disease prediction system is designed to handle a wide range of diseases, including both common and rare conditions. However, it's important to note that the database of known diseases may not encompass every rare condition. If you suspect a rare disease or have concerns, it's advisable to consult with a specialist or healthcare professional with expertise in that particular area.",
      },
    ]);
    return;
  }, []);
  return (
    <div className="faq-section">
      <h2>FAQ</h2>
      <div className="faq-qna">
        {faqs.map((query) => {
          return <Question query={query} />;
        })}
      </div>
    </div>
  );
}
