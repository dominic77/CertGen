define(function (require) {
	var CertGen = require('certgen-logic');
	var $ = require('jquery');

	$.fn.certgen = function (option, value) {
		var methodReturn;
		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('certgen');
			var options = typeof option === 'object' && option;

			if (!data) {
				data = new CertGen(options, this);
				$this.data('certgen', data);
			}

			if (typeof option === 'string') {
				methodReturn = data[option](value);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.certgen.Constructor = CertGen;

	return CertGen;
});
