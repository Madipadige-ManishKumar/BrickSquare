# syntax=docker/dockerfile:1

# ML prediction service (Flask + scikit-learn)
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies needed by scikit-learn/pandas wheels
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc g++ \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies first (better layer caching)
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source and pre-trained model
COPY . .

# Create a non-root user to run the container
RUN addgroup --system mlgroup \
    && adduser --system --no-create-home --uid 1000 mluser \
    && chown -R mluser:mlgroup /app
USER mluser

EXPOSE 3000

# Production: serve with Gunicorn (installed via requirements.txt)
CMD ["gunicorn", "--bind", "0.0.0.0:3000", "--workers", "2", "--threads", "4", "app:app"]