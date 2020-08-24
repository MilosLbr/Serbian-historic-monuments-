from flask import Flask, render_template, request, jsonify
from transliterateLatToCyr import transliterateLatToCyr
import sqlite3

app = Flask(__name__)
tableNames =  ['celaLista', 'arheoloskaNalazista', 'spomeniciUnesco', 'prostorneKulturnoIstorijskeCeline', 'spomeniciKulture', 'znamenitaMesta']


@app.route('/')
def mainPage():
    return render_template('index.html')

@app.route('/search')
def search():
    # parameters from json request
    tableName = request.args.get('category')
    requestInputValue = request.args.get('inputValue')
    transliteratedInput = transliterateLatToCyr(requestInputValue.lower()) # change latin to cyrillic script

    inputValue = "%" + transliteratedInput.upper() + "%"
    
    if (tableName not in tableNames):
        return jsonify({})

    # connect to database
    dbconnection = sqlite3.connect('places.db')
    dbconnection.row_factory = dict_factory
    
    cursor = dbconnection.cursor()

    # create a query and execute
    query  = "SELECT * from {} WHERE upperPlaceName LIKE :in".format(tableName)
    wholelist = cursor.execute(query, {'in': inputValue}).fetchall()
    
    return jsonify(wholelist)


def dict_factory(cursor, row):
    # source:  https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.row_factory
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    
    return d

if __name__ == "__main__":
    app.run()