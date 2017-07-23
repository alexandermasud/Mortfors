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
        cur.execute("SELECT * FROM kop")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('kop.html', kop_register=results)


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


@app.route('/regkund', methods=['GET', 'POST'])
def regkund():
    if request.method == 'POST':
        new_firstname = request.form['fornamn']
        new_lastname = request.form['efternamn']
        new_adress = request.form['adress']
        new_stad = request.form['stad']
        new_epost = request.form['epost']
        new_telefon = request.form['telefon']

        conn = connect_db()
        cur = conn.cursor()

        query = ("INSERT INTO kund(fornamn, efternamn, adress, stad, epost, telefon) VALUES(%s, %s, %s, %s, %s, %s)")
        data = (new_firstname, new_lastname, new_adress, new_stad, new_epost, new_telefon)
        cur.execute(query, data)
        conn.commit()

        return redirect(url_for('kunder'))
    else:
        return flash("Något gick fel")

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

#Reg Driver
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

        query = ("INSERT INTO chauffor(chaufforid, fornamn, efternamn, adress, stad, hemtelefon) VALUES(%s, %s, %s, %s, %s, %s)")
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


@app.route('/regstad', methods=['GET', 'POST'])
def regstad():

    if request.method == 'POST':
        new_land = request.form['land']
        new_stad = request.form['stad']
        new_adress = request.form['adress']

        conn = connect_db()
        cur = conn.cursor()

        query = ("INSERT INTO stad(land, stad, adress) VALUES(%s, %s, %s)")
        data = (new_land, new_stad, new_adress)

        cur.execute(query, data)
        conn.commit()

        return redirect(url_for('stader'))
    else:
        return flash("Något gick fel")


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




#Seach function 
@app.route('/soka', methods=['GET', 'POST'])
def soka():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    
    
    if request.method == 'POST':
        
             
        search_select = request.form['searchSelect']
        search_word = request.form['searchWord']        
       

        conn = connect_db()
        cur = conn.cursor()

        cur.execute("SELECT * FROM resa WHERE {} = '{}'".format((search_select),(search_word)))

        conn.commit()
        
                 
    else:
        return flash("Något gick fel")
    
    results = cur.fetchall()
    print(results)
    return render_template('resor-sok.html', resor=results)
    
  



#Buy page
@app.route('/kopa', methods=['GET', 'POST'])
def kopa():

    if request.method == 'POST':
        
        kundid = request.form['kundid']
        fornamn = request.form['fornamn']
        new_koptaplatser = int(request.form['koptaplatser'])
        avgangsid = request.form['avgangsid']
       
       
       

        conn = connect_db()
        cur = conn.cursor()
        
        query_platser = ("SELECT platser FROM resa WHERE avgangsid = {}".format(avgangsid))
        

        cur.execute(query_platser)
        res_platser = cur.fetchall()
        
        conn.commit()

        query = ("UPDATE resa SET platser = platser - {} WHERE avgangsid ={}".format((new_koptaplatser) ,(avgangsid)))
        query2 = ("SELECT * FROM resa")
                 
                 
        query3 = ("INSERT INTO kop(kundid, fornamn, platser, avgangsid) VALUES(%s, %s, %s, %s)")
        data = (kundid, fornamn, new_koptaplatser, avgangsid)
        
        for i in res_platser:
            for j in i:
                if j - new_koptaplatser >= 0:
                    cur.execute(query, query2)
                    conn.commit()
                    print("Koden kördes")
                    
                    
                    conn = connect_db()
                    cur = conn.cursor()
                    
                 
                    query3 = ("INSERT INTO kop(kundid, fornamn, platser, avgangsid) VALUES(%s, %s, %s, %s)")
                    data = (kundid, fornamn, new_koptaplatser, avgangsid)
                    
                    cur.execute(query3, data)
                    conn.commit()
                    print("Koden kördes 2")
                  
                else:
                    print("För många biljetter köptes!")

        return redirect(url_for('resor_sok'))
    else:
        return flash("Något gick fel")



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
    return render_template('resor-registrera.html', resor=results)

@app.route('/regresa', methods=['GET', 'POST'])
def regresa():

    if request.method == 'POST':
        new_avgangsland = request.form['avgangsland']
        new_avgangsstad = request.form['avgangsstad']
        new_ankomstland = request.form['ankomstland']
        new_ankomststad = request.form['ankomststad']
        new_datum = request.form['datum']
        new_avgang = request.form['avgang']
        new_ankomst = request.form['ankomst']
        new_pris = request.form['pris']
        new_platser = request.form['platser']
        new_chaufforid = request.form['chaufforid']

        conn = connect_db()
        cur = conn.cursor()

        query = ("INSERT INTO resa(avgangsland, avgangsstad, ankomstland, ankomststad, datum, avgang, ankomst, pris, platser, chaufforid) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
        data = (new_avgangsland, new_avgangsstad, new_ankomstland, new_ankomststad, new_datum, new_avgang, new_ankomst, new_pris, new_platser, new_chaufforid)

        cur.execute(query, data)
        conn.commit()

        return redirect(url_for('resor_registrera'))

    else:
        return flash("Något gick fel")




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
