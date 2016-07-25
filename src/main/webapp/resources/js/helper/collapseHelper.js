$(document).ready(function() {
	$('.panel-collapse').collapse({
		toggle : false
	});

	$('body').on('click', '[data-toggle=collapse-next]', function(e) {
		// Collapse open div
		var parent_id = $(this).data('parent');
		$(parent_id + ' .panel-collapse').collapse('hide');

		// Open clicked div
		var $target = $(this).parents('.panel').find('.panel-collapse');
		$target.collapse('toggle');
	});
});