import sweetAlert from "../sweetAlert";
import {FormApp, FormAppT} from "./FormApp";

import "bootstrap"
import {Select2AppT} from "./Select2App";
import {extend} from "jquery";
import {Country} from "../../@types/@interfaces";

declare const window: Window &
    typeof globalThis & {
    page_dt_config: any,
    FormValidation: any
}

export type ModalAppT = {
    modalElement: HTMLElement
    openModalBtn: HTMLElement

    formData: FormAppT
}

export class ModalApp extends FormApp{
    modalElement: JQuery<Element>
    openModalBtn: JQuery<Element>


    editBtnForm: JQuery<HTMLElement>
    addTitleForm: JQuery<HTMLElement>
    editTitleForm: JQuery<HTMLElement>
    clearCloseBtnForm: JQuery<HTMLElement>
    clearBtnForm: JQuery<HTMLElement>

    constructor({modalElement, openModalBtn, formData}: ModalAppT ){
        super(formData)

        this.modalElement = $(modalElement)
        this.openModalBtn = $(openModalBtn)

        this.editBtnForm = $(modalElement).find('#edit-form');
        this.addTitleForm = $(modalElement).find('#add-title');
        this.editTitleForm = $(modalElement).find('#edit-title');
        this.clearCloseBtnForm = $(modalElement).find('#clear-close-form');
        this.clearBtnForm = $(modalElement).find('#clear-form');
    }

    toggleModalMode = (mode: string) => {
        if(mode === 'add'){
            this.editBtnForm.hide();
            this.submitBtnForm.show();

            this.editTitleForm.hide();
            this.addTitleForm.show();
        }
        else if(mode === 'edit'){
            this.editBtnForm.show();
            this.submitBtnForm.hide();

            this.editTitleForm.show();
            this.addTitleForm.hide();
        }
    }

    RequestForm (e: any, formData: FormData, apiMethod: any): void{

        e.target.disabled = true;

        let resolveResponse = () => {
            e.target.disabled = false;
            this.dropForm();
            $('#countryModal').modal('hide');

            $('#admin-builder_datatable').DataTable().ajax.reload();
            sweetAlert.success(`${formData.get('title')}, добавлена!`).then(() => {
                this.modalElement.modal('hide');
            });
        }

        let rejectResponse = (error: any) => {
            sweetAlert.error(`${error}`).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    apiMethod(formData).then(resolveResponse).catch(rejectResponse);
                } else if (result.isDenied) {
                    sweetAlert.close()
                    e.target.disabled = false;
                }
            });
        }
        apiMethod(formData).then(resolveResponse).catch(rejectResponse);
    }

    onAddSubmit = () => {
        let that = this;
        return async (e: any) => {
            //@ts-ignore
            let apiMethod = this.crud.add;
            let formData = await that.getFormData();

            if(formData) {
                that.RequestForm(e, formData, apiMethod)
            }
        }
    }

    onEditSubmit() {
        let that = this;
        return async (e: any) => {
            let apiMethod = (formData: Country) => {
                // @ts-ignore
                if(this.editRecordId) {
                    // @ts-ignore
                    return this.crud.edit(this.editRecordId, formData)
                }
            };
            let formData = await that.getFormData()
            if(formData) that.RequestForm(e, formData, apiMethod)
        }
    }

    onOpenModal = () => {
        this.toggleModalMode('add')
        let isTouchedForm = this.checkEmptyForm()
        if(isTouchedForm) this.clearBtnForm.show()
        this.modalElement.modal('show');
    }

    initModal = () => {
        // let that = this;
        this.modalElement.on('hidden.bs.modal', (e) => {
            if ($(e.target).hasClass('edit-mode')){
                $(e.target).removeClass('edit-mode')
                this.dropForm();
            }
        });

        this.clearCloseBtnForm.on("click", this.dropValidateForm);
        this.clearBtnForm.on("click", this.dropForm);
        this.editBtnForm.on( "click", this.onEditSubmit());
        this.submitBtnForm.on( "click", this.onAddSubmit());

        this.openModalBtn.on( "click", this.onOpenModal);

        // (document.querySelector('#clear-close-form') as HTMLElement).addEventListener("click", dropValidateForm, false);
        // (document.querySelector('#clear-form') as HTMLElement).addEventListener("click", () => dropForm(validator), false);
        //
        // (document.querySelector('#edit-form') as HTMLElement).addEventListener("click", onEditSubmit(validator), false);
        //
        // (document.querySelector('#submit-form') as HTMLElement).addEventListener("click", onAddSubmit(validator), false);
        // (document.querySelector('#open-form-modal') as HTMLElement).addEventListener("click", onOpenModal, false);
    }
}
