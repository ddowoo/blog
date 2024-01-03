function wrapPromise<T>(promise: Promise<T>) {
  let status = "pending";
  let response: T | null = null;

  const suspender = promise.then(
    (res) => {
      console.log("성공했대요~!!!");
      //   setTimeout(() => {
      status = "success";
      response = res;
      //   }, 5000);
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
}

export default wrapPromise;
