"use strict";

var totalPages, pageNum, firstTime

function expand(number) {
	if (firstTime == false)
		return;
	firstTime = false;
	totalPages = number;
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
        console.log("disbalitiy = " + $(event.target).hasClass("disabled"))
        console.log($(event.target).parent())

        if ($(event.target).parent().hasClass("disabled"))
            return ;
		var f = $(event.target).html();
		if (f == "»") {
			pageNum = pageNum + 1;
			showPage(pageNum);
        } else if (f == "«") {
            pageNum = pageNum - 1;
            showPage(pageNum);
        } else {
            pageNum = +f;
            showPage(+f);
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
    console.log("khar", page, typeof page);

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
				if (data.totalResults > 12)
					expand((Math.floor((data.totalResults - 1) / 12) + 1));
				for (var i in products) {
					var mydiv = document.createElement("div");
					$(mydiv).addClass("productDiv col-md-3 col-sm-4 col-xs-6");
					var image = document.createElement("image");
					image.src = products[i].picURL;
                    image._productID = products[i].id ;

                    var link = document.createElement("a")
                    link.href = "../ItemPage/" + products[i].id;
                    ///page?variable=" + parameter;

                    $(image).appendTo($(link));
                    $(link).appendTo($(mydiv));


//                    $(image).click(function(event){showItemPage(event.target._productID)});
					var caption = document.createElement("div");
					$(caption).addClass("caption");
					caption.id = "items-data";
					caption.innerHTML = "نام: " + products[i].name + " <br/> " + "قیمت: " + products[i].price;
					$(caption).appendTo($(mydiv));

					$("<button class='buying btn btn-success col-md-12 col-xs-12'> خرید </button>").appendTo($(mydiv)).click(function(event) {



						add_remove(event.target._id, true);
					}).get(0)._id = products[i].id;

					$(mydiv).appendTo($("#proDiv"));

				}

			}
		},
        error: function(data , status , xhr){
          console.log('gand khord keeeeeeee')
        }
	});

}

function showItemPage(num){
    var url = "ItemPage/" + num ;
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
                alert('server javabamo dad :DDDD')
            }
        }
    });
}



var flag

function getProductbyID(targetID) {
	var url = "http://webproject.roohy.me/ajax/1/89102674/product/list";
	var ajaxData = {
		"search" : "",
		"productId" : targetID
	};
	flag = false;
    var p
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
		}
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
	browse(1);
});
