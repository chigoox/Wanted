import ToastManager, { Toast } from 'toastify-react-native'

export default function ToastMessage(message)
{
   return Toast.info(message.match(/[^/]*$/))

}