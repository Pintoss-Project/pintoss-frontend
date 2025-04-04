/*
	File Info   
	- Name :               gx_web_client.jsp    
	- Server Location :    PGWA
	- Description :        클라이언트 제공 스크립트
    
	Modify List  
	- 2022.03.03 : 해외카드 호출 경로 수정    
	- 2022.03.24 : 신용카드 비인증 결제창 호출 방식 추가 
	- 2022.11.22 : 휴대폰 모바일 호출 URL 수정(간소화 방식은 분리, 그외 통합)
	- 2024.04.23 : 프레임 영역 scroll 활성화 속성 추가
*/


//define
var GX_TPAY_SVC_DNS = "http://tpay.billgate.net";
var GX_TPAYS_SVC_DNS = "https://tpay.billgate.net";
var GX_PAY_DNS = "https://pay.billgate.net";
var GX_SVC_DNS = null;
var GX_FORM_METHOD = "POST";
var GX_CHARSET = "EUC-KR";
var GX_PAY_URL = null;
var GX_CP_CHARSET = null;
var GX_CP_FORM_OBJ = null;
var GX_VIEW_TYPE = null;
var GX_LAYER_X = 480;
var GX_LAYER_Y = 600;
var GX_DEVICE = false;

//function

//모바일 디바이스 확인
function GX_isMobile() {
	var pf = navigator.platform.toLowerCase();

	if (pf) {
		if ('win16|win32|win64|mac|macintel'.indexOf(pf) < 0) {
			return true;
		} else if ("mac|macintel".indexOf(pf) > -1 && navigator.maxTouchPoints > 1) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

//브라우저 종류
function GX_getUserBrowser() {
	var browser;
	var ua = navigator.userAgent.toLowerCase();

	if (ua.indexOf("edge") > -1) {
		browser = "ieEdge";
	} else if (ua.indexOf("whale") > -1) {
		browser = "whale";
	} else if (ua.indexOf("chrome") > -1) {
		browser = "chrome";
	} else if (ua.indexOf("firefox") > -1) {
		browser = "firefox";
	} else if (ua.indexOf("safari") > -1) {
		browser = "safari";
	} else if (ua.indexOf("msie") > -1 || ua.indexOf("trident") > -1) {
		var version = GX_getVersionIE();
		browser = "ie" + version;
	} else {
		browser = "unknown";
	}

	return browser;
}

//IE 버전 체크
function GX_getVersionIE() {
	var v = -1;
	var ua = navigator.userAgent.toLowerCase();
	var an = navigator.appName;

	if (an == "Microsoft Internet Explorer") {
		var reg = new RegExp("msie ([0-9]{1,}[\.0-9]{0,})");

		if (reg.exec(ua) != null) {
			v = parseFloat(RegExp.$1);
		}
	} else if (an == "Netscape" && ua.indexOf("trident") > -1) {
		v = 11;
	}

	return v;
}

//레이어 팝업 구성
function GX_openLayerPopup() {
	var client_protocol = window.location.protocol;
	var attachElement = document.body;
	var payLayerDiv = document.createElement('div');
	var imgDNS;

	var mainLayerDivStyle = "z-index:10000;position:fixed; top:0; left:0; width:100%; height:100%;";
	var opacityDivStyle = "position:absolute; z-index:11000; top:0; left:0; width:100%; height:100%; background:#000; opacity:0.6; filter:alpha(opacity=60);";
	var contentDivStyle = "z-index:11100;position:absolute; display:none; background-color:rgba(0,0,0,0); width:" + GX_LAYER_X + "px; height:" + GX_LAYER_Y + "px; top:50%; left:50%; text-align:center; margin-left:-" + (parseInt(GX_LAYER_X, 10) / 2) + "px; margin-top:-" + (parseInt(GX_LAYER_Y, 10) / 2) + "px;";
	var contentIframeStyle = "z-index:11110;width:100%; height:100%; margin:0px auto; overflow-x:hidden;overflow-y:auto; border: none 0px;";
	var closeBtnStyle = "z-index:11050;position: absolute; top:50%; left:50%; width:30px; height: 30px; margin-left: " + ((parseInt(GX_LAYER_X, 10) / 2) - 30) + "px; margin-top: -" + ((parseInt(GX_LAYER_Y, 10) / 2) + 30) + "px; display: block;";


	if (client_protocol == 'https:') {
		imgDNS = "https://payimg.billgate.net";
	} else {
		imgDNS = "http://tpayimg.billgate.net";
	}

	if (GX_getUserBrowser().indexOf("ie") > -1) {
		contentIframeStyle = "z-index:11110;width:" + GX_LAYER_X + "px; height:" + GX_LAYER_Y + "px; margin:0px; overflow:hidden; border: none 0px;";
	}

	var closeBtn = '<a href="javascript:GX_payClose();" style="' + closeBtnStyle + '"><img src="' + imgDNS + '/galaxia/img/credit/renew/btn_close.gif" alt="닫기"></a>';
	var contentIframe = '<iframe src="" id="gxContentIframe" name="gxContentIframe" frameborder="0" scrolling="yes" allowtransparency="true" style="' + contentIframeStyle + '"></iframe>';
	var contentDiv = '<div id="gxContentDiv" style="' + contentDivStyle + '">' + contentIframe + '</div>';
	var opacityDiv = '<div id="gxOpacityDiv" style="' + opacityDivStyle + '"></div>';
	var mainLayerDiv = '<div id="gxMainLayerDiv" style="' + mainLayerDivStyle + '">' + closeBtn + opacityDiv + contentDiv + '</div>';

	payLayerDiv.setAttribute("id", "gxPayLayer");
	payLayerDiv.innerHTML = mainLayerDiv;

	attachElement.appendChild(payLayerDiv);
}


//결제창 호출 이전
function GX_paySubmitPrev() {
	GX_CP_FORM_OBJ.method = GX_FORM_METHOD;
	GX_CP_FORM_OBJ.acceptCharset = GX_CHARSET;

	// charset 세팅
	if (document.all) {
		GX_CP_CHARSET = document.charset;

		try {
			document.charset = GX_CHARSET;
		} catch (e) {
		}
	}
}

//결제창 호출 이후
function GX_paySubmitLater() {
	// charset 가맹점 인코딩 셋팅
	if (document.all) {
		try {
			document.charset = GX_CP_CHARSET;
		} catch (e) {
		}
	}
	GX_CP_FORM_OBJ.target = "_self";
}

//결제창 호출
function GX_paySubmit() {

	GX_paySubmitPrev();

	if (GX_VIEW_TYPE == "layerpopup") {
		GX_openLayerPopup();

		GX_CP_FORM_OBJ.target = "gxContentIframe";
		GX_CP_FORM_OBJ.action = GX_PAY_URL;
		GX_CP_FORM_OBJ.submit();

		setTimeout(function () {
			document.getElementById("gxContentDiv").style.display = '';
		}, 1000);

	} else if (GX_VIEW_TYPE == "popup" || GX_VIEW_TYPE == "submit") {

		GX_CP_FORM_OBJ.target = "";
		GX_CP_FORM_OBJ.action = GX_PAY_URL;

		if (GX_VIEW_TYPE == "popup") {
			GX_CP_FORM_OBJ.target = GX_CP_FORM_OBJ.name;
			var GX_CP_POPUP_OBJ = window.open("", GX_CP_FORM_OBJ.name, "width=" + GX_LAYER_X + ",height=" + GX_LAYER_Y + ",toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,left=150,top=150");

			//팝업 차단여부 확인
			if (GX_CP_POPUP_OBJ == null) {
				alert("브라우저 팝업이 차단되어 있습니다.\n팝업차단을 해제하신 뒤 다시 시도하여 주십시오.");
			}
		}

		GX_CP_FORM_OBJ.submit();

	}

	GX_paySubmitLater();
}

//결제 호출
function GX_pay(frmName, viewType, protocolType) {
	//기본 체크 및 설정
	if (GX_init(frmName, viewType, protocolType) == true) {
		if (GX_CP_FORM_OBJ != null) {
			GX_paySubmit();
		}
	}
}

//기본 체크 및 설정
function GX_init(frmName, viewType, protocolType) {
	GX_DEVICE = GX_isMobile();

	if (GX_DEVICE == true && viewType == "layerpopup") {
		alert("모바일 환경에서는 레이어 팝업으로 결제를 진행할 수 없습니다.");
		return false;
	}

	if (GX_initCheck(frmName, viewType, protocolType) == false) {
		return false;
	}

	return true;
}

//기본 값 체크
function GX_initCheck(frmName, viewType, protocolType) {

	//form 체크
	if (document.forms["" + frmName + ""]) {
		//form obj setting
		GX_CP_FORM_OBJ = document.forms["" + frmName + ""];
	} else {
		alert("form name 객체를 찾을 수 없습니다.");
		return false;
	}

	//뷰 처리 구분
	if (viewType == "undefined" || viewType == null) {
		alert("view 타입을 입력하지 않았습니다.");
		return false;
	} else if (viewType == "") {
		alert("view 타입을 입력하지 않았습니다.");
		return false;
	} else if (viewType != "layerpopup" && viewType != "popup" && viewType != "submit") {
		alert("정의되지 않은 veiw 타입 입니다.");
		return false;
	} else {
		GX_VIEW_TYPE = viewType.toLowerCase();

		if (GX_CP_FORM_OBJ.VIEW_TYPE == "undefined" || GX_CP_FORM_OBJ.VIEW_TYPE == null) {
			var viewTypeInput = document.createElement("input");
			viewTypeInput.type = "hidden";
			viewTypeInput.name = "VIEW_TYPE";
			viewTypeInput.value = viewType;
			GX_CP_FORM_OBJ.appendChild(viewTypeInput);
		} else {
			GX_CP_FORM_OBJ.VIEW_TYPE.value = GX_VIEW_TYPE;
		}
	}

	//프로토콜 타입 체크
	if (protocolType == "undefined" || protocolType == null) {
		alert("protocol 타입을 입력하지 않았습니다.");
		return false;
	} else if (protocolType == "") {
		alert("protocol 타입을 입력하지 않았습니다.");
		return false;
	} else {
		if (protocolType.toLowerCase() == "http_tpay") {
			GX_SVC_DNS = GX_TPAY_SVC_DNS;
		} else if (protocolType.toLowerCase() == "https_tpay") {
			GX_SVC_DNS = GX_TPAYS_SVC_DNS;
		} else if (protocolType.toLowerCase() == "https_pay") {
			GX_SVC_DNS = GX_PAY_DNS;
		} else if (protocolType.indexOf("://") != -1) {
			GX_SVC_DNS = protocolType;
		} else {
			alert("정의되지 않은 protocol 타입 입니다.");
			return false;
		}
	}

	//서비스코드 체크
	if (GX_CP_FORM_OBJ.SERVICE_CODE == "undefined" || GX_CP_FORM_OBJ.SERVICE_CODE == null) {
		alert("form 태그 내 SERVICE_CODE 가 정의되어 있지 않습니다.");
		return false;
	} else if (GX_CP_FORM_OBJ.SERVICE_CODE.value == "") {
		alert("form 태그 내 SERVICE_CODE 가 입력되어 있지 않습니다.");
		return false;
	} else {
		return GX_setPayURL(GX_CP_FORM_OBJ.SERVICE_CODE.value);
	}

	return true;
}

//결제창 호출 URL 셋팅
function GX_setPayURL(serviceCode) {

	switch (serviceCode) {
		case "1100": // 휴대폰
			if (GX_CP_FORM_OBJ.SERVICE_TYPE.value == "0000") {					//일반 결제
				GX_PAY_URL = GX_SVC_DNS + "/mobile/certify.jsp";

				if (GX_CP_FORM_OBJ.FLAG_CODE != "undefined" && GX_CP_FORM_OBJ.FLAG_CODE != null && GX_CP_FORM_OBJ.FLAG_CODE.value == "simple") {						//간소화 결제
					GX_PAY_URL = GX_SVC_DNS + "/mobile" + (GX_DEVICE ? "/smartphone" : "") + "/certify.jsp";
					GX_LAYER_X = 440;
					GX_LAYER_Y = 690;
					break;
				}

			} else if (GX_CP_FORM_OBJ.SERVICE_TYPE.value == "1000") {			//월 자동 과금 최초 동의
				GX_PAY_URL = GX_SVC_DNS + "/mobile/agreeCertify.jsp";
			} else {
				alert("휴대폰 선택 시 결제타입(SERVICE_TYPE)을 반드시 지정해 주시기 바랍니다.");
				return false;
			}

			GX_LAYER_X = 380;
			GX_LAYER_Y = 670;
			break;

		case "0900": // 신용카드
			if (GX_CP_FORM_OBJ.USING_TYPE != "undefined" && GX_CP_FORM_OBJ.USING_TYPE != null && "0001" == GX_CP_FORM_OBJ.USING_TYPE.value) {								//해외카드 결제
				GX_PAY_URL = GX_SVC_DNS + "/credit/abroad/certify.jsp";
				GX_LAYER_X = 380;
				GX_LAYER_Y = 620;
			} else if (GX_CP_FORM_OBJ.SERVICE_TYPE == "undefined" || GX_CP_FORM_OBJ.SERVICE_TYPE == null || "0000" == GX_CP_FORM_OBJ.SERVICE_TYPE.value) {					//일반 결제
				GX_PAY_URL = GX_SVC_DNS + "/credit" + (GX_DEVICE ? "/smartphone" : "") + "/certify.jsp";
				GX_LAYER_X = 640;
				GX_LAYER_Y = 613;
			} else if ("1000" == GX_CP_FORM_OBJ.SERVICE_TYPE.value) {			//자동과금 키 등록
				GX_PAY_URL = GX_SVC_DNS + "/credit/auto/certify.jsp";
				GX_LAYER_X = 380;
				GX_LAYER_Y = 620;
			} else if ("000A" == GX_CP_FORM_OBJ.SERVICE_TYPE.value.toUpperCase()) {           //비인증
				GX_PAY_URL = GX_SVC_DNS + "/credit/nocertify/certify.jsp";
				GX_LAYER_X = 380;
				GX_LAYER_Y = 650;
			} else {
				alert("신용카드 선택 시 결제타입(SERVICE_TYPE)을 반드시 지정해 주시기 바랍니다.");
				return false;
			}

			break;

		case "1000": //계좌이체U+
			GX_PAY_URL = GX_SVC_DNS + "/account" + (GX_DEVICE ? "/smartphone" : "") + "/certify.jsp";
			GX_LAYER_X = 680;
			GX_LAYER_Y = 665;
			break;

		case "1800": //가상계좌
			GX_PAY_URL = GX_SVC_DNS + "/vaccount/certify.jsp";
			GX_LAYER_X = 380;
			GX_LAYER_Y = 610;
			break;

		case "0200": //문화상품권
			GX_PAY_URL = GX_SVC_DNS + "/culture/certify.jsp";
			GX_LAYER_X = 440;
			GX_LAYER_Y = 660;
			break;

		case "0100": //도서상품권
			GX_PAY_URL = GX_SVC_DNS + "/book/idCertify.jsp";
			GX_LAYER_X = 430;
			GX_LAYER_Y = 640;
			break;

		case "0300": //게임문화상품권(스마트문상)
			GX_PAY_URL = GX_SVC_DNS + "/gameculture/certify.jsp";
			GX_LAYER_X = 440;
			GX_LAYER_Y = 660;
			break;

		case "0500": //해피머니상품권 
			GX_PAY_URL = GX_SVC_DNS + "/happymoney/certify.jsp";
			GX_LAYER_X = 430;
			GX_LAYER_Y = 660;
			break;

		case "0700": //캐시게이트(편의점 결제) 
			GX_PAY_URL = GX_SVC_DNS + "/cashgate/certify.jsp";
			GX_LAYER_X = 430;
			GX_LAYER_Y = 660;
			break;

		case "2600": //에그머니 
			GX_PAY_URL = GX_SVC_DNS + "/eggmoney/certify.jsp";
			GX_LAYER_X = 380;
			GX_LAYER_Y = 620;
			break;

		case "4100": //머니트리 
			GX_PAY_URL = GX_SVC_DNS + "/moneytree/certify.jsp";
			GX_LAYER_X = 380;
			GX_LAYER_Y = 660;
			break;

		case "1600": //티머니 
			GX_PAY_URL = GX_SVC_DNS + "/tmoney" + (GX_DEVICE ? "/inapp" : "") + "/certify.jsp";
			GX_LAYER_X = 450;
			GX_LAYER_Y = 610;
			break;

		case "1200": //폰빌 
			if (GX_CP_FORM_OBJ.SERVICE_TYPE.value == "0000") {					//일반 결제
				GX_PAY_URL = GX_SVC_DNS + "/phonebill/certify.jsp";
			} else if (GX_CP_FORM_OBJ.SERVICE_TYPE.value == "1000") {			//월 자동 과금 최초 동의
				GX_PAY_URL = GX_SVC_DNS + "/phonebill/agreeCertify.jsp";
			} else {
				alert("폰빌 선택 시 결제타입(SERVICE_TYPE)을 반드시 지정해 주시기 바랍니다.");
				return false;
			}
			GX_LAYER_X = 380;
			GX_LAYER_Y = 620;
			break;

		case "2500": //틴캐시 
			GX_PAY_URL = GX_SVC_DNS + "/teencash/certify.jsp";
			GX_LAYER_X = 380;
			GX_LAYER_Y = 610;
			break;

		default: //그외
			GX_PAY_URL = "";
			alert("정의되지 않은 결제 수단 입니다.");
			return false;
	}

	return true;
}

function GX_payClose() {
	try {
		if (GX_VIEW_TYPE == "layerpopup") {
			var objPayLayer = document.getElementById("gxPayLayer");
			var objMainLayer = document.getElementById("gxMainLayerDiv");
			var objContent = document.getElementById("gxContentDiv");
			var objOpacity = document.getElementById("gxOpacityDiv");
			var objContentIframe = document.getElementById("gxContentIframe");

			objContentIframe.style.display = 'none';
			objContentIframe.parentNode.removeChild(objContentIframe);

			objContent.style.display = 'none';
			objContent.parentNode.removeChild(objContent);

			objOpacity.style.display = 'none';
			objOpacity.parentNode.removeChild(objOpacity);

			objMainLayer.style.display = 'none';
			objMainLayer.parentNode.removeChild(objMainLayer);

			objPayLayer.style.display = 'none';
			objPayLayer.parentNode.removeChild(objPayLayer);

		} else if (GX_VIEW_TYPE == "popup" && window.opener) {
			window.opener.postMessage('GX_payClose', '*');
			// 	window.close();
		}
	} catch (e) {
	}
}