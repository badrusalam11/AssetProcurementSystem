$(document).ready(function () {
    $('#loanActiveTable').DataTable({
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
        "ajax": {
            'url': 'https://localhost:44331/Api/Peminjaman/Loan/Active/ACN01',
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
                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#pinjamanActiveModal" onclick="DetailLoan('${row['id']}')"><i class="fas fa-info-circle"></i></button>
                            <button type="button" class="btn btn-warning" onclick=""><i class="fas fa-undo-alt"></i></button>
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
            'url': 'https://localhost:44331/Api/Peminjaman/Loan/History/ACN01',
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
                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#historyPinjamanModal" onclick="HistoryLoan('${row['id']}')"><i class="fas fa-info-circle"></i></button>
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

function DetailLoan(id) {
    $.ajax({
        url: 'https://localhost:44331/Api/Peminjaman/Loan/Detail/' + id
    }).done((result) => {
        setDetailLoan(result[0])
    }).fail((error) => {
        console.log(error);
    });
}

function setDetailLoan(data) {
    const start = data.startDate.split("T");
    const end = data.endDate.split("T");
    var approval = CekApproval(data.approval);
    var status = CekStatusLoan(data.loan);
    $("#keperluan").val(data.keperluan);
    $("#startDate").val(start[0]);
    $("#endDate").val(end[0]);
    $("#approval").val(approval);
    $("#status").val(status);
    setItemLoan(data.pinjaman);
}

function setItemLoan(pinjaman) {
    console.log(pinjaman)
    var text = "";
    $.each(pinjaman, function (key, val) {
        var img = "https://localhost:44381/img/" + val.barang.image
        console.log("INI Gambar",img)
        text += `<div class="row" style="margin-top: 20px;">
                            <div class="col-3">
                                <img class="figure-img img-fluid rounded"
                                     src="${`https://localhost:44381/img/` + val.barang.image}" alt="Alternate Text" />
                            </div>
                            <div class="col-9">
                                <div class="col">
                                    <label>Name</label>
                                    <input type="text" class="form-control" value="${val.barang.name}" readonly />
                                    <label>Spesification</label>
                                    <input type="text" class="form-control" value="${val.barang.deskripsi}" readonly />
                                    <label>Condition</label>
                                    <input type="text" class="form-control" value="${val.barang.keterangan}" readonly />
                                </div>
                            </div>
                        </div>`;
    });
    $("#itemLoan").html(text);
}

function HistoryLoan(id) {
    $.ajax({
        url: 'https://localhost:44331/Api/Peminjaman/Loan/Detail/' + id
    }).done((result) => {
        setHistoryLoan(result[0])
    }).fail((error) => {
        console.log(error);
    });
}

function setHistoryLoan(data) {
        console.log(data)
}

function CekApproval(approval) {
    if (approval == 0) {
        return "Aproved";
    } else if (approval == 1) {
        return "Rejected";
    } else {
        return "Process"
    }
}

function CekStatusLoan(loan) {
    if (loan == 0) {
        return "Process";
    } else if (loan == 1) {
        return "Actived";
    } else if (loan == 2) {
        return "Returned"
    } else {
        return "Canceled";
    }
}


