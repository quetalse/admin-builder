import ColumnDefsSettings = DataTables.ColumnDefsSettings;

interface IdtOverall{
    [key: string]: (...targets: number[]) => ColumnDefsSettings
}

const dtOverall: IdtOverall = {
    sequential: function(...targets) {
        return {
           targets: targets,
           orderable: false,
           className: "dt-center datatable-cell",
           render: function(data, type, full, meta) {
               return `${meta.row + 1}`;
           }
        } as ColumnDefsSettings;
    },
    img: function(...targets){
        // return function(width){
            return{
                targets,
                orderable: false,
                className: "dt-center",
                render: function(data, type, full, meta) {
                    console.log('data', data)
                    return `<img alt="pic" src=${data || '/app/media/stock_flag.png'} width=${24} style="border-radius: 2px"/>`;
                }
            };
        // };
    },
    list: function(...targets) {
        return {
            targets,
            orderable: false,
            className: "dt-center datatable-cell",
            render: function(data, type, full, meta){
                let listView: HTMLElement = document.createElement('ul');

                listView.style.listStyle = 'none';
                listView.style.padding = '0';

                for(let i = 0; i < data.length; i++){
                    let listViewItem = document.createElement('li');
                    listViewItem.appendChild(document.createTextNode(data[i]));
                    listView.appendChild(listViewItem);
                }
                return listView.outerHTML;
            }
        };
    },
    actions: function(...targets) {
        return {
            targets,
            title: 'Actions',
            orderable: false,
            className: "dt-center datatable-cell",
            render: function(data, type, full, meta) {
                return `<!--<div class="dropdown dropdown-inline">\-->
<!--                            <a href="javascript:;" class="btn btn-sm btn-clean btn-icon" data-toggle="dropdown">\-->
<!--                                <i class="la la-cog"></i>\-->
<!--                            </a>\-->
<!--                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\-->
<!--									<ul class="nav nav-hoverable flex-column">\-->
<!--							    		<li class="nav-item"><a class="nav-link" href="#"><i class="nav-icon la la-edit"></i><span class="nav-text">Edit Details</span></a></li>\-->
<!--							    		<li class="nav-item"><a class="nav-link" href="#"><i class="nav-icon la la-leaf"></i><span class="nav-text">Update Status</span></a></li>\-->
<!--							    		<li class="nav-item"><a class="nav-link" href="#"><i class="nav-icon la la-print"></i><span class="nav-text">Print</span></a></li>\-->
<!--									</ul>\-->
<!--							  	</div>\-->
<!--							</div>\-->
                            <div class="record-action">
                                <a href="" class="btn btn-sm btn-clean btn-icon record-action__edit" data-id=${data.id} data-row=${meta.row} title="Edit details">\
                                    <span class="svg-icon svg-icon-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                           <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"></rect>
                                            <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000">
                                             </g>
                                         </svg>
                                     </span>
                                </a>
                                <a href="" class="btn btn-sm btn-clean btn-icon record-action__delete" data-id=${data.id} data-row=${meta.row} title="Delete">
                                    <span class="svg-icon svg-icon-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\t                                    
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>
                                                <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
                                            </g>
                                        </svg>
                                    </span>
                                </a>
                            </div>
						`;
            }
        }
    }
};

type dtOverallT = typeof dtOverall;

export default dtOverall;
