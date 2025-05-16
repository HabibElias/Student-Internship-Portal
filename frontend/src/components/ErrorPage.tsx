import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NotFound from "./NotFound";
import SmtError from "./SmtError";

const ErrorPage = () => {
  const error = useRouteError();

  return <>{isRouteErrorResponse(error) ? <NotFound /> : <SmtError />}</>;
};

export default ErrorPage;
