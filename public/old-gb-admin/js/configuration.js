function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

function getAndPaintStandard() {
    $.ajax({
        url: "/gb-admin/get-config-standard.json",
        type: "GET",
        dataType: "json",
        success: function (data) {

            var standardHTML = ich.standard_vars(data);

            $('#standard_vars').append(standardHTML);

        },

        error: function () {
            console.log('Failed to get Standard Variables');
        },
    });
}

function getAndPaintCustom() {
    $.ajax({
        url: "/gb-admin/get-config-custom.json",
        type: "GET",
        dataType: "json",
        success: function (data) {

            var customHTML = ich.custom_vars(data);

            $('#custom_vars').append(customHTML);

        },

        error: function () {
            console.log('Failed to get Custom Variables');
        },
    });
}

function paintConfig() {

    //Empty the admin area
    $('#standard_vars, #nav_conf, #custom_vars').empty();

    //Get Standard Variables
    getAndPaintStandard();

    //Get Custom Variables
    getAndPaintCustom();

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