from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load trained pipeline
model = joblib.load('price_model.pkl')

# Define expected columns
numerical_features = ['area', 'bedrooms', 'bathrooms', 'stories', 'parking']
categorical_features = ['mainroad', 'guestroom', 'basement', 'hotwaterheating', 'airconditioning', 'furnishingstatus']
expected_columns = numerical_features + categorical_features

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received data:", data)

        # Ensure all expected columns are present
        for col in expected_columns:
            if col not in data:
                # Fill missing numeric with 0, categorical with default
                if col in numerical_features:
                    data[col] = 0
                else:
                    data[col] = 'no' if col != 'furnishingstatus' else 'unfurnished'

        # Prepare DataFrame
        input_data = pd.DataFrame([data], columns=expected_columns)

        # Ensure numeric columns are numeric
        for col in numerical_features:
            input_data[col] = pd.to_numeric(input_data[col], errors='coerce').fillna(0)

        print("Input DataFrame:\n", input_data)

        # Predict
        predicted_price = model.predict(input_data)[0]

        # Bestseller flag
        

        return jsonify({
            'predictedPrice': float(round(predicted_price, 2)),
            
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=3000, debug=True)
