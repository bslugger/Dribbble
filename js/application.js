function loaded() {
	
	var p = 1;
	var dribbleData;

	$(document).ready(function(){
	loadFave();
	});

//toggle overlay activation when any image (including modal image) is clicked
	$('body').on('click', '.import, .fave, .modalImg', function () {
		$('.overlay').toggleClass('active');
		$('.modal').remove();
		console.log(this);
		var i = $('.import').eq();
		var modalData = {
			title: $(this).data('title'),
			image_url: $(this).attr('src'),
		}
		var source = $('#modal-template').html();
		var template = Handlebars.compile(source);
		var html = template(modalData);
		$('.overlay').append(html);
	});

	var dribbbleURL = "http://api.dribbble.com/shots/";
//on document load, populate the page with the 'popular' feed and populate favorites
	function loadFave(){
		$.get(
			dribbbleURL+"popular?per_page=12&page="+1+"&callback=?", 
			function(data){
				dribbleData = data;
				var source = $('#results-template').html();
				var template = Handlebars.compile(source);
				var html = template(dribbleData);
				$('.API').append(html);
				useReturnData(data);
				accessLocal();
			},
			"json"
		);
	}

//auto-populate my favorites section
	function accessLocal(){
		for (var i = 0; i < localStorage.length; i++){
			var lsID = Object.keys(localStorage)[i];
			var savedShot = localStorage.getItem(lsID);
			var parsedJSON = JSON.parse(savedShot);
			var savedFave = {
				id: parsedJSON.id,
				image_url: parsedJSON.image_url,
				height: parsedJSON.height,
				width: parsedJSON.width,
				title: parsedJSON.title,
				//for use in indexed array: localStorage.getItem(localStorage.key(i).image_url),
			};
			var source = $('#fave-template').html();
			var template = Handlebars.compile(source);
			var html = template(savedFave);
			$('.favorites-list').append(html);

			//one more iteration to go through shots[x] and update loaded page with stars
			for (var x = 0; x < dribbleData.shots.length; x++) {
				$('.import[data-id='+lsID+']').siblings('img').removeAttr('src').attr('src', 'images/starful.png');
			};
		};
	}

	function useReturnData(data){
		dribbleData = data;
	}
//after loading the new entries, iterate through favorites, find matching favorites, if matched, add a black star

	function getShot(){
		p++;
//		var currentPage = $('.page').text();
//		var newPage = parseInt(currentPage)+1;
//		$('.page').text(newPage);
		var url = dribbbleURL+category+"?per_page=12&page="+p+"&callback=?";
		console.log(url);
		console.log(dribbleData);	
			$.get(
				dribbbleURL+category+"?per_page=12&page="+p+"&callback=?", 
				function(data){
					dribbleData = data;
					var source = $('#results-template').html();
					var template = Handlebars.compile(source);
					var html = template(dribbleData);
					$('.API').append(html);
				},
				"json"
			);
		//go through new page and update stars if already in local storage
	}

	var category = 'popular';
	$('.target').on('change', function(){
			p = 1;
			category = $(this).val();
			$('.results').remove();
			getShot();
	});
			

	$('.load').on('click', getShot);


	var faveTitle = "title";
	var faveImage = "<img src='images/load.gif'>";
	var ID;
	var shotInfo;
	

	function postFave(){
		var newPost = localStorage.getItem(ID);
		var parsedJSON = JSON.parse(newPost);
		var newShot = {
			id: parsedJSON.id,
			height: parsedJSON.height,
			width: parsedJSON.width,
			title: parsedJSON.title,
			image_url: parsedJSON.image_url,
		};
		var source = $('#fave-template').html();
		var template = Handlebars.compile(source);
		var html = template(newShot);
		$('.favorites-list').append(html);
	}

	function addFave(selected){
		ID = $(selected).siblings('img').data("id");
		shotInfo = {
			id: $(selected).siblings('img').data('id'),
			height: $(selected).siblings('img').data('height'),
			width: $(selected).siblings('img').data('width'),
			title: $(selected).siblings('img').data('title'),
			image_url: $(selected).siblings('img').attr('src'),
		};
		if (ID in localStorage) {//item already exists in localStorage)
			console.log("item already in storage");
		} else {
			console.log("added to favorites")
			localStorage.setItem(ID, JSON.stringify(shotInfo) );
			$(selected).removeAttr('src').attr('src', 'images/starful.png');
			postFave();
		}
	}

	function removeFave(){
		console.log('remove triggerd');
		var removed = $(this).siblings('img').data('id');
		console.log(removed);
		$(this).closest('.info').remove();
		localStorage.removeItem(removed);
		//remove star from list that has same title
		$('.import[data-id='+removed+']').siblings('img').attr('src', 'images/star.png');
	}

	$('body').on('click', '.star', function(){
		var pressed = this;
		if ($(this).attr('src') === 'images/starful.png') {
		//	removeFave();
		} else {	
			addFave(pressed);
		}
		});
	
	$('body').on('click', '.remove', removeFave);


	var Favorites = {
		index: 1,

		//init: function() {},

		storeAdd: function(entry) {},
		storeRemove: function(entry) {},

		tableAdd: function(entry) {},
		tableRemove: function(entry) {},

	};

	modalLoad();
}

$(document).ready(loaded);
