import React from "react";
import "./ServicePage.css";

export default function ServicePage() {
  const imageUrl1 =
    "https://10web-site.ai/56/wp-content/uploads/sites/59/2023/05/6_HPMFnzJf.webp";
  const imageUrl2 =
    "https://10web-site.ai/56/wp-content/uploads/sites/59/2023/05/7_HPMFnzJf.webp";
  const imageUrl3 =
    "https://10web-site.ai/56/wp-content/uploads/sites/59/2023/05/4_HPMFnzJf.webp";
  const imageUrl4 =
    "https://10web-site.ai/56/wp-content/uploads/sites/59/2023/05/5_HPMFnzJf.webp";
  return (
    <div className="App">
      <div className="services-container">
        <h1 className="services-heading">Services we provide</h1>
        <div className="spaces"></div>
        <div className="service-boxes">
          <div className="service-box">
            <h3 className="service-name">Disease Predictor</h3>
            <p className="service-description">
              Our service uses artificial intelligence to predict diseases based
              on user input of symptoms, providing accurate and fast diagnoses.
            </p>
          </div>
          <div className="service-box">
            <h3 className="service-name">
              Disease Prediction and Record Management
            </h3>
            <p className="service-description">
              Our professional team ensures proper authentication and security
              measures in managing your database, preserving past records with
              utmost confidentiality.
            </p>
          </div>
        </div>
        <div className="service-box centered-box">
          <h3 className="service-name">
            Symptom-Based Disease Prediction Tool
          </h3>
          <p className="service-description">
            Our symptom-based disease prediction tool utilizes powerful machine
            learning algorithms to accurately predict diseases based on patient
            symptoms and medical data, empowering healthcare professionals with
            valuable insights for early detection and treatment planning. By
            leveraging advanced ML techniques and continually refining its
            prognosis through large datasets, this tool holds immense potential
            to improve patient outcomes, enhance healthcare decision-making, and
            enable proactive disease management.
          </p>
        </div>
      </div>
      <div className="image-section">
        <div className="image-box1  image-box">
          <div>
            <img src={imageUrl2} alt="service 1" className="image" />
          </div>
          <div className="image-description1 image-desc">
            <h1>Disease Predictor</h1>
            <p>
              Our innovative service, "Disease Predictor," is designed to
              empower users by predicting potential medical conditions based on
              the symptoms they provide. With just a few simple inputs,
              individuals can receive insightful predictions about their health,
              helping them gain a better understanding of possible diseases or
              ailments they may be experiencing. Leveraging cutting-edge machine
              learning algorithms, our platform analyzes the symptoms provided
              by users and generates accurate predictions, providing valuable
              information for proactive healthcare management. By using the
              Disease Predictor, individuals can take control of their
              well-being, make informed decisions, and seek timely medical
              attention if necessary.
            </p>
          </div>
        </div>
        <div className="image-box2 image-box">
          <div className="image-description2 image-desc">
            <h1>Disease Prediction and Record Management</h1>
            <p>
              Our service, "Disease Prediction and Record Management," offers a
              comprehensive solution for users to predict and manage their
              medical conditions effectively. Our platform provides a
              user-friendly database where individuals can access and review
              their past medical records and prognosis results. Users can input
              their symptoms, and our state-of-the-art machine learning model
              generates accurate prognosis results based on the provided
              information. The database stores both the symptoms provided by the
              users and the corresponding prognosis results, all accompanied by
              proper time stamps. With our service, individuals can easily track
              their health history, make informed decisions, and collaborate
              effectively with healthcare professionals.
            </p>
          </div>

          <img src={imageUrl4} alt="service 2" className="image" />
        </div>
        <div className="image-box3 image-box">
          <img src={imageUrl1} alt="service 3" className="image" />

          <div className="image-description3 image-desc">
            <h1>Symptom-Based Disease Prediction Tool</h1>
            <p>
              A symptom-based disease prediction tool is a powerful machine
              learning model that leverages multiple ML algorithms and tools to
              offer accurate prognosis. By analyzing a patient's symptoms and
              relevant medical data, this tool can predict the likelihood of
              various diseases and provide valuable insights for healthcare
              professionals. The model combines the strengths of different ML
              algorithms, such as decision trees, random forests, or support
              vector machines, to handle complex patterns in the data.
              Additionally, it utilizes feature engineering techniques to
              extract meaningful information from the input, allowing it to
              capture subtle relationships between symptoms and diseases. The
              tool's prognosis is continually refined and improved through
              training on large datasets containing diverse patient records.
              This intelligent system holds immense potential to aid healthcare
              providers in early detection, effective treatment planning, and
              improved patient outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
