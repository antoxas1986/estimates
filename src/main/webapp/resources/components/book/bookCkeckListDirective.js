(function () {
	angular.module('glorem').directive('checklistModel', CheckListModel);

	CheckListModel.$inject = ['$parse', '$compile'];

	function CheckListModel($parse, $compile) {
		var check = this;
		check.add = add;
		check.contains = contains;
		check.remove = remove;
		check.postLinkFn = postLinkFn;

		// contains
		function contains(arr, item, comparator) {
			if (angular.isArray(arr)) {
				for (var i = arr.length; i--;) {
					if (comparator(arr[i], item)) {
						return true;
					}
				}
			}
			return false;
		}

		// add
		function add(arr, item, comparator) {
			arr = angular.isArray(arr) ? arr : [];
			if (!contains(arr, item, comparator)) {
				arr.push(item);
			}
			return arr;
		}

		// remove
		function remove(arr, item, comparator) {
			if (angular.isArray(arr)) {
				for (var i = arr.length; i--;) {
					if (comparator(arr[i], item)) {
						arr.splice(i, 1);
						break;
					}
				}
			}
			return arr;
		}

		// http://stackoverflow.com/a/19228302/1458162
		function postLinkFn(scope, elem, attrs) {
			// exclude recursion, but still keep the model
			var checklistModel = attrs.checklistModel;
			attrs.$set('checklistModel', null);
			// compile with `ng-model` pointing to `checked`
			$compile(elem)(scope);
			attrs.$set('checklistModel', checklistModel);

			// getter / setter for original model
			var getter = $parse(checklistModel);
			var setter = getter.assign;
			var checklistChange = $parse(attrs.checklistChange);

			// value added to list
			var value = attrs.checklistValue ? $parse(attrs.checklistValue)(scope.$parent) : attrs.value;


			var comparator = angular.equals;

			if (attrs.hasOwnProperty('checklistComparator')) {
				if (attrs.checklistComparator[0] == '.') {
					var comparatorExpression = attrs.checklistComparator.substring(1);
					comparator = function (a, b) {
						return a[comparatorExpression] === b[comparatorExpression];
					};

				} else {
					comparator = $parse(attrs.checklistComparator)(scope.$parent);
				}
			}

			// watch UI checked change
			scope.$watch(attrs.ngModel, function (newValue, oldValue) {
				if (newValue === oldValue) {
					return;
				}
				var current = getter(scope.$parent);
				if (angular.isFunction(setter)) {
					if (newValue === true) {
						setter(scope.$parent, add(current, value, comparator));
					} else {
						setter(scope.$parent, remove(current, value, comparator));
					}
				}

				if (checklistChange) {
					checklistChange(scope);
				}
			});

			// declare one function to be used for both $watch functions
			function setChecked(newArr) {
				scope[attrs.ngModel] = contains(newArr, value, comparator);
			}

			// watch original model change
			// use the faster $watchCollection method if it's available
			if (angular.isFunction(scope.$parent.$watchCollection)) {
				scope.$parent.$watchCollection(checklistModel, setChecked);
			} else {
				scope.$parent.$watch(checklistModel, setChecked, true);
			}
		}

		return {
			restrict: 'A',
			priority: 1000,
			terminal: true,
			scope: true,
			compile: function (tElement, tAttrs) {
				if ((tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox')
					&& (tElement[0].tagName !== 'MD-CHECKBOX')
					&& (!tAttrs.btnCheckbox)) {
					throw 'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.';
				}

				if (!tAttrs.checklistValue && !tAttrs.value) {
					throw 'You should provide `value` or `checklist-value`.';
				}

				// by default ngModel is 'checked', so we set it if not specified
				if (!tAttrs.ngModel) {
					// local scope var storing individual checkbox model
					tAttrs.$set('ngModel', 'checked');
				}

				return postLinkFn;
			}
		};
	}
} ());