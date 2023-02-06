$(function () {
    
});

function getCreditCardPartialView() {
    $.ajax({
        url: 'CreditCard/GetCreaditCardPartialView',
        success: function (response) {
            $("#partialArea").html(response);
        }
    });
}