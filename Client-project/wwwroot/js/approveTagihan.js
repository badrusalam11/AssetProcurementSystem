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

function Approve() {
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
            Swal.fire(
                'Approved!',
                'Request Approved',
                'success'
            )
        }
    })
}

function Reject() {
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
            Swal.fire(
                'Rejected!',
                'Request Rejected',
                'success'
            )
        }
    })
}