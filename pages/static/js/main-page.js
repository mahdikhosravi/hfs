var mapArray = [];
$(function() {
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
						
					mapArray[tmpObj.name] = tmpObj.id;
					}

				}
				console.log(objects);

				for (var i in objects) {
					if (objects[i].parent == undefined) {
						if (objects[i].childs.length == 0) {
							//this line must add to categories to add item
							var str = '<li id="cat' + i + '"> <a href="./productsPage.html">' + objects[i].name + '</a></li>';
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
			
							for(var j in objects[i].childs){
								var tmp = objects[objects[i].childs[j]];
								//add childs to categories
								str += '<li><a href="./productsPage.html">' + tmp.name + '</a></li>';

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
					$('.search-dropdown').click(function(e){
						// console.log(($(e.target).clone()).html());
						// console.log($('#search')[0]);
						$('#search-text').val(($(e.target).clone()).html() + ': ');
					});
				}
			}
		},
	});
});

$('#search-button').click(function(){
	var textValue = $('#search-text').val();
	var cat = textValue.split(':')[0];
	var name = textValue.split(':')[1];
	
	//console.log(textValue.split(':')[0]);
	
	var ajaxData = {
	  pageSize: 15,
	};
	
	if(cat != "")
		ajaxData.category = mapArray[cat];
	if(name != "")	
		ajaxData.search = name;

	var url = "http://webproject.roohy.me/ajax/1/91107489/product/list";

	$.ajax({
		url: url,
		type: 'post',
		dataType: 'json',
		data: ajaxData,
		success: function(data, status, xhr){
		    if (data.result == 0){
		       // Request error
		    }else {
		       // success
		       console.log(data);
		    }
		},
		// ...
	});
});

