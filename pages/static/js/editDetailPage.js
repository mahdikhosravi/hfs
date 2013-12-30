"use strict";


$(function(){

    $("#productForm").ajaxForm({
        success : function(data, status, xhr) {
            var stat = data.status;
            if ( stat == "success"){

                alert("affarin ezafe shod mahsoolet");
            }
            else{
                var err = "" ;
                for (var i in data.errors)
                    err += i + " : " + data.errors[i] + "\n" ;
                alert('error in saving the product\n'  + err);
            }
        }
    });

    $("#productForm").submit(function(e) {
        e.preventDefault();
    });
});

