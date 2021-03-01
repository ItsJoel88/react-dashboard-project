export default function getErrorMessage(err) {
  let msg = "";
  switch (err.status) {
    case 401:
      msg = "Anda tidak memiliki akses halaman ini!";
      break;
    case 500:
      msg = "Internal Server Error";
      break;
    case 404:
      msg = "Server Not Found!";
      break;
    case 400:
      let { data } = err;
      if (data.message) {
        let validationUnique = "validation.unique";
        let validationRequired = "validation.required";
        let validationFile = "validation.file";

        if (typeof data.message !== "object") {
          msg = data.message;
        } else {
          msg = [];
          let { message } = data;
          Object.keys(message).forEach((e, idx) => {
            let messageItem = message[e].join(", ");
            if (message[e][0] === validationRequired) {
              msg.push(`${e} tidak boleh kosong`);
            } else if (message[e][0] === validationUnique) {
              msg.push(`${e} harus unique`);
            } else if (message[e][0] === validationFile) {
              msg.push(`${e} tidak valid`);
            } else {
              msg.push(`${e} ${messageItem}}`);
            }
          });
        }
      }
      break;
    default:
      msg = "";
  }

  return msg;
}
