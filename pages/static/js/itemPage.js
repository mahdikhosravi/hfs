$(function() {

    console.log('Java script for itemPage');

//    $("<li id=page" + i + "></li>").appendTo($("#paginator"));
    var url = "";
    var ajaxData = {};

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

                price = data.price ;
                creationDate = data.creationDate ;
                name=data.name;
                cat = data.cat.name;
                picURL= data.picURL;
                description = data.description;
                $("<li> نام: " + name + "</li>").appendTo($("#attr_list"));
                $("<li> قیمت: " + price + "</li>").appendTo($("#attr_list"));
                $("<li> تاریخ اضافه شدن: " + creationDate + "</li>").appendTo($("#attr_list"));
                console.log($("ProductPic"));
                document.getElementById("ProductPic").src = picURL;

//                comments --> ye list az dictionary hayi ke 3 ta ozve tarikh, esm , nazar daran.
                comms = data.commentList;
                for (var i in comms) {
//					console.log(" i = " + i);
                    var message = comms[i].message;
                    var name = comms[i].name;

                    $("<div class='comment' dir='rtl'></div>").appendTo($("#comments"));
                    $("<div dir='rtl'>" + name + "</div>").appendTo($("#comments").children().last());
                    $("<div dir='rtl'>" + message + "</div>").appendTo($("#comments").children().last());
                }
                $("<textarea id='commentArea' class='form-control' placeholder='نظر خود را اینجا بنویسید' ></textarea>").appendTo($("#comments2"));
                $("<button class='buying btn btn-success col-md-12 col-xs-12'>ارسال</button>").appendTo($("#comments2")).click(function(event) {
                    addComment();
                    $('#commentArea').val("");
                });


            }
        }
    });



	id = loadPageVar('id');
	$("#addItem").click(function(event) {
		add_remove(id, true);
	});

	loadComments();

});

function loadComments() {
	var url = "http://webproject.roohy.me/ajax/1/89102674/comment/list";
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
				comms = data.commentList;
				for (var i in comms) {
//					console.log(" i = " + i);
					var message = comms[i].message;
					var name = comms[i].name;

					$("<div class='comment' dir='rtl'></div>").appendTo($("#comments"));
					$("<div dir='rtl'>" + name + "</div>").appendTo($("#comments").children().last());
					$("<div dir='rtl'>" + message + "</div>").appendTo($("#comments").children().last());
				}
				$("<textarea id='commentArea' class='form-control' placeholder='نظر خود را اینجا بنویسید' ></textarea>").appendTo($("#comments2"));
				$("<button class='buying btn btn-success col-md-12 col-xs-12'>ارسال</button>").appendTo($("#comments2")).click(function(event) {
					addComment();
					$('#commentArea').val("");
				});
				// .html("ksadfhaksfhaksfh");
			}
		}
	});
}

function addComment() {
	$("<div class='comment'></div>").appendTo($("#comments"));
	$("<div> khodam </div>").appendTo($("#comments").children().last());
	$("<div>" + $("#commentArea").val() + "</div>").appendTo($("#comments").children().last());

	var url = "http://webproject.roohy.me/ajax/1/89102674/comment/add";
	var ajaxData = {
		"message" : $("#commentArea").val(),
		"name" : ":D"
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
				console.log("comment added successfuly to server!");
			}
		}
	});

}

