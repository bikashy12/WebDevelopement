from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
from scipy.stats import mode
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

app = Flask(__name__)
CORS(app)

# Load and preprocess the data
DATA_PATH = "training.csv"
data = pd.read_csv(DATA_PATH).dropna(axis=1)

encoder = LabelEncoder()
data["prognosis"] = encoder.fit_transform(data["prognosis"])

X = data.iloc[:, :-1]
y = data.iloc[:, -1]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=24)

svm_model = SVC()
svm_model.fit(X_train, y_train)
nb_model = GaussianNB()
nb_model.fit(X_train, y_train)
rf_model = RandomForestClassifier(random_state=18)
rf_model.fit(X_train, y_train)

symptoms = X.columns.values
symptom_index = {}
for index, value in enumerate(symptoms):
    symptom = " ".join([i.capitalize() for i in value.split("_")])
    symptom_index[symptom] = index

predictions_classes = encoder.classes_

def predictDisease(symptoms):
    symptoms = symptoms.split(",")
    input_data = [0] * len(symptom_index)
    for symptom in symptoms:
        index = symptom_index[symptom]
        input_data[index] = 1
    input_data = np.array(input_data).reshape(1, -1)
    rf_prediction = predictions_classes[rf_model.predict(input_data)[0]]
    nb_prediction = predictions_classes[nb_model.predict(input_data)[0]]
    svm_prediction = predictions_classes[svm_model.predict(input_data)[0]]
    final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])[0][0]
    predictions = {
        "rf_model_prediction": rf_prediction,
        "naive_bayes_prediction": nb_prediction,
        "svm_model_prediction": svm_prediction,
        "final_prediction": final_prediction
    }
    return predictions["final_prediction"]

@app.route('/predict', methods=['POST'])
def predict():
    symptoms = request.json['symptoms']
    predictions = predictDisease(symptoms)
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)
