/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
try {
	(function() {
		'use strict';

		window.cookie = {
			/**
			 * @since 2017-01-16
			 * @param {string} name
			 * @param {string} value
			 * @param {number} day
			 * @return {boolean}
			 */
			set : function(name, value, day) {
				var date = new Date(),
					result = false;
				
				//문자일 때
				if(typeof name === 'string' && typeof value === 'string') {
					//숫자가 아닐 때
					if(!(typeof day === 'number' && !isNaN(day) && isFinite(day))) {
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
						var splitCookieI = splitCookie[i];
						
						//첫번째 글자가 공백일 때
						while(splitCookieI.charAt(0) === ' ') {
							splitCookieI = splitCookieI.substring(1);
						}

						//쿠키값이 있을 때
						if(splitCookieI.indexOf(name) === 0) {
							result = unescape(splitCookieI.substring(nameLength, splitCookieI.length));

							break;
						}
					}
				}

				return result;
			}
		};
	})();
}catch(e) {
	console.error(e);
}