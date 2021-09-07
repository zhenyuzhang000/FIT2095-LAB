var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    removeactor:function(req,res){
        Movie.findOne({_id:req.params.mid},function(err,movie){
            if(err) return res.status(400).json(err);
            for(let i = 0;i<movies.actor.length;i++){
                if(movies.actor[i]==req.params.mid){
                    movies.actor.splice(i,1);
                    movies.save(function(err){
                         return res.json(movies);
                    });
                }
            }
            res.status(404).json({errorMsg:"No such actor"});
        });
    },
    addActor:function(req,res){
        Movie.findOne({ _id: req.params.id }, function (err, movies) {
            if (err) return res.status(400).json(err);
            if (!movies) return res.status(404).json();
            Actor.findOne({ _id: req.body.id }, function (err,actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movies.actor.push(actor._id);
                movies.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movies);
                });
            })
        });
    },
    getProyear:function(req,res){
        year1 = Number(req.params.year1);
        year2 = Number(req.params.year2);
        if(year1>year2){
            return res.status(400).json({errorMsg:"year2 must smaller than year1"});
        }
        Movie.where('year').gte(year1).lte(year2).exec(function(err,movies){
            if(err) return res.status(400).json(err);
            res.json(movies);
        }); 
    },
    deleteTwoYearsMovie:function(req,res){

    }
    
};