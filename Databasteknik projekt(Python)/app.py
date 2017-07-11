from flask import Flask, render_template, request, redirect, url_for, flash
import psycopg2

app = Flask(__name__)

def connect_db():
    connection_string = ("dbname='mtmjbqma' user='mtmjbqma' host='horton.elephantsql.com' password='FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d'")
    try:
        return psycopg2.connect(connection_string)

    except:
        print("Kunde inte ansluta till databasen!")
        
#Main Page
@app.route('/')
def index():
    return render_template('index.html')


#Purschsed trips page
@app.route('/kop')
def kop():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM kund")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('kop.html', kunder=results)


#Costumers page
@app.route('/kunder')
def kunder():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM kund")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('kunder.html', kunder=results)


#Drivers page
@app.route('/chaufforer')
def chaufforer():

    conn = connect_db()
    cur = conn.cursor()

    #Query
    try:
        cur.execute("SELECT * FROM chauffor")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('chaufforer.html', chaufforer=results)


@app.route('/regchauffor', methods=['GET', 'POST'])
def regchauffor():

    if request.method == 'POST':
        new_id = request.form['chaufforid']
        new_firstname = request.form['fornamn']
        new_lastname = request.form['efternamn']
        new_adress = request.form['adress']
        new_city = request.form['stad']
        new_number = request.form['hemtelefon']

        conn = connect_db()
        cur = conn.cursor()

        query = "INSERT INTO chauffor(chaufforid, fornamn, efternamn, adress, stad, hemtelefon) VALUES(%s, %s, %s, %s, %s, %s)"
        data = (new_id, new_firstname, new_lastname, new_adress, new_city, new_number)
    
        cur.execute(query, data)
        conn.commit()
        
        return redirect(url_for('chaufforer'))
    else:
        return flash("Något gick fel")





#Citys Page
@app.route('/stader')
def stader():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM stad")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('stader.html', stader=results)


#Search trips page
@app.route('/resor-sok')
def resor_sok():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM resa")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    print(results)
    return render_template('resor-sok.html', resor=results)


#Register trip page
@app.route('/resor-registrera')
def resor_registrera():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM resa")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('resor-registrera.html')




'''
import psycopg2


conn = psycopg2.connect("dbname='mtmjbqma' user='mtmjbqma' host='horton.elephantsql.com' password='FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d'")

cursor = conn.cursor()

cursor.execute("select kundid, fornamn, efternamn from kund")

result = cursor.fetchall()

for record in result:
    print(record[0], record[1], record[2])

'''

if __name__ == '__main__':
    app.run()
