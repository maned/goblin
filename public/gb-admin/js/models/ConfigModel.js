define([
		'backbone',
		'common',
		'jquery'
	],
	function (Backbone, Common, $) {

		'use strict';

		var GOB = Common.app_namespace || {};

		GOB.Models.ConfigModel = Backbone.Model.extend({

			save: function (nav, successCallback, failureCallback) {

				$.ajax({
					url: "/gb-admin/config-save.json",
					type: "POST",
					dataType: "json",
					data: {
						site_title: $('#site-title').val(),
						site_description: $('#site-description').val(),
						nav: nav,
						ga_id: $('#ga-id').val()
					},
					success: function (data) {
						successCallback(data);
					},
					error: function (xhr) {
						failureCallback(xhr);
					}
				});
			},

			getStandard: function (successCallback, failureCallback) {
				$.ajax({
					url: "/gb-admin/get-config-standard.json",
					type: "GET",
					dataType: "json",
					success: function (data) {
						successCallback(data);
					},
					error: function (xhr) {
						failureCallback(xhr);
					}
				});
			},

			getCustom: function (successCallback, failureCallback) {
				$.ajax({
					url: "/gb-admin/get-config-custom.json",
					type: "GET",
					dataType: "json",
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