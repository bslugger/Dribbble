function modalLoad() {

	//modal on hover to give rankings and categories to icons in favorites
	$('body').on('mouseenter', '.fave', function(){
		$(this).siblings('div').attr('style', 'display: block');
	});
	$('body').on('mouseleave', '.fave', function(){
		$(this).siblings('div').removeAttr('style');
	});

	var tags = ['example', 'shots', 'tag'];

	//adding tags to each modal and drop-down
	function addTag(){
		//collect information from text box
		//$('.tagger')
		//place info into object
		var tagInfo = {
			savedTags: document.getElementById("tagger").value//query to collect tag info: $('.tagger').
		}
		//add tags to localStorage
		//tags.append();
		//localStorage.setItem('categories', tags);
		//adds new tags to modal
		var source = $('#fave-template').html();
		var template = Handlebars.compile(source);
		var html = template(tagInfo);
		$('.tags').append(html);

		//auto-populates drop-down box on main page
		var source2 = $('#fave-dropdown').html();
		var template2 = Handlebars.compile(source);
		var html2 = template2(tagInfo);
		$('.tags').append(html2);
	}

	$('body').on('focus', '#tagger', addTag);

		//rankings

		//save tag information to localStorage based on shot ID





}
