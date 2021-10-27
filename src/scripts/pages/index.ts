import adminBuilderAPI, {select2API, datatablesAPI} from "../common/api";
import {FormApp} from "../common/Classes/FormApp";

declare const window: Window &
    typeof globalThis & {
    page_dt_config: any,
    FormValidation: any,
    ownPage: any
}

$(function() {


    let indexPage = new FormApp({
        select2Request: select2API.getData,
        select2Data: {
            selectElements: [],
            selectFormElements: [
                {
                    element: document.getElementById('bloc-select2') as HTMLElement,
                    ajax: select2API.example1.items1.all,
                    ajaxById: select2API.example1.items1.byId,
                    multiple: true,
                    placeholder: "select items..."
                }
            ]
        },
        formElement: document.getElementById('example-form') as HTMLFormElement,
        submitBtnForm: document.getElementById('submit-form') as HTMLElement ,
        fileUploaderData: {
            fileUploaderUrl: "fileUploaderAPI.twosides",
            inputFileElement: document.querySelector('input.gallery_media') as HTMLElement,
        },
        // formFields: ['title', 'items_id[]'] // names
    })

    console.log('indexPage', indexPage)

    // ownPage.initDataTable().initModal();
    // window.ownPage = ownPage

    // $("#countryModal").trackChanges(); // запускаем совю функцию отслеживнаия касаний формы
});
