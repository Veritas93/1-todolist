
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { loginTC } from '../../state/auth/auth-reducer';
import { Navigate } from 'react-router-dom';



const validate = (values: any) => {
  const errors: ErrorsType = {};
  if (!values.password) {
    errors.password = 'Password is require';
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters"
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(i => i.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate,
    onSubmit: (values) => {
      dispatch(loginTC(values))
      formik.resetForm()
    },
  });

  if(isLoggedIn === true) {
    return <Navigate to="/todolists"/>
  }
  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl>
          <FormLabel>
            <p>
              To log in get registered
              <a
                href={'https://social-network.samuraijs.com/'}
                target={'_blank'}
              >
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
                // name="email"
                // onChange={formik.handleChange}
                // value={formik.values.email}
                // onBlur={formik.handleBlur}
                error={!!formik.errors.email && formik.touched.email }
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div> }
              <TextField
                type="password"
                label="Password"
                margin="normal"
                // name="password"
                // onChange={formik.handleChange}
                // value={formik.values.password}
                // onBlur={formik.handleBlur}
                error={!!formik.errors.password && formik.touched.password}
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div> }
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                    // name="rememberMe"
                    // onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                    {...formik.getFieldProps('rememberMe')}
                  />
                }
              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  );
};

type ErrorsType = {
  email?: string
  password?: string
};

export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}