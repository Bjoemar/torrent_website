
if (window.innerWidth > 768) {
	$('#web_head').load('/torrent_head');
} else {
	$('#web_head').load('/mobile_header');
}


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


socket.emit('loadgif')


$('#crawl').click(function(){
	socket.emit('gettorrent');
})

$(document).ready(function(){

	$(window).resize(function() {
	  $('.slider').css('height' , $('.slick-track').height() * 1.2);
	});

	setTimeout(function(){

		$('.animated_slide').slick({
			  prevArrow:$('.prev'),
			  nextArrow:$('.next'),
			  infinite: true,
			  slidesToShow: 6,
			  slidesToScroll: 1,
			  arrows: true,
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
			},1500);
			
		},200)
	},500);




$.ajax({
	url : '/AdultMovie_json',
	method : 'get',
	success:function(data){
		append_data(data,'adult_top_10','성인');
	}
})

$.ajax({
	url : '/movie_json_data',
	method : 'get',
	success:function(data){
		append_data(data,'movie_top_10','성인');
	}
})

$.ajax({
	url : '/drama_json_data',
	method : 'get',
	success:function(data){
		append_data(data,'drama_top_10','성인');
	}
})


$.ajax({
	url : '/entertaiment_json_data',
	method : 'get',
	success:function(data){
		append_data(data,'shows_top_10','성인');
	}
})


$.ajax({
	url : '/documentary_json_data',
	method : 'get',
	success:function(data){
		append_data(data,'docs_top_10','성인');
	}
})


$.ajax({
	url : '/subtitle_json_data',
	method : 'get',
	success:function(data){
		append_data(data,'archive_top_10','성인');
	}
})



$.ajax({
	url : '/daily_top_10',
	method : 'get',
	success:function(data){
		var count = data.length;
		$('#main_top_10').html('');
	
		for(i = 0; i < count; i++) 
		{

			$('#main_top_10').append('<li class="post_row">'+
											'<span class="num_pos">'+(i + 1)+'</span>'+
											'<label class="post_title"><a target="_blank" href="/post/'+data[i]['category']+'/'+data[i]['torrent_id']+'">'+data[i]['title']+'</a></label>'+
											'<span class="list_time">'+data[i]['data']+'</span>'+
											'<div class="clear"></div>'+
										'</li>')
		}
	}
})



$.ajax({
	url : '/daily_top_10',
	method : 'get',
	success:function(data){
		var count = data.length;
		$('#main_top_10').html('');
	
		for(i = 0; i < count; i++) 
		{

			$('#main_top_10').append('<li class="post_row">'+
											'<span class="num_pos">'+(i + 1)+'</span>'+
											'<label class="post_title"><a target="_blank" href="/post/'+data[i]['category']+'/'+data[i]['torrent_id']+'">'+data[i]['title']+'</a></label>'+
											'<span class="list_time">'+data[i]['data']+'</span>'+
											'<div class="clear"></div>'+
										'</li>')
		}
	}
})



$.ajax({
	url : '/feature_list',
	method : 'get',
	success:function(data){
		console.log(data)
		var count = data.length;
		$('.feature_slider').html('');
	
		for(i = 0; i < count; i++) 
		{

			$('.feature_slider').append('<div class="slider_content">'+
							'<a target="_blank" href="/post/'+data[i]['category']+'/'+data[i]['torrent_id']+'"><img src="'+data[i]['thumbnail']['secure_url']+'"></a>'+
							'<p class="post_title">'+data[i]['title']+'</p><br>'+
							'<span>Movies</span>'+
						'</div>')
		}
	}
})




$.ajax({
	url : '/notice_json',
	method : 'get',
	success:function(data){
		var count = data.length;
		// console.log(data)
		$('#notice_list').html('');
	
		for(i = 0; i < count; i++) 
		{

			$('#notice_list').append('<li class="post_row">'+
											'<span class="num_pos"><i class="fas fa-caret-right"></i></span>'+
											'<label class="post_title"><a target="_blank" href="/post/'+data[i]['category']+'/'+data[i]['torrent_id']+'">'+data[i]['title']+'</a></label>'+
											'<span class="list_time">'+data[i]['data']+'</span>'+
											'<div class="clear"></div>'+
										'</li>')
		}
	}
})

$.ajax({
	url : '/latest_json_data',
	method : 'get',
	success:function(data){
		var count = data.length;
		// console.log(data)
		$('#latest_update').html('');
	
		for(i = 0; i < count; i++) 
		{

			$('#latest_update').append('<li class="post_row">'+
											'<span class="num_pos"><i class="fas fa-caret-right"></i></span>'+
											'<label class="post_title"><a target="_blank" href="/post/'+data[i]['category']+'/'+data[i]['torrent_id']+'">'+data[i]['title']+'</a></label>'+
											'<span class="list_time">'+data[i]['data']+'</span>'+
											'<div class="clear"></div>'+
										'</li>')
		}
	}
})



});

$.ajax({
	url : '/gif_list',
	method : 'get',
	success:function(data){
		$('.gif_holder').eq(0).html('<a target="_blank" href="//'+data[0]['link1']+'"><img src="'+data[0]['image_1']+'"></a>')
			$('.gif_holder').eq(1).html('<a target="_blank" href="//'+data[0]['link2']+'"><img src="'+data[0]['image_2']+'"></a>')
			$('.gif_holder').eq(2).html('<a target="_blank" href="//'+data[0]['link3']+'"><img src="'+data[0]['image_3']+'"></a>')
	}
})


// socket.on('gif_data',function(data){
	
// })




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


