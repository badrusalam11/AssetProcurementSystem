console.log("INI JS PEMINJAMAN")
$(document).ready(function () {
    $('#pinjamanTable').DataTable({
        dom: 'Bfrtip',
        scrollX: 'true',
        buttons: [
            {
                extend: 'copyHtml5',
                className: 'btn btn-outline-primary btn-sm',
                text: '<i class="fas fa-clone"> Copy</i>',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5]
                }
            },
            {
                extend: 'excelHtml5',
                className: 'btn btn-outline-success btn-sm',
                text: '<i class="fas fa-file-excel"> Excel</i>',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5]
                }
            },
            {
                extend: 'pdfHtml5',
                className: 'btn btn-outline-warning btn-sm',
                text: '<i class="fas fa-file-pdf"> PDF</i>',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5]
                }
            }
        ]
    });
});

$(document).ready(function () {
    $('#historyTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'copyHtml5',
                className: 'btn btn-outline-primary btn-sm',
                text: '<i class="fas fa-clone"> Copy</i>',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5]
                }
            },
            {
                extend: 'excelHtml5',
                className: 'btn btn-outline-success btn-sm',
                text: '<i class="fas fa-file-excel"> Excel</i>',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5]
                }
            },
            {
                extend: 'pdfHtml5',
                className: 'btn btn-outline-warning btn-sm',
                text: '<i class="fas fa-file-pdf"> PDF</i>',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5]
                }
            }
        ],
        "scrollX": true,
    });
});
function approved() {
    Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure to approved to this request?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, approve it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Approved!',
                'This request has been approved.',
                'success'
            )
        }
    })
}

function rejected() {
    Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to rejected this request?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, rejected it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Approved!',
                'This request has been rejected.',
                'success'
            )
        }
    })
}