import {Loyalty} from "../../@types/@interfaces";

declare const window: Window &
    typeof globalThis & {
    page_dt_config: any,
    FormValidation: any
}

type selectElem = {
    element: HTMLElement,
    ajax: string,
    // ajax: {
    //     [key: string]: string
    // },
    ajaxById: string,
    placeholder: string | null
    multiple?: boolean
    disabled?: boolean
    dependencyFor?: string,
    dependencyUrl?: string,
    dependencyFrom?: string
}

export type Select2AppT = {
    selectFormElements: Array<selectElem>,
    selectElements: Array<selectElem>
}

export class Select2App {

    select2FormElements: Array<JQuery<HTMLElement>>
    select2Elements: Array<JQuery<HTMLElement>>

    static templateSelect2(repo: any): string | JQuery {
        if (repo.loading) return repo.text;
        if(repo.id !== ''){

           let preFunny = null

           // console.log('repo', repo)

           if(repo.color){
               preFunny = `<span style="margin:0; margin-right: 6px; display: block; width: 10px; height: 10px; border-radius: 50%; background-color: ${repo.color}; border-color: ${repo.color}; box-shadow: 0 0 5px ${repo.color};"></span>`

           }else if(repo.flag){
               preFunny = `<img src=${repo.flag} alt="flag" style="margin:0; margin-right: 6px; display: block; width: 24px; height: 18px; border-radius: 16%;">`
           }else{
               preFunny = ''
           }

            return $(
                `<div class='select2-result-repository clearfix'>
                <div class='select2-result-repository__color d-inline-block'>
                    ${preFunny}
                </div>
                <div class='select2-result-repository__title d-inline-block'>
                    <span>${repo.text || repo.title}</span>
                </div>
            </div>`
            );
        }
        return repo.text;
    }

    constructor({selectFormElements, selectElements}: Select2AppT){
        this.select2FormElements = this.defineSelect2Elements(selectFormElements);
        this.select2Elements = this.defineSelect2Elements(selectElements);

        $('.select2-search__field').css('width', '100%');
    }

    defineSelect2Elements(selectElements: Array<selectElem>): Array<JQuery<HTMLElement>>{
        return selectElements.map((selectElement) => {
            if(selectElement.ajax && selectElement.placeholder){
                return $(selectElement.element).select2({
                    placeholder: selectElement.placeholder,
                    width: '100%',
                    dropdownAutoWidth: true,
                    multiple: selectElement.multiple ? selectElement.multiple : false,
                    minimumResultsForSearch: Infinity,
                    disabled: selectElement.disabled,
                    ajax: {
                        url: selectElement.disabled ? function(param){
                            let url = selectElement.ajax + $(document.getElementById(`${selectElement.dependencyFrom}`) as HTMLElement).val()
                            return url
                        } : selectElement.ajax,
                        dataType: 'json',
                        delay: 250,
                        method: 'GET',
                        processResults: function(data: Loyalty[], params) {
                            params.page = params.page || 1;
                            return {
                                results: data,
                            };
                        },
                        data: function (params) {
                             return '';
                        },
                        cache: true
                    },
                    templateResult: Select2App.templateSelect2,
                    templateSelection: Select2App.templateSelect2
                }).attr('data-ajaxById', `${selectElement.ajaxById}`)
                  .attr('data-dependencyFor', `${selectElement.dependencyFor}`)
                  .attr('data-dependencyUrl', `${selectElement.dependencyUrl}`)
                  .attr('data-dependencyFrom', `${selectElement.dependencyFrom}`) ;
            }else {
                return $(selectElement.element).select2();
            }
        })
    }

    // validateSelect2FormElements(select2FormElements: Array<JQuery<HTMLElement>>){
    //     select2FormElements.forEach(select2FormElement => {
    //         select2FormElement.on('select2:select', function(e){
    //             let selection = $(e.target).data('select2').$selection.get(0);
    //             let select2Name = $(e.target).name
    //             validator.revalidateField('loyalty').then((status: string) => {
    //                 if (status === "Valid") {
    //                     selection.classList.add('own-validate-valid');
    //                 } else {
    //                     selection.classList.remove('own-validate-valid');
    //                     selection.classList.add('own-validate-invalid');
    //                 }
    //             });
    //         });
    //     })
    // }
}
