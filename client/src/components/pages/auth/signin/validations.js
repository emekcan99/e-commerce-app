import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email giriniz")
    .required("Zorunlu alan"),
  password: yup
    .string()
    .min(5, "en az 5 karakter giriniz")
    .required(),
});

export default validations;