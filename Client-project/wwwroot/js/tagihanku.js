$.ajax({
    url: 'https://localhost:44331/api/Tagihan/GetTagihan/' + localStorage.getItem("accountID")
}).done((result) => {
    console.log("AC ID ", localStorage.getItem("accountID"));
    console.log("Result ", result);
}).fail((error) => {
    console.log(error);
});
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
            ajax: {
                url: "https://localhost:44331/api/Tagihan/GetTagihan/" + localStorage.getItem("accountID"),
                dataSrc: ''
            },
            dataType: 'json',
            columns: [
                {
                    data: null,
                    render: (data, type, row, meta) => {
                        //return (meta.row + 1);
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    data: "null",
                    render: (data, type, row) => {
                        let myArray = row['uploadDate'].split("T");
                        myArray = myArray[0].split("-");
                        let tanggal = myArray[2] + "/" + myArray[1] + "/" + myArray[0];
                        return tanggal;
                    }
                },
                {
                    data: "totalBayar",
                    render: DataTable.render.number('.', ',', 2, 'Rp ')
                },
                {
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
                    data: null,
                    render: (data, type, row) => {
                        if (row['isConfirm'] == true) {
                            return "Confirmed";
                        }
                        else {
                            return "Process";
                        }
                    }
                },
                {
                    data: null,
                    bSortable: false,
                    render: function (data, type, row) {

                        return `
                        <div class="btn-group" role="group" aria-label="Basic example">
                                <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#detailModel" onclick="showDetail('${row['id']}')"><i class="fas fa-info-circle"></i></button>
                                <button class="btn btn-success text-white" onclick="showBayar('${row['id']}')" data-bs-toggle="modal" data-bs-target="#formModel"><i class="far fa-money-bill-alt"></i></button>
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

    let table = $('#historyTable').DataTable(
        {
            dom: 'Bfrtip',
            scrollX: isScrollX,
            buttons: [
                {
                    extend: 'copyHtml5',
                    title: "History Bills",
                    className: "btn btn-secondary",
                    text: "<i class='fas fa-clone'> Copy</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'csvHtml5',
                    title: "History Bills",
                    className: "btn btn-warning",
                    text: "<i class='fas fa-table'> CSV</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'excelHtml5',
                    title: "History Bills",
                    className: "btn btn-success",
                    text: "<i class='fas fa-file-excel'> Excel</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'pdfHtml5',
                    title: "History Bills",
                    className: "btn btn-danger",
                    text: "<i class='fas fa-file-pdf'> PDF</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'print',
                    title: "History Bills",
                    className: "btn btn-primary",
                    text: "<i class='fas fa-print'> Print</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                }
            ]

        });
});



function formatRupiah(angka, prefix) {
    var number_string = angka.toString().replace(/[^,\d]/g, ''),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}


function showDetail(id) {
    $.ajax({
        url: "https://localhost:44331/api/tagihan/" + id,
        contentType: "application/json;charset=utf-8"
    }).done((result) => {
        console.log(result);
        let myArray = result.uploadDate.split("T");
        myArray = myArray[0].split("-");
        let tanggal = myArray[2] + "/" + myArray[1] + "/" + myArray[0];
        $('#date').html(tanggal);

        $('#totalBill').html(formatRupiah(result.totalBayar, "Rp"));

        result.statusPembayaran ? $('#paymentStatus').html("Paid") : $('#paymentStatus').html("Unpaid");
        result.isConfirm ? $('#confirmStatus').html("Confirmed") : $('#confirmStatus').html("Process");
        if (result.notaID == null) {
            //$('#gambarBukti').attr("hidden", true);
            $('#gambarBukti').attr("src", 'https://localhost:44381/img/default.png');
        }
        else {
            $('#gambarBukti').attr("src", 'https://localhost:44381/img/' + result.nota.image);
        }
    }).fail((error) => {
        console.log(error);
    });
}


// upload bukti transfer
function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

$('#formBukti').submit(function (e) {
    e.preventDefault();
    InsertBukti();
});

function showBayar(id) {
    console.log(id);

    // ajax here
    $.ajax({
        url: "https://localhost:44381/tagihan/get/" + id
    }).done((result) => {
        console.log(result);
        $("#tagihanId").val(id);
        $("#TotalBayar").val(result.totalBayar);
        $("#StatusPembayaran").val(result.statusPembayaran);
        $("#IsConfirm").val(result.isConfirm);
        $("#NotaID").val(result.notaID);
        $("#UploadDate").val(result.uploadDate);
        $("#PengembalianID").val(result.pengembalianID);

    }).fail((error) => {
        console.log(error);
    });

}

function InsertBukti() {
    // ajax here
    var form = $('#formBukti')[0];
    var formData = new FormData(form);
    var fileUpload = $("#buktiGambar").get(0);
    var files = fileUpload.files;

    formData.append("Image", files[0]);
    console.log(...formData);

    // ajax here
    $.ajax({
        url: "https://localhost:44381/tagihan/UpdateTagihan/",
        type: "PUT",
        //data: obj
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data 
        data: formData
    }).done((result) => {

        let ikon, teks, judul;
        if (formatValidation() == 1) {
            ikon = 'success';
            judul = 'Data Uploaded successfully';
        }
        else if (formatValidation() == -1) {
            ikon = 'error';
            judul = 'Wrong image format!';
            teks = 'Please insert the right format!';
        }
        else {
            ikon = 'error';
            judul = 'The file is too large!';
            teks = 'Image must be less than 50 MB!';
        }

        Swal.fire({
            icon: ikon,
            title: judul,
            text: teks,
        })

    }).fail((error) => {
        //alert pemberitahuan jika gagal
        console.log("data tidak masuk");
    })

}

function formatValidation() {
    var fileInput = document.getElementById('buktiGambar');

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions =
        /(\.jpg|\.jpeg|\.png|\.svg)$/i;

    if (!allowedExtensions.exec(filePath)) {
        //alert('Invalid file type');
        fileInput.value = '';
        return -1;
    }
    if (fileInput.size > 50) {
        return -2;
    }
    return 1;
}