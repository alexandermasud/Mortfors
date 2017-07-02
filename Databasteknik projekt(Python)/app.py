from flask import Flask, render_template, request
import psycopg2

app = Flask(__name__)

def connect_db():
    connection_string = ("dbname='mtmjbqma' user='mtmjbqma' host='horton.elephantsql.com' password='FV-Pmc7MOX4BPDO_8CUE7n9lBFaFMp-d'")
    try:
        return psycopg2.connect(connection_string)

    except:
        print("Kunde inte ansluta till databasen!")
        

@app.route('/')
def index():
    #Main Page

    
    return render_template('index.html')

@app.route('/kop')
def kop():
    return render_template('kop.html')

@app.route('/kunder')
def kunder():
    return render_template('kunder.html')

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

@app.route('/stader')
def stader():
    return render_template('stader.html')

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

@app.route('/resor-registrera')
def resor_registrera():
    return render_template('resor-registrera.html')


@app.route('/new')
def new():
    return 'Funkar!'

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
