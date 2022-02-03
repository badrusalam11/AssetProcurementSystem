console.log("INI JS Approve Pinjaman")

$(document).ready(function () {
    $('#requestLoanTable').DataTable({
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
        ],
        "ajax": {
            'url': 'https://localhost:44331/Api/Peminjaman/Loan/Request',
            'dataType': 'json',
            'dataSrc': ''
        },
        'columns': [
            {
                'data': null,
                'render': (data, type, row, meta) => {
                    return (meta.row + 1);
                }
            }, {
                'data': null,
                'render': (data, type, row) => {
                    return `
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#pinjamanActiveModal"><i class="fas fa-info-circle"></i></button>
                            <button type="button" class="btn btn-success" onclick="approved()"><i class="fas fa-check"></i></button>
                            <button type="button" class="btn btn-danger btn-sm" onclick="rejected()"><i class="fas fa-times"></i></button>
                        </div>`;
                }
            }, {
                'data': null,
                'render': (data, type, row) => {
                    var dateGet = new Date(row['startDate']);
                    return dateGet.toLocaleDateString();
                }
            }, {
                'data': null,
                'render': (data, type, row) => {
                    var dateGet = new Date(row['endDate']);
                    return dateGet.toLocaleDateString();
                }
            }, {
                'data': 'pinjaman.length'
            }, {
                'data': 'keperluan'
            }, {
                'data': null,
                'render': (data) => {
                    if (data.approval == 0) {
                        return "Aproved";
                    } else if (data.approval == 1) {
                        return "Rejected";
                    } else {
                        return "Process"
                    }
                }
            }, {
                'data': null,
                'render': (data) => {
                    if (data.loan == 0) {
                        return "Process";
                    } else if (data.loan == 1) {
                        return "Actived";
                    } else if (data.loan == 2) {
                        return "Returned"
                    } else {
                        return "Canceled";
                    }
                }
            }

        ]
    });
});

$(document).ready(function () {
    $('#pinjamanActiveTable').DataTable({
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
        ],
        "ajax": {
            'url': 'https://localhost:44331/Api/Peminjaman/Loan/Active',
            'dataType': 'json',
            'dataSrc': ''
        },
        'columns': [
            {
                'data': null,
                'render': (data, type, row, meta) => {
                    return (meta.row + 1);
                }
            }, {
                'data': null,
                'render': (data, type, row) => {
                    return `
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#pinjamanActiveModal"><i class="fas fa-info-circle"></i></button>
                        </div>`;
                }
            }, {
                'data': null,
                'render': (data, type, row) => {
                    var dateGet = new Date(row['startDate']);
                    return dateGet.toLocaleDateString();
                }
            }, {
                'data': null,
                'render': (data, type, row) => {
                    var dateGet = new Date(row['endDate']);
                    return dateGet.toLocaleDateString();
                }
            }, {
                'data': 'pinjaman.length'
            }, {
                'data': 'keperluan'
            }, {
                'data': null,
                'render': (data) => {
                    if (data.approval == 0) {
                        return "Aproved";
                    } else if (data.approval == 1) {
                        return "Rejected";
                    } else {
                        return "Process"
                    }
                }
            }, {
                'data': null,
                'render': (data) => {
                    if (data.loan == 0) {
                        return "Process";
                    } else if (data.loan == 1) {
                        return "Actived";
                    } else if (data.loan == 2) {
                        return "Returned"
                    } else {
                        return "Canceled";
                    }
                }
            }

        ]
    });
});

$(document).ready(function () {
    $('#returLoanTable').DataTable({
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
        ],
        "ajax": {
            'url': 'https://localhost:44331/Api/Peminjaman/Loan/ReturnRequest',
            'dataType': 'json',
            'dataSrc': ''
        },
        'columns': [
            {
                'data': null,
                'render': (data, type, row, meta) => {
                    return (meta.row + 1);
                }
            }, {
                'data': null,
                'render': (data, type, row) => {
                    return `
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#pinjamanActiveModal"><i class="fas fa-info-circle"></i></button>
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#historyPinjamanModal"><i class="fas fa-check"></i></button>
                        </div>`;
                }
            }, {
                'data': null,
                'render': (data, type, row) => {
                    var dateGet = new Date(row['startDate']);
                    return dateGet.toLocaleDateString();
                }
            }, {
                'data': null,
                'render': (data, type, row) => {
                    var dateGet = new Date(row['endDate']);
                    return dateGet.toLocaleDateString();
                }
            }, {
                'data': 'pinjaman.length'
            }, {
                'data': 'keperluan'
            }, {
                'data': null,
                'render': (data) => {
                    if (data.approval == 0) {
                        return "Aproved";
                    } else if (data.approval == 1) {
                        return "Rejected";
                    } else {
                        return "Process"
                    }
                }
            }, {
                'data': null,
                'render': (data) => {
                    if (data.loan == 0) {
                        return "Process";
                    } else if (data.loan == 1) {
                        return "Actived";
                    } else if (data.loan == 2) {
                        return "Returned"
                    } else {
                        return "Canceled";
                    }
                }
            }

        ]
    });
});

$(document).ready(function () {
    $('#historyTable').DataTable({
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
        ],
        "ajax": {
            'url': 'https://localhost:44331/Api/Peminjaman/Loan/History',
            'dataType': 'json',
            'dataSrc': ''
        },
        'columns': [
            {
                'data': null,
                'render': (data, type, row, meta) => {
                    return (meta.row + 1);
                }
            }, {
                'data': null,
                'render': (data, type, row) => {
                    return `
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#historyPinjamanModal"><i class="fas fa-info-circle"></i></button>
                        </div>`;
                }
            }, {
                'data': null,
                'render': (data, type, row) => {
                    var dateGet = new Date(row['startDate']);
                    return dateGet.toLocaleDateString();
                }
            }, {
                'data': null,
                'render': (data, type, row) => {
                    var dateGet = new Date(row['endDate']);
                    return dateGet.toLocaleDateString();
                }
            }, {
                'data': 'pinjaman.length'
            }, {
                'data': 'keperluan'
            }, {
                'data': null,
                'render': (data) => {
                    if (data.approval == 0) {
                        return "Aproved";
                    } else if (data.approval == 1) {
                        return "Rejected";
                    } else {
                        return "Process"
                    }
                }
            }, {
                'data': null,
                'render': (data) => {
                    if (data.loan == 0) {
                        return "Process";
                    } else if (data.loan == 1) {
                        return "Actived";
                    } else if (data.loan == 2) {
                        return "Returned"
                    } else {
                        return "Canceled";
                    }
                }
            }

        ]
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