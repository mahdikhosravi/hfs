$(function() {

	$('#aks').imgAreaSelect({
		handles : true,
		onSelectEnd : function(img, selection) {
			x = selection.x1;
			y = selection.y1;
			w = selection.x2 - x;
			h = selection.y2 - y;
		}
	});
	$("#form1").ajaxForm({
		success : function(data, status, xhr) {
			picID = data.picId;
			picURL = data.picUrl;
			console.log("=========================" + picID + "   " + picURL);
			aks = document.getElementById("aks");
			aks.src = picURL;
			// alert("successssssssssssssssssssss");
		}
	});

	$("#form1").submit(function(e) {
		e.preventDefault();
	});

	$("#addPro").click(function(e){addItem();});

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
				for (var i in cat) {
					var tmp = '<option value="' + cat[i].id + '">' +cat[i].name + '</option>';
					$('#catagorySelector').html($('#catagorySelector').html() + tmp);
				}
				//console.log(objects);
			}
		},
	});
});

function isNumeric(num){
    return !isNaN(num)
}

function addItem() {
	
	if ( typeof(x) == "undefined"){
		x = 0; 
		y = 0 ; 
		h = $("#aks").height();
		w = $("#aks").width();		
	}

	catagory = $("#catagorySelector").val();
	name = $(("#nameSelector")).val();
	price = $("#gheymatSelector").val();

	if(typeof(picID) == "undefined"){
		alert("you should submit an image first!!");
		return ;
	}

	if ( name =="" || price=="" || !isNumeric(price) || catagory=="dif"){
		alert("invalid input for name, price or catagory!!!!!	");
		return ;
	}

	var url = "http://webproject.roohy.me/ajax/1/89102674/product/add";
	var ajaxData = {

		"name" : name,
		"description" : "به تو چه ",
		"category" : catagory,
		"price" : price,
		"picId" : picID,
		"x" : x,
		"y" : y,
		"w" : w,
		"h" : h
	};

	$.ajax({
		url : url,
		type : 'post',
		dataType : 'json',
		data : ajaxData,
		success : function(data, status, xhr) {
			if (data.result == 0) {
				// Request error
				alert("error in submitting!");
				console.log("error");
			} else {
				alert("added successfully!!");
				console.log("moafagh shodim!!!");
			}
		},
	});
}
