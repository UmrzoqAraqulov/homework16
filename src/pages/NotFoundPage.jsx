import { Button, Result } from "antd";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };
  return (
    <Fragment>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            onClick={backHome}
            style={{ background: "blue  ", }}
            type="primary"
          >
            Back Home
          </Button>
        }
      />
    </Fragment>
  );
};

export default NotFoundPage;
