$(function () {
    $.getJSON("CreditCards.json", function (data) {
        console.log(data);
    });
});


// Test Credit Card with All Payment Methods
function test(method, secureType) {
    // Get Credit Card Number, Month, Year, CVV from User to variable
    var creditCardNumber = $("#creditCardNumber").val();
    var creditCardMonth = $("#creditCardMonth").val();
    var creditCardYear = $("#creditCardYear").val();
    var creditCardCVV = $("#creditCardCVV").val();

    // Ajax Post Destination Url
    var destinationUrl = "https://test-dmz.param.com.tr/turkpos.ws/service_turkpos_test.asmx";

    switch (method) {
        case "payment":
            if (secureType == "3DPay") {
                var orderID = makeOrderID(20);
                var hashRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><SHA2B64 xmlns="https://turkpos.com.tr/"><Data>107380c13d406-873b-403b-9c09-a5766840d98c1100,00100,00${orderID}https://localhost:44345/Home/PaymentFailhttps://localhost:44345/Home/PaymentSuccess</Data> </SHA2B64></soap:Body></soap:Envelope>`;

                $.ajax({
                    url: '/Home/SHARequest',
                    data: { destinationUrl: destinationUrl, requestXml: hashRequest },
                    success: function (response) {
                        var parseResponse = $.parseXML(response);
                        var xmlResponse = $(parseResponse);
                        var hash = xmlResponse.find("SHA2B64Result").text();

                        var payment3DPayRequest = `<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <Pos_Odeme xmlns="https://turkpos.com.tr/"> <G> <CLIENT_CODE>10738</CLIENT_CODE> <CLIENT_USERNAME>Test</CLIENT_USERNAME> <CLIENT_PASSWORD>Test</CLIENT_PASSWORD> </G> <GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID> <KK_Sahibi>Görkem AKÇAY</KK_Sahibi> <KK_No>${creditCardNumber}</KK_No> <KK_SK_Ay>${creditCardMonth}</KK_SK_Ay> <KK_SK_Yil>${creditCardYear}</KK_SK_Yil> <KK_CVC>${creditCardCVV}</KK_CVC> <KK_Sahibi_GSM>5066011070</KK_Sahibi_GSM> <Hata_URL>https://localhost:44345/Home/PaymentFail</Hata_URL> <Basarili_URL>https://localhost:44345/Home/PaymentSuccess</Basarili_URL> <Siparis_ID>${orderID}</Siparis_ID> <Siparis_Aciklama></Siparis_Aciklama> <Taksit>1</Taksit> <Islem_Tutar>100,00</Islem_Tutar> <Toplam_Tutar>100,00</Toplam_Tutar> <Islem_Hash>${hash}</Islem_Hash> <Islem_Guvenlik_Tip>3D</Islem_Guvenlik_Tip><Islem_ID></Islem_ID> <IPAdr>127.0.0.1</IPAdr></Pos_Odeme> </soap:Body> </soap:Envelope>`;

                        $.ajax({
                            url: '/Home/SHARequest',
                            data: { destinationUrl: destinationUrl, requestXml: payment3DPayRequest },
                            success: function (response) {
                                var responseModel = $.parseXML(response);
                                var xmlResponseModel = $(responseModel);

                                var sonuc = xmlResponseModel.find("Sonuc").text();
                                if (sonuc == 1) {
                                    var ucdURL = xmlResponseModel.find("UCD_URL").text().replace('amp;', '');
                                    window.open(ucdURL, '_blank');
                                }
                                else {
                                    var sonuc_str = xmlResponseModel.find("Sonuc_Str").text();
                                    $("#paymentErrorArea").text(sonuc_str);
                                }
                            }
                        });
                    }
                });
            }

            if (secureType == "3DModel") {
                var orderID = makeOrderID(20);

                var hashRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><SHA2B64 xmlns="https://turkpos.com.tr/"><Data>107380c13d406-873b-403b-9c09-a5766840d98c1100,00100,00${orderID}</Data> </SHA2B64></soap:Body></soap:Envelope>`

                $.ajax({
                    url: '/Home/SHARequest',
                    data: { destinationUrl: destinationUrl, requestXml: hashRequest },
                    success: function (response) {
                        var parseResponse = $.parseXML(response);
                        var xmlResponse = $(parseResponse);
                        var hash = xmlResponse.find("SHA2B64Result").text();

                        var payment3DModelRequest = `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <TP_WMD_UCD xmlns="https://turkpos.com.tr/"> <G> <CLIENT_CODE>10738</CLIENT_CODE> <CLIENT_USERNAME>Test</CLIENT_USERNAME> <CLIENT_PASSWORD>Test</CLIENT_PASSWORD> </G> <GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID> <KK_Sahibi>Görkem Akçay</KK_Sahibi> <KK_No>${creditCardNumber}</KK_No> <KK_SK_Ay>${creditCardMonth}</KK_SK_Ay> <KK_SK_Yil>${creditCardYear}</KK_SK_Yil> <KK_CVC>${creditCardCVV}</KK_CVC> <KK_Sahibi_GSM>5066011070</KK_Sahibi_GSM> <Hata_URL>https://localhost:44345/Home/PaymentFail</Hata_URL> <Basarili_URL>https://localhost:44345/Home/PaymentSuccess</Basarili_URL> <Siparis_ID>${orderID}</Siparis_ID> <Siparis_Aciklama>a</Siparis_Aciklama> <Taksit>1</Taksit> <Islem_Tutar>100,00</Islem_Tutar> <Toplam_Tutar>100,00</Toplam_Tutar> <Islem_Hash>${hash}</Islem_Hash> <Islem_Guvenlik_Tip>3D</Islem_Guvenlik_Tip> <IPAdr>127.0.0.1</IPAdr> </TP_WMD_UCD> </soap:Body> </soap:Envelope>`;

                        $.ajax({
                            url: '/Home/SHARequest',
                            data: { destinationUrl: destinationUrl, requestXml: payment3DModelRequest },
                            success: function (response) {
                                var responseModel = $.parseXML(response);
                                var xmlResponseModel = $(responseModel);
                                var sonuc = xmlResponseModel.find("Sonuc").text();

                                if (sonuc == 1) {
                                    var html = xmlResponseModel.find("UCD_HTML").text();
                                    var htmlObject = $(html);

                                    var w = window.open('https://localhost:44345/Home/Payment3DModel', '_blank');
                                    //w.onload = function () { this.document.body.innerHTML += html; console.log(this.document)};
                                    w.onload = function () { this.document.body.innerHTML = html; };

                                    //console.log(htmlObject.find("[name='3DSMethodData']"));


                                    //alert(htmlObj.find("#box").html());
                                }
                                else {
                                    var sonuc_str = xmlResponseModel.find("Sonuc_Str").text();
                                    $("#paymentErrorArea").text(sonuc_str);
                                }
                                //var sonuc = xmlResponseModel.find("Sonuc").text();
                                //if (sonuc == 1) {
                                //    var ucdURL = xmlResponseModel.find("UCD_URL").text().replace('amp;', '');
                                //    window.open(ucdURL, '_blank');
                                //}
                                //else {
                                //    var sonuc_str = xmlResponseModel.find("Sonuc_Str").text();
                                //    $("#paymentErrorArea").text(sonuc_str);
                                //}
                            }
                        });
                    }
                });
            }

            if (secureType == "NS") {
                $("#paymentLoadSpinnerArea").children().remove();
                $("#paymentLoadSpinnerArea").append('<img src="/loadspinner.gif" width="24" height="24"/>');

                var orderID = makeOrderID(20);
                var hashRequest = `<?xml version=\"1.0\" encoding=\"utf-8\"?> <soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"> <soap:Body>\r\n<SHA2B64 xmlns=\"https://turkpos.com.tr/\">\r\n<Data>107380c13d406-873b-403b-9c09-a5766840d98c1100,00100,00${orderID}https://google.comhttps://dev.param.com.tr/tr</Data>\r\n</SHA2B64>\r\n</soap:Body>\r\n</soap:Envelope>`;

                $.ajax({
                    url: '/Home/SHARequest',
                    data: { destinationUrl: destinationUrl, requestXml: hashRequest },
                    success: function (response) {
                        var parseResponse = $.parseXML(response);
                        var xmlResponse = $(parseResponse);
                        var hash = xmlResponse.find("SHA2B64Result").text();

                        var payment3DPayRequest = `<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <Pos_Odeme xmlns="https://turkpos.com.tr/"> <G> <CLIENT_CODE>10738</CLIENT_CODE> <CLIENT_USERNAME>Test</CLIENT_USERNAME> <CLIENT_PASSWORD>Test</CLIENT_PASSWORD> </G> <GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID> <KK_Sahibi>Görkem AKÇAY</KK_Sahibi> <KK_No>${creditCardNumber}</KK_No> <KK_SK_Ay>${creditCardMonth}</KK_SK_Ay> <KK_SK_Yil>${creditCardYear}</KK_SK_Yil> <KK_CVC>000</KK_CVC> <KK_Sahibi_GSM>5066011070</KK_Sahibi_GSM> <Hata_URL>https://google.com</Hata_URL> <Basarili_URL>https://dev.param.com.tr/tr</Basarili_URL> <Siparis_ID>${orderID}</Siparis_ID> <Siparis_Aciklama></Siparis_Aciklama> <Taksit>1</Taksit> <Islem_Tutar>100,00</Islem_Tutar> <Toplam_Tutar>100,00</Toplam_Tutar> <Islem_Hash>${hash}</Islem_Hash> <Islem_Guvenlik_Tip>NS</Islem_Guvenlik_Tip><Islem_ID></Islem_ID> <IPAdr>127.0.0.1</IPAdr></Pos_Odeme> </soap:Body> </soap:Envelope>`;

                        $.ajax({
                            url: '/Home/SHARequest',
                            data: { destinationUrl: destinationUrl, requestXml: payment3DPayRequest },
                            success: function (response) {
                                var responseModel = $.parseXML(response);
                                var xmlResponseModel = $(responseModel);
                                var sonuc_str = xmlResponseModel.find("Sonuc_Str").text();
                                var sonuc = xmlResponseModel.find("Sonuc").text();
                                if (sonuc == 1) {
                                    $("#paymentLoadSpinnerArea").children().remove();
                                    $("#paymentLoadSpinnerArea").append('<i class="fa-sharp fa-solid fa-circle-check text-white"></i>');
                                    $("#paymentErrorArea").text(sonuc_str);
                                }
                                else {
                                    $("#paymentLoadSpinnerArea").children().remove();
                                    $("#paymentLoadSpinnerArea").append('<i class="fa-solid fa-circle-xmark text-white"></i>');
                                    $("#paymentErrorArea").text(sonuc_str);
                                }

                            }
                        });
                    }
                });
            }
            break;

        case "preProvision":
            if (secureType == "3D") {
                var orderID = makeOrderID(20);
            }

            if (secureType == "NS") {
                var orderID = makeOrderID(20);
            }
            break;

        case "paymentWithForeignCurrency":
            if (secureType == "3D") {
                var orderID = makeOrderID(20);
            }

            if (secureType == "NS") {
                var orderID = makeOrderID(20);
            }
            break;

        case "paymentWithCardStorage":
            if (secureType == "3D") {

            }

            if (secureType == "NS") {

            }
            break;

        case "preProvisionWithCardStorage":
            if (secureType == "3D") {
                var orderID = makeOrderID(20);
            }

            if (secureType == "NS") {
                var orderID = makeOrderID(20);
            }
            break;

        default:
    }
}



function test01() {
    $.ajax({
        url: '/Home/PaymentSuccess'
    });
}




































// #region Random String Generator
function makeOrderID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return "gorkem_" + result;
}














function testCreditCard() {
    var creditCardNumber = $("#creditCardNumber").val();
    var creditCardMonth = $("#creditCardMonth").val();
    var creditCardYear = $("#creditCardYear").val();

    var destinationUrl = "https://test-dmz.param.com.tr/turkpos.ws/service_turkpos_test.asmx";

    if ($("#payment3DPay").is(":checked")) {
        var orderID = makeOrderID(20);

        var hashRequest = `<?xml version=\"1.0\" encoding=\"utf-8\"?> <soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"> <soap:Body>\r\n<SHA2B64 xmlns=\"https://turkpos.com.tr/\">\r\n<Data>107380c13d406-873b-403b-9c09-a5766840d98c1100,00100,00${orderID}https://google.comhttps://dev.param.com.tr/tr</Data>\r\n</SHA2B64>\r\n</soap:Body>\r\n</soap:Envelope>`;

        $.ajax({
            url: '/Home/SHARequest',
            data: { destinationUrl: destinationUrl, requestXml: hashRequest },
            success: function (response) {
                //var hash = response.substring(
                //    response.indexOf("<SHA2B64Result>") + 15,
                //    response.lastIndexOf("</SHA2B64Result>")
                //);

                var xmlDoc = $.parseXML(response);
                var $xml = $(xmlDoc);
                var $hash = $xml.find("SHA2B64Result");

                var payment3DPayRequest = `<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <Pos_Odeme xmlns="https://turkpos.com.tr/"> <G> <CLIENT_CODE>10738</CLIENT_CODE> <CLIENT_USERNAME>Test</CLIENT_USERNAME> <CLIENT_PASSWORD>Test</CLIENT_PASSWORD> </G> <GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID> <KK_Sahibi>Görkem AKÇAY</KK_Sahibi> <KK_No>${creditCardNumber}</KK_No> <KK_SK_Ay>${creditCardMonth}</KK_SK_Ay> <KK_SK_Yil>${creditCardYear}</KK_SK_Yil> <KK_CVC>000</KK_CVC> <KK_Sahibi_GSM>5066011070</KK_Sahibi_GSM> <Hata_URL>https://google.com</Hata_URL> <Basarili_URL>https://dev.param.com.tr/tr</Basarili_URL> <Siparis_ID>${orderID}</Siparis_ID> <Siparis_Aciklama></Siparis_Aciklama> <Taksit>1</Taksit> <Islem_Tutar>100,00</Islem_Tutar> <Toplam_Tutar>100,00</Toplam_Tutar> <Islem_Hash>${$hash.text()}</Islem_Hash> <Islem_Guvenlik_Tip>3D</Islem_Guvenlik_Tip><Islem_ID></Islem_ID> <IPAdr>127.0.0.1</IPAdr> <Ref_URL></Ref_URL> <Data1></Data1> <Data2></Data2> <Data3></Data3> <Data4></Data4> <Data5></Data5> <Data6></Data6> <Data7></Data7> <Data8></Data8> <Data9></Data9> <Data10></Data10> </Pos_Odeme> </soap:Body> </soap:Envelope>`;

                $.ajax({
                    url: '/Home/SHARequest',
                    data: { destinationUrl: destinationUrl, requestXml: payment3DPayRequest },
                    success: function (response) {
                        var responseModel = $.parseXML(response);
                        var xmlResponseModel = $(responseModel);

                        var sonuc = xmlResponseModel.find("Sonuc").text();
                        if (sonuc == 1) {
                            var ucdURL = xmlResponseModel.find("UCD_URL").text().replace('amp;', '');
                            window.open(ucdURL, '_blank');
                        }
                        else {
                            var sonuc_str = xmlResponseModel.find("Sonuc_Str").text();
                            console.log(sonuc_str);
                        }
                    }
                });
            }
        });
    }

    if ($("#payment3DModel").is(":checked")) {
        console.log("payment3DModel");
    }

    if ($("#PreProvisionWithPayment").is(":checked")) {
        console.log("PreProvisionWithPayment");
    }

    if ($("#PaymentWithForeignCurrency").is(":checked")) {
        console.log("PaymentWithForeignCurrency");
    }

    if ($("#CardStorage").is(":checked")) {
        console.log("CardStorage");
    }

    if ($("#PaymentWithCardStorage").is(":checked")) {
        console.log("PaymentWithCardStorage");
    }

    if ($("#PreProvisionWithCardStorage").is(":checked")) {
        console.log("PreProvisionWithCardStorage");
    }

    if ($("#StoredCardDeletion").is(":checked")) {
        console.log("StoredCardDeletion");
    }

    if ($("#CardVerification").is(":checked")) {
        console.log("CardVerification");
    }
}



$("form").on("submit", function (event) {
    event.preventDefault();
    console.log($(this).serialize());
});