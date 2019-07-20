/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
(function() {
	'use strict';

	/**
	 * @name _isNumeric
	 * @since 2017-12-06
	 * @param {*} value
	 * @return {boolean}
	 */
	function _isNumeric(value) {
		return typeof value === 'number' && !isNaN(value) && isFinite(value);
	}

	window.cookie = {
		/**
		 * @since 2017-01-16
		 * @param {string} name
		 * @param {string} value
		 * @param {number} day
		 * @return {boolean}
		 */
		set : function(name, value, day) {
			var result = false;
			
			//문자일 때
			if(typeof name === 'string' && typeof value === 'string') {
				var date = new Date();

				//숫자가 아닐 때
				if(!_isNumeric(day)) {
					day = -1;
				}

				date.setDate(date.getDate() + day);

				document.cookie = name + '=' + escape(value) + '; expires=' + date.toUTCString() + '; path=/;';

				//쿠키생성 후 확인해서 있으면
				if(this.get(name) === value) {
					result = true;
				}
			}

			return result;
		},

		/**
		 * @since 2017-01-16
		 * @param {string} name
		 * @return {string}
		 */
		get : function(name) {
			var result = '';
			
			//문자일 때
			if(typeof name === 'string') {
				name += '=';

				var nameLength = name.length,
					splitCookie = document.cookie.split(';');

				for(var i = 0, splitCookieLength = splitCookie.length; i < splitCookieLength; i++) {
					var value = splitCookie[i];
					
					//첫번째 글자가 공백일 때
					while(value.charAt(0) === ' ') {
						value = value.substring(1);
					}

					//쿠키값이 있을 때
					if(value.indexOf(name) === 0) {
						result = unescape(value.substring(nameLength, value.length));

						break;
					}
				}
			}

			return result;
		}
	};
})();