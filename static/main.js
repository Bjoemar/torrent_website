


if (window.innerWidth > 768) {
	$('#web_head').load('/torrent_head');
} else {
	$('#web_head').load('/mobile_header');
}

f

$('#web_body').load('/torrent_body');

// $('#view_body').load('/view_torrent');

// $('#list_body').load('/view_list');

var type;

$('#parse_type').change(function(){
	type = $(this).val();
	console.log(type)
})

socket.on('parsing_profile',function(data){
	var count = data.length;
	for(x = 0; x < count; x++) {
		$('#parse_type').append(new Option(data[x]['profile_name'], data[x]['profile_id']));

	}
});

$('#crawl_data').click(function(){
	if ($('$parse_type').val() != 'null') {
		socket.emit('initalize_dom_cralw')
	}
})







// parse()

socket.emit('load_adult_10');


$('#crawl').click(function(){
	socket.emit('gettorrent');
})

$(document).ready(function(){

	$(window).resize(function() {
	  $('.slider').css('height' , $('.slick-track').height() * 1.2);
	});

	setTimeout(function(){

		$('.animated_slide').slick({
			  infinite: true,
			  slidesToShow: 6,
			  slidesToScroll: 1,
			  arrows: false,
			  autoplay: true,
			  autoplaySpeed: 1500,
			  responsive: [
			     {
			       breakpoint: 600,
			       settings: {
			         slidesToShow: 3,
			         slidesToScroll: 1,
			       }
			     },

			   ]
		})

		setTimeout(function(){
			$('.animated_slide').css({'opacity' : '1'})

			setTimeout(function(){
				$('.slider').css('height' , $('.slick-track').height() * 1.2);
			},2000);
			
		},200)
	},500);
});





socket.on('Movies',function(data){
	console.table(data)
	append_data(data,'movie_top_10','성인');
})

socket.on('AdultMovie',function(data){
	append_data(data,'adult_top_10','영화');

})

socket.on('Drama',function(data){
	
	append_data(data,'drama_top_10','TV드라마');

})

socket.on('Entertainment',function(data){
	append_data(data,'shows_top_10','TV예능');
})


socket.on('Documentary',function(data){
	append_data(data,'docs_top_10','다큐/시사');
})


socket.on('Subtitle',function(data){
	append_data(data,'archive_top_10','자막자료실');
});


socket.on('main_top_10',function(data){
	append_data(data,'main_top_10','영화');
});

socket.on('gif_data',function(data){
	$('.gif_holder').eq(0).html('<a target="_blank" href="//'+data[0]['link1']+'"><img src="'+data[0]['image_1']+'"></a>')
	$('.gif_holder').eq(1).html('<a target="_blank" href="//'+data[0]['link2']+'"><img src="'+data[0]['image_2']+'"></a>')
	$('.gif_holder').eq(2).html('<a target="_blank" href="//'+data[0]['link3']+'"><img src="'+data[0]['image_3']+'"></a>')
})


socket.on('latest_update',function(db_data){
	var count = db_data.length;
	$('#latest_update').html('');
	for(i = 0; i < count; i++) 
	{

		$('#latest_update').append('<li class="post_row">'+
										'<span class="num_pos_a"><i class="fas fa-caret-right"></i></span>'+
										'<label class="post_title"><a target="_blank" href="/post/'+db_data[i]['category']+'/'+db_data[i]['torrent_id']+'">'+db_data[i]['title']+'</a></label>'+
										'<span class="list_time">'+db_data[i]['data']+'</span>'+
										'<div class="clear"></div>'+
									'</li>')
	}

});

socket.on('Notice' ,function(db_data){
	var count = db_data.length;
	$('#notice_list').html('');
	for(i = 0; i < 5; i++) 
	{

		$('#notice_list').append('<li class="post_row">'+
										'<span class="num_pos_a"><i class="fas fa-caret-right"></i></span>'+
										'<label class="post_title"><a target="_blank" href="/post/'+db_data[i]['category']+'/'+db_data[i]['torrent_id']+'">'+db_data[i]['title']+'</a></label>'+
										'<span class="list_time">'+db_data[i]['data']+'</span>'+
										'<div class="clear"></div>'+
									'</li>')
	}
})

socket.on('DailyTop10',function(db_data){
	var count = db_data.length;
	$('#main_top_10').html('');
	for(i = 0; i < count; i++) 
	{

		$('#main_top_10').append('<li class="post_row">'+
										'<span class="num_pos">'+(i + 1)+'</span>'+
										'<label class="post_title"><a target="_blank" href="/post/'+db_data[i]['category']+'/'+db_data[i]['torrent_id']+'">'+db_data[i]['title']+'</a></label>'+
										'<span class="list_time">'+db_data[i]['data']+'</span>'+
										'<div class="clear"></div>'+
									'</li>')
	}
})

function append_data(db_data,id_name,cat) {
	// $('.categories').html(cat);
	var count = db_data.length;
	$('#'+id_name).html('');
	for(i = 0; i < count; i++) 
	{

		$('#'+id_name).append('<li class="post_row">'+
										'<span class="num_pos">'+(i + 1)+'</span>'+
										'<label class="post_title"><a target="_blank" href="/post/'+db_data[i]['category']+'/'+db_data[i]['torrent_id']+'">'+db_data[i]['title']+'</a></label>'+
										'<span class="list_time">'+db_data[i]['data']+'</span>'+
										'<div class="clear"></div>'+
									'</li>')
	}
}



$(document).on('click','.download_link',function(){
	document.location.href  = $(this).data('download');
})


// function file_download(link) {
// 	document.location.href = link;
// }


