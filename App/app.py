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




#Purchased trips page
@app.route('/kop')
def kop():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT kop.transaktionsid, kop.kundid, kund.fornamn, kund.efternamn, kop.avgangsid, resa.avgangsstad, resa.ankomststad, resa.avgangsdatum, resa.ankomstdatum , resa.avgang, resa.ankomst, kop.platser FROM resa JOIN kop ON kop.avgangsid=resa.avgangsid JOIN kund ON kund.kundid=kop.kundid;")
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




#Costumers page success
@app.route('/kunder-ratt')
def kunder_ratt():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM kund")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('kunder-ratt.html', kunder=results)



#Costumers page fail
@app.route('/kunder-fel')
def kunder_fel():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM kund")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('kunder-fel.html', kunder=results)



#Reg Customer
@app.route('/regkund', methods=['GET', 'POST'])
def regkund():

    try:
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

            return redirect(url_for('kunder_ratt'))
            print("Kund registrerades")
    except:
        return redirect(url_for('kunder_fel'))
        print("Kund registrerades inte")



    
#Drivers page
@app.route('/chaufforer')
def chaufforer():

    conn = connect_db()
    cur = conn.cursor()

    #Query
    try:
        cur.execute("SELECT * FROM chauffor WHERE chaufforid != 'Ej bestämt'")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('chaufforer.html', chaufforer=results)





#Drivers page success
@app.route('/chaufforer-ratt')
def chaufforer_ratt():

    conn = connect_db()
    cur = conn.cursor()

    #Query
    try:
        cur.execute("SELECT * FROM chauffor WHERE chaufforid != 'Ej bestämt'")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('chaufforer-ratt.html', chaufforer=results)





#Drivers page fail
@app.route('/chaufforer-fel')
def chaufforer_fel():

    conn = connect_db()
    cur = conn.cursor()

    #Query
    try:
        cur.execute("SELECT * FROM chauffor WHERE chaufforid != 'Ej bestämt'")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('chaufforer-fel.html', chaufforer=results)




#Reg Driver
@app.route('/regchauffor', methods=['GET', 'POST'])
def regchauffor():

    try:
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
            
            return redirect(url_for('chaufforer_ratt'))
            print("Chaufför registrerades")
        
    except:
        return redirect(url_for('chaufforer_fel'))
        print("Chaufför registrerades inte")
        



#Cities Page
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




#Cities Page success
@app.route('/stader-ratt')
def stader_ratt():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM stad")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('stader-ratt.html', stader=results)




#Cities Page fail
@app.route('/stader-fel')
def stader_fel():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM stad")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('stader-fel.html', stader=results)




#Reg city
@app.route('/regstad', methods=['GET', 'POST'])
def regstad():
    try:
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

            return redirect(url_for('stader_ratt'))
        else:
            return flash("Något gick fel")
    except: 
        return redirect(url_for('stader_fel'))




    
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
    
    return render_template('resor-sok.html', resor=results)




#Search trips page success
@app.route('/resor-sok-ratt')
def resor_sok_ratt():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM resa")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    
    return render_template('resor-sok-ratt.html', resor=results)



#Search trips page fail
@app.route('/resor-sok-fel')
def resor_sok_fel():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM resa")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    
    return render_template('resor-sok-fel.html', resor=results)



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
    
    return render_template('resor-sok.html', resor=results)
    
  

#Buy page
@app.route('/kopa', methods=['GET', 'POST'])
def kopa():

    try:
        if request.method == 'POST':
            
            kundid = request.form['kundid']
            avgangsid = request.form['avgangsid']
            new_koptaplatser = int(request.form['koptaplatser'])
           
           

            conn = connect_db()
            cur = conn.cursor()
            
            query_platser = ("SELECT platser FROM resa WHERE avgangsid = {}".format(avgangsid))
            

            cur.execute(query_platser)
            res_platser = cur.fetchall()
            
            conn.commit()

            query = ("UPDATE resa SET platser = platser - {} WHERE avgangsid ={}".format((new_koptaplatser) ,(avgangsid)))
            query2 = ("SELECT * FROM resa")
                     
            
            for i in res_platser:
                for j in i:
                    if j - new_koptaplatser >= 0:
                        cur.execute(query, query2)
                        conn.commit()
                    
                        
                        
                        conn = connect_db()
                        cur = conn.cursor()
                        
                     
                        query3 = ("INSERT INTO kop(kundid, avgangsid, platser) VALUES(%s, %s, %s)")
                        data = (kundid, avgangsid, new_koptaplatser)
                        
                        cur.execute(query3, data)
                        conn.commit()
                        print("Köpet registrerades")
                        return redirect(url_for('resor_sok_ratt'))

                      
                    else:
                        
                        
                        return redirect(url_for('resor_sok_fel'))

        else:
            return flash("Något gick fel")

    except:
        return redirect(url_for('resor_sok_fel'))





#Trip page
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




#Trip page success
@app.route('/resor-registrera-ratt')
def resor_registrera_ratt():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM resa")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('resor-registrera-ratt.html', resor=results)




#Trip page fail
@app.route('/resor-registrera-fel')
def resor_registrera_fel():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM resa")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('resor-registrera-fel.html', resor=results)




#Reg trip
@app.route('/regresa', methods=['GET', 'POST'])
def regresa():
    try:
        if request.method == 'POST':
            new_avgangsland = request.form['avgangsland']
            new_avgangsstad = request.form['avgangsstad']
            new_ankomstland = request.form['ankomstland']
            new_ankomststad = request.form['ankomststad']
            new_datum_avgang = request.form['avgangsdatum']
            new_datum_ankomst = request.form['ankomstdatum']
            new_avgang = request.form['avgang']
            new_ankomst = request.form['ankomst']
            new_pris = request.form['pris']
            new_platser = request.form['platser']
            new_chaufforid = request.form['chaufforid']

            conn = connect_db()
            cur = conn.cursor()

            query = ("INSERT INTO resa(avgangsland, avgangsstad, ankomstland, ankomststad, avgangsdatum, ankomstdatum, avgang, ankomst, pris, platser, chaufforid) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
            data = (new_avgangsland, new_avgangsstad, new_ankomstland, new_ankomststad, new_datum_avgang, new_datum_ankomst, new_avgang, new_ankomst, new_pris, new_platser, new_chaufforid)

            cur.execute(query, data)
            conn.commit()

            return redirect(url_for('resor_registrera_ratt'))

        else:
            return redirect(url_for('resor_registrera_fel'))

    except:
        return redirect(url_for('resor_registrera_fel'))




#Edit driver
@app.route('/redchauffor', methods=['GET', 'POST'])
def redchauffor():

    try:
        if request.method == 'POST':
            
            chaufforid = request.form['chaufforid']
            avgangsid = request.form['avgangsid']
                                 

            conn = connect_db()
            cur = conn.cursor()
            
            query = ("UPDATE resa SET chaufforid = '{}' WHERE avgangsid = {};".format((chaufforid),(avgangsid)))
     
            cur.execute(query)
          
            conn.commit()
        
            print("Chaufför uppdaterades")
            return redirect(url_for('resor_registrera_ratt_chauffor'))
        
        else:
            return redirect(url_for('resor_registrera_fel'))                            
            

    except:
        print("Uppdatering av chaufför misslyckades")
        return redirect(url_for('resor_registrera_fel'))




#Register trip page edit driver success
@app.route('/resor-registrera-ratt-chauffor')
def resor_registrera_ratt_chauffor():
    #Ansluter till databasen och definerar en cursor.
    conn = connect_db()
    cur = conn.cursor()
    #Query
    try:
        cur.execute("SELECT * FROM resa")
    except:
        print("Fel när koden kördes!")
    results = cur.fetchall()
    return render_template('resor-registrera-ratt-chauffor.html', resor=results)


        

if __name__ == '__main__':
    app.run()