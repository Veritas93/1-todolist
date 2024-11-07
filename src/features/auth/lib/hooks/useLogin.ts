import { useAppDispatch, useAppSelector } from "app/model/store"
import { BaseResponse } from "common/types/commonType"
import { useFormik } from "formik"
import { login } from "../../model/authSlice"

export const useLogin = () => {
    const isLoggedIn = useAppSelector((i) => i.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const validate = (values: any) => {
        // const errors: ErrorsType = {}
        // if (!values.password) {
        //   errors.password = "Password is require"
        // } 
        // // else if (values.password.length < 6) {
        // //   errors.password = "Password must be at least 6 characters"
        // // }
      
        // if (!values.email) {
        //   errors.email = "Required"
        // } 
        // // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        // //   errors.email = "Invalid email address"
        // // }
        // return errors
      }
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
          rememberMe: false,
        },
        validate,
        onSubmit: (values, formikHelpers) => {
          dispatch(login({ data: values }))
          .unwrap()
          .catch((err: BaseResponse) => {
            if(err.fieldsErrors) {
              err.fieldsErrors.forEach((errField)=>{
                formikHelpers.setFieldError(errField.field, errField.error)
              })
            }
          })
          formik.resetForm()
        },
      })
      return {formik, isLoggedIn}
}