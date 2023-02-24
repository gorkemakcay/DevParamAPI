// #region General Variables
var creditCardsJSON;
var selectCreditCard = $('#selectCreditCard');
var cardModel = {
    CardNumber: "null",
    DueMonth: "null",
    DueYear: "null",
    CVV: "null",
    ThreeDSecurePassword: "null"
};
// #endregion

$(function () {
    // #region Select Credit Card (Select Option)
    $.getJSON("CreditCards.json", function (creditCards) {
        creditCardsJSON = creditCards;

        selectCreditCard.children().remove();

        selectCreditCard.append(
            $('<option>', {
                value: "null",
                text: "Select Credit Card",
                id: "selectCard"
            })
        );

        $("#selectCard").attr("hidden", "");

        if (creditCards.TestCards.ZiraatBankasi.length > 0) {
            var ziraatBankasiOptGroup = `<optgroup id="ziraatBankasiOptGroup" label="Ziraat Bankası"></optgroup>`
            selectCreditCard.append(ziraatBankasiOptGroup);
            for (var i = 0; i < creditCards.TestCards.ZiraatBankasi.length; i++) {
                var ziraatBankasiOption = `<option value="${creditCards.TestCards.ZiraatBankasi[i].CardNumber}">Card${i + 1} (${creditCards.TestCards.ZiraatBankasi[i].CardNumber}) [${creditCards.TestCards.ZiraatBankasi[i].CardType}]</option>`;
                $('#ziraatBankasiOptGroup').append(ziraatBankasiOption);
            }
        }

        if (creditCards.TestCards.FinansBank.length > 0) {
            var finansBankOptGroup = `<optgroup id="finansBankOptGroup" label="Finans Bank"></optgroup>`
            selectCreditCard.append(finansBankOptGroup);
            for (var i = 0; i < creditCards.TestCards.FinansBank.length; i++) {
                var finansBankOption = `<option value="${creditCards.TestCards.FinansBank[i].CardNumber}">Card${i + 1} (${creditCards.TestCards.FinansBank[i].CardNumber}) [${creditCards.TestCards.FinansBank[i].CardType}]</option>`;
                $('#finansBankOptGroup').append(finansBankOption);
            }
        }

        if (creditCards.TestCards.Akbank.length > 0) {
            var akbankOptGroup = `<optgroup id="akbankOptGroup" label="Akbank"></optgroup>`
            selectCreditCard.append(akbankOptGroup);
            for (var i = 0; i < creditCards.TestCards.Akbank.length; i++) {
                var akbankOption = `<option value="${creditCards.TestCards.Akbank[i].CardNumber}">Card${i + 1} (${creditCards.TestCards.Akbank[i].CardNumber}) [${creditCards.TestCards.Akbank[i].CardType}]</option>`;
                $('#akbankOptGroup').append(akbankOption);
            }
        }

        if (creditCards.TestCards.IsBankasi.length > 0) {
            var isBankasiOptGroup = `<optgroup id="isBankasiOptGroup" label="İş Bankası"></optgroup>`
            selectCreditCard.append(isBankasiOptGroup);
            for (var i = 0; i < creditCards.TestCards.IsBankasi.length; i++) {
                var isBankasiOption = `<option value="${creditCards.TestCards.IsBankasi[i].CardNumber}">Card${i + 1} (${creditCards.TestCards.IsBankasi[i].CardNumber}) [${creditCards.TestCards.IsBankasi[i].CardType}]</option>`;
                $('#isBankasiOptGroup').append(isBankasiOption);
            }
        }

        if (creditCards.TestCards.HalkBank.length > 0) {
            var halkBankOptGroup = `<optgroup id="halkBankOptGroup" label="Halkbank"></optgroup>`
            selectCreditCard.append(halkBankOptGroup);
            for (var i = 0; i < creditCards.TestCards.HalkBank.length; i++) {
                var halkBankOption = `<option value="${creditCards.TestCards.HalkBank[i].CardNumber}">Card${i + 1} (${creditCards.TestCards.HalkBank[i].CardNumber}) [${creditCards.TestCards.HalkBank[i].CardType}]</option>`;
                $('#halkBankOptGroup').append(halkBankOption);
            }
        }

        if (creditCards.TestCards.DenizBank.length > 0) {
            var denizBankOptGroup = `<optgroup id="denizBankOptGroup" label="DenizBank"></optgroup>`
            selectCreditCard.append(denizBankOptGroup);
            for (var i = 0; i < creditCards.TestCards.DenizBank.length; i++) {
                var denizBankOption = `<option value="${creditCards.TestCards.DenizBank[i].CardNumber}">Card${i + 1} (${creditCards.TestCards.DenizBank[i].CardNumber}) [${creditCards.TestCards.DenizBank[i].CardType}]</option>`;
                $('#denizBankOptGroup').append(denizBankOption);
            }
        }

        if (creditCards.TestCards.YapiKredi.length > 0) {
            var yapiKrediOptGroup = `<optgroup id="yapiKrediOptGroup" label="Yapı Kredi"></optgroup>`
            selectCreditCard.append(yapiKrediOptGroup);
            for (var i = 0; i < creditCards.TestCards.YapiKredi.length; i++) {
                var yapiKrediOption = `<option value="${creditCards.TestCards.YapiKredi[i].CardNumber}">Card${i + 1} (${creditCards.TestCards.YapiKredi[i].CardNumber}) [${creditCards.TestCards.YapiKredi[i].CardType}]</option>`;
                $('#yapiKrediOptGroup').append(yapiKrediOption);
            }
        }

        if (creditCards.TestCards.Yabanci.length > 0) {
            var yabanciOptGroup = `<optgroup id="yabanciOptGroup" label="Yabancı Kart"></optgroup>`
            selectCreditCard.append(yabanciOptGroup);
            for (var i = 0; i < creditCards.TestCards.Yabanci.length; i++) {
                var yabanciOption = `<option value="${creditCards.TestCards.Yabanci[i].CardNumber}">Card${i + 1} (${creditCards.TestCards.Yabanci[i].CardNumber}) [${creditCards.TestCards.Yabanci[i].CardType}]</option>`;
                $('#yabanciOptGroup').append(yabanciOption);
            }
        }
    });
    // #endregion

    // #region Layout Test Credit Cards Content
    $('#testAllCreditCardsPartialArea').children().remove();

    
    // #endregion
});

// #region Selected Credit Card on change
$('#selectCreditCard').on('change', function () {
    $("#paymentErrorArea").text("");
    $("#paymentLoadSpinnerArea").children().remove();

    $("#preProvisionErrorArea").text("");
    $("#preProvisionLoadSpinnerArea").children().remove();

    $("#paymentWithForeignCurrencyErrorArea").text("");
    $("#paymentWithForeignCurrencyLoadSpinnerArea").children().remove();

    $("#paymentWithCardStorageErrorArea").text("");
    $("#paymentWithCardStorageLoadSpinnerArea").children().remove();

    $("#preProvisionWithCardStorageErrorArea").text("");
    $("#preProvisionWithCardStorageLoadSpinnerArea").children().remove();

    var selectedOptionsLabel = $('#selectCreditCard :selected').parent().attr('label');
    var selectedOptionsValue = $('#selectCreditCard option').filter(':selected').val();
    var card;
    switch (selectedOptionsLabel) {
        case "Ziraat Bankası":
            card = creditCardsJSON.TestCards.ZiraatBankasi.find(card => card.CardNumber == selectedOptionsValue);
            cardModel.CardNumber = card.CardNumber;
            cardModel.DueMonth = card.DueMonth;
            cardModel.DueYear = card.DueYear;
            cardModel.CVV = card.CVV;
            //cardModel.ThreeDSecurePassword = card.3DSecurePassword;
            break;

        case "Finans Bank":
            card = creditCardsJSON.TestCards.FinansBank.find(card => card.CardNumber == selectedOptionsValue);
            cardModel.CardNumber = card.CardNumber;
            cardModel.DueMonth = card.DueMonth;
            cardModel.DueYear = card.DueYear;
            cardModel.CVV = card.CVV;
            //cardModel.ThreeDSecurePassword = card.3DSecurePassword;
            break;

        case "Akbank":
            card = creditCardsJSON.TestCards.Akbank.find(card => card.CardNumber == selectedOptionsValue);
            cardModel.CardNumber = card.CardNumber;
            cardModel.DueMonth = card.DueMonth;
            cardModel.DueYear = card.DueYear;
            cardModel.CVV = card.CVV;
            //cardModel.ThreeDSecurePassword = card.3DSecurePassword;
            break;

        case "İş Bankası":
            card = creditCardsJSON.TestCards.IsBankasi.find(card => card.CardNumber == selectedOptionsValue);
            cardModel.CardNumber = card.CardNumber;
            cardModel.DueMonth = card.DueMonth;
            cardModel.DueYear = card.DueYear;
            cardModel.CVV = card.CVV;
            //cardModel.ThreeDSecurePassword = card.3DSecurePassword;
            break;

        case "Halkbank":
            card = creditCardsJSON.TestCards.HalkBank.find(card => card.CardNumber == selectedOptionsValue);
            cardModel.CardNumber = card.CardNumber;
            cardModel.DueMonth = card.DueMonth;
            cardModel.DueYear = card.DueYear;
            cardModel.CVV = card.CVV;
            //cardModel.ThreeDSecurePassword = card.3DSecurePassword;
            break;

        case "DenizBank":
            card = creditCardsJSON.TestCards.DenizBank.find(card => card.CardNumber == selectedOptionsValue);
            cardModel.CardNumber = card.CardNumber;
            cardModel.DueMonth = card.DueMonth;
            cardModel.DueYear = card.DueYear;
            cardModel.CVV = card.CVV;
            //cardModel.ThreeDSecurePassword = card.3DSecurePassword;
            break;

        case "Yapı Kredi":
            card = creditCardsJSON.TestCards.YapiKredi.find(card => card.CardNumber == selectedOptionsValue);
            cardModel.CardNumber = card.CardNumber;
            cardModel.DueMonth = card.DueMonth;
            cardModel.DueYear = card.DueYear;
            cardModel.CVV = card.CVV;
            //cardModel.ThreeDSecurePassword = card.3DSecurePassword;
            break;

        case "Yabancı Kart":
            card = creditCardsJSON.TestCards.Yabanci.find(card => card.CardNumber == selectedOptionsValue);
            cardModel.CardNumber = card.CardNumber;
            cardModel.DueMonth = card.DueMonth;
            cardModel.DueYear = card.DueYear;
            cardModel.CVV = card.CVV;
            //cardModel.ThreeDSecurePassword = card.3DSecurePassword;
            break;

        default:
    }
});
// #endregion

// #region Test Credit Card with All Payment Methods
function test(method, secureType) {

    if ($('#cardNumber').val() != '' && $('#cardMonth').val() != '' && $('#cardYear').val() != '' && $('#cardCVV').val() != '') {
        var creditCardNumber = $('#cardNumber').val();
        var creditCardMonth = $('#cardMonth').val();
        var creditCardYear = $('#cardYear').val();
        var creditCardCVV = $('#cardCVV').val();
    }
    else {
        // Get Credit Card Number, Month, Year, CVV from User to variable
        var creditCardNumber = cardModel.CardNumber;
        var creditCardMonth = cardModel.DueMonth;
        var creditCardYear = cardModel.DueYear;
        var creditCardCVV = cardModel.CVV;
    }


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

                                    console.log(html);

                                    //var htmlObject = $(html);

                                    //var w = window.open('https://localhost:44345/Home/Payment3DModel', '_blank');

                                    //w.onload = function () { this.document.body.innerHTML += html; console.log(this.document)};

                                    //w.onload = function () { this.document.body.innerHTML = html; };

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
                $("#paymentErrorArea").text("");
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

                        var paymentNSRequest = `<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <Pos_Odeme xmlns="https://turkpos.com.tr/"> <G> <CLIENT_CODE>10738</CLIENT_CODE> <CLIENT_USERNAME>Test</CLIENT_USERNAME> <CLIENT_PASSWORD>Test</CLIENT_PASSWORD> </G> <GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID> <KK_Sahibi>Görkem AKÇAY</KK_Sahibi> <KK_No>${creditCardNumber}</KK_No> <KK_SK_Ay>${creditCardMonth}</KK_SK_Ay> <KK_SK_Yil>${creditCardYear}</KK_SK_Yil> <KK_CVC>${creditCardCVV}</KK_CVC> <KK_Sahibi_GSM>5066011070</KK_Sahibi_GSM> <Hata_URL>https://google.com</Hata_URL> <Basarili_URL>https://dev.param.com.tr/tr</Basarili_URL> <Siparis_ID>${orderID}</Siparis_ID> <Siparis_Aciklama></Siparis_Aciklama> <Taksit>1</Taksit> <Islem_Tutar>100,00</Islem_Tutar> <Toplam_Tutar>100,00</Toplam_Tutar> <Islem_Hash>${hash}</Islem_Hash> <Islem_Guvenlik_Tip>NS</Islem_Guvenlik_Tip><Islem_ID></Islem_ID> <IPAdr>127.0.0.1</IPAdr></Pos_Odeme> </soap:Body> </soap:Envelope>`;

                        $.ajax({
                            url: '/Home/SHARequest',
                            data: { destinationUrl: destinationUrl, requestXml: paymentNSRequest },
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
                var hashRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><SHA2B64 xmlns="https://turkpos.com.tr/"><Data>107380c13d406-873b-403b-9c09-a5766840d98c100,00100,00${orderID}https://localhost:44345/Home/PaymentFailhttps://localhost:44345/Home/PaymentSuccess</Data> </SHA2B64> </soap:Body> </soap:Envelope>`;

                $.ajax({
                    url: '/Home/SHARequest',
                    data: { destinationUrl: destinationUrl, requestXml: hashRequest },
                    success: function (response) {
                        var parseResponse = $.parseXML(response);
                        var xmlResponse = $(parseResponse);
                        var hash = xmlResponse.find("SHA2B64Result").text();

                        var preProvision3DPayRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><TP_Islem_Odeme_OnProv_WMD xmlns="https://turkpos.com.tr/"><G><CLIENT_CODE>10738</CLIENT_CODE><CLIENT_USERNAME>Test</CLIENT_USERNAME><CLIENT_PASSWORD>Test</CLIENT_PASSWORD></G><GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID><KK_Sahibi>Görkem Akçay</KK_Sahibi><KK_No>${creditCardNumber}</KK_No><KK_SK_Ay>${creditCardMonth}</KK_SK_Ay><KK_SK_Yil>${creditCardYear}</KK_SK_Yil><KK_CVC>${creditCardCVV}</KK_CVC><KK_Sahibi_GSM>5066011070</KK_Sahibi_GSM><Hata_URL>https://localhost:44345/Home/PaymentFail</Hata_URL><Basarili_URL>https://localhost:44345/Home/PaymentSuccess</Basarili_URL><Siparis_ID>${orderID}</Siparis_ID><Siparis_Aciklama>a</Siparis_Aciklama><Taksit>1</Taksit><Islem_Tutar>100,00</Islem_Tutar><Toplam_Tutar>100,00</Toplam_Tutar><Islem_Hash>${hash}</Islem_Hash><Islem_Guvenlik_Tip>3D</Islem_Guvenlik_Tip><IPAdr>127.0.0.1</IPAdr></TP_Islem_Odeme_OnProv_WMD></soap:Body></soap:Envelope>`;

                        $.ajax({
                            url: '/Home/SHARequest',
                            data: { destinationUrl: destinationUrl, requestXml: preProvision3DPayRequest },
                            success: function (response) {
                                var responseModel = $.parseXML(response);
                                var xmlResponseModel = $(responseModel);

                                var sonuc = xmlResponseModel.find("Sonuc").text();
                                if (sonuc == 1) {
                                    var html = xmlResponseModel.find("UCD_HTML").text();
                                    console.log(html);

                                    var htmlArea = html.substring(
                                        response.indexOf(`id="step1Form">`) + 15,
                                        response.lastIndexOf("<script type='text/javascript'>")
                                    );
                                    //console.log(htmlArea);

                                    //var w = window.open('https://localhost:44345/Home/PreProvision3DModel', '_blank');
                                    //w.onload = function () { this.document.body.innerHTML = html; };

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

            if (secureType == "NS") {
                $("#preProvisionErrorArea").text("");
                $("#preProvisionLoadSpinnerArea").children().remove();
                $("#preProvisionLoadSpinnerArea").append('<img src="/loadspinner.gif" width="24" height="24"/>');

                var orderID = makeOrderID(20);
                var hashRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><SHA2B64 xmlns="https://turkpos.com.tr/"><Data>107380c13d406-873b-403b-9c09-a5766840d98c100,00100,00${orderID}https://localhost:44345/Home/PaymentFailhttps://localhost:44345/Home/PaymentSuccess</Data> </SHA2B64> </soap:Body> </soap:Envelope>`;

                $.ajax({
                    url: '/Home/SHARequest',
                    data: { destinationUrl: destinationUrl, requestXml: hashRequest },
                    success: function (response) {
                        var parseResponse = $.parseXML(response);
                        var xmlResponse = $(parseResponse);
                        var hash = xmlResponse.find("SHA2B64Result").text();

                        var preProvisionNSRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><TP_Islem_Odeme_OnProv_WMD xmlns="https://turkpos.com.tr/"><G><CLIENT_CODE>10738</CLIENT_CODE><CLIENT_USERNAME>Test</CLIENT_USERNAME><CLIENT_PASSWORD>Test</CLIENT_PASSWORD></G><GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID><KK_Sahibi>Görkem Akçay</KK_Sahibi><KK_No>${creditCardNumber}</KK_No><KK_SK_Ay>${creditCardMonth}</KK_SK_Ay><KK_SK_Yil>${creditCardYear}</KK_SK_Yil><KK_CVC>${creditCardCVV}</KK_CVC><KK_Sahibi_GSM>5066011070</KK_Sahibi_GSM><Hata_URL>https://localhost:44345/Home/PaymentFail</Hata_URL><Basarili_URL>https://localhost:44345/Home/PaymentSuccess</Basarili_URL><Siparis_ID>${orderID}</Siparis_ID><Siparis_Aciklama>a</Siparis_Aciklama><Taksit>1</Taksit><Islem_Tutar>100,00</Islem_Tutar><Toplam_Tutar>100,00</Toplam_Tutar><Islem_Hash>${hash}</Islem_Hash><Islem_Guvenlik_Tip>NS</Islem_Guvenlik_Tip><IPAdr>127.0.0.1</IPAdr></TP_Islem_Odeme_OnProv_WMD></soap:Body></soap:Envelope>`;

                        $.ajax({
                            url: '/Home/SHARequest',
                            data: { destinationUrl: destinationUrl, requestXml: preProvisionNSRequest },
                            success: function (response) {
                                var responseModel = $.parseXML(response);
                                var xmlResponseModel = $(responseModel);
                                var sonuc_str = xmlResponseModel.find("Sonuc_Str").text();
                                var sonuc = xmlResponseModel.find("Sonuc").text();
                                if (sonuc == 1) {
                                    $("#preProvisionLoadSpinnerArea").children().remove();
                                    $("#preProvisionLoadSpinnerArea").append('<i class="fa-sharp fa-solid fa-circle-check text-white"></i>');
                                    $("#preProvisionErrorArea").text(sonuc_str);
                                }
                                else {
                                    $("#preProvisionLoadSpinnerArea").children().remove();
                                    $("#preProvisionLoadSpinnerArea").append('<i class="fa-solid fa-circle-xmark text-white"></i>');
                                    $("#preProvisionErrorArea").text(sonuc_str);
                                }
                            }
                        });
                    }
                });
            }
            break;

        case "paymentWithForeignCurrency":
            if (secureType == "3D") {
                var orderID = makeOrderID(20);
                var hashRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><SHA2B64 xmlns="https://turkpos.com.tr/"><Data>107380c13d406-873b-403b-9c09-a5766840d98c100,00100,00${orderID}https://localhost:44345/Home/PaymentFailhttps://localhost:44345/Home/PaymentSuccess</Data> </SHA2B64> </soap:Body> </soap:Envelope>`;

                $.ajax({
                    url: '/Home/SHARequest',
                    data: { destinationUrl: destinationUrl, requestXml: hashRequest },
                    success: function (response) {
                        var parseResponse = $.parseXML(response);
                        var xmlResponse = $(parseResponse);
                        var hash = xmlResponse.find("SHA2B64Result").text();

                        var paymentWithForeignCurrency3DPayRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><TP_Islem_Odeme_WD xmlns="https://turkpos.com.tr/"><G><CLIENT_CODE>10738</CLIENT_CODE><CLIENT_USERNAME>Test</CLIENT_USERNAME><CLIENT_PASSWORD>Test</CLIENT_PASSWORD></G><Doviz_Kodu>1001</Doviz_Kodu><GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID><KK_Sahibi>test</KK_Sahibi><KK_No>${creditCardNumber}</KK_No><KK_SK_Ay>${creditCardMonth}</KK_SK_Ay><KK_SK_Yil>${creditCardYear}</KK_SK_Yil><KK_CVC>${creditCardCVV}</KK_CVC><KK_Sahibi_GSM>5066011070</KK_Sahibi_GSM><Hata_URL>https://localhost:44345/Home/PaymentFail</Hata_URL><Basarili_URL>https://localhost:44345/Home/PaymentSuccess</Basarili_URL><Siparis_ID>${orderID}</Siparis_ID><Siparis_Aciklama></Siparis_Aciklama><Islem_Tutar>100,00</Islem_Tutar><Toplam_Tutar>100,00</Toplam_Tutar><Islem_Hash>${hash}</Islem_Hash><Islem_Guvenlik_Tip>3D</Islem_Guvenlik_Tip><Islem_ID></Islem_ID><IPAdr>127.0.0.1</IPAdr></TP_Islem_Odeme_WD></soap:Body></soap:Envelope>`;

                        $.ajax({
                            url: '/Home/SHARequest',
                            data: { destinationUrl: destinationUrl, requestXml: paymentWithForeignCurrency3DPayRequest },
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
                                    $("#paymentWithForeignCurrencyErrorArea").text(sonuc_str);
                                }
                            }
                        });
                    }
                });
            }

            if (secureType == "NS") {
                $("#paymentWithForeignCurrencyErrorArea").text("");
                $("#paymentWithForeignCurrencyLoadSpinnerArea").children().remove();
                $("#paymentWithForeignCurrencyLoadSpinnerArea").append('<img src="/loadspinner.gif" width="24" height="24"/>');

                var orderID = makeOrderID(20);
                var hashRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><SHA2B64 xmlns="https://turkpos.com.tr/"><Data>107380c13d406-873b-403b-9c09-a5766840d98c100,00100,00${orderID}https://localhost:44345/Home/PaymentFailhttps://localhost:44345/Home/PaymentSuccess</Data> </SHA2B64> </soap:Body> </soap:Envelope>`;

                $.ajax({
                    url: '/Home/SHARequest',
                    data: { destinationUrl: destinationUrl, requestXml: hashRequest },
                    success: function (response) {
                        var parseResponse = $.parseXML(response);
                        var xmlResponse = $(parseResponse);
                        var hash = xmlResponse.find("SHA2B64Result").text();

                        var paymentWithForeignCurrencyNSRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><TP_Islem_Odeme_WD xmlns="https://turkpos.com.tr/"><G><CLIENT_CODE>10738</CLIENT_CODE><CLIENT_USERNAME>Test</CLIENT_USERNAME><CLIENT_PASSWORD>Test</CLIENT_PASSWORD></G><Doviz_Kodu>1001</Doviz_Kodu><GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID><KK_Sahibi>test</KK_Sahibi><KK_No>${creditCardNumber}</KK_No><KK_SK_Ay>${creditCardMonth}</KK_SK_Ay><KK_SK_Yil>${creditCardYear}</KK_SK_Yil><KK_CVC>${creditCardCVV}</KK_CVC><KK_Sahibi_GSM>5066011070</KK_Sahibi_GSM><Hata_URL>https://localhost:44345/Home/PaymentFail</Hata_URL><Basarili_URL>https://localhost:44345/Home/PaymentSuccess</Basarili_URL><Siparis_ID>${orderID}</Siparis_ID><Siparis_Aciklama></Siparis_Aciklama><Islem_Tutar>100,00</Islem_Tutar><Toplam_Tutar>100,00</Toplam_Tutar><Islem_Hash>${hash}</Islem_Hash><Islem_Guvenlik_Tip>NS</Islem_Guvenlik_Tip><Islem_ID></Islem_ID><IPAdr>127.0.0.1</IPAdr></TP_Islem_Odeme_WD></soap:Body></soap:Envelope>`;

                        $.ajax({
                            url: '/Home/SHARequest',
                            data: { destinationUrl: destinationUrl, requestXml: paymentWithForeignCurrencyNSRequest },
                            success: function (response) {
                                var responseModel = $.parseXML(response);
                                var xmlResponseModel = $(responseModel);
                                var sonuc_str = xmlResponseModel.find("Sonuc_Str").text();
                                var sonuc = xmlResponseModel.find("Sonuc").text();
                                if (sonuc == 1) {
                                    $("#paymentWithForeignCurrencyLoadSpinnerArea").children().remove();
                                    $("#paymentWithForeignCurrencyLoadSpinnerArea").append('<i class="fa-sharp fa-solid fa-circle-check text-white"></i>');
                                    $("#paymentWithForeignCurrencyErrorArea").text(sonuc_str);
                                }
                                else {
                                    $("#paymentWithForeignCurrencyLoadSpinnerArea").children().remove();
                                    $("#paymentWithForeignCurrencyLoadSpinnerArea").append('<i class="fa-solid fa-circle-xmark text-white"></i>');
                                    $("#paymentWithForeignCurrencyErrorArea").text(sonuc_str);
                                }
                            }
                        });
                    }
                });
            }
            break;

        case "paymentWithCardStorage":
            if (secureType == "3D") {
                destinationUrl = "https://test-dmz.param.com.tr/out.ws/service_ks.asmx";
                var orderID = makeOrderID(20);

                var cardStorageRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><KS_Kart_Ekle xmlns="https://turkpara.com.tr/"><G><CLIENT_CODE>10738</CLIENT_CODE><CLIENT_USERNAME>Test</CLIENT_USERNAME><CLIENT_PASSWORD>Test</CLIENT_PASSWORD></G><GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID><KK_Sahibi>Görkem Akçay</KK_Sahibi><KK_No>${creditCardNumber}</KK_No><KK_SK_Ay>${creditCardMonth}</KK_SK_Ay><KK_SK_Yil>${creditCardYear}</KK_SK_Yil></KS_Kart_Ekle></soap:Body></soap:Envelope>`;

                $.ajax({
                    url: '/Home/SHARequest',
                    data: { destinationUrl: destinationUrl, requestXml: cardStorageRequest },
                    success: function (response) {
                        var parseResponse = $.parseXML(response);
                        var xmlResponse = $(parseResponse);
                        var ks_guid = xmlResponse.find("KS_GUID").text();

                        var paymentWithCardStorage3DPayRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><KS_Tahsilat xmlns="https://turkpara.com.tr/"><G><CLIENT_CODE>10738</CLIENT_CODE><CLIENT_USERNAME>Test</CLIENT_USERNAME><CLIENT_PASSWORD>Test</CLIENT_PASSWORD></G><GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID><KS_GUID>${ks_guid}</KS_GUID><CVV>${creditCardCVV}</CVV><KK_Sahibi_GSM>5066011070</KK_Sahibi_GSM><Hata_URL>https://localhost:44345/Home/PaymentFail</Hata_URL><Basarili_URL>https://localhost:44345/Home/PaymentSuccess</Basarili_URL><Siparis_ID>${orderID}</Siparis_ID><Siparis_Aciklama>gorkem's order</Siparis_Aciklama><Taksit>1</Taksit><Islem_Tutar>100,00</Islem_Tutar><Toplam_Tutar>100,00</Toplam_Tutar><Islem_Guvenlik_Tip>3D</Islem_Guvenlik_Tip><Islem_ID>islemID_${orderID}</Islem_ID><IPAdr>127.0.0.1</IPAdr><KK_Islem_ID>KK_islemID_${orderID}</KK_Islem_ID></KS_Tahsilat></soap:Body></soap:Envelope>`;

                        $.ajax({
                            url: '/Home/SHARequest',
                            data: { destinationUrl: destinationUrl, requestXml: paymentWithCardStorage3DPayRequest },
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
                                    $("#paymentWithCardStorageErrorArea").text(sonuc_str);
                                }
                            }
                        });
                    }
                });
            }

            if (secureType == "NS") {
                $("#paymentWithCardStorageErrorArea").text("");
                $("#paymentWithCardStorageLoadSpinnerArea").children().remove();
                $("#paymentWithCardStorageLoadSpinnerArea").append('<img src="/loadspinner.gif" width="24" height="24"/>');
                destinationUrl = "https://test-dmz.param.com.tr/out.ws/service_ks.asmx";
                var orderID = makeOrderID(20);

                var cardStorageRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><KS_Kart_Ekle xmlns="https://turkpara.com.tr/"><G><CLIENT_CODE>10738</CLIENT_CODE><CLIENT_USERNAME>Test</CLIENT_USERNAME><CLIENT_PASSWORD>Test</CLIENT_PASSWORD></G><GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID><KK_Sahibi>Görkem Akçay</KK_Sahibi><KK_No>${creditCardNumber}</KK_No><KK_SK_Ay>${creditCardMonth}</KK_SK_Ay><KK_SK_Yil>${creditCardYear}</KK_SK_Yil></KS_Kart_Ekle></soap:Body></soap:Envelope>`;

                $.ajax({
                    url: '/Home/SHARequest',
                    data: { destinationUrl: destinationUrl, requestXml: cardStorageRequest },
                    success: function (response) {
                        var parseResponse = $.parseXML(response);
                        var xmlResponse = $(parseResponse);
                        var ks_guid = xmlResponse.find("KS_GUID").text();

                        var paymentWithCardStorage3DPayRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><KS_Tahsilat xmlns="https://turkpara.com.tr/"><G><CLIENT_CODE>10738</CLIENT_CODE><CLIENT_USERNAME>Test</CLIENT_USERNAME><CLIENT_PASSWORD>Test</CLIENT_PASSWORD></G><GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID><KS_GUID>${ks_guid}</KS_GUID><CVV>${creditCardCVV}</CVV><KK_Sahibi_GSM>5066011070</KK_Sahibi_GSM><Hata_URL>https://localhost:44345/Home/PaymentFail</Hata_URL><Basarili_URL>https://localhost:44345/Home/PaymentSuccess</Basarili_URL><Siparis_ID>${orderID}</Siparis_ID><Siparis_Aciklama>gorkem's order</Siparis_Aciklama><Taksit>1</Taksit><Islem_Tutar>100,00</Islem_Tutar><Toplam_Tutar>100,00</Toplam_Tutar><Islem_Guvenlik_Tip>NS</Islem_Guvenlik_Tip><Islem_ID>islemID_${orderID}</Islem_ID><IPAdr>127.0.0.1</IPAdr><KK_Islem_ID>KK_islemID_${orderID}</KK_Islem_ID></KS_Tahsilat></soap:Body></soap:Envelope>`;

                        $.ajax({
                            url: '/Home/SHARequest',
                            data: { destinationUrl: destinationUrl, requestXml: paymentWithCardStorage3DPayRequest },
                            success: function (response) {
                                var responseModel = $.parseXML(response);
                                var xmlResponseModel = $(responseModel);

                                var sonuc_str = xmlResponseModel.find("Sonuc_Str").text();
                                var sonuc = xmlResponseModel.find("Sonuc").text();
                                if (sonuc == 1) {
                                    $("#paymentWithCardStorageLoadSpinnerArea").children().remove();
                                    $("#paymentWithCardStorageLoadSpinnerArea").append('<i class="fa-sharp fa-solid fa-circle-check text-white"></i>');
                                    $("#paymentWithCardStorageErrorArea").text(sonuc_str);
                                }
                                else {
                                    $("#paymentWithCardStorageLoadSpinnerArea").children().remove();
                                    $("#paymentWithCardStorageLoadSpinnerArea").append('<i class="fa-solid fa-circle-xmark text-white"></i>');
                                    $("#paymentWithCardStorageErrorArea").text(sonuc_str);
                                }
                            }
                        });
                    }
                });
            }
            break;

        case "preProvisionWithCardStorage":
            if (secureType == "NS") {
                $("#preProvisionWithCardStorageErrorArea").text("");
                $("#preProvisionWithCardStorageLoadSpinnerArea").children().remove();
                $("#preProvisionWithCardStorageLoadSpinnerArea").append('<img src="/loadspinner.gif" width="24" height="24"/>');
            }
            destinationUrl = "https://test-dmz.param.com.tr/out.ws/service_ks.asmx";
            var orderID = makeOrderID(20);

            var cardStorageRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><KS_Kart_Ekle xmlns="https://turkpara.com.tr/"><G><CLIENT_CODE>10738</CLIENT_CODE><CLIENT_USERNAME>Test</CLIENT_USERNAME><CLIENT_PASSWORD>Test</CLIENT_PASSWORD></G><GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID><KK_Sahibi>Görkem Akçay</KK_Sahibi><KK_No>${creditCardNumber}</KK_No><KK_SK_Ay>${creditCardMonth}</KK_SK_Ay><KK_SK_Yil>${creditCardYear}</KK_SK_Yil></KS_Kart_Ekle></soap:Body></soap:Envelope>`;

            $.ajax({
                url: '/Home/SHARequest',
                data: { destinationUrl: destinationUrl, requestXml: cardStorageRequest },
                success: function (response) {
                    var parseResponse = $.parseXML(response);
                    var xmlResponse = $(parseResponse);
                    var ks_guid = xmlResponse.find("KS_GUID").text();

                    destinationUrl = "https://test-dmz.param.com.tr/turkpos.ws/service_turkpos_test.asmx";
                    var hashRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><SHA2B64 xmlns="https://turkpos.com.tr/"><Data>107380c13d406-873b-403b-9c09-a5766840d98c100,00100,00${orderID}https://localhost:44345/Home/PaymentFailhttps://localhost:44345/Home/PaymentSuccess</Data> </SHA2B64> </soap:Body> </soap:Envelope>`;

                    $.ajax({
                        url: '/Home/SHARequest',
                        data: { destinationUrl: destinationUrl, requestXml: hashRequest },
                        success: function (response) {
                            var parseResponse = $.parseXML(response);
                            var xmlResponse = $(parseResponse);
                            var hash = xmlResponse.find("SHA2B64Result").text();

                            var preProvisionWithCardStorageRequest = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><TP_Islem_Odeme_OnProv_WKS xmlns="https://turkpos.com.tr/"><G><CLIENT_CODE>10738</CLIENT_CODE><CLIENT_USERNAME>test</CLIENT_USERNAME><CLIENT_PASSWORD>test</CLIENT_PASSWORD></G><GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID><KK_GUID>${ks_guid}</KK_GUID><KS_Kart_No>0c13d406-873b-403b-9c09-a5766840d98c</KS_Kart_No><KK_Sahibi_GSM>5066011070</KK_Sahibi_GSM><Hata_URL>https://localhost:44345/Home/PaymentFail</Hata_URL><Basarili_URL>https://localhost:44345/Home/PaymentSuccess</Basarili_URL><Siparis_ID>${orderID}</Siparis_ID><Siparis_Aciklama>siparis aciklama</Siparis_Aciklama><Islem_Tutar>100,00</Islem_Tutar><Toplam_Tutar>100,00</Toplam_Tutar><Islem_Hash>${hash}</Islem_Hash><Islem_Guvenlik_Tip>${secureType}</Islem_Guvenlik_Tip><IPAdr>127.0.0.1</IPAdr></TP_Islem_Odeme_OnProv_WKS></soap:Body></soap:Envelope>`;

                            $.ajax({
                                url: '/Home/SHARequest',
                                data: { destinationUrl: destinationUrl, requestXml: preProvisionWithCardStorageRequest },
                                success: function (response) {
                                    var responseModel = $.parseXML(response);
                                    var xmlResponseModel = $(responseModel);
                                    var sonuc = xmlResponseModel.find("Sonuc").text();

                                    if (secureType == "3D") {
                                        if (sonuc == 1) {
                                            var ucdURL = xmlResponseModel.find("UCD_URL").text().replace('amp;', '');
                                            window.open(ucdURL, '_blank');
                                        }
                                        else {
                                            var sonuc_str = xmlResponseModel.find("Sonuc_Str").text();
                                            $("#preProvisionWithCardStorageErrorArea").text(sonuc_str);
                                        }
                                    }
                                    if (secureType == "NS") {
                                        var sonuc_str = xmlResponseModel.find("Sonuc_Str").text();
                                        if (sonuc == 1) {
                                            $("#preProvisionWithCardStorageLoadSpinnerArea").children().remove();
                                            $("#preProvisionWithCardStorageLoadSpinnerArea").append('<i class="fa-sharp fa-solid fa-circle-check text-white"></i>');
                                            $("#preProvisionWithCardStorageErrorArea").text(sonuc_str);
                                        }
                                        else {
                                            $("#preProvisionWithCardStorageLoadSpinnerArea").children().remove();
                                            $("#preProvisionWithCardStorageLoadSpinnerArea").append('<i class="fa-solid fa-circle-xmark text-white"></i>');
                                            $("#preProvisionWithCardStorageErrorArea").text(sonuc_str);
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            });
            break;

        default:
    }
}
// #endregion

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
// #endregion

// #region Layout Tab Partial Views

function getCreditCardPartialView() {
    $.ajax({
        url: 'CreditCard/GetCreaditCardPartialView',
        success: function (response) {
            $("#partialArea").html(response);
        }
    });
}

function getTestAllCreditCardsPartialView() {
    $.ajax({
        url: 'CreditCard/GetTestAllCreditCardsPartialView',
        success: function (response) {
            $("#partialArea").html(response);
        }
    });
}

function getAddNewCreditCardPartialView() {
    $.ajax({
        url: 'CreditCard/GetAddNewCreditCardPartialView',
        success: function (response) {
            $("#partialArea").html(response);
        }
    });
}

// #endregion

function addNewCard(bank) {
    cardModel.CardNumber = $('#addCardNumber').val();
    cardModel.DueMonth = $('#addCardDueMonth').val();
    cardModel.DueYear = $('#addCardDueYear').val();
    cardModel.CVV = $('#addCardCVV').val();

    $('#addCardNumber').val('');
    $('#addCardSelectBank').val('');
    $('#addCardDueMonth').val('');
    $('#addCardDueYear').val('');
    $('#addCardCVV').val('');

    switch (bank) {
        case "ZiraatBankasi":
            alert("ZiraatBankasi");
            break;

        case "FinansBank":
            alert("FinansBank");
            break;

        case "Akbank":
            alert("Akbank");
            break;

        case "IsBankasi":
            alert("IsBankasi");
            break;

        case "Halkbank":
            alert("Halkbank");
            break;

        case "Denizbank":
            alert("Denizbank");
            break;

        case "YapiKredi":
            alert("YapiKredi");
            break;

        case "YabanciKart":
            alert("YabanciKart");
            break;

        default:
    }
}