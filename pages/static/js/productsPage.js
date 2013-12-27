function expand(number) {
	if (firstTime == false)
		return;
	firstTime = false;
	totalPages = number;
	console.log("console: " + number);
	if (number == 1)
		return;
	$("<li id=first></li>").appendTo($("#paginator"));
	$("<a href= # id=firstIn></a").appendTo($("#first"));
	$("#firstIn").html("&laquo;");

	for (var i = 1; i <= number; i++) {
		$("<li id=page" + i + "></li>").appendTo($("#paginator"));
		$("<a href= #>" + i + "</a").appendTo($("#page" + i));
		$("#page" + i + " a").html(i);
	}

	// $("#firstIn").innerText = "&laquo" ;

	$("<li id=last></li>").appendTo($("#paginator"));
	$("<a href= # id=lastIn> &raquo </a").appendTo($("#last"));
	$("#lastIn").html("&raquo");

	$("#paginator").children().eq(1).addClass("active");
	$("#paginator").children().eq(0).addClass("disabled");

	$("#paginator a").click(function(event) {
		var f = $(event.target).html();
		console.log(f);
		if (f == "»") {
			pageNum = pageNum + 1;
			showPage(pageNum);
		} else if (f == "«") {
			pageNum = pageNum - 1;
			showPage(pageNum);
		} else {
			pageNum = f;
			showPage(f);
		}
	});
	//	$("<li ></li>").appendTo($("#paginator"));
}

function showPage(num) {

	$("#proDiv").empty();
	$("#paginator").children().removeClass("active");
	$("#paginator").children().eq(num).addClass("active");
	if (num == 1)
		$("#paginator").children().eq(0).addClass("disabled");
	else
		$("#paginator").children().eq(0).removeClass("disabled");

	if (num == totalPages)
		$("#paginator").children().last().addClass("disabled");
	else
		$("#paginator").children().last().removeClass("disabled");

	browse(num);
}

function browse(page) {
	pageNum = page;
	var url = ""; //http://webproject.roohy.me/ajax/1/89102674/product/list
	var ajaxData = {

		"page" : page,
		"pageSize" : 12
	};
    console.log('mikham ajax bezanam ')
	$.ajax({

		url : url,
		type : 'get',
		dataType : 'json',
		data : ajaxData,
		success : function(data, status, xhr) {
			if (data.result == 0) {
				// Request error
				console.log("error");
			} else {
				console.log("successssssssssssssssssssss");
				var products = data.productList;
                console.log("in chant tast" + products.length );

				if (data.totalResults > 12)
					expand((Math.floor((data.totalResults - 1) / 12) + 1));
				for (var i in products) {
					ii = i + page * 12;
					console.log(products[i].name);
					//$("<div id=product"+i+ "></div>").appendT
					var mydiv = document.createElement("div");
					mydiv.id = "product" + ii;
					$(mydiv).addClass("productDiv col-md-3 col-sm-4 col-xs-6");

					image = document.createElement("image");
					image.id = "productPic" + ii;
					image.src = products[i].picUrl;
					/*					$(image).appendTo($(mydiv));
					 $(image).click(function(event){
					 window.location = 'itemPage.html?id='+ products[i].id;
					 })	;
					 */
					var result = {};
					result.salam = "sa";
					result.salam2 = "ka";
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

					$(mydiv).appendTo($("#proDiv"));

				}

			}
		},
		// ...
        error: function(data , status , xhr){
          console.log('gand khord keeeeeeee')
        },
	});

}

function showMyProducts() {

	var url = "http://webproject.roohy.me/ajax/1/89102674/cart/list";
	var ajaxData = {
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

				//		$("#productTable").empty();
				pros = data.cart;
				totalCount = pros.length;
				totalPrice2 = 0;
				$("#totalAmount").html("تعداد کالاها:" + pros.length);
				for (i in pros) {
					totalPrice2 += pros[i].price;
					//			console.log(pros[i].name);
					var myDiv = document.createElement("tr");
					myDiv._id = pros[i].id;
					myDiv._price = pros[i].price;
					$(myDiv).appendTo($("#productTable"));

					var imageTd = document.createElement("td");

					$(imageTd).appendTo($(myDiv)); 
					$('<span class="glyphicon glyphicon-trash remove"></span>').appendTo($(imageTd)).click(function(event){add_remove(event.target._id , false);}).get(0)._id = pros[i].id ; 
				
			/*		var image = document.createElement("image");
					image._id = pros[i].id ; 
					$(image).addClass("remove");
					$(image).click(function(event) {
						add_remove(event.target._id, false);
					});
					image.src = "remove.jpg";
					$(image).appendTo($(imageTd));

				*/	
					
					
					var price = document.createElement("td"); 
					price.innerText = pros[i].price ; 
					$(price).appendTo($(myDiv)); 
					
					var name = document.createElement("td"); 
					name.innerText = pros[i].name ; 
					$(name).appendTo($(myDiv)); 
					
					

					var imageTd = document.createElement("td");
					$(imageTd).appendTo($(myDiv));
					// $(imageTd).click( function(event){removeMe(event);});

					var image = document.createElement("img");
					$(image).addClass("picpic");
					image.src = pros[i].picUrl;
					$(image).appendTo($(imageTd));

					//	var image = $("<image class='picpic' src=" + pros[i].picUrl + "/>").appendTo($(imageTd)).click(function(event){console.log("asldhf"); });
				}
				$("#totalPrice").html("قیمت کل:" + totalPrice2);
			}
		},
		// ...
	});
}

function add_remove(id, add_remov) {

	console.log("oomad ke remove ya add kone" + id + " add= " + add_remov);
	if (add_remov == true)
		var url = "http://webproject.roohy.me/ajax/1/89102674/cart/add";
	else
		var url = "http://webproject.roohy.me/ajax/1/89102674/cart/remove";
	var ajaxData = {
		"productId" : id
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

			}
		},
		// ...
	});

	if (add_remov == false) {
		totalCount--;
		$("#totalAmount").html("تعداد کالاها:" + totalCount);
		var children = $("#productTable tbody").children();
		for (var i in children) {
			if (children[i]._id == id) {
				children[i].remove();
				totalPrice2 -= children[i]._price;
				$("#totalPrice").html("قیمت کل:" + totalPrice2);
				break;
			}
		}
	} else {
		var p = getProductbyID(id);

		totalCount++;
		$("#totalAmount").html("تعداد کالاها:" + totalCount);

		totalPrice2 += p.price;
		$("#totalPrice").html("قیمت کل:" + totalPrice2);

		var myDiv = document.createElement("tr");
		myDiv._id = p.id;
		myDiv._price = p.price;
		$(myDiv).appendTo($("#productTable"));
		
	//	$('<span class="glyphicon glyphicon-trash remove"></span>').appendTo($(imageTd)).click(function(event){add_remove(event.target._id , false);}).get(0).attr("_id", p.id) ;
		var imageTd = document.createElement("td");
		$(imageTd).appendTo($(myDiv)); 
		$('<span class="glyphicon glyphicon-trash remove"></span>').appendTo($(imageTd)).click(function(event){add_remove(event.target._id , false);}).get(0)._id = p.id ; 
		
		
		var price = document.createElement("td"); 
		price.innerText = p.price ; 
		$(price).appendTo($(myDiv)); 
		
		var name = document.createElement("td"); 
		name.innerText = p.name ; 
		$(name).appendTo($(myDiv)); 
		
		
		var imageTd = document.createElement("td");
		$(imageTd).appendTo($(myDiv));
		// $(imageTd).click( function(event){removeMe(event);});

		var image = document.createElement("img");
		$(image).addClass("picpic");
		image.src = p.picUrl;
		$(image).appendTo($(imageTd));

		$("#sabad").scrollTop($("#sabad")[0].scrollHeight);
	}
}

function getProductbyID(targetID) {
	var url = "http://webproject.roohy.me/ajax/1/89102674/product/list";
	var ajaxData = {
		"search" : "",
		"productId" : targetID
	};
	flag = false;
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'json',
		data : ajaxData,
		async : false,
		success : function(data, status, xhr) {
			if (data.result == 0) {
				// Request error
				console.log("error");
			} else {
				p = data.productList[0];
				flag = true;
				console.log("here is p" + p.id + "   " + p.name);
			}
		},
	});
	console.log("trying to reach p ");
	console.log(p.id);
	return p;
}

function getProduct(url, price, name) {
	var result = {};
	result.name = name;
	result.price = price;
	result.url = url;
	return result;
}

function loadPageVar(sVar) {
	return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

$(function() {

	firstTime = true;
	category = loadPageVar('cat');
	search = loadPageVar('search');
	browse(1);
	showMyProducts();
});
