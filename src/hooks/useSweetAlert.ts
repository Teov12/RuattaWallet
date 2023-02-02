import Swal from "sweetalert2";

export function useSweetAlert() {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    function swalSuccess(title: string, callback: Function){
        Swal.fire(title, "", "success").then(() => callback());
    }

    function swalConfirmDialog(
        title: string,
        confirmButtonText: string,
        cancelButtonText: string,
        callback: Function
    )   {
        Swal.fire({
            title: title,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#009ef7",
            cancelButtonColor: "#f1416c",
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
        }).then((result) => {
            if (result.isConfirmed) {
                callback();
            }
        });
    }

    function swalConfirmDialog2(
        title: string,
        confirmButtonText: string,
        cancelButtonText: string,
    )   {
        Swal.fire({
            title: title,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#009ef7",
            cancelButtonColor: "#f1416c",
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
        });
    }
    
    function toastSuccess(text: string) {
        Toast.fire({ icon: "success", text: text });
    }
    
    return {
        swalSuccess,
        swalConfirmDialog,
        swalConfirmDialog2,
        toastSuccess,
    };
}