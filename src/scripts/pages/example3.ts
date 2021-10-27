// @ts-ignore
// import dtSettings from "./dtSettings";
import dtOverall from "../common/dtOverall";
import {DataTablesApp} from "../common/Classes/DataTablesApp";
import adminBuilderAPI, {select2API, datatablesAPI} from "../common/api";

// @ts-ignore
require( 'datatables.net' )( window, $ )
// @ts-ignore
require( 'datatables.net-dt' )( window, $ )

declare const window: Window &
    typeof globalThis & {
    page_dt_config: any,
    FormValidation: any,
    ownPage: any
}

const dtSettings = {
    scrollX: true,
    ajax: {
        url: datatablesAPI.example3,
        type: 'POST',
        data: {
            // parameters for custom backend script demo
            columnsDef: [ 'id', 'flag', 'title',  'comments']
        }
    },
    columns: [
        {data: 'id'},
        {data: 'flag'},
        {data: 'title', className: "dt-center"},
        // {data: 'short_title', className: "dt-center"},
        // {data: 'loyalty', className: "dt-center"},
        {data: 'comments', className: "dt-center"},
        {data: null, className: "dt-center"}

    ],

    columnDefs: [
        dtOverall.sequential(0),
        dtOverall.img(1),
        dtOverall.actions(-1)
    ],
}

// window.page_dt_config = dtSettings;

$(function() {

    var initTable1 = function() {
        var table = $('#admin-builder_datatable');


        // $(table)

        // // begin first table
        table.DataTable({
            responsive: true,
            searchDelay: 500,
            processing: true,
            serverSide: true,
            ...dtSettings,
            dom: '<"top"f>rt<"bottom"lip><"clear">',
            language: {
                searchPlaceholder: "search...",
                search: "",
                paginate: {
                    previous: "<span class=\"svg-icon svg-icon-primary svg-icon-2x\"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo1/dist/../src/media/svg/icons/Navigation/Arrow-left.svg--><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" version=\"1.1\">\n" +
                        "    <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
                        "        <polygon points=\"0 0 24 0 24 24 0 24\"/>\n" +
                        "        <rect fill=\"#000000\" opacity=\"0.3\" transform=\"translate(12.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-12.000000, -12.000000) \" x=\"11\" y=\"5\" width=\"2\" height=\"14\" rx=\"1\"/>\n" +
                        "        <path d=\"M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z\" fill=\"#000000\" fill-rule=\"nonzero\" transform=\"translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) \"/>\n" +
                        "    </g>\n" +
                        "</svg><!--end::Svg Icon--></span>",
                    first: "",
                    last: "",
                    next: "<span class=\"svg-icon svg-icon-primary svg-icon-2x\"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo1/dist/../src/media/svg/icons/Navigation/Arrow-right.svg--><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" version=\"1.1\">\n" +
                        "    <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
                        "        <polygon points=\"0 0 24 0 24 24 0 24\"/>\n" +
                        "        <rect fill=\"#000000\" opacity=\"0.3\" transform=\"translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) \" x=\"11\" y=\"5\" width=\"2\" height=\"14\" rx=\"1\"/>\n" +
                        "        <path d=\"M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z\" fill=\"#000000\" fill-rule=\"nonzero\" transform=\"translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) \"/>\n" +
                        "    </g>\n" +
                        "</svg><!--end::Svg Icon--></span>"
                },
                info: "Showing _START_ to _END_ of _TOTAL_",
                lengthMenu: "_MENU_",
                processing: "<span class='fa-stack fa-lg'>\n\
                            <i class='fa fa-spinner fa-spin fa-stack-2x fa-fw'></i>\n\
                       </span>&emsp;Processing ...",
            }
        });
    };

    initTable1();


    let ownPage = new DataTablesApp({

        crud: adminBuilderAPI.example3,


        dataTableElement: document.getElementById('admin-builder_datatable') as HTMLElement,
        dataTableEditElements: '.record-action__edit',
        dataTableDeleteElements: '.record-action__delete',

        modalData: {
            modalElement: document.getElementById('example-modal') as HTMLElement,
            openModalBtn: document.getElementById('open-form-modal') as HTMLElement,
            formData: {
                select2Data: {
                    selectElements: [],
                    selectFormElements: []
                },
                formElement: document.getElementById('example-form') as HTMLFormElement,
                submitBtnForm: document.getElementById('submit-form') as HTMLElement ,
                formFields: ['title', 'description'],

                fileUploaderData: {
                    fileUploaderUrl: "fileUploaderAPI.twosides",
                    inputFileElement: document.querySelector('input.gallery_media') as HTMLElement,
                }
            }
        }
    })

    ownPage.initDataTable().initModal();
    window.ownPage = ownPage

    // $("#countryModal").trackChanges(); // запускаем совю функцию отслеживнаия касаний формы
});
