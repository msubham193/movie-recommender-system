from joblib import dump, load
import pandas as pd
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, render_template, jsonify


movies_dict = load(open('movies_dict.joblib', 'rb'))
similarity = load(open('similarity.joblib', 'rb'))
movies = pd.DataFrame(movies_dict)


def getAllMovies():
    data = pd.read_csv('movie.csv')
    return list(data['movie_title'].str.capitalize())


def Recommend2(movie: str):
    movie = movie.lower()

    if movie not in movies['movie_title'].unique():
        return 'Sorry! The movie you requested is not present in our database'
    else:
        movie_idx = movies[movies['movie_title'] == movie].index[0]
        distances = similarity[movie_idx]
        movies_list = sorted(list(enumerate(distances)),
                             reverse=True, key=lambda x: x[1])[1:30]

        recommended_movies = []
        recommended_movies_posters = []
        for i in movies_list:
            # movie_id = movies.iloc[i[0]].index[0]
            recommended_movies.append(movies.iloc[i[0]].movie_title)
        # recommended_movies_posters.append(fetch_poster(movie_id))

        return recommended_movies


app = Flask(__name__, static_folder='movie-app/public',
            static_url_path='/')

CORS(app)


@app.route('/api/movies')
@cross_origin()
def moviess():
    # returns all the movies in the dataset
    movies = getAllMovies()
    result = {'arr': movies}
    return result


@app.route('/')
@cross_origin()
def home():
    return "Sonu"


@app.route('/api/similarity/<name>')
@cross_origin()
def similarityy(name: str):
    print(name)
    movie = name
    recommendation = Recommend2(name)
    # return recommendation
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
