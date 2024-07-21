
//CHECKERROR
export const checkError = (name: string, value: string): string => {
    switch (name) {

        //CHECKING EMAIL ERROR
        case "email":
        case "e-mail":
        case "correo":
            if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                return "El e-mail es incorrecto";
            }
            if (value.length > 50) {
                return "El e-mail no puede tener más de 50 caracteres";
            }
            return "";

        //CHECKING PASSWORD ERROR
        case "password":
        case "contraseña":
            if (value.length < 6) {
                return "El password debe de tener 6 caracteres";
            }
            if (!/[A-Z]/.test(value)) {
                return "El password debe contener al menos una letra mayúscula";
            }
            return "";

        //CHECKING NAME ERROR
        case "username":
            if (value.length > 12) {
                return "No puede tener más de 12 caracteres";
            }
            return "";

        default:
            console.log("Unknown format");
    }
    return "";
}