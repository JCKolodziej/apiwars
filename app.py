from flask import Flask, render_template

app = Flask(__name__)


@app.route('https://secret-hamlet-67983.herokuapp.com/')
def main():
    return render_template('main.html')


if __name__ == '__main__':
    app.run()
