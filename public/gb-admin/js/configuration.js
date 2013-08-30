function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

function paintConfig() {
    //Make ajax call and paint values
    $.ajax({
        url: "/gb-admin/get-config.json",
        type: "GET",
        dataType: "json",
        success: function (data) {

            //Empty the admin area
            $('#standard_vars, #nav_conf, #custom_vars').empty();

            //Make 'Fake' Standard Meta -- mimicing eventual data seperation
            var standard_vars = {};
            standard_vars.site_title = data.site_title;
            standard_vars.site_description = data.site_description

            var custom_vars = {};
            custom_vars.ga_id = data.ga_id;

            var standardHTML = ich.standard_vars(standard_vars);

            var customHTML = ich.custom_vars(custom_vars);

            $('#standard_vars').append(standardHTML);
            $('#custom_vars').append(customHTML);

            //Submit Event
            setSubmitEvent();

            //If there are none in the default database, then load them from page_routes
            if (!$('.nav_item_count').length) {
                getPages();
            }

            $("#nav_conf").sortable({
                revert: false
            });

            $("ul, li").disableSelection();
        },
        error: function () {
            console.log('process error');
        }
    });
}

function createNavJSON() {

    var idsInOrder = $('#nav_conf').sortable("toArray");

    var nav_info = JSON.stringify(
        idsInOrder.map(
            function (e) {
                var esc_e = e.replace(/[=]/g, "\\=");
                var id = '#' + esc_e;
                return {
                    'id': e,
                    'url': $(id).attr('data-url'),
                    'theme': $(id).attr('data-theme'),
                    'item_name': atob(e)
                }
            }
        ),
        0, 4);

    return $.parseJSON(nav_info);
}

function getPages() {
    $.ajax({
        url: "/gb-admin/get-pages.json",
        type: "GET",
        dataType: "json",
        success: function (data) {

            _.each(data, function createNavList(navObj) {

                $('#nav_conf').append('<li id="' + navObj.id + '" class="ui-state-default" data-url="' + navObj.url + '" data-theme="' + navObj.theme+'">' + navObj.item_name + '</li>')

            });

        },

        error: function () {
            console.log('process error');
        },
    });
}

function setSubmitEvent() {
    $('#submit').click(function () {
        $.ajax({
            url: "/gb-admin/config-save.json",
            type: "POST",
            dataType: "json",
            data: {
                ga_id: $('#ga_id').val(),
                nav: createNavJSON(),
                site_title: $('#site_title').val(),
                site_description: $('#site_description').val()
            },
            success: function (data) {
                paintConfig();

                window.location.reload();
            },
            error: function () {
                console.log('process error');
            }
        });
    });
}

$(document).ready(function () {


    paintConfig();


    //Create Sorting

});