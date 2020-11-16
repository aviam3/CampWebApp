//all the middleare here
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleareObj = {};

//Campground
middleareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
		 req.flash("error", "Campgrounds not found");
		 res.redirect("/campgrounds");
		 }
		else{
			if(foundCampground.author.id.equals(req.user._id)){
			 next();
		    } else{
				req.flash("error", "You dont have permission to do that");
				console.log("You dont have permission to do that");
			    res.redirect("back");
			}
		 }
		});
	}
	else{
		req.flash("error", "You need to be logged in to do that");
	    console.log("You need to be loogged in to do that");
		res.redirect("back");
	}
}

//Comments
middleareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		console.log("req.params.id: "+req.params.id);
		console.log("req.params.comment_id: "+req.params.comment_id);
		console.log("req.body.comment: "+req.body.comment);
		console.log("req.user._id: "+req.user._id);


		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err ){
		  res.redirect("back");
		 }
		else{
			console.log("foundComment: "+ foundComment);
			//console.log("foundComment.author: "+ foundComment.author);

			if(foundComment.author.id.equals(req.user._id)){
			 next();   
		    } else{
			  req.flash("error", "You don't have permission to do that");
			  res.redirect("/campgrounds");
			}
		 }
		});
	}
	else{
	 req.flash("error", "You need to be loogged in to do that");
	 console.log("You need to be loogged in to do that");
		res.redirect("back");
	}
}


middleareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	//flash message
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}

module.exports = middleareObj;
