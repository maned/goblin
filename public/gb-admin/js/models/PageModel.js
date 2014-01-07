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

			validate: function (attrs) {

				var key = null,
					value;

				for (key in attrs) {
					if (attrs.hasOwnProperty(key)) {
						value = attrs[key];
						if (key === "page_url" && value.indexOf("/") !== -1) {
							return "INVALID";
						}
					}
				}

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

			savePage: function (data, successCallback, failureCallback) {

				$.ajax({
					url: "/gb-admin/page-save.json",
					type: "POST",
					dataType: "json",
					data: data,
					success: function (data) {
						successCallback(data);
					},
					error: function (xhr) {
						failureCallback(xhr);
					}
				});
			},

			deletePage: function (pageId, pageUrl, successCallback, failureCallback) {

				$.ajax({
					url: "/gb-admin/page-delete.json",
					type: "POST",
					dataType: "json",
					data: {
						page_id: pageId,
						page_url: pageUrl
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