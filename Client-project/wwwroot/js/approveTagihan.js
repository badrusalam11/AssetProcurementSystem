$(document).ready(function () {
    let isScrollX;
    if (window.matchMedia("(max-width: 425px)").matches) {
        // Viewport is less or equal to 700 pixels wide
        console.log('kurang dari atau sama dengan 425px');
        isScrollX = true;
    }
    else {
        console.log('lebih dari 425px');
        isScrollX = false;
    }

    let table = $('#Table').DataTable(
        {
            ajax: { url: "https://localhost:44331/api/tagihan", dataSrc: '' },
            dataType: 'json',
            columns: [
                {
                    data: null,
                    //bSortable: false,
                    render: (data, type, row, meta) => {
                        //return (meta.row + 1);
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                //{ data: 'name' },
                {
                    //data: 'uploadDate'
                    data: "null",
                    render: (data, type, row) => {
                        var dataGet = new Date(row['uploadDate']);
                        return dataGet.toLocaleDateString();
                    }
                },
                { data: 'totalBayar' },
                {
                    //data: 'statusPembayaran'
                    data: null,
                    render: (data, type, row) => {
                        if (row['statusPembayaran'] == true) {
                            return "Paid";
                        }
                        else {
                            return "Unpaid";   
                        }
                    }
                },
                {
                    //data: 'isConfirm'
                    data: null,
                    render: (data, type, row) => {
                        if (row['isConfirm'] == true) {
                            return "Confirmed";
                        }
                        else {
                            return "Unconfirmed";
                        }
                    }
                },
                {
                    data: null,
                    bSortable: false,
                    render: function (data, type, row) {
                        
                            return `
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#detailModel"><i class="fas fa-info-circle"></i></button>
                        <button class="btn btn-success text-white me-2" onclick="Approve('${row['id']}')"><i class=" fas fa-check"></i></button>
                        <button class="btn btn-danger text-white" onclick="Reject('${row['id']}')"><i class=" fas fa-times"></i></button>
                    </div>
                        `;

                    }
                },
            ],
            dom: 'Bfrtip',
            scrollX: isScrollX,
            buttons: [
                {
                    extend: 'copyHtml5',
                    title: "Active Bills",
                    className: "btn btn-secondary",
                    text: "<i class='fas fa-clone'> Copy</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'csvHtml5',
                    title: "Active Bills",
                    className: "btn btn-warning",
                    text: "<i class='fas fa-table'> CSV</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'excelHtml5',
                    title: "Active Bills",
                    className: "btn btn-success",
                    text: "<i class='fas fa-file-excel'> Excel</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'pdfHtml5',
                    title: "Active Bills",
                    className: "btn btn-danger",
                    text: "<i class='fas fa-file-pdf'> PDF</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'print',
                    title: "Active Bills",
                    className: "btn btn-primary",
                    text: "<i class='fas fa-print'> Print</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                }
            ]

        });
});

function Approve(id) {
    // ajax here
    
    Swal.fire({
        title: 'Are you sure want to Approve?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "https://localhost:44331/api/tagihan/ApproveTagihan/"+id,
                contentType: "application/json;charset=utf-8",
                type: "PUT"
            }).done((result) => {
                Swal.fire(
                    'Approved!',
                    'Request Approved',
                    'success'
                );
                let table = $('#Table').DataTable();
                table.ajax.reload();
            }).fail((error) => {
                //alert pemberitahuan jika gagal
                console.log("data tidak masuk");
            })
            
        }
    })
}

function Reject(id) {
    // ajax here

    Swal.fire({
        title: 'Are you sure want to Reject?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "https://localhost:44331/api/tagihan/RejectTagihan/" + id,
                contentType: "application/json;charset=utf-8",
                type: "PUT"
            }).done((result) => {
                Swal.fire(
                    'Reject!',
                    'Request Reject',
                    'success'
                );
                let table = $('#Table').DataTable();
                table.ajax.reload();
            }).fail((error) => {
                //alert pemberitahuan jika gagal
                console.log("data tidak masuk");
            })

        }
    })
}

//function Reject() {
//    // ajax here
//    Swal.fire({
//        title: 'Are you sure want to Reject?',
//        icon: 'warning',
//        showCancelButton: true,
//        confirmButtonColor: '#3085d6',
//        cancelButtonColor: '#d33',
//        confirmButtonText: 'Yes',
//        cancelButtonText: 'No'
//    }).then((result) => {
//        if (result.isConfirmed) {
//            Swal.fire(
//                'Rejected!',
//                'Request Rejected',
//                'success'
//            )
//        }
//    })
//}