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
        url: datatablesAPI.example1,
        type: 'POST',
        data: {
            // parameters for custom backend script demo
            columnsDef: [ 'id', 'title', 'is_active', 'items']
        },
    },
    columns: [
        {data: 'id'},
        {data: 'title'},
        {data: 'is_active'},
        {data: 'items'},
        {data: null},
        // null,
    ],

    columnDefs: [
        {
            targets: 0,
            orderable: false,
            className: "dt-center",
            render: function(data: any, type: any, full: any, meta: any) {
                return `${meta.row + 1}`;
            },
        },
        {
            targets: 1,
            orderable: false,
            className: "dt-center"
        },
        {
            targets: 2,
            orderable: false,
            className: "dt-center",
            render: function(data: any, type: any, full: any, meta: any) {
                return `<span class=${data ? 'status-active' : 'status-inactive'}></span>`;
            },
        },
        {
            targets: -2,
            orderable: false,
            className: "dt-center",
            render: function(data: any) {
                let listView = document.createElement('ul');
                listView.classList.add('country-list');

                for(let i = 0; i < data.length; i++){
                    let listViewItem = document.createElement('li');
                    listViewItem.appendChild(document.createTextNode(data[i]));
                    listView.appendChild(listViewItem);
                }
                return listView.outerHTML;
            },
        },
        dtOverall.actions(-1)
    ]
}

$(function() {

    var initTable1 = function() {
        var table = $('#admin-builder_datatable');

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

        crud: adminBuilderAPI.example1,

        dataTableElement: document.getElementById('admin-builder_datatable') as HTMLElement,
        dataTableEditElements: '.record-action__edit',
        dataTableDeleteElements: '.record-action__delete',

        modalData: {
            modalElement: document.getElementById('example-modal') as HTMLElement,
            openModalBtn: document.getElementById('open-form-modal') as HTMLElement,
            formData: {
                select2Request: select2API.getData,
                select2Data: {
                    selectElements: [],
                    selectFormElements: [
                        {
                            element: document.getElementById('items-select2') as HTMLElement,
                            ajax: select2API.example1.items1.all,
                            ajaxById: select2API.example1.items1.byId,
                            multiple: true,
                            placeholder: "select items...",
                            dependencyFor: "items2-select2",
                            dependencyUrl: select2API.example1.items2.byItems1Id
                        },
                        {
                            element: document.getElementById('items2-select2') as HTMLElement,
                            ajax: select2API.example1.items2.byItems1Id,
                            ajaxById: select2API.example1.items2.byId,
                            placeholder: "select items...",
                            multiple: true,
                            disabled: true,
                            dependencyFrom: "items-select2"
                        }
                    ]
                },
                formElement: document.getElementById('example-form') as HTMLFormElement,
                submitBtnForm: document.getElementById('submit-form') as HTMLElement ,
                formFields: ['title', 'items_id[]', 'items2_id[]'] // names
            }
        }
    })

    ownPage.initDataTable().initModal();
    window.ownPage = ownPage

    // $("#countryModal").trackChanges(); // ?????????????????? ???????? ?????????????? ???????????????????????? ?????????????? ??????????
});
