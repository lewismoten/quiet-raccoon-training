
global.console.log = jasmine.createSpy('log');

var logic = require('./logic.js');

describe('logic', function(){

	'use strict';

	it('sets the version', function(){
		expect(logic).toBe('1.0');
	});

	it('logs the version', function(){

		expect(global.console.log).toHaveBeenCalledWith('1.0');

	});

});