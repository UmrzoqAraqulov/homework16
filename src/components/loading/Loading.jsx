import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="w-full text-center text-5xl">
      <Spin size="large" />
    </div>
  );
}

export default Loading