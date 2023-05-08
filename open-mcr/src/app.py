import csv
import os
import shutil
from pathlib import Path

import file_handling
import grid_info as grid_i
from file_handling import parse_path_arg
from flask import Flask, jsonify, make_response, request, send_file
from flask_cors import CORS
from process_input import process_input

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['POST'])
def index():

    try:
        shutil.rmtree('input')
        shutil.rmtree('output')
    except FileNotFoundError:
        pass

    try:
        os.mkdir('input')
        os.mkdir('output')
    except FileExistsError:
        pass

    answer_key = request.files['answer-key']

    answer_key.save('input/answer-keys.csv')

    image_file = request.files['answer-sheet']

    image_file.save('input/answer-sheet.jpg')

    input_folder = file_handling.filter_images(
        file_handling.list_file_paths(Path('input')))
    output_folder = Path('output')

    process_input(
        input_folder,
        output_folder,
        False,
        False,
        'input/answer-keys.csv',
        None,
        False,
        None,
        True,
        grid_i.form_75q,
        None,
        None,
    )

    response = make_response(send_file(Path().cwd() / 'output/results.csv'))
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == '__main__':
    app.run(debug=True)
