$(document).ready(function () {
    let datatable = $('#Table').DataTable(
        {
            //ajax: { url: "https://localhost:44378/API/Employees", dataSrc: '' },
            //dataType: 'json',
            //columns: [
            //    {
            //        data: null,
            //        render: (data, type, row, meta) => {
            //            return (meta.row + 1);
            //        }
            //    },
            //    { data: "nik" },
            //    {
            //        data: "null",
            //        render: function (data, type, row) {
            //            return `${row['firstName']} ${row['lastName']}`;
            //        }
            //    },
            //    { data: "phone" },
            //    {
            //        data: "null",
            //        render: function (data, type, row) {
            //            if (row['gender'] == 0) {
            //                return "Laki-laki";
            //            }
            //            else {
            //                return "Perempuan";
            //            }
            //        }
            //    },
            //    {
            //        data: "null",
            //        render: (data, type, row) => {
            //            var dataGet = new Date(row['birthDate']);
            //            return dataGet.toLocaleDateString();
            //        }
            //    },
            //    { data: "email" },
            //    { data: "salary" },
            //    {
            //        data: "null",
            //        render: function (data, type, row) {
            //            return `<button class="btn btn-warning fa fa-edit"></button> <button class="btn btn-danger fa fa-trash"></button>`;
            //        }
            //    }

            //],
            ////    dom: 'Bfrtip',
            ////    buttons: [
            ////        'copy', 'csv', 'excel', 'pdf', 'print'
            ////    ]

            ////}
            dom: 'Bfrtip',
            //scrollX: 'true',
            buttons: [
                {
                    extend: 'copyHtml5',
                    title: "List Barang",
                    className: "btn btn-secondary",
                    text: "<i class='fas fa-clone'> Copy</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'csvHtml5',
                    title: "List Barang",
                    className: "btn btn-warning",
                    text: "<i class='fas fa-table'> CSV</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'excelHtml5',
                    title: "List Barang",
                    className: "btn btn-success",
                    text: "<i class='fas fa-file-excel'> Excel</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'pdfHtml5',
                    title: "List Barang",
                    className: "btn btn-danger",
                    text: "<i class='fas fa-file-pdf'> PDF</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: 'print',
                    title: "List Barang",
                    className: "btn btn-primary",
                    text: "<i class='fas fa-print'> Print</i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                }
            ]

        });
    console.log(datatable);
    datatable.columns.adjust().draw();
});

function insertKeranjang() {
    // ajax here
    
        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: "Dimasukkan ke keranjang"
        })
    
}

function hapusKeranjang() {
    // ajax here

    Swal.fire({
        title: 'Yakin akan hapus Item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal'
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
        title: 'Permohonan Berhasil Diproses',
        text: "Silahkan tunggu informasi lebih lanjut"
    })
}

function CancelRequest() {
    //ajax here
    Swal.fire({
        title: 'Yakin akan membatalkan permohonan?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Berhasil!',
                'Permohonan berhasil dibatalkan',
                'success'
            )
        }
    })
}

function deleteBarang() {
    // ajax here

    Swal.fire({
        title: 'Yakin akan hapus Item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal'
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

function showEdit() {
    $('#barangModalTitle').html("Edit Barang");
    $('#submitBarang').html("Edit");
    $("#barangName").val("Nama");
    $("#barangTipe").val(2);
    $("#barangKeterangan").val("Keterangan");
    $("#barangDeskripsi").val("Deskripsi");
    $("#barangGambar").val("Gambar");

    
}

function showInsert() {
    $('#barangModalTitle').html("Tambah Barang");
    $('#submitBarang').html("Save");
    // reset form
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
    // ajax here
    let ikon, teks, judul;
    if (formatValidation() == 1) {
        ikon = 'success';
        judul = 'Data Berhasil Ditambahkan';
    }
    else if (formatValidation() == -1) {
        ikon = 'error';
        judul = 'Format gambar salah!';
        teks = 'Masukkan format yang benar!';
    }
    else {
        ikon = 'error';
        judul = 'Ukuran gambar terlalu besar!';
        teks = 'Ukuran gambar harus kurang dari 10 MB!';
    }

    Swal.fire({
        icon: ikon,
        title: judul,
        text: teks,
    })
}

function Edit() {
    // ajax here
    
    Swal.fire({
        icon: 'success',
        title: 'Data Berhasil Diubah',
    })
}

function formatValidation() {
    var fileInput = document.getElementById('barangGambar');

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions =
        /(\.jpg|\.jpeg|\.png|\.svg)$/i;

    if (!allowedExtensions.exec(filePath)) {
        //alert('Invalid file type');
        fileInput.value = '';
        return -1;
    }
    if (fileInput.size > 10) {
        return -2;
    }
    return 1;
}