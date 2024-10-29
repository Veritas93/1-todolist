import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../app/model/store"
import { login } from "../model/authSlice"
import { Navigate } from "react-router-dom"
import { ErrorsType } from "./login.types"
import { BaseResponse } from "common/types/commonType"

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

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((i) => i.auth.isLoggedIn)

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

  if (isLoggedIn === true) {
    return <Navigate to="/todolists" />
  }
  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To log in get registered
              <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                error={!!formik.errors.email}
                {...formik.getFieldProps("email")}
              />
              {/* formik.touched.password &&  */}
              {formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                // name="password"
                // onChange={formik.handleChange}
                // value={formik.values.password}
                // onBlur={formik.handleBlur}
                error={!!formik.errors.password }
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
