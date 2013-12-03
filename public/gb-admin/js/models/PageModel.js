define([
		'backbone',
		'common',
		'jquery'
	],
	function (Backbone, Common, $) {

		'use strict';

		var GOB = Common.app_namespace || {};

		GOB.Models.PageModel = Backbone.Model.extend({

			switchPage: function (id) {

				var that = this;

				$.ajax({
					url: "/gb-admin/page-edit.json",
					type: "POST",
					dataType: "json",
					data: {
						page_id: id
					},
					success: function (data) {
						//Set the model with the new data
						that.set(data);
					},
					error: function (xhr) {
						// Let the developer know what happened
						console.log('Admin creation has failed. Please try again.');
						console.log(xhr);
					}
				});
			},

			savePage: function (successCallback, failureCallback) {
				$.ajax({
					url: "/gb-admin/page-save.json",
					type: "POST",
					dataType: "json",
					data: {
						page_id: $('#page-id').val(),
						page_title: $('#page-title').val(),
						page_url: $('#page-url').val(),
						page_content: $('#page-content').val(),
						meta_description: $('#meta-description').val(),
						meta_keywords: $('#meta-keywords').val(),
						theme: $('#theme-files').val()
					},
					success: function (data) {
						successCallback(data);
					},
					error: function (xhr) {
						failureCallback(xhr);
					}
				});
			}

		});
	});