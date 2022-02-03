//REQUEST LOAN Tabel Model
$(document).ready(function () {
    $('#requestLoanTable').DataTable({
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
                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#pinjamanActiveModal" onclick="DetailLoan('${row['id']}')"><i class="fas fa-info-circle"></i></button>
                            <button type="button" class="btn btn-success" onclick="approved('${row['id']}')"><i class="fas fa-check"></i></button>
                            <button type="button" class="btn btn-danger btn-sm" onclick="rejected('${row['id']}')"><i class="fas fa-times"></i></button>
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

//Active Loan Tabel Model
$(document).ready(function () {
    $('#pinjamanActiveTable').DataTable({
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
                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#pinjamanActiveModal" onclick="DetailLoan('${row['id']}')"><i class="fas fa-info-circle"></i></button>
                            <button type="button" class="btn btn-warning" onclick="RequestPengembalian('${row['id']}')"><i class="fas fa-undo-alt"></i></button>
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

//Return Request Tabel Model
$(document).ready(function () {
    $('#returLoanTable').DataTable({
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
                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#pinjamanActiveModal" onclick="DetailLoan('${row['id']}')"><i class="fas fa-info-circle"></i></button>
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#formReturnModal" onclick="FormReturn('${row['id']}')"><i class="fas fa-check"></i></button>
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

//History Loan Tabel Model
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


function approved(id) {
    $.ajax({
        url: 'https://localhost:44331/Api/Peminjaman/Loan/Detail/' + id
    }).done((result) => {
        var data = result[0];
        var updateRequest = new Object();
        updateRequest.ID = data.id;
        updateRequest.StartDate = data.startDate;
        updateRequest.EndDate = data.endDate;
        updateRequest.Keperluan = data.keperluan;
        updateRequest.Approval = 0;
        updateRequest.Loan = 1;
        updateRequest.AccountID = data.account;
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure to approved to this request?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
        }).then((result) => {
            if (result.isDismissed == true) {
                Swal.fire({
                    icon: 'error',
                    title: 'Cancel',
                    text: 'Canceled approval to this request !',
                    type: 'cancel'
                });
            } else {
                updateStatusApproval(updateRequest);
            }
        })
    }).fail((error) => {
        console.log(error);
    });
}

function rejected(id) {
    $.ajax({
        url: 'https://localhost:44331/Api/Peminjaman/Loan/Detail/' + id
    }).done((result) => {
        var data = result[0];
        var updateRequest = new Object();
        updateRequest.ID = data.id;
        updateRequest.StartDate = data.startDate;
        updateRequest.EndDate = data.endDate;
        updateRequest.Keperluan = data.keperluan;
        updateRequest.Approval = 1;
        updateRequest.Loan = 3;
        updateRequest.AccountID = data.account;
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to rejected this request?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, rejected it!'
        }).then((result) => {
            if (result.isDismissed == true) {
                Swal.fire({
                    icon: 'error',
                    title: 'Cancel',
                    text: 'Canceled this request !',
                    type: 'cancel'
                });
            } else {
                updateStatusApproval(updateRequest);
            }
        })
    }).fail((error) => {
        console.log(error);
    });
}


function DetailLoan(id) {
    console.log("INI APROVED DETAIL", id)
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
    var text = "";
    $.each(pinjaman, function (key, val) {
        var img = "https://localhost:44381/img/" + val.barang.image
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
    const start = data.startDate.split("T");
    const end = data.endDate.split("T");
    var approval = CekApproval(data.approval);
    var status = CekStatusLoan(data.loan);
    $("#keperluanH").val(data.keperluan);
    $("#startDateH").val(start[0]);
    $("#endDateH").val(end[0]);
    $("#approvalH").val(approval);
    $("#statusH").val(status);
    setItemHistory(data.pinjaman);
}

function setItemHistory(pinjaman) {
    var text = "";
    $.each(pinjaman, function (key, val) {
        text += `
                        <div class="row"  style="margin-top: 20px;">
                            <div class="col-2" id="imgItem">
                                <img class="figure-img img-fluid rounded" src="${`https://localhost:44381/img/` + val.barang.image}" alt="Alternate Text" />
                            </div>
                            <div class="col-10">
                                <div class="row" id="detailItem">
                                    <div class="col-sm-9">
                                        <div class="tab-content" id="v-pills-tabContent-right">
                                            <div class="tab-pane fade active show" id="${`v-pills2` + val.barang.id}" role="tabpanel"
                                                 aria-labelledby="v-pills-home-tab2">
                                                <div class="row">
                                                    <div class="col">
                                                        <label>Name</label>
                                                        <input type="text" class="form-control" value="${val.barang.name}" readonly />
                                                        <label>Spesification</label>
                                                        <input type="text" class="form-control" value="${val.barang.deskripsi}" readonly />
                                                        <label>Condition</label>
                                                        <input type="text" class="form-control" value="${val.barang.keterangan}" readonly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="${`v-pill2` + val.barang.id}" role="tabpanel"
                                                 aria-labelledby="v-pills-profile-tab2">
                                                <div class="row">
                                                    <div class="col">
                                                        <label>Tangal Kembali</label>
                                                        <input type="datetime" class="form-control" readonly />
                                                        <label>Deskripsi</label>
                                                        <input type="text" class="form-control" readonly />
                                                        <label>Kondisi</label>
                                                        <input type="text" class="form-control" value="Baik" readonly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-3 mt-2 mt-sm-0">
                                        <div class="nav flex-column nav-pills" id="v-pills-tab2" role="tablist"
                                             aria-orientation="vertical">
                                            <a class="nav-link active show" id="v-pills-home-tab2" data-bs-toggle="pill"
                                               href="${`#v-pills2` + val.barang.id}" role="tab" aria-controls="v-pills-home2"
                                               aria-selected="true">
                                                <i class="mdi mdi-home-variant d-lg-none d-block me-1"></i>
                                                <span class="d-none d-lg-block">Peminjaman</span>
                                            </a>
                                            <a class="nav-link" id="v-pills-profile-tab2" data-bs-toggle="pill"
                                               href="${`#v-pill2` + val.barang.id}" role="tab" aria-controls="v-pills-profile2"
                                               aria-selected="false">
                                                <i class="mdi mdi-account-circle d-lg-none d-block me-1"></i>
                                                <span class="d-none d-lg-block">Pengembalian</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
`;
    });
    $("#historyItem").html(text);
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

function RequestPengembalian(id) {
    $.ajax({
        url: 'https://localhost:44331/Api/Peminjaman/Loan/Detail/' + id
    }).done((result) => {
        var data = result[0];
        var updateRequest = new Object();
        updateRequest.ID = data.id;
        updateRequest.StartDate = data.startDate;
        updateRequest.EndDate = data.endDate;
        updateRequest.Keperluan = data.keperluan;
        updateRequest.Approval = 2;
        updateRequest.Loan = 2;
        updateRequest.AccountID = data.account;
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to request a return?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, return it!'
        }).then((result) => {
            if (result.isDismissed == true) {
                Swal.fire({
                    icon: 'error',
                    title: 'Cancel',
                    text: 'Canceled return request !',
                    type: 'cancel'
                });
            } else {
                updateStatusApproval(updateRequest);
            }
        })

    }).fail((error) => {
        console.log(error);
    });
}

function FormReturn(id) {
    $.ajax({
        url: 'https://localhost:44331/Api/Peminjaman/Loan/Detail/' + id
    }).done((result) => {
        setFormReturn(result[0].pinjaman)
    }).fail((error) => {
        console.log(error);
    });
}

function setFormReturn(data) {
    var text = "";
    $.each(data, function (key, val) {
        text += `     <div class="row"  style="margin-top: 20px;">
                            <div class="col-2" id="imgItem">
                                <img class="figure-img img-fluid rounded" src="${`https://localhost:44381/img/` + val.barang.image}" alt="Alternate Text" />
                            </div>
                            <div class="col-10">
                                <div class="row" id="detailItem">
                                        <ul class="nav nav-tabs nav-justified nav-bordered mb-3">
                                            <li class="nav-item">
                                                <a href="${`#v-lc` + val.barang.id}" data-bs-toggle="tab" aria-expanded="false" class="nav-link">
                                                    <i class="mdi mdi-home-variant d-lg-none d-block me-1"></i>
                                                    <span class="d-none d-lg-block">Loan Condition</span>
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="${`#v-rc` + val.barang.id}" data-bs-toggle="tab" aria-expanded="true"
                                                   class="nav-link active">
                                                    <i class="mdi mdi-account-circle d-lg-none d-block me-1"></i>
                                                    <span class="d-none d-lg-block">Return Condition</span>
                                                </a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane" id="${`v-lc` + val.barang.id}">
                                                <div class="row">
                                                    <div class="col">
                                                        <label>Name</label>
                                                        <input type="text" class="form-control" value="${val.barang.name}" readonly />
                                                        <label>Spesification</label>
                                                        <input type="text" class="form-control" value="${val.barang.deskripsi}" readonly />
                                                        <label>Condition</label>
                                                        <input type="text" class="form-control" value="${val.barang.keterangan}" readonly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane show active" id="${`v-rc` + val.barang.id}">
                                                <div class="row">
                                                    <div class="col">
                                                        <label>Return Date</label>
                                                        <input type="date" class="form-control" name="returnDate" id="${`returnDate` + val.barang.id}"/>
                                                        <label>Condition</label>

                                                        <select id="${`condition` + val.barang.id}" class="form-select" aria-label="Default select example" onclick="badCondition(value,'${val.barang.id}')">
                                                          <option selected>Select Condition</option>
                                                          <option value="true">Good Condition</option>
                                                          <option value="false" >Bad Condition</option>
                                                        </select>

                                                        <label>Description</label>
                                                        <input type="text" class="form-control" name="description" id="${`description` + val.barang.id}" />
                                                        <label id="${`labelCost` + val.barang.id}" hidden >Cost of Repairs</label>
                                                        <input type="text" class="form-control" name="cost" id="${`cost` + val.barang.id}" hidden />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                            </div>
                        </div>
                    `;
    });
    $("#returnItem").html(text);
}

function badCondition(value, id) {
    if (value == "false") {
        $("#labelCost" + id).prop("hidden", false);
        $("#cost" + id).prop("hidden", false);
    } else {
        $("#labelCost" + id).prop("hidden", true);
        $("#cost" + id).prop("hidden", true);
    }
}

function updateStatusApproval(data) {
    $.ajax({
        url: '/RequestPeminjaman/Put',
        type: "PUT",
        data: data
    }).done((result) => {
        console.log("Result Update", result);
        Swal.fire(
            'Success!',
            'This request has been Success.',
            'success'
        );
        $('#requestLoanTable').DataTable().ajax.reload();
        $('#pinjamanActiveTable').DataTable().ajax.reload();
        $('#returLoanTable').DataTable().ajax.reload();
        $('#historyTable').DataTable().ajax.reload();
    }).fail((error) => {
        console.log(error);
    })
}