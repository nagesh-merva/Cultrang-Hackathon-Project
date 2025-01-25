from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from uuid import uuid4
from datetime import datetime

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://NAGESH:Nagesh22%4025$@hackathon.zqqxl.mongodb.net/")
db = client['recruitment_db'] 

def generate_uuid():
    return str(uuid4())

def get_current_timestamp():
    return datetime.utcnow().isoformat()

@app.route('/company-details', methods=['GET', 'POST'])
def company_details():
    if request.method == 'GET':
        companies = list(db.companies.find({}, {"_id": 0}))
        return jsonify(companies), 200
    elif request.method == 'POST':
        data = request.json
        company = {
            "id": generate_uuid(),
            "name": data["name"],
            "description": data["description"],
            "website": data["website"],
            "industry": data["industry"],
            "created_at": get_current_timestamp(),
            "updated_at": get_current_timestamp()
        }
        db.companies.insert_one(company)
        return jsonify({"message": "Company added successfully!"}), 201

@app.route('/job-posting', methods=['GET', 'POST'])
def job_posting():
    if request.method == 'GET':
        jobs = list(db.jobs.find({}, {"_id": 0}))
        return jsonify(jobs), 200
    elif request.method == 'POST':
        data = request.json
        job = {
            "id": generate_uuid(),
            "company": data["company"],
            "company_id": data["company_id"],
            "title": data["title"],
            "description": data["description"],
            "requirements": data["requirements"],
            "responsibilities": data["responsibilities"],
            "location": data["location"],
            "job_type": data["job_type"],
            "status": data["status"],
            "application_deadline": data["application_deadline"],
            "form" : data.get("form", {}),
            "created_at": get_current_timestamp(),
            "updated_at": get_current_timestamp()
        }
        db.jobs.insert_one(job)
        return jsonify({"message": "Job posted successfully!"}), 201

@app.route('/job-applications', methods=['GET', 'POST'])
def job_applications():
    if request.method == 'GET':
        applications = list(db.applications.find({}, {"_id": 0}))
        return jsonify(applications), 200
    elif request.method == 'POST':
        data = request.json
        application = {
            "id": generate_uuid(),
            "job_id": data["job_id"],
            "student_id": data["student_id"],
            "status": data["status"],
            "submitted_at": get_current_timestamp(),
            "created_at": get_current_timestamp(),
            "updated_at": get_current_timestamp()
        }
        db.applications.insert_one(application)
        return jsonify({"message": "Application submitted successfully!"}), 201

@app.route('/recruitment-rounds', methods=['GET', 'POST'])
def recruitment_rounds():
    if request.method == 'GET':
        rounds = list(db.recruitment_rounds.find({}, {"_id": 0}))
        return jsonify(rounds), 200
    elif request.method == 'POST':
        data = request.json
        round_ = {
            "id": generate_uuid(),
            "job_id": data["job_id"],
            "name": data["name"],
            "description": data["description"],
            "type": data["type"],
            "status": data["status"],
            "order_number": data["order_number"],
            "created_at": get_current_timestamp(),
            "updated_at": get_current_timestamp()
        }
        db.recruitment_rounds.insert_one(round_)
        return jsonify({"message": "Recruitment round added successfully!"}), 201
    
@app.route('/round-results', methods=['GET', 'POST'])
def round_results():
    if request.method == 'GET':
        results = list(db.round_results.find({}, {"_id": 0}))
        return jsonify(results), 200
    elif request.method == 'POST':
        data = request.json
        result = {
            "id": generate_uuid(),
            "round_id": data["round_id"],
            "application_id": data["application_id"],
            "status": data["status"],
            "feedback": data["feedback"],
            "created_at": get_current_timestamp(),
            "updated_at": get_current_timestamp()
        }
        db.round_results.insert_one(result)
        return jsonify({"message": "Round result added successfully!"}), 201

if __name__ == '__main__':
    app.run(debug=True)
