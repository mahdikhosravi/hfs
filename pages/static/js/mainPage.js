var mapArray = [];
var mapArray2 = [];

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
					caption.innerHTML = "نام: " + products[i].name + " <br/> " + "قیمت: " + products[i].price;
					$(caption).appendTo($(mydiv));

					$("<button class='buying btn btn-success col-md-12 col-xs-12'> خرید </button>").appendTo($(mydiv)).click(function(event) {
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

function getList() {
	var url = "http://webproject.roohy.me/ajax/1/91107489/category/list";

	$.ajax({
		url : url,
		type : 'post',
		dataType : 'json',
		success : function(data, status, xhr) {
			if (data.result == 0) {
				// Request error
				console.log("shit!");
			} else {
				// success
				console.log("OK!");
				//console.log(data.categoryList);

				var cat = data.categoryList;
				var objects = [];
				for (var i in cat) {
					var tmpObj = {};
					tmpObj.id = cat[i].id;
					tmpObj.name = cat[i].name;
					tmpObj.parent = cat[i].parent;
					tmpObj.childs = [];

					objects[tmpObj.id] = tmpObj;
					if (tmpObj.parent != undefined) {
						objects[tmpObj.parent].childs.push(tmpObj.id);
					}
					mapArray[tmpObj.name] = tmpObj.id;
					mapArray2[tmpObj.id] = tmpObj.name;

				}
				//console.log(objects);

				for (var i in objects) {
					if (objects[i].parent == undefined) {
						if (objects[i].childs.length == 0) {
							//this line must add to categories to add item
							var str = '<li id="cat' + i + '"> <a href="./productsPage.html?cat=' + objects[i].id + '">' + objects[i].name + '</a></li>';
							//add item to categories
							$('#navbar').html(str + $('#navbar').html());

							//add item to search dropdown list
							$('#search-dropdown').html($('#search-dropdown').html() + '<li> <a class="search-dropdown" href="#">' + objects[i].name + '</a></li>')
						} else {
							//this line must add to categories to add item
							var str = '<li class="dropdown" id="cat' + i + '"> <a class="dropdown-toggle" data-toggle="dropdown" href="#">' + objects[i].name + '<b class="caret"></b></a>';
							//add item to search dropdown list
							$('#search-dropdown').html($('#search-dropdown').html() + '<li> <a class="search-dropdown" href="#">' + objects[i].name + '</a></li>')

							//prepare to add childs
							str += '<ul class="dropdown-menu">';

							for (var j in objects[i].childs) {
								var tmp = objects[objects[i].childs[j]];
								//add childs to categories
								str += '<li><a href="./productsPage.html?cat=' + tmp.id + '">' + tmp.name + '</a></li>';

								//add item to search dropdown list
								$('#search-dropdown').html($('#search-dropdown').html() + '<li> <a class="search-dropdown" href="#">' + tmp.name + '</a></li>')
							}

							//close parent tags
							str += '</ul></li>';
							//add all to categories
							$('#navbar').html(str + $('#navbar').html());
						}
						//add divider to search dropdown
						$('#search-dropdown').html($('#search-dropdown').html() + '<li class="divider"></li>');
					}

					//set category for search
					$('.search-dropdown').click(function(e) {
						// console.log(($(e.target).clone()).html());
						// console.log($('#search')[0]);
						$('#search-text').val(($(e.target).clone()).html() + ': ');
					});
				}


				/* tof for title */
				firstTime = true;
				category = loadPageVar('cat');
				search = loadPageVar('search');
				$('#title').html(mapArray2[category] + ' ' + search);
				/* /tof for title */
			}
		},
	});

}

$(function() {
	getList();

	$('#search-button').click(function(e) {
		search_click(e);
	});
	recommended_popularProducts();
});

function search_click(e) {
	var textValue = $('#search-text').val();

// <<<<<<< HEAD
		//console.log(mapArray[textValue.split(':')[0]]);
		var cat="", name="";
		if (textValue.split(':').length > 1) {
			cat = textValue.split(':')[0];
			name = textValue.split(':')[1];
		} else {
			name = textValue;
		}

		//console.log(textValue.split(':')[0]);

		var ajaxData = {
			pageSize : 15,
		};

		//console.log(name);	
		//if (cat != "" && cat != undefined)
		if(cat!="")
			ajaxData.category = mapArray[cat];
		else
			ajaxData.category = "";
		//if (name != "")
			ajaxData.search = name;

		//console.log(ajaxData);
		window.location = 'productsPage.html?cat=' + ajaxData.category + '&search=' + ajaxData.search;
		
		/*
		var url = "http://webproject.roohy.me/ajax/1/91107489/product/list";
		
				$.ajax({
					url : url,
					type : 'post',
					dataType : 'json',
					data : ajaxData,
					success : function(data, status, xhr) {
						if (data.result == 0) {
							// Request error
						} else {
							// success
							console.log(data);
							
						}
					},
					// ...
				});*/
		e.preventDefault();

/*=======
	//console.log(mapArray[textValue.split(':')[0]]);
	var cat = "", name = "";
	if (textValue.split(':').length > 1) {
		cat = textValue.split(':')[0];
		name = textValue.split(':')[1];
	} else {
		name = textValue;
>>>>>>> 99a2b2aa8693f2f2b35305ec19182734de1cd829*/
	

	//console.log(textValue.split(':')[0]);

	var ajaxData = {
		pageSize : 15,
	};

	//console.log(name);
	//if (cat != "" && cat != undefined)
	if (cat != "")
		ajaxData.category = mapArray[cat];
	else
		ajaxData.category = "";
	//if (name != "")
	ajaxData.search = name;

	//console.log(ajaxData);
	window.location = 'productsPage.html?cat=' + ajaxData.category + '&search=' + ajaxData.search;

	/*
	 var url = "http://webproject.roohy.me/ajax/1/91107489/product/list";

	 $.ajax({
	 url : url,
	 type : 'post',
	 dataType : 'json',
	 data : ajaxData,
	 success : function(data, status, xhr) {
	 if (data.result == 0) {
	 // Request error
	 } else {
	 // success
	 console.log(data);

	 }
	 },
	 // ...
	 });*/
	e.preventDefault();

}

