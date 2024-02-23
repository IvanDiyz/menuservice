import * as yup from "yup";

export const deliveryFormSchema = yup.object({
  name: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  address_details: yup.string().required(),
  deliveryTime: yup.string().required(),
});
