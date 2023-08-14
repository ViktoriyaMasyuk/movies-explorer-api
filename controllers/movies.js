const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequestError');
const NotFound = require('../errors/NotFoundError');
const Forbidden = require('../errors/ForbiddenError');

// возвращает все сохранённые текущим пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find(req.user._id).sort({ year: -1 })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(err));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .orFail(() => { throw new NotFound('Фильм с указанным id не найден'); })
    .then((movie) => {
      if (!(movie.owner.toJSON() === req.user._id)) {
        throw new Forbidden('Нет доступа удалять фильмы других пользователей.');
      }
      return Movie.findByIdAndRemove(movieId)
        .then((deleteMovie) => res.send(deleteMovie))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Передан некорректный id фильма'));
      } else {
        next(err);
      }
    });
};
