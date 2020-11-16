var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
	flash          = require("connect-flash"),
	passport       = require("passport"),
	LocalStrategy  = require("passport-local"),
	methodOverride = require('method-override'),
	Campground     = require("./models/campground"),
	seedDB		   = require("./seeds"),
	Comment        = require("./models/comment"),
	User           = require("./models/user");	

//requireing routes
var commentRoutes = require("./routes/comments"),
	campgroundRoute = require("./routes/campgrounds"),
	indexRoute = require("./routes/index");




//Creat YelpCamp DB inside mongodb
mongoose.connect('mongodb://localhost/Yelp_camp_v12', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname+"/public")); // for show.ejs public/stylesheet
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); 

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //authenticate from passport-local-mongppse
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//run this Function on every singal route-  is use for hader.ejs  when to show Logout/Login userName
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();    
});

 



app.use("/", indexRoute);
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoutes);







app.listen(3000, process.env.IP, function(){
	console.log("Server Yelp listening..");
});