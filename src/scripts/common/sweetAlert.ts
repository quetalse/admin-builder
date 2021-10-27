import Swal, { SweetAlertResult } from "sweetalert2";

const customSwal= Swal.mixin({
    customClass: {
        container: 'your-container-class',
        popup: 'your-popup-class',
        // header: 'your-header-class',
        title: 'your-title-class',
        closeButton: 'your-close-button-class',
        icon: 'your-icon-class',
        image: 'your-image-class',
        // content: 'your-content-class',
        input: 'your-input-class',
        actions: 'your-actions-class',
        confirmButton: 'custom-swal-submit-btn',
        cancelButton: 'your-cancel-button-class',
        footer: 'your-footer-class'
    }
});

interface IsweetAlert{
    [key: string]: ((text?: string) => Promise<SweetAlertResult>)
}

// @ts-ignore
const sweetAlert: IsweetAlert = {
    success: (text) => {
        return customSwal.fire({
            position: "top-right",
            icon: "success",
            title: `${text}`,
            showConfirmButton: false,
            timer: 1500,
            width: 200
        });
    },
    error: (text) => {
       return customSwal.fire({
            position: "top-right",
            icon: "error",
            title: `${text}`,
            allowOutsideClick: false,
            showDenyButton: true,
            confirmButtonColor: '#187DE4',
            confirmButtonText: `Try again`,
            denyButtonText: 'Close',
            width: 300
        })
    },
    confirm: (textHtml) => {
        return customSwal.fire({
            title: 'Are u sure?',
            html: textHtml,
            icon: 'warning',
            confirmButtonText: `Yeap`,
            cancelButtonText: 'Cancel',
        })
    },
    //@ts-ignore
    close: () => {
        return customSwal.close()
    }
};

export default sweetAlert;
