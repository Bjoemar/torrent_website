 // Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var ObjectID = require('mongodb').ObjectID;
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var moment = require('moment');
require('moment-timezone');
moment.tz('Asia/Tokyo');
var crypto = require('crypto');

// var request = require("request");

var cheerio = require('cheerio');
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
var shortid = require('shortid');

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
}));


var fs = require('fs');
var request = require('request').defaults({ encoding: null });;

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/torrent";
var url = "mongodb+srv://joemar12:joemar12@torrent-oh6ud.mongodb.net/test?retryWrites=true&w=majority";


app.get('/AdultMovie_json', function(req , response) {
    response.sendFile(path.join(__dirname, 'jsons/AdultMovie.json'));

});
 
app.get('/movie_json_data', function(req , response) {
    response.sendFile(path.join(__dirname, 'jsons/Movies.json'));
});

app.get('/drama_json_data', function(req , response) {
    response.sendFile(path.join(__dirname, 'jsons/Drama.json'));
});

app.get('/entertaiment_json_data', function(req , response) {
    response.sendFile(path.join(__dirname, 'jsons/Entertainment.json'));
});

app.get('/documentary_json_data', function(req , response) {
    response.sendFile(path.join(__dirname, 'jsons/Documentary.json'));
});

app.get('/subtitle_json_data', function(req , response) {
    response.sendFile(path.join(__dirname, 'jsons/Subtitle.json'));
});

app.get('/daily_top_10', function(req , response) {
    response.sendFile(path.join(__dirname, 'jsons/daily_top_10.json'));
});

app.get('/latest_json_data', function(req , response) {
    response.sendFile(path.join(__dirname, 'jsons/latest.json'));
});

app.get('/notice_json', function(req , response) {
    response.sendFile(path.join(__dirname, 'jsons/Notice.json'));
});

app.get('/', function(req , response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/torrent_json', function(req , response) {
    response.sendFile(path.join(__dirname, 'jsons/test.json'));
});

app.get('/torrent_head', function(req , response) {
    response.sendFile(path.join(__dirname, '/partials/web/header.html'));
});

app.get('/mobile_header', function(req , response) {
    response.sendFile(path.join(__dirname, '/partials/web/mobile_header.html'));
});

app.get('/torrent_body', function(req , response) {
    response.sendFile(path.join(__dirname, '/partials/web/home.html'));
});

app.get('/view_torrent', function(req , response) {
    response.sendFile(path.join(__dirname, '/partials/web/view_content.html'));
});

app.get('/view_list', function(req , response) {
    response.sendFile(path.join(__dirname, '/partials/web/view_list.html'));
});

app.get('/crawling_codes', function(req , response) {
    response.sendFile(path.join(__dirname, 'partials/web/admin_partials/crawling.html'));
});

app.get('/web_content_modify', function(req , response) {
    response.sendFile(path.join(__dirname, 'partials/web/admin_partials/webiste_content.html'));
});

app.get('/web_site_data', function(req , response) {
    response.sendFile(path.join(__dirname, 'partials/web/admin_partials/web_site_data.html'));
});

app.get('/crawl_table', function(req , response) {
    response.sendFile(path.join(__dirname, 'partials/web/admin_partials/crawlingtable.html'));
});

app.get('/update_crawl', function(req , response) {
    response.sendFile(path.join(__dirname, 'partials/web/admin_partials/customize.html'));
});

app.get('/style/css', function(req , response) {
    response.sendFile(path.join(__dirname, 'assets/css/style.css'));
});

app.get('/style/admin_Css', function(req , response) {
    response.sendFile(path.join(__dirname, 'assets/css/admin.css'));
});

app.get('/torrent/script', function(req , response) {
    response.sendFile(path.join(__dirname, 'static/main.js'));
});

app.get('/admin', function(req , response) {
    response.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/post/:category/:torrent_id', function(req , response) {
    response.sendFile(path.join(__dirname, 'view.html'));
});

app.get('/:category', function(req , response) {
    response.sendFile(path.join(__dirname, 'torrent_list.html'));
});

app.get('/:category/page/:number', function(req , response) {
    response.sendFile(path.join(__dirname, 'torrent_list.html'));
});

app.get('/:category/type/:num/page/:number', function(req , response) {
    response.sendFile(path.join(__dirname, 'torrent_list.html'));
});


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


var Movie = 0;


server.listen(server_port , server_ip_address , function(){
	console.log('Listening on' + server_ip_address + ', port' + server_port);	
})




// server.listen(5000,function(){
// 	console.log('Starting server on port5000');
// })



get_collection_db('Movies','jsons/Movies.json');
get_collection_db('AdultMovie','jsons/AdultMovie.json');
get_collection_db('Drama','jsons/Drama.json');
get_collection_db('Streaming','jsons/Streaming.json');
get_collection_db('Entertainment','jsons/Entertainment.json');
get_collection_db('Documentary','jsons/Documentary.json');
get_collection_db('Sports','jsons/Sports.json');
get_collection_db('Utility','jsons/Utility.json');
get_collection_db('Game','jsons/Game.json');
get_collection_db('Comic','jsons/Comic.json');
get_collection_db('Subtitle','jsons/Subtitle.json');
get_collection_db('Notice','jsons/Notice.json');


MongoClient.connect(url, { useNewUrlParser: true ,  useUnifiedTopology: true}, function(err , db){
	if (err) throw err;

	var dbo = db.db('torrent');
	dbo.collection('torrent').find({}).limit(10).sort({'views' : -1}).toArray(function(err , main_result){
		if (main_result.length > 0) {
			if (err) throw err;
				arr_holder = [];
				for (i = 0; i < main_result.length; i++)
				{
					var obj = {
						'category' : main_result[i]['category'],
						'torrent_id' : main_result[i]['torrent_id'],
						'title' : main_result[i]['title'],
						'data' : main_result[i]['data'],
					}
					arr_holder.push(obj);
				}
				

				
				let collection_name = JSON.stringify(arr_holder);
				fs.writeFileSync('jsons/daily_top_10.json', collection_name);

			}
	})
})


MongoClient.connect(url, { useNewUrlParser: true ,  useUnifiedTopology: true}, function(err , db){
	if (err) throw err;

	var dbo = db.db('torrent');

	var result_holder = [];

	dbo.collection('torrent').find({}).limit(20).sort({_id : -1}).toArray(function(err , main_result){
		if (main_result.length > 0) {
			if (err) throw err;
				arr_holder = [];
				for (i = 0; i < main_result.length; i++)
				{
					var obj = {
						'category' : main_result[i]['category'],
						'torrent_id' : main_result[i]['torrent_id'],
						'title' : main_result[i]['title'],
						'data' : main_result[i]['data'],
					}
					arr_holder.push(obj);
				}
				
				
				let collection_name = JSON.stringify(arr_holder);
				fs.writeFileSync('jsons/latest.json', collection_name);
			}
	})
})





app.post('/save/torrent_notice', function(req , response) {


		let title = req.body.notice_title;
		let content = req.body.editordata;


  		var nowdate = month + "-" + date;

  			MongoClient.connect(url, { useNewUrlParser: true ,  useUnifiedTopology: true}, function(err , db){
  				if (err) throw err;
  				var dbo = db.db('torrent');

  				getNextSequence(dbo, 'Notice' , function(err, result){
  				    if(!err){

  				      var torrent_object = {
  				      	'link' : '',
  				      	'title' : title,
  				      	'size' :'',
  				      	'thumbnail' : '',
  				      	'type' :  null,
  				      	'image' : '',
  				      	'structure' : [content],
  				      	'views' : 0,
  				      	'category': 'Notice',
  				      	'like' : 0 ,
  				      	'dislike' : 0,
  				      	'data' : nowdate,	
  				      	'torrent_id' : result,
  				      }

			        	dbo.collection('torrent').insertOne(torrent_object, function(err, res){
			      		    db.close();
			      		}); //End of insertOne
  	
  				    }
  				})



  				function getNextSequence(dbo, category, callback) {


  					dbo.collection('torrent').find({'category' : category }).sort({_id : -1}).limit(1).toArray(function(err , data_res){
  						if (err) throw err;
  						if (data_res.length > 0) {
  						console.log(data_res[0])
  							var count = data_res[0]['torrent_id'] + 1;
  							callback(err, count);
  						} else {
  							callback(err, 1);
  						}

  					})

  				}

  			})

  			response.redirect('/admin');



});



app.post('/save_crawling_profile', function(req , response) {
   

	MongoClient.connect(url ,{ useNewUrlParser : true ,  useUnifiedTopology: true } , function(err ,db){

		let profile_name = req.body.parse_name;
		let primary_looping_code = req.body.primary_looping_code;
		let secondary_code = req.body.secondary_code;
		let profile_id = (shortid.generate() +profile_name+ shortid.generate());
		let web_url =  req.body.WEB_URL;
		let category = req.body.script_category;

		let profile_obj = {
			'profile_id' : profile_id,
			'website_url' : web_url,
			'profile_name' : profile_name,
			'primary_looping_code' : primary_looping_code,
			'secondary_code' : secondary_code,
			'category' : category,
		}
		var dbo = db.db("torrent");

  		dbo.collection('parsing_profile').insertOne(profile_obj, function(err, res){

  			if (err) throw err;
		    db.close();
		}); //End of insertOne

		response.redirect('/admin');

	});


});

app.post('/save_modify_gif', function(req , response) {
   

	MongoClient.connect(url ,{ useNewUrlParser : true ,  useUnifiedTopology: true } , function(err ,db){
		var dbo = db.db("torrent");
  		dbo.collection('gif_container').remove();
	});

	MongoClient.connect(url ,{ useNewUrlParser : true ,  useUnifiedTopology: true } , function(err ,db){

		let link1 = req.body.link1;
		let link2 = req.body.link2;
		let link3 = req.body.link3;

		let image_1 = req.body.image_1;
		let image_2 = req.body.image_2;
		let image_3 = req.body.image_3;

		let gif_data = {
			'link1' : link1,
			'image_1' : image_1,
			'link2' : link2,
			'image_2' : image_2,
			'link3' : link3,
			'image_3' : image_3,
		};


		var dbo = db.db("torrent");

  		dbo.collection('gif_container').insertOne(gif_data, function(err, res){
  			if (err) throw err;
		    db.close();
		}); //End of insertOne

		response.redirect('/admin');

	});


});






app.post('/update_crawling_profile', function(req , response) {
   

	MongoClient.connect(url ,{ useNewUrlParser : true ,  useUnifiedTopology: true } , function(err ,db){

		var dbo = db.db("torrent");
		
		// console.log(req.body)
  		dbo.collection('parsing_profile').updateOne({'profile_id' : req.body.profile_id},{
  			$set : {
  				'website_url' : req.body.WEB_URL,
  				'profile_name' : req.body.parse_name,
  				'primary_looping_code' : req.body.primary_looping_code,
  				'secondary_code' : req.body.secondary_code,
  				'category' : req.body.script_category,
  			},

  	
  		} , {multi : true});

		response.redirect('/admin');

	});


});

let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();







io.on('connection',function(socket){






	socket.on('loadgif',function(){
		MongoClient.connect(url, { useNewUrlParser: true ,  useUnifiedTopology: true}, function(err , db){
			if (err) throw err;

			var dbo = db.db('torrent');

			var result_holder = [];

			dbo.collection('gif_container').find().limit(1).toArray(function(err , main_result){
				if (main_result.length > 0) {
					if (err) throw err;
						socket.emit('gif_data' , main_result);
					}
			})
		})
	})

	socket.on('add_view',function(data){

			MongoClient.connect(url ,{ useNewUrlParser : true ,  useUnifiedTopology: true } , function(err ,db){
				var dbo = db.db('torrent');

				dbo.collection('torrent').find({_id : ObjectID(data)}).limit(1).toArray(function(err , main_result){
					if (main_result.length > 0) {
						if (err) throw err;
						
						
							var new_views =  main_result[0]['views'] + 1;
							console.log(new_views)
						
							dbo.collection('torrent').updateOne({_id : ObjectID(data)},{
								$set : {
									'views' : new_views,
								},

							} , {multi : true});

						}
				})

			});

	})


	socket.on('get_parsing_profile',function(){
		MongoClient.connect(url, { useNewUrlParser: true ,  useUnifiedTopology: true}, function(err , db){
				if (err) throw err;

				var dbo = db.db('torrent');

				dbo.collection('parsing_profile').find({}).sort({_id : -1}).toArray(function(err , main_result){
					if (main_result.length > 0) {
						if (err) throw err;
							socket.emit('parsing_profile' , main_result);	
					}
				})

			})
	})


	socket.on('remove_script',function(data){
		
			MongoClient.connect(url ,{ useNewUrlParser : true ,  useUnifiedTopology: true } , function(err ,db){
				var dbo = db.db("torrent");
		  		dbo.collection('parsing_profile').deleteOne({'profile_id' : data}); 
			});
	})



	socket.on('update_script',function(data){
		
			MongoClient.connect(url ,{ useNewUrlParser : true ,  useUnifiedTopology: true } , function(err ,db){
				var dbo = db.db("torrent");
		  		dbo.collection('parsing_profile').find({'profile_id' : data}).limit(1).toArray(function(err , script){
		  			if (script.length > 0) {
		  				if (err) throw err;
		  					socket.emit('script_modify' ,script);			
		  				}
		  			db.close();

		  		})	
			});
	})


	socket.on('initialize_script',function(data){

		sendLogs(socket,'Gettting the script in the database');
		var container_link = [];
		MongoClient.connect(url, { useNewUrlParser: true ,  useUnifiedTopology: true}, function(err , db){
			if (err) throw err;

			var dbo = db.db('torrent');
			var query = {'profile_id' : data['parse_id']};
			sendLogs(socket,'Initializing script');

			dbo.collection('parsing_profile').find(query).toArray(function(err , codes){
				if (codes.length > 0) {
					if (err) throw err;
					// console.log(codes);
						sendLogs(socket,'Analyze Output');

						var torrent = [];

						// eval(codes[0]['primary_looping_code']);
						// console.log(codes[0]['category'])
						sendLogs(socket,'Start web crawling .. ');	
						sendLogs(socket,'This Could Take a while');

						parse_page(torrent,container_link,socket,codes[0]['website_url'],data['start'],codes[0]['primary_looping_code'],codes[0]['secondary_code'],codes[0]['category']);

		
					}
				db.close();

			})
		})
	})

	socket.on('query',function(data){
		var torrent_id = data[data.length - 1];
		var torrent_category = data[data.length - 2];
		// console.log(torrent_category)
		var sort = {_id : -1}

		MongoClient.connect(url ,{ useNewUrlParser : true ,  useUnifiedTopology: true } , function(err ,db){

			var dbo = db.db("torrent");
			
			dbo.collection('torrent').find({'torrent_id' : parseInt(torrent_id) , 'category' : torrent_category}).sort({_id : -1}).limit(1).toArray(function(err , main_result){


				if (main_result.length > 0) {
					if (err) throw err;
					// console.log(main_result)
						socket.emit('view_file' ,main_result);					
					}
				db.close();

			})

		});


	})

	socket.on('getList',function(data){
		MongoClient.connect(url ,{ useNewUrlParser : true ,  useUnifiedTopology: true } , function(err ,db){


			var dbo = db.db("torrent");
			if (data.page < 0 || data.page == '') {
				var skip = 0 * 20;
			} else {
				var skip = (data.page - 1) * 20;
			}
			

			if (data.type != null) {

				var query = {'category' : data.category , 'type' : parseInt(data.type)}
			}  else {

				var query = {'category' : data.category}	
			}

			dbo.collection('torrent').find(query).sort({_id : -1}).skip(skip).limit(20).toArray(function(err , main_result){

				if (main_result.length > 0){
					if (err) throw err;

					var arr_holder = [];

					for(i = 0; i < main_result.length; i++)
					{
						var obj = {
							'category' : main_result[i]['category'],
							'torrent_id' : main_result[i]['torrent_id'],
							'thumbnail' : main_result[i]['thumbnail'],
							'title' : main_result[i]['title'],
							'size' : main_result[i]['size'],
						}

						arr_holder.push(obj)
					}

					console.log('JOEMAR')
					socket.emit('list_result' ,arr_holder);					
				}
				db.close();

			})

			dbo.collection('torrent').find(query).count(function(err , count){

				socket.emit('torrent_total' ,{'count' : count  , 'type' : data.type});					
					
				db.close();

			})


		});
	})



	socket.on('get_torrent_data',function(data){
		console.log(data)
		MongoClient.connect(url ,{ useNewUrlParser : true ,  useUnifiedTopology: true } , function(err ,db){


			var dbo = db.db("torrent");

			var query = {'category' : data.category}
			dbo.collection('torrent').find(query).sort({_id : -1}).limit(20).toArray(function(err , main_result){

				if (main_result.length > 0) {
					if (err) throw err;

						socket.emit('pass_admin_data' ,main_result);					
				}
				db.close();

			})
		});

	})

	socket.on('browse_torrent',function(data){
		MongoClient.connect(url ,{ useNewUrlParser : true ,  useUnifiedTopology: true } , function(err ,db){


			var dbo = db.db("torrent");


			if (data.page < 0 || data.page == '') {
				var skip = 0 * 20;
			} else {
				var skip = (data.page - 1) * 20;
			}

			


				var query = {'category' : data.category}

				dbo.collection('torrent').find(query).sort({_id : -1}).limit(20).skip(skip).toArray(function(err , main_result){

					if (main_result.length > 0) {
						if (err) throw err;

							socket.emit('pass_admin_data' ,main_result);					
					} else {
						socket.emit('status_no_data')
					}
					db.close();

				})

		});

	})



	socket.on('delete_torrent' ,function(data){
		MongoClient.connect(url ,{ useNewUrlParser : true ,  useUnifiedTopology: true } , function(err ,db){
			var dbo = db.db("torrent");
	  		dbo.collection('torrent').deleteOne({'_id' : ObjectID(data.id)}); 
		});	
	})







})


// FUNTIONS

function get_collection_db(collection,path_name) {
	MongoClient.connect(url, { useNewUrlParser: true ,  useUnifiedTopology: true}, function(err , db){
		if (err) throw err;

		var dbo = db.db('torrent');

		var result_holder = [];

		var collection_name = collection;

		dbo.collection('torrent').find({'category' : collection}).limit(10).sort({_id : -1}).toArray(function(err , main_result){
			if (main_result.length > 0) {
				if (err) throw err;
					arr_holder = [];

					for (i = 0; i < main_result.length; i++)
					{
						var obj = {
							'category' : main_result[i]['category'],
							'torrent_id' : main_result[i]['torrent_id'],
							'title' : main_result[i]['title'],
							'data' : main_result[i]['data'],
						}
						arr_holder.push(obj);
					}
			
					
					let collection_name = JSON.stringify(arr_holder);
					fs.writeFileSync(path_name, collection_name);
				}
		})
	})
}

 
// parse_page(container_link);

function parse_page(torrent,container_link,socket,link,start,first_code,second_code,category){

	if (start == -1) {
		var newurl = link;
	} else  {
		var newurl = link+start
	}
	request(newurl,function(err,res,body) {
		if (err) {
			sendLogs(socket,'Something wrong. The data is '+err[0]);	
		} else {
			let $ = cheerio.load(body);

			eval(first_code);
			run_crawl_1(container_link);

			
	
			setTimeout(function(){
				
				start--;
				if (start > 0) {
					parse_page(torrent,container_link,socket,link,start,first_code,second_code,category)
				} else {
					// console.log(container_link);
					var count = container_link.length;
					// eval(second_code)
					sendLogs(socket,'TOTAL FILES GATHER '+count);	
					setTimeout(function(){
						get_torrent_info(torrent,count,container_link,category,second_code,socket);
					},3000);

				}
			},1500);
		}
	})

}

function sendLogs(socket,message) {
	socket.emit('recieve_log', {'message' : message});
}

function get_torrent_info(torrent , max , container_link, category, second_code , socket) {
	max--;
	if (max >= 0) {
		var count = container_link.length;
		var link = container_link[max]['link'];
		console.log(link)
		request(link,function(err,res,body) {
			
			if (err) {
				console.log(err)
			} else {
				let $ = cheerio.load(body);

				 // Getting The table information
				var torrent_obj = [];

				eval(second_code);
				run_crawl_2(torrent_obj);

				for(i = 0; i < torrent_obj['images'].length; i++) {
					request.get(torrent_obj['images'][i], function (error, response, body) {
					   
					    if (!error && response.statusCode == 200) {
					        data = "data:" + response.headers["content-type"] + ";base64," + new Buffer.from(body).toString('base64');
					        torrent_obj['torrent_conv'].push(data);   
					     
					    }
					});
				}

				request.get(container_link[max]['thumbnail'], function (error, response, body) {
				   
				    if (!error && response.statusCode == 200) {
				        data = "data:" + response.headers["content-type"] + ";base64," + new Buffer.from(body).toString('base64');
				        torrent_obj.thumbnail = data;
				     
				    }
				});


				torrent_obj.size = container_link[max]['size'];
				torrent_obj.type = container_link[max]['type'];

				torrent.push(torrent_obj);
				setTimeout(function(){
					if (torrent != []) {
						save_torrent(torrent,category,link,socket);  
					} else {
						sendLogs(socket, 'Torrent Number '+max +'is not saved!');	
						// return;
					}
				},5000);

			
			}
		});


		var data_pecent = ((count - (max)) / count) * 100;

		socket.emit('percent' , data_pecent);

		setTimeout(function(){
			torrent = [];
			get_torrent_info(torrent , max , container_link, category , second_code , socket)	
		},15000);

	} else {
		socket.emit('web_crawl_done');

		MongoClient.connect(url, { useNewUrlParser: true ,  useUnifiedTopology: true}, function(err , db){
			if (err) throw err;

			var dbo = db.db('torrent');

			var result_holder = [];

			dbo.collection('torrent').find({}).limit(20).sort({_id : -1}).toArray(function(err , main_result){
				if (main_result.length > 0) {
					if (err) throw err;
						arr_holder = [];
						for (i = 0; i < main_result.length; i++)
						{
							var obj = {
								'category' : main_result[i]['category'],
								'torrent_id' : main_result[i]['torrent_id'],
								'title' : main_result[i]['title'],
								'data' : main_result[i]['data'],
							}
							arr_holder.push(obj);
						}
						
						
						let collection_name = JSON.stringify(arr_holder);
						fs.writeFileSync('jsons/latest.json', collection_name);
					}
			})
		})

		if (category == 'Movies') {
			get_collection_db('Movies','jsons/Movies.json');
		} else if (category == 'AdultMovie') {
			get_collection_db('AdultMovie','jsons/AdultMovie.json');
		} else if (category == 'Drama') {
			get_collection_db('Drama','jsons/Drama.json');
		} else if (category == 'Streaming') {
			get_collection_db('Streaming','jsons/Streaming.json');
		} else if (category == 'Entertainment') {
			get_collection_db('Entertainment','jsons/Entertainment.json');
		} else if (category == 'Documentary') {
			get_collection_db('Documentary','jsons/Documentary.json');
		} else if (category == 'Sports') {
			get_collection_db('Sports','jsons/Sports.json');
		} else if (category == 'Utility') {
			get_collection_db('Utility','jsons/Utility.json');
		} else if (category == 'Game') {
			get_collection_db('Game','jsons/Game.json');
		} else if (category == 'Comic') {
			get_collection_db('Comic','jsons/Comic.json');
		} else if (category == 'Subtitle') {
			get_collection_db('Subtitle','jsons/Subtitle.json');
		} else if (category == 'Notice') {
			get_collection_db('Notice','jsons/Notice.json');
		} 
		
		

	}

}



function save_torrent(torrent,category,link,socket) {

	// console.log(torrent[0]);

	var nowdate = month + "-" + date;

		MongoClient.connect(url, { useNewUrlParser: true ,  useUnifiedTopology: true}, function(err , db){
			if (err) throw err;
			var dbo = db.db('torrent');

			getNextSequence(dbo, category , function(err, result){
			    if(!err){
			      var torrent_object = {
			      	'link' : link,
			      	'title' : torrent[0]['title'],
			      	'size' : torrent[0]['size'],
			      	'thumbnail' : torrent[0]['thumbnail'],
			      	'type' :  torrent[0]['type'],
			      	'image' : torrent[0]['torrent_conv'],
			      	'structure' : torrent[0]['information'],
			      	'views' : 0,
			      	'category': category,
			      	'like' : 0 ,
			      	'dislike' : 0,
			      	'data' : nowdate,	
			      	'torrent_id' : result,
			      }



			      dbo.collection('torrent').find({'title' : torrent[0]['title'] , 'category' : category}).limit(1).toArray(function(err , main_result){
			      	if (err) throw err;
			      	if (main_result.length > 0) {
		      			sendLogs(socket,'Torrent ( <strong style="color : red">'+ torrent[0]['title']+'</strong> ) Is already Exsist !');
		      			db.close();
			      	} else {
			      		sendLogs(socket,'Torrent ( <strong style="color : green">'+torrent[0]['title']+'</strong> ) has been saved.');	
			        		dbo.collection('torrent').insertOne(torrent_object, function(err, res){
			        			if (err) throw err;
			      		    db.close();
			      		}); //End of insertOne
			      	}
			      })

			    }
			})



			function getNextSequence(dbo, category, callback) {


				dbo.collection('torrent').find({ 'category': category }).sort({_id : -1}).limit(1).toArray(function(err , data_res){
					if (err) throw err;
					if (data_res.length > 0) {
						var count = data_res[0]['torrent_id'] + 1;
						callback(err, count);
					} else {
						callback(err, 1);
					}

				})

			}



		})


}



