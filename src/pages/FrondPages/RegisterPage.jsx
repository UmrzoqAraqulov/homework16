import { Button, Form, Input, message } from "antd";
import { request } from "../../server/request";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const navigate = useNavigate();
  const [btnLoading,setBtnLoading] = useState(false);
  const [messageApi] = message.useMessage();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const { first_name, last_name, username, password } = values;
    console.log(1);
    try {
      setBtnLoading(true);
      request.post("auth/register", {
        first_name,
        last_name,
        username,
        password,
      });
      messageApi.info("You have successfully registered");
      navigate('/login');
    } catch (err) {
      message.error(err.message);
    }finally{
      setBtnLoading(false);
    }
  };

  return (
    <div className="register pt-4 containr ">
      <h2 className="text-center text-4xl sm:text-5xl font-semibold py-4">
        Register
      </h2>
      <div className="my-4 max-w-[500px] flex justify-center  mx-auto">
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your Firstname!",
              },
            ]}
          >
            <Input
              placeholder="Firstname"
              style={{
                borderRadius: "0px",
                padding: "8px 14px",
                fontSize: "16px",
              }}
            />
          </Form.Item>

          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your Lastname!",
              },
            ]}
          >
            <Input
              placeholder="Lastname"
              style={{
                borderRadius: "0px",
                padding: "8px 14px",
                fontSize: "16px",
              }}
            />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              placeholder="Username"
              style={{
                borderRadius: "0px",
                padding: "8px 14px",
                fontSize: "16px",
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Password"
              style={{
                borderRadius: "0px",
                padding: "8px 14px",
                fontSize: "16px",
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              style={{
                borderRadius: "0px",
                padding: "8px 14px",
                fontSize: "16px",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{
                background: "#4287f5",
                color: "white",
                borderRadius: "0px",
                padding: "8px 0px",
                width: "100%",
                height: "auto",
                fontSize: "16px",
              }}
              loading={btnLoading}
              htmlType="submit"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default App;
