define([
		'backbone',
		'common',
		'jquery'
	],
	function (Backbone, Common, $) {

		'use strict';

		var GOB = Common.app_namespace || {};

		GOB.Models.PageModel = Backbone.Model.extend({

			defaults: {
				_id: "",
				_rev: "",
				ga_id: "",
				meta_description: "",
				meta_keywords: "",
				nav: [],
				page_content: "",
				page_title: "",
				page_url: "",
				site_description: "",
				site_title: "",
				theme: ""
			},

			switchPage: function (id) {

				var that = this;

				if (id !== "new_page") {
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
				} else {
					this.clear().set(this.defaults);
				}


			},

			savePage: function (successCallback, failureCallback) {

				if ($('#page-id').val() === "") {
					$('#page-id').val(window.btoa(window.unescape(encodeURIComponent($('#page-title').val())))); // HACK: There is a better way to do this.
				}

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
						theme: $('.theme').val()
					},
					success: function (data) {
						successCallback(data);
					},
					error: function (xhr) {
						failureCallback(xhr);
					}
				});
			},

			deletePage: function (successCallback, failureCallback) {

				$.ajax({
					url: "/gb-admin/page-delete.json",
					type: "POST",
					dataType: "json",
					data: {
						page_id: $('#page-id').val(),
						page_url: $('#page-url').val()
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
	}
);