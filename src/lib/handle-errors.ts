class CustomException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomException";
  }
}

// function CustomException(message:any) {
//   const error = new Error(message);
//   error.message = message;
//   return error;
// }

// CustomException.prototype = Object.create(Error.prototype);

const HandleErrors = (data: any) => {
  if (data?.error?.status === "FETCH_ERROR") {
    throw new CustomException("Server Is Offline");
  } else if (data?.error?.status === 400) {
    // if(data?.error?.data?.errors)
    throw new CustomException(data.error.data.message);
  }

  if (Object.hasOwn(data, "success")) {
    if (!data.success) {
      const { msg } = data;
      throw new CustomException(msg);
    }
  }
};

export default HandleErrors;
