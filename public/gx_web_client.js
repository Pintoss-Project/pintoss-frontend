// Mock Implementation of GX_pay for Local Testing
(function (global) {
	function GX_pay(formName, viewType, protocolType) {
		console.log(
			`[GX_pay Called] Form Name: ${formName}, View Type: ${viewType}, Protocol Type: ${protocolType}`,
		);

		// Validation check for input parameters
		if (!formName || !document.forms[formName]) {
			alert('Form not found: ' + formName);
			return;
		}

		// Protocol type handling (test or production)
		const baseURL =
			protocolType === 'https_pay'
				? 'https://real-payment-url.com'
				: 'https://test-payment-url.com';

		// Simulate opening payment popup
		if (viewType === 'popup') {
			window.open(
				`${baseURL}/payment?formName=${formName}`,
				'PaymentWindow',
				'width=600,height=400',
			);
		} else if (viewType === 'submit') {
			document.forms[formName].action = baseURL + '/payment';
			document.forms[formName].submit();
		} else {
			alert('Invalid viewType: ' + viewType);
		}
	}

	function GX_payClose() {
		console.log('[GX_payClose Called] Closing payment window.');
		if (window.opener) {
			window.close();
		} else {
			alert('No payment window to close.');
		}
	}

	// Expose to global object
	global.GX_pay = GX_pay;
	global.GX_payClose = GX_payClose;
})(window);
