import sweetAlert from "../sweetAlert";
import {ModalApp, ModalAppT} from "./ModalApp";
import {Promise} from "es6-promise";

export type DataTablesAppT = {
    crud: any

    dataTableElement: HTMLElement
    dataTableEditElements: string
    dataTableDeleteElements: string

    modalData: ModalAppT
}

export class DataTablesApp extends ModalApp{

    crud: any

    dataTableElement: JQuery<HTMLElement>
    dataTableEditElements: string
    dataTableDeleteElements: string
    editRecordId: number | null = null;

    constructor({
        crud,

        dataTableElement,
        dataTableEditElements,
        dataTableDeleteElements,

        modalData
    }: DataTablesAppT){
        super(modalData)

        this.crud = crud
        this.dataTableElement = $(dataTableElement)
        this.dataTableEditElements = dataTableEditElements
        this.dataTableDeleteElements = dataTableDeleteElements
    }

    onEditHandler = (e: Event) => {


        if(e !== null && e.currentTarget instanceof HTMLElement) {
            let recordId = e.currentTarget.dataset.id ? +e.currentTarget.dataset.id : null
            this.editRecordId = recordId
            this.dropForm();
            if(recordId){
                this.fillForm(recordId)
                    .then((result) => {
                        if(this.fileUploaderData) return this.fileUploaderData.preloadFileUploader()
                        return Promise.resolve()
                    })
                    .then(() => {
                        this.toggleModalMode('edit');
                        let isTouchedForm = this.checkEmptyForm()
                        if (isTouchedForm) $('#clear-form').show()

                        this.modalElement.modal('show')
                        this.modalElement.addClass('edit-mode');
                    })
                    .catch((e) => console.log(e))
            }
        }
    }

    onDeleteHandler = (e: Event) => {

        if(e !== null && e.currentTarget instanceof HTMLElement) {
            let recordId = e.currentTarget.dataset.id ? +e.currentTarget.dataset.id : null
            let recordRow = e.currentTarget.dataset.row ? +e.currentTarget.dataset.row : null

            let data: any = this.dataTableElement.DataTable().row(recordRow).data();

            let img = ''

            if(data.hasOwnProperty('color')){
                img = `<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${data.color}; border-color: ${data.color}; box-shadow: 0 0 5px ${data.color};"></span>`
            }else if(data.hasOwnProperty('flag')){
                img = `<img style="border-radius: 12%" src=${data.flag} width=50 alt="flag">`
            }

            let titleHtml = `<div>
                            ${img}
                            <span style="margin-left: 10px; font-size: 18px">${data.title}</span>
                        </div>`

            if(recordId !== null){
                sweetAlert.confirm(titleHtml)
                          .then((result) => {
                             if (result.isConfirmed) {
                                 //@ts-ignore
                               this.crud.delete(recordId as number)
                                    .then(() => {
                                        sweetAlert.success('Success!')
                                        $('#admin-builder_datatable').DataTable().ajax.reload();
                                    })
                                    .catch((error: any) => alert(error));
                             }
                          });
            }
        }

        // // @ts-ignore
        // let recordId = this.dataset.id;
        // // @ts-ignore
        // let rowIndex = this.dataset.row;
    }

    initEventHandlers = () => {
        // @ts-ignore
        Array.from(document.querySelectorAll(this.dataTableEditElements)).forEach(dataTableEditElements => {
            dataTableEditElements.addEventListener("click", this.onEditHandler)
        });

        // @ts-ignore
        Array.from(document.querySelectorAll(this.dataTableDeleteElements)).forEach(dataTableDeleteElement => {
            dataTableDeleteElement.addEventListener("click", this.onDeleteHandler)
        });
    }

    initDataTable = () => {

        this.dataTableElement.on( 'draw.dt', this.initEventHandlers)
        return this
    }
}
