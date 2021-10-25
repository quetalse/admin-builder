import autographAPI from "../api";
import {Select2App, Select2AppT} from "./Select2App";
// import {FileUploaderApp, FileUploaderAppT} from "./FileUploaderApp";
import jqXHR = JQuery.jqXHR;
import sweetAlert from "../sweetAlert";

declare const window: Window &
    typeof globalThis & {

    page_dt_config: any,
    FormValidation: any
}


export type FormAppT = {
    select2Data: Select2AppT, // data for select2App Class

    // fileUploaderData?: FileUploaderAppT,

    select2Request?: (route: string) => any
    formElement: HTMLFormElement,
    submitBtnForm: HTMLElement,
    formFields?: Array<string>,
}

export class FormApp extends Select2App{
    fileUploaderData?: {
        fileUploaderUrl: string;
        $fileUploader: JQuery<HTMLElement>;
        inputFileElement: HTMLElement;
        preloadFileUploader: () => jqXHR<any>;
        initFileUploader: () => JQuery
    }

    formElement: HTMLFormElement
    submitBtnForm: JQuery<HTMLElement>
    select2Request?: (route: string) => any
    formValidator?: any

    constructor({
        select2Data, // data for select2App Class
        // fileUploaderData,

        select2Request,
        formElement,
        submitBtnForm,
        formFields,
    } : FormAppT
    ){
        super(select2Data)

        // if(fileUploaderData) this.fileUploaderData = new FileUploaderApp(fileUploaderData)

        this.formElement = formElement
        this.select2Request = select2Request
        this.submitBtnForm = $(submitBtnForm)
        this.formValidator = formFields ? this.validationForm(formFields) : null
    }

    checkEmptyForm(): boolean{
        let check = false;

        if(this.formElement.elements){
            Array.from(this.formElement.elements).forEach(element => {
                let elementValue = (element as HTMLInputElement).value;
                console.log('elementValue', elementValue)
                if(elementValue && elementValue !== '[]' && elementValue !== '#fffffe' && elementValue !== 'true' && elementValue !== 'false') check = true
            })
        }
        return check
    }

    validationForm(formFields: Array<string>): any{

        let validatorFields: {[key: string]: any} = {};

        for (const key of formFields) {

            validatorFields[key] = {
                validators: {
                    // notEmpty: {
                    //     message: `${ key } - обязательное поле`,
                    // }
                    callback: {
                        message: `${ key } - обязательное поле`,
                        callback: function(input: any) {
                            // Get the selected options
                            let elem = input.element;
                            let elemTag = elem.tagName;
                            let value = elem.value;
                            let elemType = elem.type;

                            // console.log('elem', elem)
                            // console.log('elemTag', elemTag)
                            // console.log('value', value)


                            if(value){
                                return true
                            }else{

                                if(elemTag === "SELECT"){
                                    let selection = $(elem).data('select2').$selection.get(0);
                                    selection.classList.add('own-validate-invalid');
                                    return false
                                }else if(elemType === 'file'){

                                }else{
                                    // console.log('elem', elem)
                                    return false
                                }

                                // switch (elemTag){
                                //     case "SELECT":
                                //
                                //         // console.log(selection)
                                // }
                            }

                            // if(elemTag === "SELECT"){
                            //     if()
                            // }

                            // return false
                            // const options = colorField.select2('data');
                            // return (options != null && options.length >= 2 && options.length <= 4);
                        }
                    }
                }
            };
        }

        const submitBtn = this.submitBtnForm.get(0),
              formElement = this.formElement

        const validator = window.FormValidation.formValidation(
            formElement,
            {
                fields: validatorFields,
                plugins: {
                    trigger: new window.FormValidation.plugins.Trigger(),
                    submitButton: new window.FormValidation.plugins.SubmitButton({
                        buttons: function() {
                            return [submitBtn];
                        },
                    }),
                    bootstrap: new window.FormValidation.plugins.Bootstrap()
                }
            }
        );

        this.select2FormElements.forEach(function (select2){
           select2.on('select2:select', function(e){
               let selection = $(e.target).data('select2').$selection.get(0);
               let name = select2.attr('name');
               validator.revalidateField(name).then((status: string) => {
                   if (status === "Valid") {
                       selection.classList.add('own-validate-valid');
                   } else {
                       selection.classList.remove('own-validate-valid');
                       selection.classList.add('own-validate-invalid');
                   }
               });
           })
        })

        this.initDependencySelect2()

        return validator;
    }

    dropValidateForm = (): any => {

        this.formValidator.resetForm();

        this.select2FormElements.forEach(select2FormElement => {
            let select2Name: string = select2FormElement.attr('name') as string
            let select2 = this.formValidator.elements[select2Name];
            $(select2).data('select2').$selection.removeClass('own-validate-invalid')
        })
        // let select2 = this.formValidator.elements.loyalty;
        //
        // $(select2).data('select2').$selection.removeClass('own-validate-valid')
    }

    dropForm = (): any => {
        this.formValidator.form.reset();

        this.formValidator.resetForm();

        this.select2FormElements.forEach(select2FormElement => {
            let select2Name: string = select2FormElement.attr('name') as string
            let select2 = this.formValidator.elements[select2Name];

            //@ts-ignore
            $(select2).val(null).trigger('change');
            $(select2).data('select2').$selection.removeClass('own-validate-valid')

            if($(select2FormElement).data('dependencyfrom') !== "undefined"){
                //@ts-ignore
                $(select2FormElement).select2('enable', false);
                // $(select2FormElement).empty().trigger('change')
            }
        })

        // let select2 = this.formValidator.elements.loyalty;

        $('#clear-form').hide()

        $('.fileuploader-thumbnails-input').show()
    }

    async getFormData(): Promise<any>{
        let allFormResult = await (this.formValidator.validate() as Promise<any>);
        let flagFormResult = await (this.formValidator.validate('flag') as Promise<any>);

        console.log('allFormResult', allFormResult)

        if(allFormResult === "Valid" && flagFormResult === "Valid"){
            this.submitBtnForm.prop("disabled", true);
            return new FormData(this.formElement as HTMLFormElement);
        }
        return false
        // then((result: string) => {
        //     validator.validate('flag').then((resultLoy: string) => {
        //         if (result === "Valid") {
        //             e.target.disabled = true;
        //             let form = document.getElementById("country-form");
        //             let formData = new FormData(form as HTMLFormElement);
        //
        //             return formData;
        //         }
        //     });
        //     // };
        // })
    }

    async fillForm(recordId: number){

        let requestForm = async () => {
            //@ts-ignore
            let responseData = await this.crud.get(recordId);
            let recordData = responseData.data;
            // let formElement = document.getElementById('country-form') as HTMLFormElement;
            if( this.formElement){
                Array.from(this.formElement.elements).forEach((element) => {
                    let elemType = (element as HTMLInputElement).type;
                    let elemName = (element as HTMLInputElement).name;
                    let elemTag = (element as HTMLInputElement).tagName;
                    if(elemType === 'text'){
                        (element as HTMLInputElement).value = recordData[elemName];
                    }
                    else if(elemType === 'file'){

                    }
                    else if(elemType === 'color'){
                        (element as HTMLInputElement).value = recordData[elemName];
                    }
                    else if(elemTag === 'SELECT'){

                        let $select2 = $(element);
                        // let $select2 = $('#countries-select2');
                        let select2Id = recordData[elemName];

                        // console.log('se', this)
                        // console.log('element', element)
                        // console.log('recordData;', recordData)
                        // console.log('elemName;', elemName)
                        // console.log('select2Id', select2Id)
                        // console.log('recordId', recordId)
                        // console.log('elemName', elemName)

                        let requestRoute = $(element).data('ajaxbyid');

                        // console.log('`${requestRoute}${recordId}`', `${requestRoute}${recordId}`)

                        let id = recordData[elemName]
                        // console.log('`${requestRoute}${recordId}`', `${requestRoute}${id}`)

                        // @ts-ignore
                        this.select2Request(`${requestRoute}${id}`).then(({data}) => {
                            let isMultiple: boolean = $select2.attr('multiple') === 'multiple'

                            // $select2
                            // @ts-ignore
                            // $select2.select2("trigger", "select",  data );

                            if(isMultiple){
                                data.forEach((item: any) => {
                                    // @ts-ignore
                                    $select2.select2("trigger", "select", { data: item, synthetic: true });
                                })
                            }else{
                                // console.log('data', data)
                                // @ts-ignore
                                $select2.select2("trigger", "select", { data: data, synthetic: true });
                            }
                        }).catch((e: any) =>  sweetAlert.error(e))
                        //
                        // autographAPI.getLoyalty(select2Id).then(({data}) => {
                        //     // @ts-ignore
                        //     $select2.select2("trigger", "select", { data });
                        // })

                        // autographAPI.getLoyalty(1).then(({data}) => {
                        //     // @ts-ignore
                        //     $select2.select2("trigger", "select", { data: {
                        //         array: data
                        //     }});
                        // })
                    }
                })
            }
        };

        try {
            await requestForm();
        }catch (e: any) {
            sweetAlert.error(e).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.fillForm(recordId)
                } else if (result.isDenied) {
                    sweetAlert.close()
                    e.target.disabled = false;
                }
            });
            throw new Error(e)
        }
    }

    initDependencySelect2 = () => {
        this.select2FormElements.forEach(function (select2){
            let dependencyFor = select2.data('dependencyfor')
            if(dependencyFor !== 'undefined'){
                select2.on('select2:select', function(e){
                    let targetSelect2 = document.getElementById(`${dependencyFor}`)
                    if(!e.params.hasOwnProperty('synthetic')){
                        $(targetSelect2 as HTMLElement).empty().trigger('change')
                    }
                    //@ts-ignore
                    $(targetSelect2 as HTMLElement).select2('enable')
                })
            }
        })
    }
}
