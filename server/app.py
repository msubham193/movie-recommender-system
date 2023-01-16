import pandas as pd
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, render_template, jsonify


def dataPreprocessing():
    data = pd.read_csv('movie.csv')
    return data


data = dataPreprocessing()


def createSimilarity():
    cv = CountVectorizer()
    countMatrix = cv.fit_transform(data['comb'])
    similarity = cosine_similarity(countMatrix)
    return similarity


def getAllMovies():
    data = pd.read_csv('movie.csv')
    return list(data['movie_title'].str.capitalize())


def Recommend(movie):
    movie = movie.lower()
    data = dataPreprocessing()
    similarity = createSimilarity()
    if movie not in data['movie_title'].unique():
        return 'Sorry! The movie you requested is not present in our database'
    else:
        movieIdx = data.loc[data['movie_title'] == movie].index[0]
        lst = list(enumerate(similarity[movieIdx]))
        lst = sorted(lst, key=lambda x: x[1], reverse=True)
        lst = lst[1:30]
        movieList = []
        for i in range(len(lst)):
            a = lst[i][0]
            movieList.append(data['movie_title'][a])
        return movieList


app = Flask(__name__, static_folder='movie-app/public',
            static_url_path='/')

CORS(app)


@app.route('/api/movies', methods=['GET'])
@cross_origin()
def movies():
    # returns all the movies in the dataset
    movies = getAllMovies()
    result = {'arr': movies}
    return result


@app.route('/')
@cross_origin()
def home():
    return "Sonu"


@app.route('/api/similarity/<name>', methods=['POST','GET'])
@cross_origin()
def similarity(name):
    print(name)
    movie = name
    recommendation = Recommend(movie)
    if type(recommendation) == type('string'):
        resultArray = recommendation.split('---')
        apiResult = {'movies': resultArray}
        return jsonify(apiResult)
    else:
        movieString = '---'.join(recommendation)
        resultArray = movieString.split('---')
        apiResult = {'movies': resultArray}
        return jsonify(apiResult)


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
