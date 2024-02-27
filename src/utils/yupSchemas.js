import * as yup from "yup";

export const deliveryFormSchema = yup.object({
  name: yup.string().required(),
  phone: yup
    .string()
    .required()
    .matches(
      /^\+\d(\s*\d){11}$/,
      "Телефонний номер повинен починатися з '+' і містити 12 цифр"
    ),
  address: yup.string().required(),
  address_details: yup.string().required(),
  deliveryTime: yup.string().required(),
});
