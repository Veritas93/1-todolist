import s from './Error.module.css'
export const ErrorPage = () => {
  return (
    <div className={s.errorPage}>
      <div>
        <h1>Ooops!</h1>
        <p>Page not found 404</p>
      </div>
    </div>
  );
};
