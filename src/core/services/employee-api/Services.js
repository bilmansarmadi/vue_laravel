function getRes(response) {

  var newRess = {
    status: response.data.code,
    data: response.data.data,
    error: response.data.error,
    success: response.data.success,
  };

  if (response.data.success) {
    newRess.status = response.data.code;
    newRess.data = response.data.data;
    newRess.error = response.data.error;
    newRess.success = response.data.success;
  } else {
    // sss
  }

  return newRess;
}

export default class {
  static PostData(BaseApi, url, objData, contentType, onSuccess, onError) {
    return BaseApi.post(url, objData, contentType)
      .then(data => onSuccess(getRes(data)))
      .catch(err => onError(err));
  }

  static GetData(BaseApi, url, onSuccess, onError) {
    return BaseApi.get(url )
      .then(response => onSuccess(getRes(response)))
      .catch(err => onError(err));
  }

  static PutData(BaseApi, url, objData, contentType, onSuccess, onError) {
    return BaseApi.put(url, objData, contentType)
      .then(data => onSuccess(getRes(data)))
      .catch(err => onError(err));
  }

  static DeleteData(BaseApi, url,  contentType, onSuccess, onError) {
    return BaseApi.delete(url, contentType)
      .then(data => onSuccess(getRes(data)))
      .catch(err => onError(err));
  }
}
