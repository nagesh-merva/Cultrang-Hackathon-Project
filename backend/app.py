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

# Recruiters Login - signup

@app.route("/recruiter/signup", methods=["POST"])
def Recruitersignup():
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

@app.route("/recruiter/login", methods=["POST"])
def Recruiterlogin():
    data = request.json

    if not data.get("company_name") or not data.get("password"):
        return jsonify({"success": False, "message": "Company name and password are required"}), 400

    company_name = data["company_name"]
    password = data["password"]

    company = db.companies.find_one({"company_name": company_name, "password": password})
    if not company:
        return jsonify({"success": False, "message": "Invalid company name or password"}), 401

    return jsonify({"success": True, "message": "Login successful", "company_id": company["id"]}), 200

# collages Login - signup

@app.route('/collages/login', methods=['POST'])
def Collageslogin():
    data = request.json
    email = data.get('contact_email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400
    
    institute = db2.Collage_Admin.find_one({"contact_email": email})
    
    if institute:
        if institute['password'] == password:
            return jsonify({"message": "Login successful", "institute": {"id": institute["id"], "name": institute["name"]}}), 200
        else:
            return jsonify({"error": "Invalid password"}), 401
    else:
        return jsonify({"error": "Institute not found"}), 404

@app.route('/collages/signup', methods=['POST'])
def Collagessignup():
    data = request.json
    email = data.get('contact_email')
    
    if not email:
        return jsonify({"error": "Missing email"}), 400
    
    existing_institute = db2.Collage_Admin.find_one({"contact_email": email})
    
    if existing_institute:
        return jsonify({"error": "Institute with this email already exists"}), 400
    
    institute_id = generate_uuid()
    new_institute = {
        "id": institute_id,
        "name": data.get("name", "Unnamed Institute"),
        "password": data["password"], 
        "contact_email": email,
        "contact_phone": data.get("contact_phone", ""),
        "description": data.get("description", ""),
        "logo_url": data.get("logo_url", ""),
        "location": data.get("location", ""),
        "placement_policy": data.get("placement_policy", ""),
        "created_at": get_current_timestamp(),
        "updated_at": get_current_timestamp()
    }

    db2.Collage_Admin.insert_one(new_institute)
    return jsonify({"message": "Institute created successfully", "institute": {"id": institute_id, "name": new_institute["name"]}}), 201

# Collages Routes

@app.route('/collages/<institute_id>', methods=['GET', 'PUT'])
def manage_institute(institute_id):
    if request.method == 'GET':
        institute = db2.Collage_Admin.find_one({"id": institute_id},{"_id": 0})
        
        if not institute:
            return jsonify({"error": "Institute not found"}), 404
        
        institute_info = {key: institute[key] for key in institute if key != "password"}
        return jsonify(institute_info), 200

    elif request.method == 'PUT':
        data = request.json
    
        update_fields = {key: value for key, value in data.items() if value is not None}
        update_fields["updated_at"] = get_current_timestamp()

        result = db2.Collage_Admin.update_one(
            {"id": institute_id},
            {"$set": update_fields}
        )

        if result.modified_count > 0:
            return jsonify({"message": "Institute details updated successfully"}), 200
        else:
            return jsonify({"error": "Institute not found or no changes made"}), 404

# Company / Recruiters Route

# Fetching and edting company details 
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

# Posting about a opening , fetching it on collages section , and deleting it
@app.route('/job-posting', methods=['GET', 'POST','DELETE'])
def job_posting():
    if request.method == 'GET':
        data = request.json
        company_id = data["company_id"]

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

# Receiving application for the opening , checking them and editing its status
@app.route('/job-applications', methods=['GET', 'POST','PUT'])
def job_applications():
    if request.method == 'GET':
        data = request.json
        company_id = data["company_id"]
        
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

# Adding Recruitment rounds , checking them on students portal , and updating its status
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

# Announcing and displaying rounds results
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
