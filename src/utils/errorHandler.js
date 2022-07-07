const errorHandler = (error) => {
    const {data} = error.response;
    alert(data.message)
}

export default errorHandler;