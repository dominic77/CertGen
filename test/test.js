/*globals QUnit */

QUnit.config.autostart = false;
QUnit.config.reorder = false;

require(['jquery', 'underscore', 'contentmodal'],
function ($, _, Contentmodal) {
	var $fixture = $('#qunit-fixture');

	QUnit.start();

	function create(options) {
		options = _.extend({
			appendTo: $fixture
		}, options);

		return new Contentmodal(options);
		// var $div = $('<div />');
		// $('#qunit-fixture').append($div);
		// $div.contentmodal(options);
		// return $div;
	}

	/*
	QUnit will reset the elements inside the #qunit-fixture element after each test,
	removing any events that may have existed. As long as you use elements only within
	this fixture, you don't have to manually clean up after your tests to keep them atomic.
	*/

	QUnit.module('contentmodal', {
		teardown: function () {
			$('.modal').remove();
			$('.modal-backdrop').remove();
		}
	});

	QUnit.asyncTest('enable', function () {
		var modal = create();
		var $div = modal.elements.wrapper;

		QUnit.equal(typeof modal.enable, 'function', 'enable method is defined');

		$div.on('enabled.fu.contentmodal', function (e) {
			QUnit.ok(e, 'enabled.fu.contentmodal event is fired when enable method is called');
			modal.destroy();

			QUnit.start();
		});

		modal.enable();
		// TODO TEST FOR ENABLED STATE
	});

	QUnit.asyncTest('disable', function () {
		var modal = create();
		var $div = modal.elements.wrapper;

		QUnit.equal(typeof modal.disable, 'function', 'disable method is defined');

		$div.on('disabled.fu.contentmodal', function (e) {
			QUnit.ok(e, 'disabled.fu.contentmodal event is fired when enable method is called');
			modal.destroy();

			QUnit.start();
		});

		modal.disable();
		// TODO TEST FOR ENABLED STATE
	});

	QUnit.asyncTest('destroy', function () {
		var modal = create();
		var $div = modal.elements.wrapper;

		QUnit.equal(typeof modal.destroy, 'function', 'destroy method is defined');

		$div.on('destroyed.fu.contentmodal', function (e) {
			QUnit.ok(e, 'destroyed.fu.contentmodal event is fired when enable method is called');
			modal.destroy();

			QUnit.start();
		});

		modal.destroy();
	});

	QUnit.test('title option', function () {
		var expected = 'modal';
		var modal = create({
			title: expected
		});
		var $div = modal.elements.wrapper;

		QUnit.equal($div.find('.modal-title').text(), expected, 'Title displays correctly');
		modal.destroy();
	});

	QUnit.test('autoShow: false', function () {
		var modal = create({
			autoShow: false
		});
		var $modal = modal.elements.$modal;

		QUnit.equal($modal.css('opacity'), 0, 'Modal is not visible with autoShow: false');
		modal.destroy();
	});

	QUnit.asyncTest('autoShow: true', function () {
		var modal = create();
		var $modal = modal.elements.$modal;

		// Give time for animations to complete
		setTimeout(function () {
			QUnit.equal($modal.css('opacity'), 1, 'Modal is not visible with autoShow: true');

			modal.destroy();
			QUnit.start();
		}, 500);
	});

	QUnit.test('appendTo', function () {
		var parentEl = $('body')[0];
		var modal = create({
			appendTo: parentEl
		});
		var $div = modal.elements.wrapper;

		QUnit.ok($div.parent()[0] === parentEl, 'Modal is appended to correct element with appendTo');
		modal.destroy();
	});

	QUnit.test('content', function () {
		var expected = 'This is Content!';
		var modal = create({
			content: expected
		});
		var $body = modal.elements.$body;

		QUnit.equal($body.text(), expected, 'Content data was inserted into modal body');
		modal.destroy();
	});

	QUnit.asyncTest('autoCloseOnConfirm: true', function () {
		var modal = create({
			autoCloseOnConfirm: true
		});
		var $div = modal.elements.wrapper;
		var $confirm = modal.elements.$confirm;

		$div.on('destroyed.fu.contentmodal', function () {
			QUnit.ok(true, 'Modal destroyed after confirm');

			QUnit.start();
		});

		$confirm.click();
	});

	QUnit.test('autoCloseOnConfirm: false', function () {
		var modal = create({
			autoCloseOnConfirm: false
		});
		var $confirm = modal.elements.$confirm;

		$confirm.click();
		QUnit.ok($fixture.find('.modal').length, 'Modal not destroyed after confirm');
		modal.destroy();
	});

	QUnit.asyncTest('showConfirmLoader', function () {
		var modal = create({
			onConfirm: function () {
				var $confirmBtn = modal.$element.find('.btn-primary');
				modal.showConfirmLoader();
				QUnit.ok($confirmBtn.hasClass('disabled loading'), 'Confirm button has "disabled" and "loading" classes applied');
				QUnit.ok($confirmBtn.find('.loader').length, 'Loading animation prepended to button');
				QUnit.equal($confirmBtn.text(), 'OK...', 'Button text changed to "OK..."');
				modal.destroy();

				QUnit.start();
			}
		});
		var $confirm = modal.elements.$confirm;

		$confirm.click();
	});

	QUnit.asyncTest('hideConfirmLoader', function () {
		var modal = create({
			onConfirm: function () {
				var $confirmBtn = modal.$element.find('.btn-primary');
				modal.showConfirmLoader();
				QUnit.ok($confirmBtn.hasClass('disabled loading') && $confirmBtn.find('.loader').length && $confirmBtn.text() === 'OK...', 'Verifying confirm loader is showing before calling hide method.');
				modal.hideConfirmLoader();
				QUnit.ok(!$confirmBtn.hasClass('disabled loading'), 'Confirm button does not have "disabled" and "loading" classes applied');
				QUnit.ok(!$confirmBtn.find('.loader').length, 'Loading animation removed from DOM');
				QUnit.equal($confirmBtn.text(), 'OK', 'Button text reverted to "OK"');
				modal.destroy();

				QUnit.start();
			}
		});
		var $confirm = modal.elements.$confirm;

		$confirm.click();
	});

	QUnit.test('confirmLabel', function () {
		var expected = 'confirm text';
		var modal = create({
			confirmLabel: expected
		});
		var $confirm = modal.elements.$confirm;

		QUnit.equal($confirm.text(), expected, 'Confirm label is set correctly');
		modal.destroy();
	});

	QUnit.asyncTest('confirmLoadingLabel', function () {
		var expected = 'Saving...';
		var modal = create({
			onConfirm: function () {
				var $confirmBtn = modal.$element.find('.btn-primary');
				modal.showConfirmLoader();
				QUnit.equal($confirmBtn.text(), expected, 'Confirm Loading text label is set correctly');
				modal.destroy();

				QUnit.start();
			},
			confirmLoadingLabel: expected
		});
		var $confirm = modal.elements.$confirm;

		$confirm.click();
	});

	QUnit.test('confirmInfo', function () {
		var expected = 'Legal jargon goes here';
		var modal = create({
			confirmInfo: expected
		});
		var $info = modal.elements.$info;

		QUnit.equal($info.length, 1, 'The info element is created');
		var popover = $info.data('popover') || $info.data('bs.popover');
		QUnit.ok(popover, 'Popover is created for the info button');

		QUnit.equal(popover.options.content, expected, 'Popover label is set correctly');
		modal.destroy();

		modal = create({});
		$info = modal.elements.$info;
		QUnit.equal($info.length, 0, 'By default we do not show the info icon');
		modal.destroy();
	});

	QUnit.test('cancelLabel', function () {
		var expected = 'cancel text';
		var modal = create({
			cancelLabel: expected
		});
		var $cancel = modal.elements.$cancel;

		QUnit.equal($cancel.text(), expected, 'Cancel label is set correctly');
		modal.destroy();
	});

	QUnit.asyncTest('onConfirm', function () {
		var modal = create({
			onConfirm: function () {
				QUnit.ok(true, 'onConfirm callback is called');
				modal.destroy();

				QUnit.start();
			}
		});
		var $confirm = modal.elements.$confirm;

		$confirm.click();
	});

	QUnit.asyncTest('disableConfirmButton', function () {
		QUnit.expect(3);
		var modal = create({
			onConfirm: function () {
				QUnit.ok(true, 'onConfirm callback is called');
				modal.destroy();

				QUnit.start();
			}
		});
		var $confirm = modal.elements.$confirm;

		modal.disableConfirmButton();
		QUnit.ok($confirm.hasClass('disabled'), 'confirm button is disabled');
		$confirm.click();
		modal.enableConfirmButton();
		QUnit.ok(!$confirm.hasClass('disabled'), 'confirm button is disabled');
		$confirm.click();
	});

	QUnit.asyncTest('onCancel', function () {
		var modal = create({
			onCancel: function () {
				QUnit.ok(true, 'onCancel callback is called');
				modal.destroy();

				QUnit.start();
			}
		});
		var $cancel = modal.elements.$cancel;

		$cancel.click();
	});

	QUnit.asyncTest('onClose', function () {
		QUnit.expect(2);
		var modal = create({
			onClose: function () {
				QUnit.ok(true, 'onClose callback is called');
			},
			onDestroy: function () {
				QUnit.ok(true, 'onDestroy callback is called');
				QUnit.start();
			}
		});
		var $close = modal.elements.$close;

		$close.click();
	});

	QUnit.test('jQuery initialization', function () {
		QUnit.equal(typeof $.fn.contentmodal, 'function', 'contentmodal is initialized on $.fn');

		$fixture.contentmodal();

		QUnit.ok($fixture.find('.modal').length, 'Modal can be initialized using jquery widget');
		$fixture.contentmodal('destroy');
	});

	QUnit.asyncTest('show method', function () {
		var modal = create({
			autoShow: false
		});
		var $div = modal.elements.wrapper;

		QUnit.equal(typeof modal.show, 'function', 'show is a method on the modal');

		$div.on('shown.bs.modal', function () {
			QUnit.ok(true, 'Modal shows with show method');
			modal.destroy();

			QUnit.start();
		});

		modal.show();
	});

	QUnit.asyncTest('hide method', function () {
		var modal = create();
		var $div = modal.elements.wrapper;

		QUnit.equal(typeof modal.hide, 'function', 'hide is a method on the modal');

		$div.on('hidden.bs.modal', function () {
			QUnit.ok(true, 'Modal hides with hide method');
			modal.destroy();

			QUnit.start();
		});

		modal.hide();
	});

	QUnit.asyncTest('secondary button', function () {
		var modal = create({
			showSecondary: true,
			secondaryLabel: 'secondary',
			onSecondary: function () {
				QUnit.ok(true, 'onSecondary fires on click');
				QUnit.start();
			}
		});
		var $div = modal.elements.wrapper;
		var $secondary = $div.find('[data-action="modal-secondary"]');

		QUnit.ok($secondary.length, 'Secondary button renders');
		$secondary.click();
	});

	QUnit.test('padding option', function () {
		var modal = create({
			padding: 25
		});
		var $body = $(modal.elements.wrapper).find('.modal-body');


		QUnit.equal($body.css('padding'), '25px', 'Modal padding is set with number value');

		modal = create({
			padding: '10px'
		});
		$body = $(modal.elements.wrapper).find('.modal-body');
		QUnit.equal($body.css('padding'), '10px', 'Modal padding is set with string value');

	});
});
