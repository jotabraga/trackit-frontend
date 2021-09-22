import { Route, Redirect } from "react-router-dom";

/*
 * Receives a function that should return an array of objects in the following format:
 * { to: "/some-path", check: () => Boolean, message?: "message" }
 * If the check function returns false user will be redirected to "/some-path"
 */
export default function ConditionalRoute({ check=() => [], ...props  }) {
  const validations = check();

  for (const condition of validations) {
    if (!condition.check()) {
      if (condition.message) {
        alert(condition.message);
      }
      return (
        <Redirect to={condition.to} />
      );
    }
  }

  return <Route {...props} />;
}