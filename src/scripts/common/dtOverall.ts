import ColumnDefsSettings = DataTables.ColumnDefsSettings;

interface IdtOverall{
    [key: string]: (...targets: number[]) => ColumnDefsSettings
}

const dtOverall: IdtOverall = {
    sequential: function(...targets) {
        return {
           targets: targets,
           orderable: false,
           className: "dt-center",
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
            className: "dt-center",
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
            title: 'Действия',
            orderable: false,
            className: "dt-center",
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
                                <a href="javascript:;" class="btn btn-sm btn-clean btn-icon record-action__edit" data-id=${data.id} data-row=${meta.row} title="Edit details">\
                                    <i class="la la-edit"></i>\
                                </a>\
                                <a href="javascript:;" class="btn btn-sm btn-clean btn-icon record-action__delete" data-id=${data.id} data-row=${meta.row} title="Delete">\
                                    <i class="la la-trash"></i>\
                                </a>\
                            </div>
						`;
            }
        }
    }
};

type dtOverallT = typeof dtOverall;

export default dtOverall;
