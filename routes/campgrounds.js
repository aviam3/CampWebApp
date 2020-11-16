var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


//INDEX - show all campgrounds
router.get("/" , function(req,res){
	//Get all campgrounds from the DB
	Campground.find({}, function(err, AllCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index",{campgrounds:AllCampgrounds, currentUser: req.user});
		}
	});
});

router.post("/",middleware.isLoggedIn , function(req,res){
	//get data from from and to add to campgrounds Page
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var NewCampgrounds = {name: name, image: image,price: price,description: desc, author: author};
	console.log("author befor create"+ req.user.__id+","+req.user.username);
	console.log("Before create->"+NewCampgrounds);
	//Create a new campground and save to DB
	Campground.create(NewCampgrounds, function(err, newCreated){
		if(err){console.log(err);}
		else{
			//redirect back to campgroundsPage
			req.flash("success", "Success Add New Campground");
			console.log("Success Add New Campground");
			res.redirect("/campgrounds")
		}
	});
});

//display the from that we send the data to the post rute
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});


//SHOW - show more info about ine campground
router.get("/:id", function(req,res){
Campground.findById(req.params.id).populate("comments").exec(  function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			// render the show template 
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

//EDIT- CAMP GROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){   
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			req.flash("error", "Cannot Edit");
			console.log(err);
		}
  	  res.render("campgrounds/edit", {campground: foundCampground});
	});
});

//UPDATE CAMP GROUOND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
		res.redirect("/campgrounds/"+ req.params.id);
		}
	})
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership ,function(req, res){
	Campground.findByIdAndRemove(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			req.flash("error", "Cannot Remove");
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
		req.flash("success", "Campground remove");
		res.redirect("/campgrounds/");
		}
	})
});


module.exports = router;