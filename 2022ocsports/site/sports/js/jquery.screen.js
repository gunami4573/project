/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
(function($) {
	var _$window = $(window),
		_html = document.documentElement,
		_htmlCss = _getCss(_html),
		_$extend = $.extend,
		_$inArray = $.inArray,
		_$isNumeric = $.isNumeric,
		_$trim = $.trim,
		_$isArray = $.isArray,
		_element = document.getElementById('screen'),
		_settings = {};

	//요소가 없을 때
	if(!_element) {
		_element = document.createElement('div');

		_element.id = 'screen';
	}

	/**
	 * @name css 얻기
	 * @since 2019-01-18
	 * @param {object} element
	 * @return {object || undefined}
	 */
	function _getCss(element) {
		var result;

		try {
			result = element.currentStyle || getComputedStyle(element);
		}catch(e) {
			//console.error(e);
		}

		return result;
	}

	/**
	 * @name 배열 중복 제거
	 * @since 2017-12-06
	 * @param {array} value
	 * @return {array}
	 */
	function _deduplicateArray(value) {
		var result = [];

		for(var i = 0, valueLength = value.length; i < valueLength; i++) {
			var element = value[i];

			//값이 없을 때
			if(_$inArray(element, result) === -1) {
				result.push(element);
			}
		}

		return result;
	}

	/**
	 * @name 배열 비교
	 * @since 2017-12-06
	 * @param {array} value
	 * @param {array} array
	 * @return {object}
	 */
	function _compareArray(value, array) {
		var truth = [],
			untruth = [],
			result = {
				truth : truth,
				untruth : untruth
			};

		for(var i = 0, valueLength = value.length; i < valueLength; i++) {
			var element = value[i];

			//값이 있을 때
			if(_$inArray(element, array) > -1) {
				truth.push(element);
			}else{
				untruth.push(element);
			}
		}

		return result;
	}

	/**
	 * @name 배열 정렬
	 * @since 2017-12-06
	 * @param {array} value
	 * @param {array} array
	 * @return {array}
	 */
	function _sortArray(value, array) {
		var result = [],
			i = 0,
			valueLength = value.length;

		for(; i < valueLength; i++) {
			var element = value[i],
				index = _$inArray(element, array);

			//값이 있을 때
			if(index > -1) {
				result[index] = element;
			}
		}

		for(i = 0; i < result.length; i++) {
			//속성이 없을 때
			if(!result.hasOwnProperty(i)) {
				result.splice(i, 1);

				i--;
			}
		}

		return result;
	}

	/**
	 * @name 스크롤바 크기 구하기
	 * @since 2017-12-06
	 * @return {number}
	 */
	function _getScrollbarSize() {
		return _element.offsetWidth - _element.clientWidth;
	}

	function getScrollBarWidth () {
		  var inner = document.createElement('p');
		  inner.style.width = "100%";
		  inner.style.height = "200px";

		  var outer = document.createElement('div');
		  outer.style.position = "absolute";
		  outer.style.top = "0px";
		  outer.style.left = "0px";
		  outer.style.visibility = "hidden";
		  outer.style.width = "200px";
		  outer.style.height = "150px";
		  outer.style.overflow = "hidden";
		  outer.appendChild (inner);

		  document.body.appendChild (outer);
		  var w1 = inner.offsetWidth;
		  outer.style.overflow = 'scroll';
		  var w2 = inner.offsetWidth;
		  if (w1 == w2) w2 = outer.clientWidth;

		  document.body.removeChild (outer);

		  return (w1 - w2);
		};

	/**
	 * @name 스크롤바 여부
	 * @since 2017-12-06
	 * @return {object}
	 */
	function _hasScrollbar() {
		var overflowX = _htmlCss.overflowX,
			overflowY = _htmlCss.overflowY;

		return {
			horizontal : _html.scrollWidth > _html.clientWidth && overflowX !== 'hidden' || overflowX === 'scroll',
			vertical : _html.scrollHeight > _html.clientHeight && overflowY !== 'hidden' || overflowY === 'scroll'
		};
	}

	/**
	 * @name 화면 상태 거르기
	 * @since 2017-12-06
	 * @param {array || string} value
	 * @return {array}
	 */
	function _filterScreenState(value) {
		var result = [];

		//문자일 때
		if(typeof value === 'string') {
			value = [value];
		}

		//배열일 때
		if(_$isArray(value)) {
			var name = _settings.name;

			result = _sortArray(_compareArray(_deduplicateArray(value), name).truth, name);
		}

		return result;
	}

	/**
	 * @name 화면 정보 지정
	 * @since 2017-12-06
	 */
	function _setScreenInfo() {
		var hasScrollbar = _hasScrollbar(),
			hasHorizontalScrollbar = hasScrollbar.horizontal,
			hasVerticalScrollbar = hasScrollbar.vertical,
			scrollbarSize = getScrollBarWidth(),
			screenWidth = _$window.width(),
			screenHeight = _$window.height();
		//세로 스크롤바가 있을 때
		if(hasVerticalScrollbar) {
			screenWidth += scrollbarSize;
		}

		//가로 스크롤바가 있을 때
		if(hasHorizontalScrollbar) {
			screenHeight += scrollbarSize;
		}

		_settings.horizontalScrollbar = hasHorizontalScrollbar;

		_settings.verticalScrollbar = hasVerticalScrollbar;

		_settings.scrollbarSize = scrollbarSize;

		_settings.width = screenWidth;

		_settings.height = screenHeight;
	}

	/**
	 * @name 화면 상태 지정
	 * @since 2017-12-06
	 * @param {array} value
	 * @return {object}
	 */
	function _setScreenInfoState(value) {
		var state = _settings.state,
			filterState = _compareArray(value, state),
			activeState = filterState.untruth,
			deactiveState = _compareArray(state, filterState.truth).untruth;

		//활성화 상태가 있거나 비활성화 상태가 있을 때
		if(activeState.length || deactiveState.length) {
			_settings.state = value;
		}

		return (activeState.length || deactiveState.length) && (_settings.state = value, console.log("상태 : " + value.join(", "))), {
			activeState : activeState,
			deactiveState : deactiveState
		};
		
	}

	/**
	 * @name 화면 이벤트 호출
	 * @since 2017-12-06
	 * @param {array} value
	 */
	function _callScreenEvent(value) {
		_$screen.settings = _$extend(true, _$screen.settings, _settings);

		for(var i = 0, valueLength = value.length; i < valueLength; i++) {
			var type = 'screen',
				state = value[i];

			_$window.triggerHandler(type, state);

			_$window.triggerHandler(type + ':' + state, state);
		}
	}

	/**
	 * @name 화면 소멸
	 * @since 2017-12-06
	 */
	function _destroyScreen() {
		_$window.off('.screen');

		_settings.state = [];

		_$screen.settings = undefined;

		$(_element).remove();
	}

	/**
	 * @name screen
	 * @since 2017-12-06
	 * @param {object} options {
	 *	   state : [{
	 *	       name : string,
	 *		   horizontal : {
	 *			   from : number,
	 *			   to : number
	 *		   },
	 *		   vertical : {
	 *			   from : number,
	 *			   to : number
	 *		   }
	 *	   }]
	 *  }
	 * @return {object}
	 */
	var _$screen = $.screen = function(options) {
		//객체일 때
		if(options) {
			var state = options.state,
				name = [],
				width = 0,
				height = 0,
				timer = 0,
				code = 'var inState = [];\n\n';

			_destroyScreen();

			_html.appendChild(_element);

			//배열일 때
			if(_$isArray(state)) {
				for(var i = 0, stateLength = state.length; i < stateLength; i++) {
					var value = state[i];

					//객체일 때
					if(value) {
						var stateName = value.name;

						//문자일 때
						if(typeof stateName === 'string') {
							stateName = _$trim(stateName);

							//문자가 있을 때
							if(stateName) {
								var horizontal = value.horizontal,
									hasHorizontal = false,
									vertical = value.vertical,
									hasVertical = false;

								//객체일 때
								if(horizontal) {
									var horizontalFrom = horizontal.from,
										horizontalTo = horizontal.to;

									//숫자가 아닐 때
									if(!_$isNumeric(horizontalFrom)) {
										horizontalFrom = -1;
									}

									//숫자가 아닐 때
									if(!_$isNumeric(horizontalTo)) {
										horizontalTo = -1;
									}

									//0 이상이면서 from이 to 이상으로 클 때
									if(horizontalFrom >= 0 && horizontalTo >= 0 && horizontalFrom >= horizontalTo) {
										hasHorizontal = true;
									}
								}

								//객체일 때
								if(vertical) {
									var verticalFrom = vertical.from,
										verticalTo = vertical.to;

									//숫자가 아닐 때
									if(!_$isNumeric(verticalFrom)) {
										verticalFrom = -1;
									}

									//숫자가 아닐 때
									if(!_$isNumeric(verticalTo)) {
										verticalTo = -1;
									}

									//0 이상이면서 from이 to 이상으로 클 때
									if(verticalFrom >= 0 && verticalTo >= 0 && verticalFrom >= verticalTo) {
										hasVertical = true;
									}
								}

								//수평 또는 수직이 있을 때
								if(hasHorizontal || hasVertical) {
									code += 'if(';

									//수평이 있을 때
									if(hasHorizontal) {
										//넓이보다 수평의 시작 값이 크거나 같으면서 넓이보다 수평의 끝 값이 크거나 같을 때
										code += 'width <= ' + horizontalFrom + ' && width >= ' + horizontalTo;
									}

									//수직이 있을 때
									if(hasVertical) {
										//수평이 있을 때
										if(hasHorizontal) {
											code += ' && ';
										}

										//높이보다 수직의 값이 크거나 같으면서 높이보다 수평의 끝 값이 크거나 같을 때
										code += 'height <= ' + verticalFrom + ' && height >= ' + verticalTo;
									}

									code += ') {\n';

									code += '    inState.push(\'' + stateName + '\');\n';

									code += '}\n\n';

									name.push(stateName);
								}
							}
						}
					}
				}
			}

			_settings.name = name;

			_$window.on('resize.screen', function(event) {
				_setScreenInfo();

				var screenWidth = _settings.width,
					screenHeight = _settings.height,
					resizeState = [],
					resizedState = [],
					isWidthChange = false,
					isHeightChange = false,
					isTrigger = event.isTrigger;

				//현재 화면 넓이와 새로운 넓이가 다를 때
				if(screenWidth !== width) {
					width = screenWidth;

					isWidthChange = true;
				}

				//현재 화면 높이와 새로운 높이가 다를 때
				if(screenHeight !== height) {
					height = screenHeight;

					isHeightChange = true;
				}

				//트리거일 때
				if(isTrigger) {
					isWidthChange = false;
					isHeightChange = false;
				}

				_settings.widthChange = isWidthChange;
				_settings.heightChange = isHeightChange;

				eval(code);

				//적용시킬 상태가 없을 때
				if(!inState.length) {
					inState[0] = 'none';
				}

				var setState = _setScreenInfoState(inState),
					activeState = setState.activeState;

				//트리거가 아닐 때
				if(!isTrigger) {
					resizeState[0] = 'resize';
					resizedState[0] = 'resized';
				}

				for(var i = 0, inStateLength = inState.length; i < inStateLength; i++) {
					var value = inState[i];

					//트리거가 아닐 때
					if(!isTrigger) {
						resizeState.push('resize:' + value);

						resizedState.push('resized:' + value);
					}

					//적용시킨 상태가 있을 때
					if(_$inArray(value, activeState) > -1) {
						resizeState.push(value);
					}
				}

				_callScreenEvent(resizeState);

				//타이머가 있을 때
				if(timer) {
					clearTimeout(timer);

					timer = 0;
				}

				timer = setTimeout(function() {
					_setScreenInfo();

					_settings.widthChange = false;
					_settings.heightChange = false;

					_callScreenEvent(resizedState);
				}, 250);
			}).triggerHandler('resize.screen');
		}

		return _$window;
	};

	/**
	 * @name 소멸
	 * @since 2017-12-06
	 * @return {boolean}
	 */
	_$screen.destroy = _destroyScreen;

	/**
	 * @name 상태 지정
	 * @since 2017-12-06
	 * @param {array || string} value
	 * @return {boolean}
	 */
	_$screen.setState = function(value) {
		var state = _filterScreenState(value),
			result = false;

		//적용시킬 상태가 있을 때
		if(state.length) {
			var setState = _setScreenInfoState(state),
				activeState = setState.activeState;

			//활성화 상태가 있거나 비활성화 상태가 있을 때
			if(activeState.length || setState.deactiveState.length) {
				_callScreenEvent(activeState);

				result = true;
			}
		}

		return result;
	};
})(window.jQuery);