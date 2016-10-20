/*globals QUnit */

QUnit.config.autostart = false;
QUnit.config.reorder = false;

require(['jquery', 'underscore'],
function (/*$, _*/) {
	//var $fixture = $('#qunit-fixture');

	QUnit.start();

	/*
	QUnit will reset the elements inside the #qunit-fixture element after each test,
	removing any events that may have existed. As long as you use elements only within
	this fixture, you don't have to manually clean up after your tests to keep them atomic.
	*/

});
