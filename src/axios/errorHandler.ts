// import { appStore, errorAtom } from '@/shared/Error/erros'

// export const handleApiError = (error: any) => {
//   if (error.response) {
//     const { status, data } = error.response

//     if (status >= 400 && status < 500) {
//       appStore.set(
//         errorAtom,
//         data?.message || "Noto'g'ri so'rov bajarildi. Malumotlarni tekshiring."
//       )
//     } else if (status >= 500) {
//       appStore.set(
//         errorAtom,
//         data?.message ||
//           'Serverda muommo yuz berdi. Iltimos kiyinroq urinib kuring'
//       )
//     }
//   } else if (error.request) {
//     appStore.set(
//       errorAtom,
//       'Internetga ulanishda muommo. Iltimos aloqani tekshiring.'
//     )
//   } else {
//     appStore.set(errorAtom, "Noma'lum xatolik yuz berdi.")
//   }
// }
