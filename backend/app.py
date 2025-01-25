from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from uuid import uuid4
from datetime import datetime

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://NAGESH:Nagesh22%4025$@hackathon.zqqxl.mongodb.net/")
db = client['recruitment_db'] 
db2 = client['Collage_db']

def generate_uuid():
    return str(uuid4())

def get_current_timestamp():
    return datetime.utcnow().isoformat()

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    if not data.get("company_name") or not data.get("password"):
        return jsonify({"success": False, "message": "Company name and password are required"}), 400

    company_name = data["company_name"]
    password = data["password"]

    if db.companies.find_one({"company_name": company_name}):
        return jsonify({"success": False, "message": "Company already exists"}), 409

    new_company = {
        "id": generate_uuid(),
        "company_name": company_name,
        "password": password,
        "logo": data["logo"],
        "description": data["description"],
        "website": data["website"],
        "industry": data["industry"],
        "created_at": get_current_timestamp(),
        "updated_at": get_current_timestamp()
    }
    db.companies.insert_one(new_company)

    return jsonify({"success": True, "message": "Company registered successfully", "company_id": new_company["id"]}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    if not data.get("company_name") or not data.get("password"):
        return jsonify({"success": False, "message": "Company name and password are required"}), 400

    company_name = data["company_name"]
    password = data["password"]

    company = db.companies.find_one({"company_name": company_name, "password": password})
    if not company:
        return jsonify({"success": False, "message": "Invalid company name or password"}), 401

    return jsonify({"success": True, "message": "Login successful", "company_id": company["id"]}), 200

@app.route('/company-details', methods=['GET', 'PUT'])
def company_details():
    if request.method == 'GET':
        companies = list(db.companies.find({}, {"_id": 0, "password": 0}))
        return jsonify(companies), 200
    
    elif request.method == 'PUT':
        data = request.json
        
        if not data.get("company_id"):
            return jsonify({"success": False, "message": "Company ID is required"}), 400
        
        company_id = data["company_id"]
        
        company = db.companies.find_one({"id": company_id})
        
        if not company:
            return jsonify({"success": False, "message": "Company not found"}), 404

        update_data = {}
        for field in ["name", "password", "logo", "description", "website", "industry"]:
            if field in data:
                update_data[field] = data[field]

        if update_data:
            update_data["updated_at"] = get_current_timestamp()

        db.companies.update_one({"id": company_id}, {"$set": update_data})
        
        return jsonify({"success": True, "message": "Company details updated successfully"}), 200

@app.route('/job-posting', methods=['GET', 'POST','DELETE'])
def job_posting():
    if request.method == 'GET':
        print(request.headers)
        company_id = request.headers.get('company_id')
        print(company_id)
        print(request.headers.get('company_id'))

        if not company_id:
            return jsonify({"error": "Missing company_id in headers"}), 400
        jobs = list(db.jobs.find({"company_id": company_id}, {"_id": 0}))
        if not jobs:
            return jsonify({"message": "No jobs found for the specified company_id"}), 404
        
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
            "location": data["location"],
            "job_type": data["job_type"],
            "status": data["status"],
            "selected_collages" : data["selected_collages"],
            "application_deadline": data["application_deadline"],
            "form" : data["form"],
            "created_at": get_current_timestamp(),
            "updated_at": get_current_timestamp()
        }
        db.jobs.insert_one(job)
        return jsonify({"message": "Job posted successfully!"}), 201
    elif request.method == 'DELETE':
        data = request.json
        job_id = data["id"]

        if not job_id:
            return jsonify({"success": False, "message": "Job ID is required to delete the job posting"}), 400

        result = db.jobs.delete_one({"id": job_id})
        
        if result.deleted_count == 0:
            return jsonify({"success": False, "message": "Job posting not found"}), 404

        return jsonify({"success": True, "message": "Job posting deleted successfully"}), 200

@app.route('/job-applications', methods=['GET', 'POST','PUT'])
def job_applications():
    if request.method == 'GET':
        company_id = request.headers.get('company_id')

        if not company_id:
            return jsonify({"error": "Missing company_id in headers"}), 400
        
        applications = list(db.applications.find({"company_id": company_id}, {"_id": 0}))
        if not applications:
            return jsonify({"message": "No Applications found for the specified company_id"}), 404

        return jsonify(applications), 200
    elif request.method == 'POST':
        data = request.json
        application = {
            "id": generate_uuid(),
            "job_id": data["job_id"],
            "company_id": data["company_id"],
            "student_id": data["student_id"],
            "status": data["status"],
            "form" : data["form"],
            "submitted_at": get_current_timestamp(),
            "updated_at": get_current_timestamp()
        }
        db.applications.insert_one(application)
        return jsonify({"message": "Application submitted successfully!"}), 201
    
    elif request.method == 'PUT':
        data = request.json
        application_id = data["id"]
        if not  application_id :
            return jsonify({"success": False, "message": "Application ID is required"}), 400
        
        application = db.applications.find_one({"id": application_id })
        
        if not application:
            return jsonify({"success": False, "message": "Application not found"}), 404

        db.applications.update_one({"id": application_id}, {"$set": {"status":data["status"],"updated_at": get_current_timestamp()}})
        
        return jsonify({"success": True, "message": "Company details updated successfully"}), 200

@app.route('/recruitment-rounds', methods=['GET', 'POST','PUT'])
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
    
    elif request.method == 'PUT':
        data = request.json
        recruitment_id = data["id"]
        if not  recruitment_id:
            return jsonify({"success": False, "message": "Recruitment Rounds ID is required"}), 400
        
        recruitment_round = db.recruitment_rounds.find_one({"id": recruitment_id })
        
        if not recruitment_round:
            return jsonify({"success": False, "message": "Recruitment Rounds not found"}), 404

        db.recruitment_rounds.update_one({"id":recruitment_id}, {"$set": {"status":data["status"],"updated_at": get_current_timestamp()}})
        
        return jsonify({"success": True, "message": "Recruitment Rounds details updated successfully"}), 200
    
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
