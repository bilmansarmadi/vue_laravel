function getRes(response) {
  console.log(response);
  var newRess = {
    status: response.status,
    data: response.data,
    error: "",
    message: response.Message,
    message_opt: response.data.CustomMessage
  };

  if (response.status == 200) {
    newRess.status = response.data.Status;
    newRess.data = response.data.Data;
    newRess.error = response.data.Error;
    newRess.message = response.data.Message;
    newRess.message_opt = response.data.CustomMessage;
  } else {
    // sss
  }

  return newRess;
}

export default class {
  static PostData(BaseApi, url, objData, contentType, onSuccess, onError) {
    // const qs = require("qs");
    // let szData = qs.stringify(objData);
    return BaseApi.post(url, objData, contentType)
      .then(data => onSuccess(getRes(data)))
      .catch(err => onError(err));
  }
}
