$(function () {
    
});

//function testCreditCard() {

    //var destinationUrl = "https://test-dmz.param.com.tr/turkpos.ws/service_turkpos_test.asmx";
    //var requestXml = "<?xml version=\"1.0\" encoding=\"utf-8\"?> <soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"> <soap:Body>\r\n<SHA2B64 xmlns=\"https://turkpos.com.tr/\">\r\n<Data>107380c13d406-873b-403b-9c09-a5766840d98c1100,00100,00gorkem_Pos_Odeme_033https://google.comhttps://dev.param.com.tr/tr</Data>\r\n</SHA2B64>\r\n</soap:Body>\r\n</soap:Envelope>";

    //$.ajax({
    //    url: '/Home/SHARequest',
    //    data: { destinationUrl: destinationUrl, requestXml: requestXml },
    //    success: function (response) {
    //        console.log(response);
    //    }
    //});
//}

function getCreditCardPartialView() {
    $.ajax({
        url: 'CreditCard/GetCreaditCardPartialView',
        success: function (response) {
            $("#partialArea").html(response);
        }
    });
}