$(function() {
    totalCount = 0 ;
    totalPrice = 0 ;
    localStorage = {}
   showMyProducts()
});


function showMyProducts() {
        totalCount = 0 ;
        totalPrice = 0;
        if ( localStorage['myProducts'] == undefined)
            return;

        pros = JSON.parse(localStorage['myProducts']);

        console.log(pros);
        $("#totalAmount").html("تعداد کالاها:" + pros.length);


        for (var i in pros){
            addToCart(pros[i]);
        }


        $("#totalPrice").html("قیمت کل:" + totalPrice);
}

var totalPrice
var totalCount

function add_remove(proID, add_remov) {

    console.log("oomad ke remove ya add kone" + proID + " add= " + add_remov);
    //ye ajax mizanim be server inja ke begim mikhaym kharid konim , server ye success barmigardoone ba moshakhasate mahsoolo :D ke esmesh producte!!!

    if (add_remov)
        url = "sale-management/buy/" + proID ;
    else
        url = "sale-management/remove/" + proID ;

    $.ajax({
        url : url,
        type : 'get',
        dataType : 'json',
        data : {},
        success : function(data, status, xhr) {
            if (data.result == 0) {
                // Request error
                console.log("error");
            } else {
                console.log('javabesh oomad ba status ' + data.status);
                if(add_remov){
                    addToLocalStorage(data.product);
                    addToCart(data.product);
                }
                else{
                    removeFromLocalStorage(proID);
                    removeFromCart(proID);
                }
            }
        }
        // ...
    });
}

function removeFromLocalStorage(proID){
    console.log('removing from local Storage ' + proID );

    li = JSON.parse(localStorage['myProducts']);
    for (var ins in li){
        console.log( "ins = " + ins)
        console.log('id e az ins khoonde = ' + parseInt(li[ins].id,10));
        if(parseInt(li[ins].id,10) == proID){
            console.log('peida kard mikhad delete kone');
            totalPrice -= parseInt(li[ins].price , 10);
            $("#totalPrice").html("قیمت کل:" + totalPrice);
            console.log('after changing the total price');


            li.splice(ins,1);
            localStorage['myProducts'] = JSON.stringify(li);
            break ;
        }
    }
    totalCount--;
    $("#totalAmount").html("تعداد کالاها:" + totalCount);
}

function removeFromCart(proID){

    var children = $("#productTable tbody").children();
    for (var i in children) {
        if (children[i]._id == proID) {
            children[i].remove();
            break;
        }
    }
}

function addToLocalStorage(product){
    console.log('adding to local Storage: productName = ' + product.name)

    if (localStorage['myProducts'] == undefined){
        console.log('list khali bood');
        li = new Array() ;
    }

    else{
        console.log('khali nabood');
        console.log(localStorage['myProducts']);
        li = JSON.parse(localStorage['myProducts']);
    }
    console.log('after if o else');
    li.push(product);
    localStorage['myProducts'] = JSON.stringify(li);
}

function addToCart(product){


        p = product ;
        totalCount++;
        $("#totalAmount").html("تعداد کالاها" + totalCount);

        totalPrice += p.price;
        $("#totalPrice").html("قیمت کل" + totalPrice);

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
        image.src = p.picURL;
        $(image).appendTo($(imageTd));

        $("#sabad").scrollTop($("#sabad")[0].scrollHeight);

}