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
				var cookieSplit = document.cookie.split(';'),
					result = '';
				
				//문자일 때
				if(typeof name === 'string') {
					var startLength = name.length + 1;

					for(var i = 0, cookieSplitLength = cookieSplit.length; i < cookieSplitLength; i++) {
						var cookieSplitI = cookieSplit[i];
						
						//첫번째 글자가 공백일 때
						while(cookieSplitI.charAt(0) === ' ') {
							cookieSplitI = cookieSplitI.substring(1);
							break;
						}
						
						//쿠키값이 있을 때
						if(cookieSplitI.indexOf(name) > -1) {
							result = unescape(cookieSplitI.substring(startLength, cookieSplitI.length));
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