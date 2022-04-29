from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_heroku import Heroku

import datetime

app = Flask(__name__)

CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"]="postgresql://rjhfjwovljrzfl:2fe76b10ffde342ca9178e229303af437eece55a7ec326eba0eb187646027b24@ec2-3-229-252-6.compute-1.amazonaws.com:5432/d6npitgu3mmuvm"
heroku = Heroku(app)
db = SQLAlchemy(app)

db.create_all()


class Admin(db.Model):
    id= db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(200),nullable=False, unique=True)
    email_auth = db.Column(db.Boolean,default=False, nullable=False)
    
    def __init__(self,username,password,email,email_auth):
        self.username = username
        self.password = password
        self.email = email
        self.email_auth = email_auth


class ResearchLogs(db.Model): 
    id= db.Column(db.Integer, primary_key=True, unique=True)
    rname = db.Column(db.String(80), nullable=False, unique=False)
    rrank = db.Column(db.String(80), nullable=False, unique=False)
    approvedby = db.Column(db.String(80), nullable=True, unique=False)
    scpused = db.Column(db.String(200), nullable=False, unique=False)
    log = db.Column(db.String(80), nullable=False, unique=True)
    timeStamp = db.Column(db.DateTime())

    def __init__(self, rname,rrank,approvedby,log,timeStamp):
        self.rname
        self.rrank
        self.approvedby
        self.log
        self.timeStamp




@app.route('/')
def hello_world():
    return 'This is my first API call!'

# LOG SECTION
# Logs can be posted, and viewed
@app.route('/post/log', methods=["POST"])
def postLog():
    if request.content_type =="application/json":
        post_data=request.get_json()
        rname = post_data.get("rname")
        rrank = post_data.get("rrank")
        approvedby = post_data("approvedby")
        log = post_data("log")
        timeStamp= datetime.datetime.now()
        if rname == None or rrank == None or log == None:
            return jsonify("errText: Missing Required Field")
        else:
            record = ResearchLogs(rname,rrank,approvedby, log, timeStamp)
            db.session.add(record)
            db.session.commit()
            return jsonify("Message: Log Recorded")
    else:
        return jsonify("errText: Request Must Be Sent As JSON")

# ADMIN SECTION
# ADMIN Should be able to create, update and remove users 
@app.route('/create/admin', methods=["POST"])
def createAdminUser():
    
    if request.content_type =="application/json":
        post_data=request.get_json()
        username = post_data.get("username")
        password = post_data.get("password")
        email = post_data.get("email")

        user_check = Admin.query.filter(Admin.username==username).first()
        
        if user_check == None:
            email_auth = False
            record = Admin(username,password,email, email_auth)
            db.session.add(record)
            db.session.commit()
        else:
            return jsonify({"errText":"Username Taken"})
        return(jsonify({"errText":"User Created!"}))
    return jsonify("errText: Request Must Be Sent As JSON")


@app.route("/admin/login", methods=["GET","POST"])
def admin_login():

    if request.content_type =="application/json":
        input_data= request.get_json(force=True)
        username = input_data.get("username")
        password = input_data.get("password")
        user = Admin.query.filter(Admin.username==username).first()

        
        if user.password == None or user.password != password:
  
            return jsonify({"errText":"Usernamne or Password Incorrect"})
        
        return jsonify({
            "username":username,
            "message":'login success'

        })
    return jsonify({"errText":"Authenication Failed"})

@app.route("/get/user", methods=["POST"])
def get_user():
    if request.content_type =="application/json":
        input_data= request.get_json(force=True)
        username = input_data.get("username")
        user = Admin.query.filter(Admin.username==username).first()
    return jsonify({
        "id":user.id,
        "username":user.username,
        "email":user.email
    })


@app.route("/delete/admin/<id>", methods=["DELETE"])
def delete_admin(id):
    user = Admin.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"errText":"User Deleted"}) 



if __name__ =="__main__":
    app.debug = True
    app.run()
    