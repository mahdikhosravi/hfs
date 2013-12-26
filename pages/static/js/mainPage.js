var mapArray = [];

function recommended_popularProducts() {
	// console.log("asldkjfasldkjaslif");
	var url = "http://webproject.roohy.me/ajax/1/89102674/product/list";
	var ajaxData = {

		"page" : 1,
		"pageSize" : 12
	};

	$.ajax({
		url : url,
		type : 'post',
		dataType : 'json',
		data : ajaxData,
		success : function(data, status, xhr) {
			if (data.result == 0) {
				// Request error
				console.log("error");
			} else {
				//	console.log("success");
				var products = data.productList;

				list = [];
				for (var i = 0; i < 12; i++) {
					var mydiv = document.createElement("div");
					$(mydiv).addClass("productDiv col-md-2 col-sm-6 col-xs-6");

					image = document.createElement("image");
					image.src = products[i].picUrl;

					var link = document.createElement("a")
					link.href = "itemPage.html?id=" + products[i].id;
					///page?variable=" + parameter;

					$(image).appendTo($(link));
					$(link).appendTo($(mydiv));

					var caption = document.createElement("div");
					$(caption).addClass("caption");
					caption.id = "items-data";
					caption.innerHTML = "???: " + products[i].name + " <br/> " + "????: " + products[i].price;
					$(caption).appendTo($(mydiv));

					$("<button class='buying btn btn-success col-md-12 col-xs-12'> ???? </button>").appendTo($(mydiv)).click(function(event) {
						add_remove(event.target._id, true);
					}).get(0)._id = products[i].id;
					// p._id = products[i].id ;
					if (i < 6)
						$(mydiv).appendTo($("#recommended"));
					else
						$(mydiv).appendTo($("#popular"));

				}

			}
		},
	});

}

$(function() {
    //set category for search
    $('.search-dropdown').click(function(e) {
        $('#search-text').val(($(e.target).clone()).html() + ': ');
    });

    //set search button function
	$('#search-button').click(function(e) {
		search_click(e);
	});

	recommended_popularProducts();
});

function search_click(e) {
	var textValue = $('#search-text').val();
		var cat="", name="";
		if (textValue.split(':').length > 1) {
			cat = textValue.split(':')[0];
			name = textValue.split(':')[1];
		} else {
			name = textValue;
		}


		var ajaxData = {
			pageSize : 15,
		};

		if(cat!="")
			ajaxData.category = mapArray[cat];
		else
			ajaxData.category = "";
			ajaxData.search = name;

		window.location = 'productsPage.html?cat=' + ajaxData.category + '&search=' + ajaxData.search;
		

		e.preventDefault();

	var ajaxData = {
		pageSize : 15,
	};

	if (cat != "")
		ajaxData.category = mapArray[cat];
	else
		ajaxData.category = "";
	ajaxData.search = name;

	window.location = 'productsPage.html?cat=' + ajaxData.category + '&search=' + ajaxData.search;


	e.preventDefault();

}

