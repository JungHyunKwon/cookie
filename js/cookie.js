/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
try {
	(function() {
		'use strict';

		/**
		 * @name isInt
		 * @since 2017-12-06
		 * @param {*} value
		 * @return {boolean}
		 */
		function _isInt(value) {
			return typeof value === 'number' && !isNaN(value) && isFinite(value);
		}

		window.cookie = {
			/**
			 * @name cookie.set
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
					//정수가 아닐 때
					if(!_isInt(day)) {
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
			 * @name cookie.get
			 * @since 2017-01-16
			 * @param {string} name
			 * @return {string}
			 */
			get : function(name) {
				var cookie = document.cookie.split(';'),
					result = '';
				
				//문자일 때
				if(typeof name === 'string') {
					var valueIndex = name.length + 1;

					for(var i = 0, cookieLength = cookie.length; i < cookieLength; i++) {
						var cookieI = cookie[i];
						
						//첫번째 글자가 공백일 때
						while(cookieI.charAt(0) === ' ') {
							cookieI = cookieI.substring(1);
							break;
						}
						
						//쿠키값이 있을 때
						if(cookieI.indexOf(name) > -1) {
							result = unescape(cookieI.substring(valueIndex, cookieI.length));
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