﻿$(document).ready(function () {
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
            ajax: { url: "https://localhost:44381/barang/getallbarang", dataSrc: '' },
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
                { data: 'name' },
                { data: 'type.name' },
                //{
                //    data: null,
                //    render: (data, type, row) => {
                //        return /*tipe*/(row['typeID']);
                //    }
                //},
                { data: 'keterangan' },
                {
                    data: null,
                    bSortable: false,
                    render: function (data, type, row) {
                        return `
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button class="btn btn-primary me-2"  onclick="showDetail('${row['id']}')" data-bs-toggle="modal" data-bs-target="#detailModel"><i class="fas fa-info-circle"></i></button>
                        <button class="btn btn-success text-white me-2" onclick="insertKeranjang()"><i class="fas fa-cart-plus"></i></button>
                        <button class="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#tambahBarangModel" onclick="showEdit('${row['id']}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger text-white"  onclick="deleteBarang('${row['id']}')"><i class="fas fa-trash"></i></button>
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
                    title: "List Barang",
                    className: "btn btn-secondary",
                    text: "<i class='fas fa-clone'> Copy</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3]
                    }
                },
                {
                    extend: 'csvHtml5',
                    title: "List Barang",
                    className: "btn btn-warning",
                    text: "<i class='fas fa-table'> CSV</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3]
                    }
                },
                {
                    extend: 'excelHtml5',
                    title: "List Barang",
                    className: "btn btn-success",
                    text: "<i class='fas fa-file-excel'> Excel</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3]
                    }
                },
                {
                    extend: 'pdfHtml5',
                    title: "List Barang",
                    className: "btn btn-danger",
                    text: "<i class='fas fa-file-pdf'> PDF</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3]
                    }
                },
                {
                    extend: 'print',
                    title: "List Barang",
                    className: "btn btn-primary",
                    text: "<i class='fas fa-print'> Print</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3]
                    }
                }
            ]

        });
    console.log(isScrollX);
    //table.columns.adjust().draw();

});


function showDetail(id) {
    $.ajax({
        url: "https://localhost:44381/barang/get/" + id,
        contentType: "application/json;charset=utf-8"
}).done((result) => {
    console.log(result);
    $('#detailName').html(result.name);
    $('#detailType').html(result.type.name);
    $('#detailKeterangan').html(result.keterangan);
    $('#detailDeskripsi').html(result.deskripsi);
    $('#detailImg').attr("src", 'https://localhost:44381/img/'+ result.image);
}).fail((error) => {
    console.log(error);
});
}

function insertKeranjang() {
    // ajax here

    Swal.fire({
        icon: 'success',
        title: 'Sucess',
        text: "Added to Cart!"
    })

}

function hapusKeranjang() {
    // ajax here

    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
            )
        }
    })
}

$('#formRequest').submit(function (e) {
    e.preventDefault();
    BuatRequest();
});

function BuatRequest() {
    // ajax here
    Swal.fire({
        icon: 'success',
        title: 'Your request has been proceed',
        text: "Wait for the futher information"
    })
}

function CancelRequest() {
    //ajax here
    Swal.fire({
        title: 'Are you sure want to cancel request?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Berhasil!',
                'Request canceled',
                'success'
            )
        }
    })
}

function deleteBarang(id) {
    // ajax here

    Swal.fire({
        title: 'Are you sure want to delete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'DELETE',
                url: "https://localhost:44381/barang/deletebarang/" + id,
            }).done((result) => {
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                )

            }).fail((error) => {
                //alert pemberitahuan jika gagal
                console.log("data tidak masuk");
            })
        }
    })
}

function typesOption() {
    $.ajax({
        url: "https://localhost:44331/api/types/",
    }).done((result) => {
        var option = "<option selected>Choose...</option>";
        $.each(result, function (key, val) {
            option += `
            <option value="${val.id}">${val.name}</option>
            `;
        });
        $("#barangTipe").html(option);

    }).fail((error) => {
        //alert pemberitahuan jika gagal
        console.log("data tidak masuk");
    })
}


function showEdit(id) {
    typesOption();

    //$('#formBarang').attr('action','https://localhost:44381/barang/update/')

    $('#barangModalTitle').html("Edit Barang");
    $('#submitBarang').html("Edit");

    $.ajax({
        url: "https://localhost:44381/barang/get/" + id,
        contentType: "application/json;charset=utf-8"
    }).done((result) => {
        console.log(result);
        $('#barangId').val(result.id);
        $('#barangName').val(result.name);
        $('#barangTipe').val(result.type.id);
        $('#barangKeterangan').val(result.keterangan);
        $('#barangDeskripsi').val(result.deskripsi);
        $('#barangGambar1').val(result.image);
        //$('#barangGambar').val(result.image);
        $('#barangImg').attr("src", "https://localhost:44381/img/" + result.image);

    }).fail((error) => {
        console.log(error);
    });
}

function file_changed() {
    var selectedFile = document.getElementById('barangGambar').files[0];
    var img = document.getElementById('barangImg')

    var reader = new FileReader();
    reader.onload = function () {
        img.src = this.result
    }
    reader.readAsDataURL(selectedFile);
}


function showInsert() {
    typesOption();
    $('#barangModalTitle').html("Tambah Barang");
    $('#submitBarang').html("Save");
    // reset form
    $("#barangImg").attr("src","");
    $("#formBarang")[0].reset();
}

$('#formBarang').submit(function (e) {
    e.preventDefault();
    if ($('#submitBarang').html() == "Save") {
        Insert();
    }
    else {
        Edit();
    }
});

function Insert() {
    var form = $('#formBarang')[0];
    var formData = new FormData(form);
    var fileUpload = $("#barangGambar").get(0);
    var files = fileUpload.files;

    formData.append("Image", files[0]);
    console.log(...formData);


    // ajax here
    $.ajax({
        url: "https://localhost:44381/barang/insertbarang/",
        type: "POST",
        //data: obj
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data 
        data: formData
    }).done((result) => {
        let ikon, teks, judul;
        if (formatValidation() == 1) {
            ikon = 'success';
            judul = 'Data inserted successfully';
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

function Edit() {
    var obj = new Object();
    obj.ID = $('#barangId').val();
    obj.Name = $('#barangName').val();
    obj.TypeID = $('#barangTipe').val();
    obj.Keterangan = $('#barangKeterangan').val();
    obj.Deskripsi = $('#barangDeskripsi').val();
    obj.Image = $('#barangGambar1').val();
    //obj.Image = "asus.jpg";
    console.log(obj);


    // Get form
    var form = $('#formBarang')[0];
    var fileUpload = $("#barangGambar").get(0);
    var files = fileUpload.files;
    var formData = new FormData();

    // FormData object 
    formData.append('ID', $('#barangId').val());
    formData.append('Name', $('#barangName').val());
    formData.append('TypeID', $('#barangTipe').val());
    formData.append('Keterangan', $('#barangKeterangan').val());
    formData.append('Deskripsi', $('#barangDeskripsi').val());
    //formData.append('Image', files[0]);
    if (files[0] == null) {
         formData.append('ImageName', $('#barangGambar1').val());
    }
    else {
        formData.append('Image', files[0]);
    }

    console.log(...formData);

    // ajax here
    $.ajax({
        url: "https://localhost:44381/barang/updatebarang/",
        type: "PUT",
        //data: obj
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data 
        data: formData
    }).done((result) => {
        //swal
        let ikon, teks, judul;
        if (formatValidation() == 1) {
            ikon = 'success';
            judul = 'Data updated successfully';
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
    var fileInput = document.getElementById('barangGambar');

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions =
        /(\.jpg|\.jpeg|\.png|\.svg)$/i;

    if (fileInput.src != null) {
        return 1;
    }
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