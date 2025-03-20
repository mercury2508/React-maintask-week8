import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast as BsToast } from "bootstrap";
import { removeMessage } from "../redux/toastSlice";

function Toast() {
  const messages = useSelector((state) => state.toast.messages);
  const toastRefs = useRef({});
  const dispatch = useDispatch();
  // 吐司週期
  const toastDuration = 3000;

  useEffect(() => {
    messages.forEach((message) => {
      const messageElement = toastRefs.current[message.id];
      if (messageElement) {
        const messageInstance = new BsToast(messageElement);
        messageInstance.show();
      }
      setTimeout(() => {
        dispatch(removeMessage(message.id));
      }, toastDuration);
    });
  }, [dispatch, messages]);

  // 手動忽略吐司
  const handleDismiss = (message_id) => {
    dispatch(removeMessage(message_id));
  };

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      {messages.map((message) => (
        <div
          ref={(el) => (toastRefs.current[message.id] = el)}
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          key={message.id}
        >
          <div
            className={`toast-header ${
              message.status === "success" ? "bg-success" : "bg-danger"
            } text-white`}
          >
            <strong className="me-auto">
              {message.status === "success" ? "成功" : "錯誤"}
            </strong>
            <button
              onClick={() => handleDismiss(message.id)}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{message.text}</div>
        </div>
      ))}
    </div>
  );
}

export default Toast;
