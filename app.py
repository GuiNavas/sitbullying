from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = 'chave_secreta_para_o_projeto'

def init_db():
    conn = sqlite3.connect('bullying.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS denuncias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            tipo_bullying TEXT,
            local TEXT,
            descricao TEXT,
            data_denuncia TEXT,
            status TEXT DEFAULT 'Pendente'
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS estatisticas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo TEXT,
            valor INTEGER,
            ano INTEGER
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contatos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            assunto TEXT,
            mensagem TEXT,
            data_envio TEXT
        )
    ''')

    cursor.execute("SELECT COUNT(*) FROM estatisticas")
    if cursor.fetchone()[0] == 0:
        dados_simulados = [
            ('Cyberbullying', 45, 2023),
            ('Bullying Físico', 30, 2023),
            ('Bullying Verbal', 60, 2023),
            ('Bullying Social', 25, 2023),
            ('Cyberbullying', 50, 2024),
            ('Bullying Físico', 25, 2024),
            ('Bullying Verbal', 55, 2024),
            ('Bullying Social', 30, 2024)
        ]
        cursor.executemany("INSERT INTO estatisticas (tipo, valor, ano) VALUES (?, ?, ?)", dados_simulados)

    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sobre')
def sobre():
    return render_template('sobre.html')

@app.route('/denuncia', methods=['GET', 'POST'])
def denuncia():
    if request.method == 'POST':
        is_anon = request.form.get('denuncia_anonima') == 'on'
        nome = request.form.get('nome') if not is_anon else None
        email = request.form.get('email') if not is_anon else None
        tipo_bullying = request.form['tipo_bullying']
        local = request.form.get('local', '')
        descricao = request.form['descricao']
        data_denuncia = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        conn = sqlite3.connect('bullying.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO denuncias (nome, email, tipo_bullying, local, descricao, data_denuncia)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (nome, email, tipo_bullying, local, descricao, data_denuncia))
        conn.commit()
        conn.close()

        flash('Denúncia registrada com sucesso! (Anônima)' if is_anon else 'Denúncia registrada com sucesso!', 'success')
        return redirect(url_for('denuncia'))

    return render_template('denuncia.html')

@app.route('/estatisticas')
def estatisticas():
    conn = sqlite3.connect('bullying.db')
    cursor = conn.cursor()

    cursor.execute("SELECT tipo, valor FROM estatisticas WHERE ano = 2023")
    dados_2023 = cursor.fetchall()

    cursor.execute("SELECT tipo, valor FROM estatisticas WHERE ano = 2024")
    dados_2024 = cursor.fetchall()

    conn.close()

    # Retorna dados sem gráfico
    return render_template('estatisticas.html', 
                         dados_2023=dados_2023, 
                         dados_2024=dados_2024,
                         graph_url=None)

@app.route('/contato', methods=['GET', 'POST'])
def contato():
    if request.method == 'POST':
        nome = request.form.get('nome')
        email = request.form.get('email')
        assunto = request.form.get('assunto')
        mensagem = request.form.get('mensagem')
        data_envio = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        conn = sqlite3.connect('bullying.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO contatos (nome, email, assunto, mensagem, data_envio)
            VALUES (?, ?, ?, ?, ?)
        ''', (nome, email, assunto, mensagem, data_envio))
        conn.commit()
        conn.close()

        flash('Mensagem enviada com sucesso! Obrigado pelo contato.', 'success')
        return redirect(url_for('contato'))
    
    return render_template('contato.html')

@app.route('/admin-login', methods=['POST'])
def admin_login():
    password = request.form.get('password', '').strip()
    if password == 'DanielGuilherme':
        session['is_admin'] = True
        return jsonify({'ok': True}), 200
    return jsonify({'ok': False, 'error': 'Senha inválida'}), 401

@app.route('/admin')
def admin_dashboard():
    if not session.get('is_admin'):
        flash('Acesso restrito. Autentique-se como administrador.', 'error')
        return redirect(url_for('index'))
    
    conn = sqlite3.connect('bullying.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM contatos ORDER BY id DESC LIMIT 200')
    contatos = cursor.fetchall()

    cursor.execute('SELECT * FROM denuncias ORDER BY id DESC LIMIT 200')
    denuncias = cursor.fetchall()

    cursor.execute('''
        SELECT COALESCE(tipo_bullying, 'Não informado') as tipo, COUNT(*)
        FROM denuncias
        GROUP BY tipo
        ORDER BY COUNT(*) DESC
    ''')
    denuncias_por_tipo = cursor.fetchall()

    cursor.execute('''
        SELECT 
            CASE 
                WHEN nome IS NULL OR nome = '' THEN 'Anônima'
                ELSE 'Identificada'
            END as tipo_anonimato,
            COUNT(*) as quantidade
        FROM denuncias
        GROUP BY tipo_anonimato
    ''')
    denuncias_anonimato = cursor.fetchall()

    conn.close()

    return render_template('admin.html', 
                         contatos=contatos, 
                         denuncias=denuncias, 
                         denuncias_por_tipo=denuncias_por_tipo,
                         denuncias_anonimato=denuncias_anonimato,
                         chart_tipo_b64=None, 
                         chart_anonimato_b64=None)

@app.route('/admin-logout')
def admin_logout():
    session.pop('is_admin', None)
    flash('Sessão de administrador encerrada.', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
