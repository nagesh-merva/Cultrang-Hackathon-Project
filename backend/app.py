import os
from flask import Flask, json, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from uuid import uuid4
from datetime import datetime

app = Flask(__name__)
CORS(app, supports_credentials=True, allow_headers="*", origins="*", methods=["OPTIONS", "POST","GET","DELETE","PUT"])
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

client = MongoClient("mongodb+srv://NAGESH:Nagesh22%4025$@hackathon.zqqxl.mongodb.net/")
db = client['recruitment_db'] 
db2 = client['Collage_db']
db3 = client['students_db']
def generate_uuid():
    return str(uuid4())

def get_current_timestamp():
    return datetime.utcnow().isoformat()

# Students Login - Signup route
@app.route('/student/signup', methods=['POST'])
def signup():
    data = request.json

    if db3.students.find_one({"email": data['email']}):
        return jsonify({"success": False, "error": "Student already exists"}), 200
    
    student = {
        "id":generate_uuid(),
        "name": data.get('name'),
        "skills": [],
        "resume": None,
        "college": data['college'],
        "degree": "",
        "rollno": data['rollno'],
        "email": data['email'],
        "phone": "",
        "profilePic": None,
        "password": data['password'],
        "created_at": get_current_timestamp(),
        "updated_at": get_current_timestamp()
    }
    
    db3.students.insert_one(student)
    return jsonify({"success": True, "message": "Signup successful"}), 201

@app.route('/student/login', methods=['POST'])
def login():
    data = request.json
    
    email = data.get('email')
    password = data.get('password')
    
    if not all([email, password]):
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    student = db3.students.find_one({"email": email},{"_id":0})

    if not student or student['password'] != password:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    return jsonify({"success": True, "message": "Login successful","student":student}), 200

# Student profile updates
@app.route('/students/profile', methods=['PUT'])
def create_profile():
    data = request.form
    files = request.files

    id = data.get('id')
    if not id:
        return jsonify({"success": False, "message": "Id is required"}), 400

    student = db3.students.find_one({"id": id})
    if not student:
        return jsonify({"success": False, "message": "Student not found"}), 404

    updated_data = {}
    update_fields = {key: value for key, value in data.items() if value is not None}
    update_fields["updated_at"] = get_current_timestamp()
    updated_data.update(update_fields)
    
    if 'skills' in data:
        updated_data['skills'] = json.loads(data['skills'])

    if 'resume' in files:
        resume_file = files['resume']
        if resume_file:
            resume_path = f"uploads/resumes/{generate_uuid()}_{resume_file.filename}"
            os.makedirs(os.path.dirname(resume_path), exist_ok=True)
            resume_file.save(resume_path)
            updated_data['resume'] = resume_path

    if 'profilePic' in files:
        profile_pic_file = files['profilePic']
        if profile_pic_file:
            profile_pic_path = f"uploads/profile_pics/{generate_uuid()}_{profile_pic_file.filename}"
            os.makedirs(os.path.dirname(profile_pic_path), exist_ok=True)
            profile_pic_file.save(profile_pic_path)
            updated_data['profilePic'] = profile_pic_path

    db3.students.update_one({"id": id}, {"$set": updated_data})

    return jsonify({"success": True, "message": "Profile updated successfully"}), 200


# Recruiters Login - signup

@app.route("/recruiter/signup", methods=["POST"])
def Recruitersignup():
    data = request.json
    files = request.files 
    
    print(data)

    if not data.get("company_name") or not data.get("password"):
        return jsonify({"success": False, "message": "Company name and password are required"}), 400

    company_name = data["company_name"]
    password = data["password"]

    if db.companies.find_one({"company_name": company_name}):
        return jsonify({"success": False, "message": "Company already exists"}), 409

    # if 'logo' in files:
    #     logo_file = files['logo']
    #     if logo_file:
    #         logo_filename = f"uploads/logos/{generate_uuid()}_{logo_file.filename}"
    #         os.makedirs(os.path.dirname(logo_filename), exist_ok=True) 
    #         logo_file.save(logo_filename)  
    # if 'logo' in files:
    #     logo_file = files['logo']
    #     if logo_file:
    #         logo_filename = f"uploads/logos/{generate_uuid()}_{logo_file.filename}"
    #         os.makedirs(os.path.dirname(logo_filename), exist_ok=True) 
    #         logo_file.save(logo_filename)  

    # else:
    #     return jsonify({"success": False, "message": "Logo file is required"}), 400
    # else:
    #     return jsonify({"success": False, "message": "Logo file is required"}), 400

    new_company = {
        "id": generate_uuid(),
        "company_name": company_name,
        "password": password,
        "logo": "", 
        "description": data.get("description", ""),
        "website": data.get("website", ""),
        "industry": data.get("industry", ""),
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
        "logo": data.get("logo", ""),
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
        institute = db2.Collage_Admin.find_one({"id": institute_id}, {"_id": 0})
    
        if not institute:
            return jsonify({"error": "Institute not found"}), 404

        institute_info = {key: institute[key] for key in institute if key != "password"}
        return jsonify(institute_info), 200

    elif request.method == 'PUT':
        data = request.form
        files = request.files 

        update_fields = {key: value for key, value in data.items() if value is not None}
        update_fields["updated_at"] = get_current_timestamp()

        if 'logo' in files:
            logo_file = files['logo']
            if logo_file:
                logo_filename = f"uploads/logos/{generate_uuid()}_{logo_file.filename}"
                os.makedirs(os.path.dirname(logo_filename), exist_ok=True)
                logo_file.save(logo_filename)
                update_fields['logo'] = logo_filename

        result = db2.Collage_Admin.update_one(
            {"id": institute_id},
            {"$set": update_fields}
        )

        if result.modified_count > 0:
            return jsonify({"message": "Institute details updated successfully"}), 200
        else:
            return jsonify({"error": "Institute not found or no changes made"}), 404


# Company / Recruiters Route

@app.route('/allcollages',methods=['GET'])
def allCollages():
    if request.method == 'GET':
        allInstitute = list(db2.Collage_Admin.find({},{"_id":0}))
        return jsonify(allInstitute),200
    else:
        return jsonify({"status":False,"message":"Method not allowed"}),404

# Fetching and edting company details 
@app.route('/company-details', methods=['GET', 'PUT'])
def company_details():
    if request.method == 'GET':
        data = request.args
        company_id = data.get("company_id")

        if not company_id:
            companies = list(db.companies.find({}, {"_id": 0, "password": 0}))
            return jsonify(companies), 200
        
        companies = list(db.companies.find({"id": company_id}, {"_id": 0, "password": 0}))
        return jsonify(companies[0]), 200
    
    elif request.method == 'PUT':
        data = request.form 
        files = request.files
        
        if not data.get("company_id"):
            return jsonify({"success": False, "message": "Company ID is required"}), 400
        
        company_id = data["company_id"]
        
        company = db.companies.find_one({"id": company_id})
        
        if not company:
            return jsonify({"success": False, "message": "Company not found"}), 404

        update_data = {}
        
        for field in ["name", "description", "website", "industry"]:
            if field in data:
                update_data[field] = data[field]

        if 'logo' in files:
            logo_file = files['logo']
            if logo_file:
                logo_filename = f"uploads/logos/{generate_uuid()}_{logo_file.filename}"
                os.makedirs(os.path.dirname(logo_filename), exist_ok=True)  
                logo_file.save(logo_filename) 

                update_data['logo'] = logo_filename

        if update_data:
            update_data["updated_at"] = get_current_timestamp()

        db.companies.update_one({"id": company_id}, {"$set": update_data})
        
        return jsonify({"success": True, "message": "Company details updated successfully"}), 200

# filter job posting for collages 
@app.route('/job-posting/filter', methods=['GET'])
def filter_job_postings():
    college_name = request.args.get("college_name")

    if not college_name:
        return jsonify({"error": "Missing college_name in query parameters"}), 400

    jobs = list(db.jobs.find({
        "selected_collages": college_name
    }, {"_id": 0}))

    if not jobs:
        return jsonify({"message": "No jobs found for the specified college"}), 404

    return jsonify({"jobs": jobs}), 200

# Posting about a opening , fetching it on collages section , and deleting it
@app.route('/job-posting', methods=['GET', 'POST','DELETE','PUT'])
def job_posting():
    if request.method == 'GET':
        data = request.args
        company_id = data.get("company_id")

        if not company_id:
            return jsonify({"error": "Missing company_id in headers"}), 400
        jobs = list(db.jobs.find({"company_id": company_id}, {"_id": 0}))
        if not jobs:
            return jsonify({"message": "No jobs found for the specified company_id"}), 404
        
        return jsonify(jobs), 200
    elif request.method == 'PUT':
        data = request.json
        # print(data)
        job_id = data.get("job_id")
        
        update_fields = {key: value for key, value in data.items() if value is not None}
        update_fields["updated_at"] = get_current_timestamp()
        # print(update_fields)
        if not update_fields:
            return jsonify({"error": "No valid fields to update"}), 400
        
        result = db.jobs.update_one(
            {"id": job_id},
            {"$set": update_fields}
        )
        if result.modified_count > 0:
            return jsonify({"message": "Job details updated successfully"}), 200
        else:
            return jsonify({"error": "Job not found "}), 404
        
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
            "eligibility":[],
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
@app.route('/job-applications', methods=['GET', 'POST', 'PUT'])
def job_applications():
    if request.method == 'GET':
        data = request.args
        data = request.args
        company_id = data.get("company_id")
        student_name = data.get("student_name")
        
        if not company_id:
            if not student_name:
                return jsonify({"error": "Missing id in headers"}), 400
            else:
                applications = list(db.applications.find({"student_name": student_name}, {"_id": 0}))
                return jsonify(applications), 200
            
        applications = list(db.applications.find({"company_id": company_id}, {"_id": 0}))
        if not applications:
            return jsonify({"message": "No Applications found for the specified company_id"}), 404

        return jsonify(applications), 200

    elif request.method == 'POST':
        try:
            # Parse form data
            data = request.form
            files = request.files
            
            # Validate 'form' key
            if 'form' not in data:
                return jsonify({"error": "'form' field is missing from the request"}), 400

            # Parse JSON 'form' field
            form = json.loads(data['form'])

            application = {
                "id": generate_uuid(),
                "job_id": data.get('job_id'),
                "company": data.get('company'),
                "company_id": data.get('company_id'),
                "job_position": data.get('job_position'),
                "student_name": data.get('student_name'),
                "college_name": data.get('college_name'),
                "status": data.get('status'),
                "form": form,
                "submitted_at": get_current_timestamp(),
                "updated_at": get_current_timestamp()
            }

            # Save files
            file_paths = {}
            for fieldname, file in files.items():
                if file:
                    filename =file.filename
                    file_path = os.path.join("uploads/applications", f"{generate_uuid()}_{filename}")
                    os.makedirs(os.path.dirname(file_path), exist_ok=True)
                    file.save(file_path)
                    file_paths[fieldname] = file_path

            # Attach file paths to the form if files were uploaded
            if file_paths:
                for field in application["form"]:
                    if field["field_name"] in file_paths:
                        field["file_path"] = file_paths[field["field_name"]]

            # Save application to database
            db.applications.insert_one(application)
            return jsonify({"message": "Application submitted successfully!"}), 201

        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": "An error occurred while processing the application."}), 500

    elif request.method == 'PUT':
        data = request.json
        files = request.files 
        print(data)
        
        application_id = data.get("id")
        if not application_id:
            return jsonify({"success": False, "message": "Application ID is required"}), 400
        
        application = db.applications.find_one({"id": application_id})
        
        if not application:
            return jsonify({"success": False, "message": "Application not found"}), 404

        update_data = {
            "status": data["status"],
            "updated_at": get_current_timestamp()
        }

        file_paths = {}
        for fieldname, file in files.items():
            if file:
                file_path = f"uploads/applications/{generate_uuid()}_{file.filename}"
                os.makedirs(os.path.dirname(file_path), exist_ok=True)
                file.save(file_path)
                file_paths[fieldname] = file_path

        if file_paths:
            if "form" not in update_data:
                update_data["form"] = {}

            update_data["form"]["files"] = file_paths
        
        db.applications.update_one({"id": application_id}, {"$set": update_data})

        return jsonify({"success": True, "message": "Application updated successfully"}), 200

# Filtering based on college

@app.route('/student-job-posting/filter', methods=['GET'])
def filter_applications():
    college_name = request.args.get("college_name")

    if not college_name:
        return jsonify({"error": "Missing college_name in query parameters"}), 400

    applications = list(db.applications.find({
        "college_name": college_name
    }, {"_id": 0}))

    if not applications:
        return jsonify({"message": "No applications found for the specified college"}), 404

    return jsonify({"applications": applications}), 200

# filtering students based on colleges
@app.route('/allstudents-details', methods=['GET', 'PUT'])
def Students():
    if request.method == 'GET':
        college_name = request.args.get("college_name")

        if not college_name:
            return jsonify({"error": "Missing college_name in query parameters"}), 400
        
        allstudents = list(db3.students.find({"college": college_name}, {"_id": 0, "password": 0}))
        return jsonify(allstudents), 200
    
    # elif request.method == 'PUT':
    #     data = request.form 
    #     files = request.files 
        
    #     if not data.get("company_id"):
    #         return jsonify({"success": False, "message": "Company ID is required"}), 400
        
    #     company_id = data["company_id"]
        
    #     company = db.companies.find_one({"id": company_id})
        
    #     if not company:
    #         return jsonify({"success": False, "message": "Company not found"}), 404

    #     update_data = {}
        
    #     for field in ["name", "description", "website", "industry"]:
    #         if field in data:
    #             update_data[field] = data[field]

    #     if 'logo' in files:
    #         logo_file = files['logo']
    #         if logo_file:
    #             logo_filename = f"uploads/logos/{generate_uuid()}_{logo_file.filename}"
    #             os.makedirs(os.path.dirname(logo_filename), exist_ok=True)  
    #             logo_file.save(logo_filename) 

    #             update_data['logo'] = logo_filename

    #     if update_data:
    #         update_data["updated_at"] = get_current_timestamp()

    #     db.companies.update_one({"id": company_id}, {"$set": update_data})
        
    #     return jsonify({"success": True, "message": "Company details updated successfully"}), 200


# Adding Recruitment rounds , checking them on students portal , and updating its status
@app.route('/recruitment-rounds', methods=['GET', 'POST','PUT'])
def recruitment_rounds():
    if request.method == 'GET':
        data = request.args
        company_id = data.get("company_id")
        
        if not company_id:
            return jsonify({"error": "Missing company_id in headers"}), 400
        
        rounds = list(db.recruitment_rounds.find({"company_id": company_id}, {"_id": 0}))
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
            "company_id":data["company_id"],
            "order_number": data["order_number"],
            "created_at": get_current_timestamp(),
            "updated_at": get_current_timestamp()
        }
        db.recruitment_rounds.insert_one(round_)
        rounds = db.recruitment_rounds.find({"company_id":data["company_id"]},{"_id":0})
        return jsonify({"message": "Recruitment round added successfully!","rounds":db.re}), 201
    
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
