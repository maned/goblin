define([
		'backbone',
		'common'
	],
	function (Backbone, Common) {

		'use strict';

		var GOB = Common.app_namespace || {};

		GOB.Models.PageModel = Backbone.Model.extend({
			defaults: {
				"_id": "SG9tZQ==",
				"_rev": "1-0e5792f678999fa29779f26352dcb64b",
				"page_title": "Home",
				"page_content": "Initial Home Content",
				"page_url": "index.html",
				"meta_description": "Default goblin page",
				"meta_keywords": "goblin, CMS, javascript",
				"ga_id": "UA-XXXXX-X",
				"nav": [{
					"id": "SG9tZQ==",
					"url": "index.html",
					"item_name": "Home"
				}],
				"site_title": "site title",
				"site_description": "site description",
				"theme": "index.gob"
			}
		});
	}
);