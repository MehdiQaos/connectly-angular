import Swal from 'sweetalert2';

export function alertSuccess(message: string) {
  return Swal.fire({
    position: 'center',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

export function alertFailure(message: string) {
  return Swal.fire({
    position: 'center',
    icon: 'error',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}